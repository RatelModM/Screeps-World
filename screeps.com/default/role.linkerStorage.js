var roleLinkerStorage = {
    run: function(creep) {
        let link = Game.getObjectById(creep.memory.linkId);
        let storage = creep.room.storage;

        // Перевірка наявності об'єктів 
        if (!link) {
            creep.say('❓ No Link');
            return;
        }
        if (!storage) {
            creep.say('❓ No Stor');
            return;
        }

        // Режим роботи: якщо кріп щось має в кишенях і лінк порожній (або кріп уже повний),
        // він скидає енергію в Storage. Інакше — бере з лінка.
        if (creep.store.getUsedCapacity() > 0 && (link.store[RESOURCE_ENERGY] === 0 || creep.store.getFreeCapacity() === 0)) {
            if (creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(storage, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        } 
        // Якщо в лінку є енергія і в кріпа є місце — забираємо
        else if (link.store[RESOURCE_ENERGY] > 0 && creep.store.getFreeCapacity() > 0) {
            if (creep.withdraw(link, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(link, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
};

module.exports = roleLinkerStorage;
