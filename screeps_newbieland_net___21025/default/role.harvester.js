var roleHarvester = {
    /** @param {Creep} creep **/
    run: function(creep) {
        // Стан 1: Збір енергії
        if(creep.store.getFreeCapacity() > 0) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        // Стан 2: Віддача енергії
        else {
            // Шукаємо будівлі, які треба заправити (Spawn, Extensions)
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_SPAWN) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });

            if(targets.length > 0) {
                // Якщо є будівлі, несемо енергію їм
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } 
            else {
                // ЛОГІКА ДОПОМОГИ: Якщо все заповнено, йдемо до контролера
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#00ff00'}}); // Зелена лінія
                }
            }
        }
    }
};

module.exports = roleHarvester;