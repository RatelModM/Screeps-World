var roleHauler = {
    run: function(creep) {
        // 1. ПЕРЕМИКАННЯ СТАНІВ
        if (creep.memory.delivering && creep.store.getUsedCapacity() == 0) {
            creep.memory.delivering = false;
            creep.memory.lastRelay = Game.time; // Пам'ятаємо час останньої передачі
        }
        if (!creep.memory.delivering && creep.store.getFreeCapacity() == 0) {
            creep.memory.delivering = true;
        }

        // 2. ЛОГІКА ДОСТАВКИ (Має енергію)
        if (creep.memory.delivering) {
            
            // --- ПОВЕРНЕННЯ МЕХАНІКИ RELAY (З ЗАХИСТОМ ВІД ЗАМИКАННЯ) ---
            // Передаємо тільки якщо ми не робили цього щойно (пауза 4 тіки)
            if (!creep.memory.lastRelay || Game.time > creep.memory.lastRelay + 4) {
                let receiver = creep.pos.findInRange(FIND_MY_CREEPS, 1, {
                    filter: (c) => c.memory.role == 'hauler' && !c.memory.delivering
                })[0];

                if (receiver) {
                    if (creep.transfer(receiver, RESOURCE_ENERGY) == OK) {
                        creep.memory.delivering = false;
                        receiver.memory.delivering = true;
                        creep.memory.lastRelay = Game.time;
                        receiver.memory.lastRelay = Game.time;
                        creep.say('🤝');
                        // ВАЖЛИВО: не перериваємо код через return, 
                        // щоб кріп одразу почав рухатися до контейнера!
                    }
                }
            }

            // ШУКАЄМО ЦІЛЬ (Тільки Спавн або Storage)
            var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (s) => s.structureType == STRUCTURE_SPAWN && s.store.getFreeCapacity(RESOURCE_ENERGY) > 0
            });

            if (target) {
                if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {reusePath: 50, visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else if (creep.room.storage) {
                if (creep.transfer(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.storage, {reusePath: 50});
                }
            }
        } 
        
        // 3. ЛОГІКА ЗАПРАВКИ (Порожній)
        else {
            // Спочатку шукаємо контейнер з достатньою кількістю енергії
            var container = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (s) => s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 1050
            });

            if (container) {
                if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(container, {reusePath: 20, visualizePathStyle: {stroke: '#ffaa00'}});
                }
            } 
            // ДОДАНО: Логіка альтернативного добування енергії
            else {
                // Пріоритет 1: Збір викинутої енергії (Dropped Energy)
                var droppedEnergy = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES, {
                    filter: (r) => r.resourceType == RESOURCE_ENERGY && r.amount > 50
                });

                if (droppedEnergy) {
                    if (creep.pickup(droppedEnergy) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(droppedEnergy, {reusePath: 20, visualizePathStyle: {stroke: '#ffaa00'}});
                    }
                } 
                // Пріоритет 2: Видобуток з джерела (Harvest) - працює лише якщо є модуль WORK
                else {
                    var source = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
                    if (source) {
                        if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(source, {reusePath: 20, visualizePathStyle: {stroke: '#ffaa00'}});
                        }
                    }
                }
            }
        }
    }
};

module.exports = roleHauler;