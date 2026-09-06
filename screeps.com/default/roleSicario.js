var roleSicario = {
    /** @param {Creep} creep **/
    run: function(creep) {
        // 0. СИЛОВИЙ ВИХІД З КОРДОНУ
        if (creep.pos.x <= 0 || creep.pos.x >= 49 || creep.pos.y <= 0 || creep.pos.y >= 49) {
            creep.moveTo(new RoomPosition(25, 25, creep.room.name), {
                visualizePathStyle: {stroke: '#ff00ff'}
            });
            return;
        }

        // 1. ПЕРЕВІРКА КІМНАТИ
        if (!creep.memory.targetRoom) return;

        if (creep.room.name !== creep.memory.targetRoom) {
            creep.moveTo(new RoomPosition(25, 25, creep.memory.targetRoom), {
                reusePath: 50,
                range: 5,
                visualizePathStyle: {stroke: '#ff00ff', lineStyle: 'dashed'}
            });
          
            return;
        }

        // Аналіз деталей тіла
        let hasAttack = creep.getActiveBodyparts(ATTACK) > 0;
        let hasRanged = creep.getActiveBodyparts(RANGED_ATTACK) > 0;
        let hasHeal = creep.getActiveBodyparts(HEAL) > 0;

        // 2. ПОШУК СОЮЗНОГО АТАКУЮЧОГО (Партнера)
        let mainAttacker = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
            filter: (c) => c.id !== creep.id && (c.getActiveBodyparts(ATTACK) > 0 || c.getActiveBodyparts(RANGED_ATTACK) > 0)
        });

        // 3. ПОШУК ПОРАНЕНИХ СОЮЗНИКІВ
        let injuredAlly = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
            filter: (c) => c.hits < c.hitsMax
        });

        // 4. ПОШУК ВОРОГІВ
        let hostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (!hostile) {
            hostile = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES, {
                filter: (s) => s.structureType != STRUCTURE_CONTROLLER
            });
        }

        // ==========================================
        // ПРІОРИТЕТ 1: ЛІКУВАННЯ
        // ==========================================
        if (hasHeal && injuredAlly) {
            let rangeToInjured = creep.pos.getRangeTo(injuredAlly);

            if (rangeToInjured <= 1) {
                creep.heal(injuredAlly);
                
            } else if (rangeToInjured <= 3) {
                creep.rangedHeal(injuredAlly);
              
            }

            creep.moveTo(injuredAlly, {range: 1, visualizePathStyle: {stroke: '#00ff00'}});

            if (hasRanged && hostile && creep.pos.getRangeTo(hostile) <= 3) {
                creep.rangedAttack(hostile);
            }
            return;
        }

        // ==========================================
        // ПРІОРИТЕТ 2: СУПРОВІД ШТУРМОВИКА
        // ==========================================
        if (hasHeal && mainAttacker && !hasAttack) {
            let rangeToAttacker = creep.pos.getRangeTo(mainAttacker);

            if (rangeToAttacker > 1) {
                creep.moveTo(mainAttacker, {range: 1, visualizePathStyle: {stroke: '#00ff00'}});
            }

            if (hostile && rangeToAttacker <= 1) {
                creep.heal(mainAttacker);
            }

           
            return;
        }

        // ==========================================
        // ПРІОРИТЕТ 3: АТАКА
        // ==========================================
        if (hostile) {
            let rangeToHostile = creep.pos.getRangeTo(hostile);

            if (hasRanged && rangeToHostile <= 3) {
                creep.rangedAttack(hostile);
            }
            if (hasAttack && rangeToHostile <= 1) {
                creep.attack(hostile);
            }

            let desiredRange = hasAttack ? 1 : 3;
            if (rangeToHostile > desiredRange) {
                creep.moveTo(hostile, {range: desiredRange, visualizePathStyle: {stroke: '#ff0000'}});
            }

           
        } 

        // ==========================================
        // ПРІОРИТЕТ 4: ПАТРУЛЮВАННЯ / ПОСТ
        // ==========================================
        else {
            if (mainAttacker) {
                creep.moveTo(mainAttacker, {range: 1, visualizePathStyle: {stroke: '#00ff00'}});
            } else if (creep.pos.x !== 25 || creep.pos.y !== 25) {
                creep.moveTo(new RoomPosition(25, 25, creep.memory.targetRoom), {range: 3});
            }
        }
    }
};

module.exports = roleSicario;