var roleRemoteBuilder = {
    run: function(creep) {
         // --- 1. СИЛОВИЙ ВИХІД З КОРДОНУ ---
        if (creep.pos.x === 0 || creep.pos.x === 49 || creep.pos.y === 0 || creep.pos.y === 49) {
            // Визначаємо, куди штовхати кріпа (від краю до центру)
            let targetX = creep.pos.x === 0 ? 2 : (creep.pos.x === 49 ? 47 : creep.pos.x);
            let targetY = creep.pos.y === 0 ? 2 : (creep.pos.y === 49 ? 47 : creep.pos.y);
    
        creep.moveTo(new RoomPosition(targetX, targetY, creep.room.name), {
        visualizePathStyle: {stroke: '#00ff00', lineStyle: 'dashed'}
         });
         creep.say('➡️ Штовх!');
             return;
         // ВАЖЛИВО: зупиняємо інший код на цей тік
}
        // 1. ПЕРЕМИКАННЯ СТАНІВ
        if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 Додому');
        }
        if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
            creep.say('🏗 На об’єкт');
        }

        // 2. ЛОГІКА ДІЙ
        if(creep.memory.building) {
            // ПЕРЕВІРКА КІМНАТИ: якщо ми не в цільовій кімнаті — йдемо до неї
            if(creep.room.name != creep.memory.targetRoom) {
                const exitDir = creep.room.findExitTo(creep.memory.targetRoom);
                const exit = creep.pos.findClosestByPath(exitDir);
                creep.moveTo(exit, {visualizePathStyle: {stroke: '#ffffff'}});
            } else {
                // МИ НА МІСЦІ: шукаємо будови
                var target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
                if(target) {
                    if(creep.build(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                } 
            }
        } 
        else {
            /// ПОВЕРНЕННЯ ЗА ЕНЕРГІЄЮ
            if(creep.room.name !== creep.memory.targetRoom) {
                creep.moveTo(new RoomPosition(25, 25, creep.memory.targetRoom ), {
                    reusePath: 50, 
                    visualizePathStyle: {stroke: '#ffaa00'}
                });
            } else {
                // ШУКАЄМО ЕНЕРГІЮ ВДОМА
                // Спочатку підбираємо те, що впало (Dropped)
                let dropped = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES, {
                    filter: r => r.resourceType == RESOURCE_ENERGY && r.amount > 50
                });
                
                if(dropped) {
                    if(creep.pickup(dropped) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(dropped, {maxRooms: 1});
                    }
                } else {
                    // Потім беремо зі Storage/Container
                    let source = creep.room.storage || creep.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: (s) => (s.structureType == STRUCTURE_CONTAINER || s.structureType == STRUCTURE_STORAGE) && 
                                       s.store[RESOURCE_ENERGY] > 0
                    });

                    if(source) {
                        if(creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(source, {maxRooms: 1});
                        }
                    } else {
                        // Якщо зовсім порожньо - копаємо самі
                        let mine = creep.pos.findClosestByRange(FIND_SOURCES);
                        if(creep.harvest(mine) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(mine, {maxRooms: 1});
                        }
                    }
                }
            }
        }
    }
};

module.exports = roleRemoteBuilder;