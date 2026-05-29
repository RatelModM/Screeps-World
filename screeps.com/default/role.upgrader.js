var roleUpgrader = {
    /** @param {Creep} creep **/
    run: function(creep) {
        
        // Перемикання станів
        if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
        }
        if(!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
            creep.memory.upgrading = true;
        }

        // --- ЛОГІКА ПРОКАЧКИ ---
        if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {
                    reusePath: 15,
                    visualizePathStyle: {stroke: '#ffffff'}
                });
            }
        }
        // --- ЛОГІКА ЗБОРУ ЕНЕРГІЇ ---
        else {
            let target = null;

            // Пріоритет 1: Конкретний лінк за ID з пам'яті кріпа
            if (creep.memory.linkId) {
                let specificLink = Game.getObjectById(creep.memory.linkId);
                if (specificLink && specificLink.store[RESOURCE_ENERGY] > 100) {
                    target = specificLink;
                }
            }

            // Пріоритет 2: Найближчий контейнер (ФІКС: знижено планку до > 100)
            if (!target) {
                target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (s) => s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 500
                });
            }

            // Пріоритет 3: Головне сховище кімнати (Storage)
            else if (!target && creep.room.storage && creep.room.storage.store[RESOURCE_ENERGY] > 10000) {
                target = creep.room.storage;
            }

            // Якщо знайшли будь-яке джерело з пріоритетів — йдемо до нього
            if (target) {
                if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, { 
                        maxRooms: 1, 
                        reusePath: 15, 
                        visualizePathStyle: {stroke: '#ffaa00'} 
                    });
                }
            } 
            // Пріоритет 4: Фолбек (якщо взагалі все порожнє — копаємо руками)
            else {
                var source = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
                if (source) { 
                    if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(source, { 
                            maxRooms: 1, 
                            reusePath: 15, 
                            visualizePathStyle: {stroke: '#ff0000'} 
                        });
                    }
                }
            }
        }
    }
};

module.exports = roleUpgrader;