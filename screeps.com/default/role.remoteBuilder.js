var roleRemoteBuilder = {
    run: function(creep) {
        // --- 1. СИЛОВИЙ ВИХІД З КОРДОНУ ---
        if (creep.pos.x === 0 || creep.pos.x === 49 || creep.pos.y === 0 || creep.pos.y === 49) {
            let targetX = creep.pos.x === 0 ? 2 : (creep.pos.x === 49 ? 47 : creep.pos.x);
            let targetY = creep.pos.y === 0 ? 2 : (creep.pos.y === 49 ? 47 : creep.pos.y);
    
            creep.moveTo(new RoomPosition(targetX, targetY, creep.room.name), {
                visualizePathStyle: {stroke: '#00ff00', lineStyle: 'dashed'}
            });
                       return; // Зупиняємо інший код на цей тік
        }

        // --- 2. ПЕРЕМИКАННЯ СТАНІВ ---
        if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
                  }
        if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
            }

        // --- 3. ЛОГІКА ДІЙ (Має енергію) ---
        if(creep.memory.building) {
            // Йдемо до цільової кімнати
            if(creep.room.name !== creep.memory.targetRoom) {
                const exitDir = creep.room.findExitTo(creep.memory.targetRoom);
                const exit = creep.pos.findClosestByPath(exitDir);
                // Захист: якщо шлях знайдено, йдемо до виходу. Інакше - просто по координатах
                if (exit) {
                    creep.moveTo(exit, {visualizePathStyle: {stroke: '#ffffff'}});
                } else {
                    creep.moveTo(new RoomPosition(25, 25, creep.memory.targetRoom));
                }
            } 
            // МИ В ЦІЛЬОВІЙ КІМНАТІ
            else {
                // 1. Спочатку шукаємо що будувати
                var target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
                if(target) {
                    if(creep.build(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                } 
                // 2. Якщо будувати нічого — покращуємо контролер
                else {
                    if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffff00'}}); // Жовта лінія для апгрейду
                    }
                }
            }
        } 
        
        // --- 4. ЛОГІКА ЗБОРУ (Немає енергії) ---
        else {
            if(creep.room.name !== creep.memory.targetRoom) {
                creep.moveTo(new RoomPosition(25, 25, creep.memory.targetRoom), {
                    reusePath: 50, 
                    visualizePathStyle: {stroke: '#ffaa00'}
                });
            } else {
                // ШУКАЄМО ЕНЕРГІЮ В ЦІЛЬОВІЙ КІМНАТІ
                
                // 1. Спочатку підбираємо те, що впало (Dropped)
                let dropped = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES, {
                    filter: r => r.resourceType == RESOURCE_ENERGY && r.amount > 1000
                });
                
                if(dropped) {
                    if(creep.pickup(dropped) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(dropped, {maxRooms: 1});
                    }
                } else {
                    // 2. Потім беремо зі Storage/Container
                    let source = creep.room.storage || creep.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: (s) => (s.structureType == STRUCTURE_CONTAINER || s.structureType == STRUCTURE_STORAGE) && 
                                       s.store[RESOURCE_ENERGY] > 0
                    });

                    if(source) {
                        if(creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(source, {maxRooms: 1});
                        }
                    } else {
                        // 3. Якщо зовсім порожньо - копаємо самі (FIND_SOURCES_ACTIVE краще, щоб не чекав порожнє джерело)
                        let mine = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
                        if(mine && creep.harvest(mine) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(mine, {maxRooms: 1});
                        }
                    }
                }
            }
        }
    }
};

module.exports = roleRemoteBuilder;