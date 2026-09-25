var roleRemoteMiner = {
    run: function(creep) {
        // =========================================================================
        // 0. ЗАХИСТ ВІД ЗАСТРЯГАННЯ (Anti-Stuck)
        // =========================================================================
        if (creep.memory._lastX === creep.pos.x && creep.memory._lastY === creep.pos.y) {
            creep.memory._stuckTicks = (creep.memory._stuckTicks || 0) + 1;
            if (creep.memory._stuckTicks >= 2) {
                // Видаляємо закешований шлях, щоб кріп проклав новий вхід/обхід
                delete creep.memory._move; 
                creep.memory._stuckTicks = 0;
            }
        } else {
            creep.memory._stuckTicks = 0;
            creep.memory._lastX = creep.pos.x;
            creep.memory._lastY = creep.pos.y;
        }

        // 1. Перехід між кімнатами
        if (creep.room.name !== creep.memory.targetRoom) {
            let targetPos = new RoomPosition(25, 25, creep.memory.targetRoom);
            // Зменшено reusePath до 15 для швидшої реакції при блокуванні на кордонах
            creep.moveTo(targetPos, { reusePath: 15, range: 20, ignoreCreeps: true });
            return; 
        }

        // 2. КЕШУВАННЯ ID (виконується 1 раз за життя)
        if (creep.memory.containerId === undefined || creep.memory.linkId === undefined) {
            let source = Game.getObjectById(creep.memory.sourceId);
            if (!source) return;

            let container = source.pos.findInRange(FIND_STRUCTURES, 1, {
                filter: (s) => s.structureType === STRUCTURE_CONTAINER
            })[0];
            creep.memory.containerId = container ? container.id : null;

            let link = source.pos.findInRange(FIND_MY_STRUCTURES, 2, {
                filter: (s) => s.structureType === STRUCTURE_LINK
            })[0];
            creep.memory.linkId = link ? link.id : null;
        }

        // Періодична перевірка контейнера
        if (creep.memory.containerId === null && Game.time % 100 === 0) {
            delete creep.memory.containerId;
        }

        // 3. Отримуємо об'єкти
        let source = Game.getObjectById(creep.memory.sourceId);
        if (!source) return;

        let container = creep.memory.containerId ? Game.getObjectById(creep.memory.containerId) : null;
        
        if (creep.memory.containerId && !container) {
            creep.memory.containerId = null;
        }

        // 4. Перевіряємо позицію
        let targetPos = container ? container.pos : source.pos;
        let isAtTarget = container 
            ? creep.pos.isEqualTo(container.pos) 
            : creep.pos.isNearTo(source.pos);

        if (!isAtTarget) {
            // Усередині цільової кімнати ignoreCreeps прибрано, а reusePath зменшено до 5
            creep.moveTo(targetPos, { reusePath: 5, range: container ? 0 : 1 });
            return;
        }

        // =========================================================
        // 5. ОСНОВНА РОБОТА (НА МІСЦІ)
        // =========================================================

        // А. Ремонт контейнера
        if (container && container.hits < container.hitsMax * 0.8 && creep.store[RESOURCE_ENERGY] > 0) {
            creep.repair(container);
            return; 
        }

        // Б. Передача в лінк
        if (creep.memory.linkId && creep.store.getFreeCapacity() === 0) {
            let link = Game.getObjectById(creep.memory.linkId);
            if (link && link.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
                creep.transfer(link, RESOURCE_ENERGY);
            }
        }

        // В. Видобуток
        creep.harvest(source);
    }
};

module.exports = roleRemoteMiner;