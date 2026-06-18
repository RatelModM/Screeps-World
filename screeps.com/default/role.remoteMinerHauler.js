var roleRemoteMinerHauler = {
    /** @param {Creep} creep **/
    run: function(creep) {
        
        // ==========================================
        // НАЛАШТУВАННЯ РУХУ (Рух по дорогах + економія CPU)
        // ==========================================
        const moveOptions = {
            plainCost: 2,    // Звичайна земля тепер коштує 2 (дорога коштує 1)
            swampCost: 10,   // Болото коштує 10
            reusePath: 15,   // Кріп запам'ятовує шлях на 15 тіків, щоб не навантажувати CPU
            visualizePathStyle: { 
                stroke: creep.memory.harvesting ? '#ffaa00' : '#ffffff',
                lineStyle: 'dashed'
            }
        };

        // Перемикання станів: копаємо (true) або веземо до лінка (false)
        if (creep.memory.harvesting && creep.store.getFreeCapacity() === 0) {
            creep.memory.harvesting = false;
            creep.room.visual.circle(creep.pos, {fill: 'transparent', radius: 0.55, stroke: '#red'});
            creep.say('⚡ лінк');
        }
        if (!creep.memory.harvesting && creep.store[RESOURCE_ENERGY] === 0) {
            creep.memory.harvesting = true;
            creep.say('🔄 руда');
        }

        // ==========================================
        // КРИТИЧНЕ ВИПРАВЛЕННЯ ЗАСТРЯГАННЯ (Anti-Bounce)
        // ==========================================
        // Якщо кріп стоїть на СЕКТОРІ ПЕРЕХОДУ (самі краї карти: 0 або 49)
        if (creep.pos.x === 0 || creep.pos.x === 49 || creep.pos.y === 0 || creep.pos.y === 49) {
            // Змушуємо його негайно зробити крок УСЕРЕДИНУ тієї кімнати, де він зараз опинився
            creep.moveTo(new RoomPosition(25, 25, creep.room.name), moveOptions);
            return; // Перериваємо цей тік, чекаємо поки він зійде з лінії порталу
        }

        // ==========================================
        // ГОЛОВНА ЛОГІКА
        // ==========================================
        if (creep.memory.harvesting) {
            // 1. ЕТАП ВИДОБУТКУ
            if (creep.room.name !== creep.memory.remoteRoom) {
                // ВИПРАВЛЕНО: Замість пошуку виходу вручну, просто відправляємо moveTo 
                // на пусту точку (25,25) в чужій кімнаті. Вбудований двигун гри сам знайде дорогу.
                creep.moveTo(new RoomPosition(25, 25, creep.memory.remoteRoom), moveOptions);
            } else {
                // Ми на місці. Шукаємо джерело
                let source = Game.getObjectById(creep.memory.sourceId);
                if (source) {
                    if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(source, moveOptions);
                    }
                }
            }
        } else {
            // 2. ЕТАП ДОСТАВКИ
            if (creep.room.name !== creep.memory.homeRoom) {
                // Повертаємось додому так само через пряме вказання кімнати
                creep.moveTo(new RoomPosition(25, 25, creep.memory.homeRoom), moveOptions);
            } else {
                // Ми вдома. Шукаємо лінк
                let targetLink = Game.getObjectById(creep.memory.linkId);
                if (targetLink) {
                    if (creep.transfer(targetLink, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(targetLink, moveOptions);
                    }
                }
            }
        }
    }
};

module.exports = roleRemoteMinerHauler;