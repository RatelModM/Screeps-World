var roleHauler = {
    /** @param {Creep} creep **/
    run: function(creep) {
        // Якщо кріп порожній — їде до контейнера заправлятись
        if(creep.store.getUsedCapacity() == 0) {
            // Шукаємо контейнер, де є енергія
            var container = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (s) => s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 200
            });

            if(container) {
                if(creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(container, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
        } 
        // Якщо кріп повний — везе енергію на базу
        else {
            // Шукаємо куди віддати (Спавн, Розширення або Вежа)
            var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (s) => (s.structureType == STRUCTURE_SPAWN ) && 
                                s.store.getFreeCapacity(RESOURCE_ENERGY) > 0
            });

            if(target) {
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {
                // Якщо все повне — веземо в Storage (якщо він є)
                if(creep.room.storage) {
                    if(creep.transfer(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.storage);
                    }
                }
            }
        }
    }
};

module.exports = roleHauler;