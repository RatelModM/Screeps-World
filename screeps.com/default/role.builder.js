var roleBuilder = {
    /** @param {Creep} creep **/
    run: function(creep) {
        // 1. ЖОРСТКА ПЕРЕВІРКА КІМНАТИ 
    
        // Якщо кріп будував, але енергія закінчилася
        if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('До збору🧱');
        }
        // Якщо кріп збирав енергію і заповнився
        if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
            creep.say('я на 🏗');
        }

        if(creep.memory.building) {
            // шукаємо ціль
            var target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
            
            if(target) {
                if(creep.build(target) == ERR_NOT_IN_RANGE) {
                     creep.moveTo(target, { maxRooms: 1, visualizePathStyle: {stroke: '#ffffff'} });
                }
            } else {
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                      creep.moveTo(creep.room.controller, { maxRooms: 1 });
                }
            }
        }
        else { 
            // ЗБІР ЕНЕРГІЇ
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
                var source = creep.room.find(FIND_SOURCES);
                if(source) { 
                    if(creep.harvest(source[0]) == ERR_NOT_IN_RANGE) {
                        // ДОДАНО maxRooms: 1
                        creep.moveTo(source[0], { maxRooms: 1, visualizePathStyle: {stroke: '#ff0000'} });
                    }
                }
            }
        }
    }
};

module.exports = roleBuilder;