var roleRemoteMiner = {
    run: function(creep) {
        // 1. Якщо ми не в цільовій кімнаті — йдемо туди (з високим reusePath)
        if (creep.room.name !== creep.memory.targetRoom) {
            let targetPos = new RoomPosition(25, 25, creep.memory.targetRoom);
            creep.moveTo(targetPos, { reusePath: 50 });
            return;
        } 
        
        // 2. Джерело в кімнаті
        let source = Game.getObjectById(creep.memory.sourceId);
        if (!source) return;

        // === ОПТИМІЗАЦІЯ: КЕШУВАННЯ ID В ПАМ'ЯТЬ (Шукаємо лише 1 раз за життя кріпа) ===
        if (creep.memory.containerId === undefined) {
            let container = source.pos.findInRange(FIND_STRUCTURES, 1, {
                filter: (s) => s.structureType === STRUCTURE_CONTAINER
            })[0];
            // Якщо знайшли — пишемо ID, якщо ні — пишемо null (щоб не шукати знову)
            creep.memory.containerId = container ? container.id : null;
        }

        if (creep.memory.linkId === undefined) {
            let link = source.pos.findInRange(FIND_STRUCTURES, 2, {
                filter: (s) => s.structureType === STRUCTURE_LINK
            })[0];
            creep.memory.linkId = link ? link.id : null;
        }

        // Отримуємо об'єкти з пам'яті напряму (0 CPU)
        let container = creep.memory.containerId ? Game.getObjectById(creep.memory.containerId) : null;
        let link = creep.memory.linkId ? Game.getObjectById(creep.memory.linkId) : null;

        // Перевірка: якщо контейнер знищили або його побудували пізніше — оновлюємо пам'ять раз на 100 тіків
        if (!container && Game.time % 100 === 0) {
            delete creep.memory.containerId;
        }

        // Визначаємо ціль
        let targetPos = container ? container.pos : source.pos;
        let requiredRange = container ? 0 : 1;

        // 3. РУХ ТА ДІЇ
        if (creep.pos.getRangeTo(targetPos) > requiredRange) {
            creep.moveTo(targetPos, { reusePath: 20 });
        } else {
            // Видобуток
            creep.harvest(source);

            // Скидання в лінк або ремонт контейнера
            if (creep.store.getFreeCapacity() === 0 && link && link.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
                creep.transfer(link, RESOURCE_ENERGY);
            } 
            else if (container && container.hits < container.hitsMax * 0.8 && creep.store[RESOURCE_ENERGY] > 0) {
                creep.repair(container);
            }
        }
    }
};

module.exports = roleRemoteMiner;