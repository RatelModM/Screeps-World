var roleBuilder = {
    /** @param {Creep} creep **/
    run: function(creep) {
        // 1. ЖОРСТКА ПЕРЕВІРКА КІМНАТИ 
        const homeRoomName = creep.memory.targetRoom; 

        if (creep.room.name !== homeRoomName) {
            // Повернення додому
            creep.moveTo(new RoomPosition(20, 12, homeRoomName), {
                reusePath: 15, 
                visualizePathStyle: {stroke: '#ff0000'}
            });
            creep.say('🏠');
            return; 
        }
        
        // Анти-застрягатор на межі кімнати (штовхач)
        if (creep.pos.x === 0 || creep.pos.x === 49 || creep.pos.y === 0 || creep.pos.y === 49) {
            let stepX = creep.pos.x === 0 ? 1 : (creep.pos.x === 49 ? 48 : creep.pos.x);
            let stepY = creep.pos.y === 0 ? 1 : (creep.pos.y === 49 ? 48 : creep.pos.y);
            creep.moveTo(stepX, stepY, { maxRooms: 1 });
            return;
        }
        
        // Перемикання станів
        if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('До збору🧱');
        }
        if(!creep.memory.building && creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
            creep.memory.building = true;
            creep.say('я на 🏗');
        }

        // --- ЛОГІКА БУДІВНИЦТВА ---
        if(creep.memory.building) {
            var target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
            
            if(target) {
                if(creep.build(target) == ERR_NOT_IN_RANGE) {
                     creep.moveTo(target, { maxRooms: 1, reusePath: 5, visualizePathStyle: {stroke: '#ffffff'} });
                }
            } else {
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                     creep.moveTo(creep.room.controller, { maxRooms: 1, reusePath: 15 });
                }
            }
        }
        // --- ЛОГІКА ЗБОРУ ЕНЕРГІЇ ---
        else {
            // Пріоритет 1: Збір викинутої енергії (ідеально, бо вона зникає з часом)
            let dropped = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES, {
                filter: (r) => r.resourceType == RESOURCE_ENERGY && r.amount > 500
            });

            if (dropped) {
                if (creep.pickup(dropped) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(dropped, {visualizePathStyle: {stroke: '#ffaa00'}, reusePath: 5});
                }
            } 
            else {
                // Пріоритет 2: Збір зі СХОВИЩА (Storage) — тепер окремо і в першу чергу
                if (creep.room.storage && creep.room.storage.store[RESOURCE_ENERGY] > 0) {
                    if (creep.withdraw(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.storage, {visualizePathStyle: {stroke: '#ffaa00'}, reusePath: 10});
                    }
                }
                // Пріоритет 3: Збір з контейнерів (якщо Сховища немає або воно порожнє)
                else {
                    let container = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: (s) => s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 100
                    });

                    if (container) {
                        if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(container, {visualizePathStyle: {stroke: '#ffaa00'}, reusePath: 10});
                        }
                    }
                    // Пріоритет 4: Копання руками (останній шанс, якщо в базах пусто)
                    else if (creep.getActiveBodyparts(WORK) > 0) {
                        let source = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
                        if (source) {
                            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}, reusePath: 5});
                            }
                        }
                    }
                }
            }
        }
    }
};

module.exports = roleBuilder;