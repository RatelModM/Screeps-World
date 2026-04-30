var roleRemoteRepairer = {
    /** @param {Creep} creep **/
    run: function(creep) {
        // 1. СИЛОВИЙ ВИХІД З КОРДОНУ (щоб не "танцював" на межі)
        if (creep.pos.x <= 0 || creep.pos.x >= 49 || creep.pos.y <= 0 || creep.pos.y >= 49) {
            creep.moveTo(new RoomPosition(25, 25, creep.room.name), {visualizePathStyle: {stroke: '#00ff00'}});
            creep.say('➡️ Прохід');
            return; 
        }

        // 2. ПЕРЕМИКАННЯ СТАНІВ
        if(creep.memory.repairing && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.repairing = false;
            creep.say('🔄 Зарядка');
        }
        if(!creep.memory.repairing && creep.store.getFreeCapacity() == 0) {
            creep.memory.repairing = true;
            creep.say('🛠 Ремонт');
        }

        // 3. ЛОГІКА ДІЙ
        if(creep.memory.repairing) {
            // Йдемо в цільову кімнату
            if(creep.room.name !== creep.memory.targetRoom) {
                creep.moveTo(new RoomPosition(25, 25, creep.memory.targetRoom), {
                    reusePath: 50, 
                    visualizePathStyle: {stroke: '#ffffff'}
                });
            } else {
                // МИ В ЦІЛЬОВІЙ КІМНАТІ: шукаємо, що полагодити
                // Пріоритет 1: Дороги та Контейнери (цивільна інфраструктура)
                let targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (s) => (s.structureType == STRUCTURE_ROAD || s.structureType == STRUCTURE_CONTAINER) && 
                                   s.hits < s.hitsMax
                });

                // Пріоритет 2: Стіни та Рампарти (якщо дороги цілі), ліміт 50к
                if(targets.length === 0) {
                    targets = creep.room.find(FIND_STRUCTURES, {
                        filter: (s) => (s.structureType == STRUCTURE_WALL || s.structureType == STRUCTURE_RAMPART) && 
                                       s.hits < 50000 
                    });
                }

                if(targets.length > 0) {
                    // Знаходимо найближчу ціль
                    let closestTarget = creep.pos.findClosestByRange(targets);
                    if(creep.repair(closestTarget) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(closestTarget, {maxRooms: 1, visualizePathStyle: {stroke: '#ffffff'}});
                    }
                } 
            }
        } 
        else {
            // ПОВЕРНЕННЯ ДОДОМУ ЗА ЕНЕРГІЄЮ
            if(creep.room.name !== creep.memory.targetRoom) {
                creep.moveTo(new RoomPosition(25, 25, creep.memory.targetRoom), {
                    reusePath: 50, 
                    visualizePathStyle: {stroke: '#ffaa00'}
                });
            } else {
                // ШУКАЄМО ЕНЕРГІЮ ВДОМА
                // Спочатку підбираємо те, що впало (Dropped)
                let dropped = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES, {
                    filter: r => r.resourceType == RESOURCE_ENERGY && r.amount > 50
                });
                
                if(dropped) {
                    if(creep.pickup(dropped) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(dropped, {maxRooms: 1});
                    }
                } else {
                    // Потім беремо зі Storage/Container
                    let source = creep.room.storage || creep.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: (s) => (s.structureType == STRUCTURE_CONTAINER || s.structureType == STRUCTURE_STORAGE) && 
                                       s.store[RESOURCE_ENERGY] > 0
                    });

                    if(source) {
                        if(creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(source, {maxRooms: 1});
                        }
                    } else {
                        // Якщо зовсім порожньо - копаємо самі
                        let mine = creep.pos.findClosestByRange(FIND_SOURCES);
                        if(creep.harvest(mine) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(mine, {maxRooms: 1});
                        }
                    }
                }
            }
        }
    }
};

module.exports = roleRemoteRepairer;