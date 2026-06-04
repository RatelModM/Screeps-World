var roleMineralMiner = {
    run: function(creep) {
        // 1. ШУКАЄМО МІНЕРАЛ У КІМНАТІ
        var mineral = creep.room.find(FIND_MINERALS)[0];
        if (!mineral) return;

        // 2. РУХ ДО ЦІЛІ (Тільки поки не дійшов)
        if (!creep.pos.isNearTo(mineral)) {
            creep.moveTo(mineral, {
                reusePath: 50, 
                visualizePathStyle: {stroke: '#ffaa00'}
            });
            return; // Поки йдемо, копати не можемо
        }

        // 3. КЕШУВАННЯ НАЙБЛИЖЧОГО СХОВИЩА (Виконується 1 раз за життя крипа)
        if (!creep.memory.targetId) {
            // Шукаємо контейнер або термінал, який стоїть впритул (радіус 1) або просто найближчий
            var closestTarget = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (s) => (s.structureType == STRUCTURE_CONTAINER || s.structureType == STRUCTURE_TERMINAL) && 
                               s.store.getFreeCapacity() > 0
            });
            
            if (closestTarget) {
                creep.memory.targetId = closestTarget.id;
            }
        }

        // 4. ЛОГІКА РОБОТИ (Кріп уже стоїть на місці)
        
        // Копаємо мінерал (екстрактор дає кулдаун 5 тіків, але викликати можна кожен тік)
        creep.harvest(mineral);

        // Якщо в торбі з'явився мінерал — скидаємо в кешовану структуру
        if (creep.store.getUsedCapacity() > 0) {
            var target = Game.getObjectById(creep.memory.targetId);
            
            if (target && target.store.getFreeCapacity() > 0) {
                // Визначаємо тип мінералу в інвентарі
                var mineralType = Object.keys(creep.store)[0];
                
                if (mineralType) {
                    // Оскільки ми стоїмо впритул, transfer спрацює миттєво
                    var transferResult = creep.transfer(target, mineralType);
                    
                    // Якщо структура раптом зникла або ми не дістаємо — скидаємо кеш
                    if (transferResult == ERR_NOT_IN_RANGE) {
                        creep.memory.targetId = null;
                    }
                }
            } else {
                // Якщо сховище заповнилося — скидаємо кеш, щоб знайти інше вільне поруч
                creep.memory.targetId = null;
                creep.say('🪹 Full!');
            }
        }
    }
};

module.exports = roleMineralMiner;