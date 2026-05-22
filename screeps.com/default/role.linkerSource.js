var roleLinkerSource = {
    run: function(creep) {
        let container = Game.getObjectById(creep.memory.containerId);
        let link = Game.getObjectById(creep.memory.linkId);

        if (!container || !link) return;

        // Перемикаємо режими: якщо повний — починаємо віддавати
        if (!creep.memory.transferring && creep.store.getFreeCapacity() === 0) {
            creep.memory.transferring = true;
            
        }
        // Якщо повністю порожній — починаємо брати
        if (creep.memory.transferring && creep.store.getUsedCapacity() === 0) {
            creep.memory.transferring = false;
            
        }

        // Логіка дій залежно від режиму
        if (!creep.memory.transferring) {
            // Беремо з контейнера, поки не заповнимося
            if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(container, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        } 
        else {
            // Віддаємо в лінк, поки не спустошимося
            if (creep.transfer(link, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(link, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
    }
};

module.exports = roleLinkerSource;