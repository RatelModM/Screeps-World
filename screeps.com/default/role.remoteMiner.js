var roleRemoteMiner = {
    run: function(creep) {
        // 1. Якщо ми не в цільовій кімнаті — йдемо туди
        if (creep.room.name !== creep.memory.targetRoom) {
            creep.moveTo(new RoomPosition(25, 25, creep.memory.targetRoom), {
                reusePath: 50, 
                visualizePathStyle: {stroke: '#ffaa00'}
            });
        } 
        else {
            // 2. Ми в цільовій кімнаті. Шукаємо джерело за ID з пам'яті
            let source = Game.getObjectById(creep.memory.sourceId);
            
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
        } 
    }
};

module.exports = roleRemoteMiner;