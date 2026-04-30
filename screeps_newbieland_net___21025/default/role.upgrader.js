var roleUpgrader = {
    /** @param {Creep} creep **/
    run: function(creep) {
        // Якщо кріп зараз прокачує контролер, але енергія закінчилася — перемикаємо на збір
        if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
        }
        // Якщо кріп збирає ресурси і його інвентар заповнений — перемикаємо на прокачку
        if(!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
            creep.memory.upgrading = true;
        }

        // --- ЛОГІКА ПРОКАЧКИ ---
        if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                // Якщо контролер далеко, йдемо до нього (малюємо білу лінію)
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        // --- ЛОГІКА ЗБОРУ ЕНЕРГІЇ ---
        else {
            var container = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (s) => {     
                    return (s.structureType == STRUCTURE_STORAGE || s.structureType == STRUCTURE_CONTAINER) && 
                           s.store[RESOURCE_ENERGY] > 1000; 
                }
            });

            if(container) {
                if(creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    // ДОДАНО maxRooms: 1
                    creep.moveTo(container, { maxRooms: 1, visualizePathStyle: {stroke: '#ffaa00'} });
                }
            } else {
                var source = creep.pos.findClosestByRange(FIND_SOURCES);
                if(source) { 
                    if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                        // ДОДАНО maxRooms: 1
                        creep.moveTo(source, { maxRooms: 1, visualizePathStyle: {stroke: '#ff0000'} });
                    }
                }
            }
        }
    }
};

module.exports = roleUpgrader;