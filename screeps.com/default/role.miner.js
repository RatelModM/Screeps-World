var roleMiner = {
    run: function(creep) {
        // Отримуємо ID
        var targetId = creep.memory.targetSourceId;
        
        if(!targetId) {
            creep.say('No ID in Mem');
            return;
        }

        var source = Game.getObjectById(targetId);

        if(source) {
            // Шукаємо контейнер
            var container = source.pos.findInRange(FIND_STRUCTURES, 1, {
                filter: (s) => s.structureType == STRUCTURE_CONTAINER
            })[0];

            if(container) {
                if(!creep.pos.isEqualTo(container.pos)) {
                    creep.say('🛵⛏️');
                    creep.moveTo(container.pos, {visualizePathStyle: {stroke: '#ffffff'}});
                } else {
                    creep.say('⛏️');
                    creep.harvest(source);
                }
            } else {
                // Якщо контейнера немає
                if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.say('Going to Src');
                    creep.moveTo(source);
                }
            }
        } else {
            creep.say('Invalid ID');
        }
    }
};

module.exports = roleMiner;