var roleMiner = {
    run: function(creep) {
        // Отримуємо ID джерела
        var targetId = creep.memory.targetSourceId;
        
        if(!targetId) {
            creep.say('No ID');
            return;
        }

        var source = Game.getObjectById(targetId);

        if(source) {
            // --- КЕШУВАННЯ ТА ПОШУК ЛІНКА ---
            // Шукаємо лінк раз на 50 тіків, якщо його ще немає в пам'яті
            if (!creep.memory.linkId && Game.time % 50 === 0) {
                let foundLink = source.pos.findInRange(FIND_STRUCTURES, 2, {
                    filter: (s) => s.structureType == STRUCTURE_LINK
                })[0];
                if (foundLink) creep.memory.linkId = foundLink.id;
            }

            let link = null;
            if (creep.memory.linkId) {
                link = Game.getObjectById(creep.memory.linkId);
                // Якщо лінк було знищено, видаляємо його з пам'яті
                if (!link) delete creep.memory.linkId; 
            }

            // --- КЕШУВАННЯ ТА ПОШУК КОНТЕЙНЕРА ---
            // Шукаємо контейнер раз на 50 тіків, якщо його немає в пам'яті
            if (!creep.memory.containerId && Game.time % 50 === 0) {
                let foundContainer = source.pos.findInRange(FIND_STRUCTURES, 1, {
                    filter: (s) => s.structureType == STRUCTURE_CONTAINER
                })[0];
                if (foundContainer) creep.memory.containerId = foundContainer.id;
            }

            let container = null;
            if (creep.memory.containerId) {
                container = Game.getObjectById(creep.memory.containerId);
                // Якщо контейнер було знищено, видаляємо з пам'яті
                if (!container) delete creep.memory.containerId; 
            }

            // Визначаємо ідеальну позицію
            let targetPos = container ? container.pos : source.pos;
            let requiredRange = container ? 0 : 1;

            // Рух до позиції видобутку
            if (creep.pos.getRangeTo(targetPos) > requiredRange) {
                creep.say('🛵' + (link ? '🔗' : '⛏️'));
                creep.moveTo(targetPos, {visualizePathStyle: {stroke: '#ffffff'}, reusePath: 10});
            } else {
                // Ми на місці! Видобуваємо енергію
                creep.harvest(source);
                
                // Візуалізація (щоб не спамити кожен тік, можна вимкнути, якщо заважає)
                if(Game.time % 5 === 0) creep.say('⛏️');

                // Якщо є лінк і в кріпа є енергія
                if (link && creep.store[RESOURCE_ENERGY] > 0) {
                    if (link.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
                        creep.transfer(link, RESOURCE_ENERGY);
                    }
                }
            }
        } else {
            creep.say('Invalid ID');
        }
    }
};

module.exports = roleMiner;