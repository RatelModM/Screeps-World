var roleHealer = {
    /** @param {Creep} creep **/
    run: function(creep) {
        // 1. ПЕРЕВІРКА КІМНАТИ
        if (creep.room.name !== creep.memory.targetRoom) {
            creep.moveTo(new RoomPosition(25, 25, creep.memory.targetRoom), {reusePath: 50});
            return;
        }

        // 2. ПОШУК ЦІЛІ ДЛЯ ЛІКУВАННЯ
        // Пріоритет 1: Поранені дефендери
        // Пріоритет 2: Будь-які свої поранені кріпи
        let target = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
            filter: (c) => c.hits < c.hitsMax
        });

        if (target) {
            creep.say('💊');
            // Намагаємося лікувати впритул
            if (creep.heal(target) == ERR_NOT_IN_RANGE) {
                // Якщо далеко — підходимо і використовуємо дистанційне лікування
                creep.moveTo(target, {visualizePathStyle: {stroke: '#00ff00'}});
                creep.rangedHeal(target);
            }
        } 
        else {
            // 3. ЯКЩО НІХТО НЕ ПОРАНЕНИЙ — СЛІДУЄМО ЗА ДЕФЕНДЕРОМ
            let defender = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
                filter: (c) => c.memory.role == 'defender'
            });

            if (defender) {
                creep.say('👣');
                if (!creep.pos.isNearTo(defender)) {
                    creep.moveTo(defender, {range: 1});
                }
            }
        }
        
        // Самолікування (якщо самого хілера атакують)
        if (creep.hits < creep.hitsMax) {
            creep.heal(creep);
        }
    }
};

module.exports = roleHealer;