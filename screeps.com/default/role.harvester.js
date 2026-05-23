var roleHarvester = {
    /** @param {Creep} creep **/
    run: function(creep) {
        
        // --- 1. АНТИ-ЗАСТРЯГАТОР (Очищення кешу при переході через межу) ---
        if (creep.memory.lastRoom && creep.room.name !== creep.memory.lastRoom) {
            delete creep.memory._move; 
        }
        creep.memory.lastRoom = creep.room.name;

        // Якщо кріп застиг на самій лінії переходу, проштовхуємо його вглиб
        if (creep.pos.x === 0 || creep.pos.x === 49 || creep.pos.y === 0 || creep.pos.y === 49) {
            creep.moveTo(new RoomPosition(25, 25, creep.room.name));
            return; 
        }

        // --- 2. ПЕРЕВІРКА ЦІЛЬОВОЇ КІМНАТИ ---
        // Якщо кріп ще не дійшов до своєї робочої кімнати — він просто йде туди
        if (creep.memory.targetRoom && creep.room.name !== creep.memory.targetRoom) {
            let exitDir = creep.room.findExitTo(creep.memory.targetRoom);
            let exitTile = creep.pos.findClosestByPath(exitDir); // Обходить скелі та заблоковані стіни
            if (exitTile) {
                creep.moveTo(exitTile, {reusePath: 10, visualizePathStyle: {stroke: '#ffaa00'}});
            }
            return; // Зупиняємо виконання іншого коду, поки не дійдемо в кімнату
        }

        // --- 3. ПЕРЕМИКАННЯ СТАНІВ (Працює вже в цільовій кімнаті) ---
        if(!creep.memory.delivering && creep.store.getFreeCapacity() == 0) {
            creep.memory.delivering = true;
            creep.say('🚚 Несу');
        }
        if(creep.memory.delivering && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.delivering = false;
            creep.say('🔄 Збір');
        }

        // --- 4. ЛОГІКА ДОСТАВКИ ---
        if(creep.memory.delivering) {
            
            // --- МЕХАНІКА RELAY (Естафета) ---
            if (!creep.memory.lastRelay || Game.time > creep.memory.lastRelay + 6) {
                let receiver = creep.pos.findInRange(FIND_MY_CREEPS, 1, {
                    filter: (c) => c.memory.role == 'harvester' && !c.memory.delivering
                })[0];

                if (receiver) {
                    if (creep.transfer(receiver, RESOURCE_ENERGY) == OK) {
                        creep.memory.delivering = false;
                        receiver.memory.delivering = true;
                        creep.memory.lastRelay = Game.time;
                        receiver.memory.lastRelay = Game.time;
                        creep.say('🤝 Relay');
                        return; 
                    }
                }
            }

            // Шукаємо споруди в поточній кімнаті
            var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_SPAWN) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });

            if(target) {
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {
                        reusePath: 5, 
                        visualizePathStyle: {stroke: '#ffffff'}
                    });
                }
            } 
            else {
                // Якщо все повне — апгрейдимо контролер цієї ж кімнати
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller, {
                        reusePath: 10,
                        visualizePathStyle: {stroke: '#00ff00'}
                    });
                }
            }
        }
        // --- 5. ЛОГІКА ЗБОРУ ЕНЕРГІЇ ---
        else {
            // Пріоритет 1: Ресурси на підлозі
            let dropped = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES, {
                filter: (r) => r.resourceType == RESOURCE_ENERGY && r.amount > 50
            });

            if (dropped) {
                if (creep.pickup(dropped) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(dropped, {visualizePathStyle: {stroke: '#ffaa00'}, reusePath: 5});
                }
            } 
            else {
                // Пріоритет 2: Контейнери/Сховища
                let container = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (s) => (s.structureType == STRUCTURE_CONTAINER || s.structureType == STRUCTURE_STORAGE) &&
                                    s.store[RESOURCE_ENERGY] > 50
                });

                if (container) {
                    if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(container, {visualizePathStyle: {stroke: '#ffaa00'}, reusePath: 5});
                    }
                }
                // Пріоритет 3: Майнінг з джерела
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
};

module.exports = roleHarvester;