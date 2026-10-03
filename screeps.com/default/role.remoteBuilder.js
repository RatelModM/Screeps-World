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

       // - 3. ЛОГІКА ДІЙ (Має енергію) ---
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
                // 2. Якщо будувати нічого — заправляємо вежі (Tower)
                else {
                    var tower = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return structure.structureType == STRUCTURE_TOWER &&
                                   structure.store.getFreeCapacity(RESOURCE_ENERGY) > 200;
                        }
                    });

                    if(tower) {
                        if(creep.transfer(tower, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(tower, {visualizePathStyle: {stroke: '#ffaa00'}}); // Помаранчева лінія
                        }
                    }
                    // 3. Якщо немає будівництв і вежам енергія не потрібна — покращуємо контролер
                    else {
                        if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffff00'}}); // Жовта лінія
                        }
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
                    filter: r => r.resourceType == RESOURCE_ENERGY && r.amount > 100
                });
                
                if(dropped) {
                    if(creep.pickup(dropped) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(dropped, {maxRooms: 1});
                    }
                } // 2. Потім беремо зі Storage/Container
                let source = null;

                // Перевіряємо чи є Storage І чи є в ньому енергія
                if (creep.room.storage && creep.room.storage.store[RESOURCE_ENERGY] > 4000) {
                    source = creep.room.storage;
                } else {
                    // Якщо Storage порожній або його немає — шукаємо найближчий контейнер
                    source = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: (s) => s.structureType == STRUCTURE_CONTAINER && 
                                    s.store[RESOURCE_ENERGY] > 500 
                    });
                }

                if(source) {
                    if(creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(source, { reusePath: 10, maxRooms: 1 });
                    }
                }
                else {
                        let activeSource = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
                        if (activeSource) {
                            if (creep.harvest(activeSource) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(activeSource, { reusePath: 10, maxRooms: 1, visualizePathStyle: {stroke: '#ffaa00'} });
                            }
                        }
                    } 
            }    
        }
    }
};

module.exports = roleRemoteBuilder;