var roleHarvester = {
    /** @param {Creep} creep **/
    run: function(creep) {
        // --- 1. ПЕРЕМИКАННЯ СТАНІВ ---
        // Якщо кріп повний — починає доставку
        if(!creep.memory.delivering && creep.store.getFreeCapacity() == 0) {
            creep.memory.delivering = true;
            creep.say('🚚 Несу');
        }
        // Якщо порожній — йде копати
        if(creep.memory.delivering && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.delivering = false;
            creep.say('🔄 Збір');
        }

        // --- 2. ЛОГІКА ДОСТАВКИ (Має енергію) ---
        if(creep.memory.delivering) {
            
            // --- МЕХАНІКА RELAY ---
            // Шукаємо іншого харвестера поруч, який ЗАРАЗ у стані збору енергії (!delivering)
            if (!creep.memory.lastRelay || Game.time > creep.memory.lastRelay + 6) {
                let receiver = creep.pos.findInRange(FIND_MY_CREEPS, 1, {
                    filter: (c) => c.memory.role == 'harvester' && !c.memory.delivering
                })[0];

                if (receiver) {
                    if (creep.transfer(receiver, RESOURCE_ENERGY) == OK) {
                        // Міняємо їм ролі місцями
                        creep.memory.delivering = false;
                        receiver.memory.delivering = true;
                        creep.memory.lastRelay = Game.time;
                        receiver.memory.lastRelay = Game.time;
                        creep.say('🤝 Relay');
                    }
                }
            }

            // ШУКАЄМО КУДИ ВІДДАТИ (Твоя оригінальна логіка)
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_SPAWN) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });

            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {
                        reusePath: 50, // Не забуваємо про економію CPU!
                        visualizePathStyle: {stroke: '#ffffff'}
                    });
                }
            } 
            else {
                // Допомога контролеру, якщо спавн повний
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller, {
                        reusePath: 50,
                        visualizePathStyle: {stroke: '#00ff00'}
                    });
                }
            }
        }
        // --- 3. ЛОГІКА ЗБОРУ (Шукає енергію) ---
        else {
            // Пріоритет 1: Збір викинутої енергії (Dropped Energy)
                var droppedEnergy = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES, {
                    filter: (r) => r.resourceType == RESOURCE_ENERGY && r.amount > 50
                });

                if (droppedEnergy) {
                    if (creep.pickup(droppedEnergy) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(droppedEnergy, {reusePath: 20, visualizePathStyle: {stroke: '#ffaa00'}});
                    }
                } 
                // Пріоритет 2: Видобуток з джерела (Harvest) - працює лише якщо є модуль WORK
                else {
                    var source = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
                    if (source) {
                        if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(source, {reusePath: 20, visualizePathStyle: {stroke: '#ffaa00'}});
                        }
                    }
                }
        }
    }
};

module.exports = roleHarvester;