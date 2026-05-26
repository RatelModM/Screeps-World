var roleMiner = {
    run: function(creep) {
        // Отримуємо ID джерела
        var targetId = creep.memory.targetSourceId;
        
        if(!targetId) {
            creep.say('No ID in Mem');
            return;
        }

        var source = Game.getObjectById(targetId);

        if(source) {
            // --- ЛОГІКА ПОШУКУ ЛІНКА ---
            let link = null;
            if (creep.memory.linkId) {
                link = Game.getObjectById(creep.memory.linkId);
            } else {
                // Якщо ID не вказано в пам'яті, шукаємо лінк в радіусі 2 клітин від джерела
                link = source.pos.findInRange(FIND_STRUCTURES, 2, {
                    filter: (s) => s.structureType == STRUCTURE_LINK
                })[0];
            }

            // Шукаємо контейнер
            var container = source.pos.findInRange(FIND_STRUCTURES, 1, {
                filter: (s) => s.structureType == STRUCTURE_CONTAINER
            })[0];

            // Визначаємо ідеальну позицію (на контейнер або впритул до джерела)
            let targetPos = container ? container.pos : source.pos;
            let requiredRange = container ? 0 : 1;

            // Рух до позиції видобутку
            if (creep.pos.getRangeTo(targetPos) > requiredRange) {
                creep.say('🛵' + (link ? '🔗' : '⛏️'));
                creep.moveTo(targetPos, {visualizePathStyle: {stroke: '#ffffff'}, reusePath: 5});
            } else {
                // Ми на місці! Видобуваємо енергію кожен тік
                creep.harvest(source);
                creep.say('⛏️');

                // Одночасно перевіряємо: якщо є лінк і в кріпа є енергія в кишені
                if (link && creep.store[RESOURCE_ENERGY] > 0) {
                    // Перевіряємо, чи є в лінку вільне місце
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