var roleHarvester = {
    /** @param {Creep} creep **/
    run: function(creep) {
        // --- 1. ПЕРЕМИКАННЯ СТАНІВ ---
        if(!creep.memory.delivering && creep.store.getFreeCapacity() == 0) {
            creep.memory.delivering = true;
            creep.say('🚚 Несу');
        }
        if(creep.memory.delivering && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.delivering = false;
            creep.say('🔄 Збір');
        }

        // --- 2. ЛОГІКА ДОСТАВКИ (Має енергію) ---
        if(creep.memory.delivering) {
            
            // --- МЕХАНІКА RELAY (Естафета) ---
            if (!creep.memory.lastRelay || Game.time > creep.memory.lastRelay + 6) {
                let receiver = creep.pos.findInRange(FIND_MY_CREEPS, 1, {
                    filter: (c) => c.memory.role == 'harvester' && !c.memory.delivering
                })[0];

                if (receiver) {
                    if (creep.transfer(receiver, RESOURCE_ENERGY) == OK) {
                        creep.memory.delivering = false;
                        receiver.memory.delivering = true;
                        creep.memory.lastRelay = Game.time;
                        receiver.memory.lastRelay = Game.time;
                        creep.say('🤝 Relay');
                        return; // Виходимо, щоб не шукати цілі в цьому тіку
                    }
                }
            }

            // ШУКАЄМО НАЙБЛИЖЧУ ЦІЛЬ (Спавн або Екстеншн)
            // findClosestByRange повертає один ОБ'ЄКТ, а не масив
            var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_SPAWN) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });

            // Якщо ціль знайдена (target не undefined)
            if(target) {
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {
                        reusePath: 10, // Для бази краще менший шлях, щоб обходити інших кріпів
                        visualizePathStyle: {stroke: '#ffffff'}
                    });
                }
            } 
            else {
                // Якщо спавни та екстеншни повні — допомагаємо контролеру
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller, {
                        reusePath: 20,
                        visualizePathStyle: {stroke: '#00ff00'}
                    });
                }
            }
        }
        // --- 3. ЛОГІКА ЗБОРУ (Шукає енергію) ---
        else {
            // Пріоритет 1: Збір викинутої енергії
            let dropped = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES, {
                filter: (r) => r.resourceType == RESOURCE_ENERGY && r.amount > 50
            });

            if (dropped) {
                if (creep.pickup(dropped) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(dropped, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            } 
            else {
                // Пріоритет 2: Збір з контейнерів
                let container = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (s) => (s.structureType == STRUCTURE_CONTAINER || s.structureType == STRUCTURE_STORAGE) &&
                                    s.store[RESOURCE_ENERGY] > 50
                });

                if (container) {
                    if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(container, {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
                }
                // Пріоритет 3: Копання (якщо є WORK)
                else if (creep.getActiveBodyparts(WORK) > 0) {
                    let source = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
                    if (source) {
                        if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
                        }
                    }
                }
            }
        }
    }
};

module.exports = roleHarvester;