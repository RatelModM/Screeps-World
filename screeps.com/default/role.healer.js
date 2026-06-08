var roleHealer = {
    /** @param {Creep} creep **/
    run: function(creep) {
        // 1. ПЕРЕВІРКА КІМНАТИ
        if (creep.memory.targetRoom && creep.room.name !== creep.memory.targetRoom) {
            creep.moveTo(new RoomPosition(25, 25, creep.memory.targetRoom), {reusePath: 50});
            return;
        }

        // 2. САМОЛІКУВАННЯ (Пріоритет №0)
        // Якщо хілер сильно поранений, він має лікувати себе першочергово
        if (creep.hits < creep.hitsMax) {
            creep.heal(creep);
        }

        // 3. ПОШУК ЦІЛІ ДЛЯ ЛІКУВАННЯ
        // Спочатку шукаємо поранених дефендерів
        let target = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
            filter: (c) => c.hits < c.hitsMax && c.memory.role == 'defender'
        });

        // Якщо дефендери здорові, шукаємо будь-якого іншого пораненого (робітників тощо)
        if (!target) {
            target = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
                filter: (c) => c.hits < c.hitsMax
            });
        }

        // 4. ВИКОНАННЯ ЛІКУВАННЯ
        if (target) {
            creep.say('💊');
            
            // Спроба лікувати впритул (Heal - потужніше за RangedHeal)
            let healResult = creep.heal(target);
            
            if (healResult == ERR_NOT_IN_RANGE) {
                // Якщо не в радіусі 1, використовуємо дистанційне лікування (радіус до 3)
                creep.rangedHeal(target);
                creep.moveTo(target, {
                    visualizePathStyle: {stroke: '#00ff00'},
                    maxRooms: 1 // Щоб не вибігав з кімнати за кріпом
                });
            }
        } 
        else {
            // 5. ПАТРУЛЮВАННЯ / СУПРОВІД
            // Якщо ніхто не поранений — тримаємося поруч із найближчим дефендером
            let defender = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
                filter: (c) => c.memory.role == 'defender'
            });

            if (defender) {
               
                if (!creep.pos.isNearTo(defender)) {
                    creep.moveTo(defender, {range: 1});
                }
            }
        }
    }
};

module.exports = roleHealer;