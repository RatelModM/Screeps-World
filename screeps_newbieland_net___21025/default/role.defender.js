var roleDefender = {
    /** @param {Creep} creep **/
    run: function(creep) {
        // 1. Перевірка кімнати
        if (!creep.memory.targetRoom) return;

        if (creep.room.name !== creep.memory.targetRoom) {
            creep.moveTo(new RoomPosition(25, 25, creep.memory.targetRoom), {range: 10});
            return;
        }

        // 2. ПОШУК ЦІЛІ (Пріоритети: Хілери -> Кріпи -> Ядро інвайдерів)
        let target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
            filter: (hostile) => hostile.getActiveBodyparts(HEAL) > 0
        });

        if (!target) {
            target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        }

        // ВИПРАВЛЕНО: Шукаємо Invader Core через FIND_STRUCTURES (так надійніше)
        if (!target) {
            target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (s) => s.structureType == STRUCTURE_INVADER_CORE
            });
        }

        // 3. БОЙОВА ЛОГІКА
        if (target) {
            // Атакуємо всім, чим можемо (код сам вибере доступну атаку)
            creep.rangedAttack(target);
            creep.attack(target);

            // 4. РОЗУМНЕ ПОЗИЦІОНУВАННЯ
            // Шукаємо рампарт у радіусі 3 клітин від цілі (якщо захищаємо базу)
            let rampart = target.pos.findInRange(FIND_MY_STRUCTURES, 3, {
                filter: (s) => s.structureType == STRUCTURE_RAMPART
            })[0];

            if (rampart) {
                creep.moveTo(rampart, {visualizePathStyle: {stroke: '#00ff00'}});
            } else {
                // КРИТИЧНЕ ВИПРАВЛЕННЯ: Визначаємо дистанцію безпеки.
                // Якщо це Invader Core (воно не рухається) АБО у нашого кріпа є мечі (ATTACK),
                // нам ОБОВ'ЯЗКОВО треба підійти впритул (range: 1).
                let desiredRange = 3; 
                if (target.structureType === STRUCTURE_INVADER_CORE || creep.getActiveBodyparts(ATTACK) > 0) {
                    desiredRange = 1;
                }

                // Рухаємося до цілі, якщо ми далі, ніж потрібно
                if (creep.pos.getRangeTo(target) > desiredRange) {
                    creep.moveTo(target, {range: desiredRange, visualizePathStyle: {stroke: '#ff0000'}});
                }
            }
            
            creep.say('⚔️', true);
        } else {
            // Повернення на пост, якщо ворогів немає
            if (creep.pos.x !== 25 || creep.pos.y !== 25) {
                creep.moveTo(new RoomPosition(25, 25, creep.memory.targetRoom), {range: 5});
            }
        }
    }
};

module.exports = roleDefender;