var roleRemoteBuilder = {
    run: function(creep) {
       
        // --- 2. ПЕРЕМИКАННЯ СТАНІВ ---
        if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('⛏️ Копаю');
        }
        if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
            creep.say('🏗️ Будую');
        }

        // --- 3. ЛОГІКА ДІЙ ---
        if(creep.memory.building) {
            // Якщо ми не в цільовій кімнаті — спочатку йдемо туди
            if(creep.room.name != creep.memory.targetRoom) {
                const exitDir = creep.room.findExitTo(creep.memory.targetRoom);
                const exit = creep.pos.findClosestByPath(exitDir);
                creep.moveTo(exit, {visualizePathStyle: {stroke: '#ffffff'}, reusePath: 50});
            } else {
                // МИ НА МІСЦІ: шукаємо будови
                var target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
                if(target) {
                    if(creep.build(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}, reusePath: 10});
                    }
                }
            }
        } 
        else {
            // ПОШУК ЕНЕРГІЇ НА МІСЦІ (у поточній кімнаті)
            
            // 1. Спочатку підбираємо те, що лежить на землі (економія CPU та ресурсів)
            let dropped = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES, {
                filter: r => r.resourceType == RESOURCE_ENERGY && r.amount > 150
            });
            
            if(dropped) {
                if(creep.pickup(dropped) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(dropped, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            } else {
                // 2. Якщо на землі немає — шукаємо контейнери/склади
                let container = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (s) => (s.structureType == STRUCTURE_CONTAINER || s.structureType == STRUCTURE_STORAGE) && 
                                   s.store[RESOURCE_ENERGY] > 0
                });

                if(container) {
                    if(creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(container, {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
                } else {
                    // 3. Якщо будівель немає — просто копаємо джерело
                    let source = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
                    if(source) {
                        if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
                        }
                    }
                }
            }
        }
    }
};

module.exports = roleRemoteBuilder;