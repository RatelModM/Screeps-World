var roleLinkerStorage = {
    run: function(creep) {
        let link = Game.getObjectById(creep.memory.linkId);
        let storage = creep.room.storage;

        // --- DEBUG: Кріп скаже, чого йому не вистачає ---
        if (!link) {
            creep.say('❓ No Link');
            return;
        }
        if (!storage) {
            creep.say('❓ No Stor');
            return;
        }

        if (creep.store.getUsedCapacity() === 0) {
            // Якщо в лінку порожньо, він теж може стояти
            if (link.store[RESOURCE_ENERGY] === 0) {
                creep.say('💤');
                return;
            }

            let result = creep.withdraw(link, RESOURCE_ENERGY);
            if (result == ERR_NOT_IN_RANGE) {
                creep.moveTo(link, {visualizePathStyle: {stroke: '#ffaa00'}});
            } else if (result != OK) {
                creep.say('Error: ' + result);
            }
        } 
        else {
            if (creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(storage, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
    }
};
module.exports = roleLinkerStorage;