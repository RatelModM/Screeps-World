var roleBuilder = {
    /** @param {Creep} creep **/
    run: function(creep) {
        // 1. ЖОРСТКА ПЕРЕВІРКА КІМНАТИ 
        const homeRoomName = creep.memory.targetRoom; 

        if (creep.room.name !== homeRoomName) {
            //повернення
            creep.moveTo(new RoomPosition(20, 12, homeRoomName), {visualizePathStyle: {stroke: '#ff0000'}});
            creep.say('🏠');
            return; 
        }
        
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
            // Пріоритет 1: Збір викинутої енергії
            let dropped = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES, {
                filter: (r) => r.resourceType == RESOURCE_ENERGY && r.amount > 50
            });

            if (dropped) {
                if (creep.pickup(dropped) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(dropped, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            } 
            else {
                // Пріоритет 2: Збір з контейнерів
                let container = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (s) => (s.structureType == STRUCTURE_CONTAINER || s.structureType == STRUCTURE_STORAGE) &&
                                    s.store[RESOURCE_ENERGY] > 450
                });

                if (container) {
                    if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(container, {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
                }
                // Пріоритет 3: Копання (якщо є WORK)
                else if (creep.getActiveBodyparts(WORK) > 0) {
                    let source = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
                    if (source) {
                        if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
                        }
                    }
                }
            }
        }
    }
};

module.exports = roleBuilder;