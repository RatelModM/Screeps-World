var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        // Якщо у кріпа є вільне місце в рюкзаку — він іде збирати енергію
        if(creep.store.getFreeCapacity() > 0) {
            creep.say('збір');
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
        // Якщо рюкзак повний — він іде до контролера
        else {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
    }
};

module.exports = roleUpgrader;
