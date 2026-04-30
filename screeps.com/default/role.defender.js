var roleDefender = {
    /** @param {Creep} creep **/
    run: function(creep) {
        // 1. Запобіжник (про який ми говорили раніше)
        if (!creep.memory.targetRoom) return;

        // 2. Перехід у цільову кімнату
        if (creep.room.name !== creep.memory.targetRoom) {
            creep.moveTo(new RoomPosition(25, 25, creep.memory.targetRoom));
            return;
        }

        // 3. ПОШУК ЦІЛІ З ПРІОРИТЕТОМ
        // Шукаємо спочатку хілерів
        let target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
            filter: (hostile) => {
                return hostile.getActiveBodyparts(HEAL) > 0;
            }
        });

        // Якщо хілерів немає, шукаємо будь-якого іншого ворога
        if (!target) {
            target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        }

        // 4. АТАКА
        if (target) {
            creep.say('⚔️ ', true);
            if (creep.attack(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ff0000'}});
            }
        } else {
            // Якщо ворогів немає — йдемо в центр кімнати або на пост
            creep.moveTo(new RoomPosition(25, 25, creep.memory.targetRoom));
        }
    }
};

module.exports = roleDefender;