var roleRemoteMiner = {
    run: function(creep) {
        // 1. Якщо ми не в цільовій кімнаті — йдемо туди
        if (creep.room.name !== creep.memory.targetRoom) {
            creep.moveTo(new RoomPosition(25, 25, creep.memory.targetRoom), {
                reusePath: 20, 
                visualizePathStyle: {stroke: '#ffaa00'}
            });
            return; // Перериваємо тік, поки не дійдемо
        } 
        
        // 2. Ми в цільовій кімнаті. Шукаємо джерело за ID
        let source = Game.getObjectById(creep.memory.sourceId);
        if (!source) return; // Захист на випадок, якщо об'єкт ще не провантажився

        // --- ЛОГІКА ПОШУКУ ЛІНКА ---
        let link = null;
        if (creep.memory.linkId) {
            link = Game.getObjectById(creep.memory.linkId);
        } else {
            // Якщо забули вказати linkId в спавнері, шукаємо лінк в радіусі 2 клітин від джерела
            link = source.pos.findInRange(FIND_STRUCTURES, 2, {
                filter: (s) => s.structureType == STRUCTURE_LINK
            })[0];
        }

        // Шукаємо контейнер (про всяк випадок, якщо він там теж стоїть)
        let container = source.pos.findInRange(FIND_STRUCTURES, 1, {
            filter: (s) => s.structureType == STRUCTURE_CONTAINER
        })[0];

        // Визначаємо ідеальну позицію для копання
        let targetPos = container ? container.pos : source.pos;
        let requiredRange = container ? 0 : 1; // На контейнер треба стати, до джерела — підійти впритул

        // 3. ЛОГІКА РУХУ ТА ДІЙ
        if (creep.pos.getRangeTo(targetPos) > requiredRange) {
            creep.say('🛵' + (link ? '🔗' : '⛏️'));
            creep.moveTo(targetPos, {visualizePathStyle: {stroke: '#ffffff'}, reusePath: 5});
        } else {
            // Ми на місці! Видобуваємо енергію кожен тік
            creep.harvest(source);
            creep.say('⛏️');

            // Одночасно перевіряємо: якщо є лінк і в кріпа є енергія в кишені
            if (link && creep.store[RESOURCE_ENERGY] > 0) {
                // Перевіряємо, чи в лінку є куди заливати енергію
                if (link.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
                    creep.transfer(link, RESOURCE_ENERGY);
                }
            }
        }
    }
};

module.exports = roleRemoteMiner;