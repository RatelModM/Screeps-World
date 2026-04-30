var roleLinkerSource = {
    run: function(creep) {
        let container = Game.getObjectById(creep.memory.containerId);
        let link = Game.getObjectById(creep.memory.linkId);

        if (!container || !link) return;

        // Якщо кріп порожній — беремо з контейнера
        if (creep.store.getUsedCapacity() === 0) {
            if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(container);
            }
        } 
        // Якщо кріп має енергію — віддаємо в лінк
        else {
        if (link && link.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
            if (creep.transfer(link, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(link);
            }
        }
        else { 
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
             }
        }
    }
};
module.exports = roleLinkerSource;