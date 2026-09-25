var roleRemoteHauler = {
    run: function(creep) {
       
        // --- АВТОМАТИЧНЕ САМОЛІКУВАННЯ ---
        if (creep.hits < creep.hitsMax) {
            creep.heal(creep);
        }
       
        // --- АНТИ-ЗАСТРЯГАТОР & ОЧИЩЕННЯ ШЛЯХУ ---
        if (creep.memory.lastRoom && creep.room.name !== creep.memory.lastRoom) {
            delete creep.memory._move;
        }
        creep.memory.lastRoom = creep.room.name;

        // РОЗУМНЕ ШТОВХАННЯ НА ПЕРЕХОДАХ
        if (creep.pos.x === 0 || creep.pos.x === 49 || creep.pos.y === 0 || creep.pos.y === 49) {
            let stepX = creep.pos.x === 0 ? 1 : (creep.pos.x === 49 ? 48 : creep.pos.x);
            let stepY = creep.pos.y === 0 ? 1 : (creep.pos.y === 49 ? 48 : creep.pos.y);
           
            creep.moveTo(stepX, stepY, { maxRooms: 1 });
            return;
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

            // Перевірка кімнати
            if (creep.room.name !== creep.memory.homeRoom) {
                let exitDir = creep.room.findExitTo(creep.memory.homeRoom);
                let exitTile = creep.pos.findClosestByPath(exitDir);
               
                if (exitTile) {
                    creep.moveTo(exitTile, {reusePath: 50, visualizePathStyle: {stroke: '#00ff00'}});
                }
                return;
            }

            // --- ПОШУК ЦІЛІ ВДОМА ---
            let target = null;
           
            // КРОК A: Перевірка конкретного Link (із linkId або deliveryId)
            let specificId = creep.memory.linkId || creep.memory.deliveryId;
            if (specificId) {
                let obj = Game.getObjectById(specificId);
                // Перевіряємо, що об'єкт є саме Лінком і в ньому є вільне місце
                if (obj && obj.structureType === STRUCTURE_LINK && obj.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
                    target = obj;
                }
            }
           
            // КРОК B: Авто-пошук БУДЬ-ЯКОГО вільного Лінка в кімнаті (якщо перший заповнений або це не Лінк)
            if (!target) {
                target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (s) => s.structureType === STRUCTURE_LINK &&
                                   s.store.getFreeCapacity(RESOURCE_ENERGY) > 0
                });
            }

            // КРОК C: Авто-пошук Контейнера
            if (!target) {
                target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (s) => s.structureType === STRUCTURE_CONTAINER &&
                                   s.store.getFreeCapacity(RESOURCE_ENERGY) > 0
                });
            }

            // КРОК D: Storage (запасний варіант, якщо Лінки і Контейнери заповнені)
            if (!target && creep.room.storage && creep.room.storage.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
                target = creep.room.storage;
            }
           
            // Передача енергії
            if (target) {
                // Індикація над головою кріпа для відладки
                if (target.structureType === STRUCTURE_LINK) creep.say('🔗 Link');
                else if (target.structureType === STRUCTURE_STORAGE) creep.say('📦 Storage');

                if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#00ff00'}, reusePath: 50});
                }
            } else {
                creep.say('💤 Full!');
            }
        }
       
        // 3. ЛОГІКА ЗБОРУ (В ЦІЛЬОВІЙ КІМНАТІ)
        else {
            if (creep.room.name !== creep.memory.targetRoom) {
                let exitDir = creep.room.findExitTo(creep.memory.targetRoom);
                let exitTile = creep.pos.findClosestByPath(exitDir);
               
                if (exitTile) {
                    creep.moveTo(exitTile, {reusePath: 70, visualizePathStyle: {stroke: '#ffaa00'}});
                }
                return;
            }

            let containerIds = creep.memory.containerIds || [];
            let candidates = [];
           
            for (let id of containerIds) {
                let obj = Game.getObjectById(id);
                if (obj && obj.store.getUsedCapacity(RESOURCE_ENERGY) >= 800) {
                    candidates.push(obj);
                }
            }

            if (candidates.length > 0) {
                candidates.sort((a, b) => {
                    let energyA = a.store.getUsedCapacity(RESOURCE_ENERGY);
                    let energyB = b.store.getUsedCapacity(RESOURCE_ENERGY);
                    if (energyB !== energyA) return energyB - energyA;
                    return creep.pos.getRangeTo(a) - creep.pos.getRangeTo(b);
                });

                let pickupTarget = candidates[0];
                if (creep.withdraw(pickupTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(pickupTarget, {visualizePathStyle: {stroke: '#ffaa00'}, reusePath: 70});
                }
            }
            else {
                let dropped = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES, {
                    filter: r => r.resourceType == RESOURCE_ENERGY && r.amount > 500
                });

                if (dropped) {
                    if (creep.pickup(dropped) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(dropped, {visualizePathStyle: {stroke: '#ffffff'}, reusePath: 70});
                    }
                } else {
                    creep.say('💤');
                }
            }
        }
    }
};

module.exports = roleRemoteHauler;