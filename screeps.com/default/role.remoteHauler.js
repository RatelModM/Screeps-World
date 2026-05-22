var roleRemoteHauler = {
    run: function(creep) {
        
        // --- АНТИ-ЗАСТРЯГАТОР ---
        if (creep.memory.lastRoom && creep.room.name !== creep.memory.lastRoom) {
            delete creep.memory._move; 
        }
        creep.memory.lastRoom = creep.room.name;

        if (creep.pos.x === 0 || creep.pos.x === 49 || creep.pos.y === 0 || creep.pos.y === 49) {
            creep.moveTo(new RoomPosition(25, 25, creep.room.name));
            return; 
        }

        // 1. ПЕРЕМИКАННЯ СТАНІВ
        if (creep.memory.delivering && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.delivering = false;
            creep.memory.lastRelay = Game.time; 
            creep.say('🔄');
        }
        if (!creep.memory.delivering && creep.store.getFreeCapacity() == 0) {
            creep.memory.delivering = true;
            creep.say('🚚');
        }

        // 2. ЛОГІКА ДОСТАВКИ (ДОДОМУ)
        if (creep.memory.delivering) {
            
            // --- МЕХАНІКА: RELAY (ЕСТАФЕТА) ---
            if (!creep.memory.lastRelay || Game.time > creep.memory.lastRelay + 6) {
                let receiver = creep.pos.findInRange(FIND_MY_CREEPS, 1, {
                    filter: (c) => c.memory.role == creep.memory.role && !c.memory.delivering
                })[0];

                if (receiver) {
                    if (creep.transfer(receiver, RESOURCE_ENERGY) == OK) {
                        creep.memory.delivering = false;
                        receiver.memory.delivering = true;
                        creep.memory.lastRelay = Game.time;
                        receiver.memory.lastRelay = Game.time;
                        creep.say('🤝');
                        return; 
                    }
                }
            }

            // 1. ПЕРЕВІРКА КІМНАТИ (Йдемо додому)
            if (creep.room.name !== creep.memory.homeRoom) {
                let exitDir = creep.room.findExitTo(creep.memory.homeRoom);
                // ФІКС: Шукаємо найближчий ВИХІД ПО ШЛЯХУ (в обхід стін/скель)
                let exitTile = creep.pos.findClosestByPath(exitDir); 
                
                if (exitTile) {
                    creep.moveTo(exitTile, {reusePath: 20, visualizePathStyle: {stroke: '#00ff00'}});
                }
                return; 
            }

            // 2. ВИБІР ЦІЛІ ВДОМА
            let target = null;
            if (creep.memory.deliveryId) {
                let deliveryTarget = Game.getObjectById(creep.memory.deliveryId);
                if (deliveryTarget && deliveryTarget.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
                    target = deliveryTarget;
                }
            }
            if (!target && creep.room.storage && creep.room.storage.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
                target = creep.room.storage;
            }
            if (!target) {
                target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (s) => (s.structureType == STRUCTURE_SPAWN || s.structureType == STRUCTURE_EXTENSION) &&
                                    s.store.getFreeCapacity(RESOURCE_ENERGY) > 0
                });
            }

            if (target) {
                if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#00ff00'}, reusePath: 5});
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
                // ФІКС: Шукаємо найближчий ВИХІД ПО ШЛЯХУ (в обхід стін/скель)
                let exitTile = creep.pos.findClosestByPath(exitDir); 
                
                if (exitTile) {
                    creep.moveTo(exitTile, {reusePath: 20, visualizePathStyle: {stroke: '#ffaa00'}});
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

            // КРОК 3: СКЛАДНЕ СОРТУВАННЯ
            if (candidates.length > 0) {
                candidates.sort((a, b) => {
                    let energyA = a.store.getUsedCapacity(RESOURCE_ENERGY);
                    let energyB = b.store.getUsedCapacity(RESOURCE_ENERGY);
                    if (energyB !== energyA) return energyB - energyA; 
                    return creep.pos.getRangeTo(a) - creep.pos.getRangeTo(b);
                });

                let pickupTarget = candidates[0];
                if (creep.withdraw(pickupTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(pickupTarget, {visualizePathStyle: {stroke: '#ffaa00'}, reusePath: 5});
                }
            } 
            else {
                let dropped = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES, {
                    filter: r => r.resourceType == RESOURCE_ENERGY && r.amount > 100
                });

                if (dropped) {
                    if (creep.pickup(dropped) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(dropped, {visualizePathStyle: {stroke: '#ffffff'}, reusePath: 5});
                    }
                } else {
                    creep.say('💤');
                    if (!creep.pos.isNearTo(25, 25)) {
                        creep.moveTo(25, 25, {range: 3});
                    }
                }
            }
        }
    }
};

module.exports = roleRemoteHauler;