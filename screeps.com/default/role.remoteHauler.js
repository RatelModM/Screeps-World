var roleRemoteHauler = {
    run: function(creep) {
        
        // --- АВТОМАТИЧНЕ САМОЛІКУВАННЯ ---
        // Якщо у кріпа є модуль HEAL і він поранений — лікує себе щотику
        if (creep.hits < creep.hitsMax) {
            creep.heal(creep);
        }
        
        // --- АНТИ-ЗАСТРЯГАТОР & ОЧИЩЕННЯ ШЛЯХУ ---
        if (creep.memory.lastRoom && creep.room.name !== creep.memory.lastRoom) {
            delete creep.memory._move; // Скидаємо старий кеш шляху з іншої кімнати
        }
        creep.memory.lastRoom = creep.room.name;

        // РОЗУМНЕ ШТОВХАННЯ НА ПЕРЕХОДАХ: робимо чіткий 1 крок всередину кімнати
        if (creep.pos.x === 0 || creep.pos.x === 49 || creep.pos.y === 0 || creep.pos.y === 49) {
            let stepX = creep.pos.x === 0 ? 1 : (creep.pos.x === 49 ? 48 : creep.pos.x);
            let stepY = creep.pos.y === 0 ? 1 : (creep.pos.y === 49 ? 48 : creep.pos.y);
            
            creep.moveTo(stepX, stepY, { maxRooms: 1 });
            return; // Перериваємо тік, щоб кріп гарантовано злетів з порталу
        }

        // 1. ПЕРЕМИКАННЯ СТАНІВ
        if (creep.memory.delivering && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.delivering = false;
            creep.say('🔄');
        }
        if (!creep.memory.delivering && creep.store.getFreeCapacity() == 0) {
            creep.memory.delivering = true;
            creep.say('🚚');
        }

        // 2. ЛОГІКА ДОСТАВКИ (ДОДОМУ)
        if (creep.memory.delivering) {

            // ПЕРЕВІРКА КІМНАТИ (Йдемо додому)
            if (creep.room.name !== creep.memory.homeRoom) {
                let exitDir = creep.room.findExitTo(creep.memory.homeRoom);
                let exitTile = creep.pos.findClosestByPath(exitDir); 
                
                if (exitTile) {
                    creep.moveTo(exitTile, {reusePath: 50, visualizePathStyle: {stroke: '#00ff00'}});
                }
                return; 
            }

            // --- ВИБІР ЦІЛІ ВДОМА ---
            let target = null;
            
            // Якщо в пам'яті жорстко прописана ціль і там є місце
            if (creep.memory.deliveryId) {
                let deliveryTarget = Game.getObjectById(creep.memory.deliveryId);
                if (deliveryTarget && deliveryTarget.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
                    target = deliveryTarget;
                }
            }
            
            // Якщо головної цілі немає або вона забита — шукаємо Сховище або Контейнер
            if (!target) {
                target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (s) => (s.structureType == STRUCTURE_CONTAINER || s.structureType == STRUCTURE_STORAGE) &&
                                   s.store.getFreeCapacity(RESOURCE_ENERGY) > 0
                });
            }
            
            // Віддаємо енергію знайденому об'єкту
            if (target) {
                if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#00ff00'}, reusePath: 50});
                }
            } else {
                creep.say('💤'); 
            }
        } 
        
        // 3. ЛОГІКА ЗБОРУ (В ЦІЛЬОВІЙ КІМНАТІ)
        else {
            // КРОК 1: ПЕРЕВІРКА КІМНАТИ (Йдемо в шахту)
            if (creep.room.name !== creep.memory.targetRoom) {
                let exitDir = creep.room.findExitTo(creep.memory.targetRoom);
                let exitTile = creep.pos.findClosestByPath(exitDir); 
                
                if (exitTile) {
                    creep.moveTo(exitTile, {reusePath: 50, visualizePathStyle: {stroke: '#ffaa00'}});
                }
                return; 
            }

            // КРОК 2: ПОШУК КАНДИДАТІВ З ПАМ'ЯТІ
            let containerIds = creep.memory.containerIds || [];
            let candidates = [];
            
            for (let id of containerIds) {
                let obj = Game.getObjectById(id);
                if (obj && obj.store.getUsedCapacity(RESOURCE_ENERGY) >= 100) { 
                    candidates.push(obj);
                }
            }

            // КРОК 3: СОРТУВАННЯ ТА ЗАБРАННЯ ЕНЕРГІЇ
            if (candidates.length > 0) {
                candidates.sort((a, b) => {
                    let energyA = a.store.getUsedCapacity(RESOURCE_ENERGY);
                    let energyB = b.store.getUsedCapacity(RESOURCE_ENERGY);
                    if (energyB !== energyA) return energyB - energyA; 
                    return creep.pos.getRangeTo(a) - creep.pos.getRangeTo(b);
                });

                let pickupTarget = candidates[0];
                if (creep.withdraw(pickupTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(pickupTarget, {visualizePathStyle: {stroke: '#ffaa00'}, reusePath: 50});
                }
            } 
            else {
                // Якщо контейнери порожні, шукаємо підняту (dropped) енергію
                let dropped = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES, {
                    filter: r => r.resourceType == RESOURCE_ENERGY && r.amount > 700
                });

                if (dropped) {
                    if (creep.pickup(dropped) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(dropped, {visualizePathStyle: {stroke: '#ffffff'}, reusePath: 50});
                    }
                } else {
                    // Якщо роботи немає — стаємо ближче до центру кімнати, щоб не блокувати виходи
                    creep.say('💤');
                    // if (!creep.pos.isNearTo(25, 25)) {
                    //     creep.moveTo(25, 25, {range: 3});
                    // }
                }
            }
        }
    }
};

module.exports = roleRemoteHauler;