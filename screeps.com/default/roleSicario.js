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

        // ==========================================
        // ПЕРЕКЛЮЧЕННЯ СТАНУ ВІДСТУПУ (HP < 50%)
        // ==========================================
        if (!creep.memory.fleeing && creep.hits < creep.hitsMax * 0.5) {
            creep.memory.fleeing = true;
            creep.say('🏃 ', true);
        }
        if (creep.memory.fleeing && creep.hits >= creep.hitsMax) {
            creep.memory.fleeing = false;
            creep.say('⚔️ ', true);
        }

        // Аналіз деталей тіла Sicario
        let hasAttack = creep.getActiveBodyparts(ATTACK) > 0;
        let hasRanged = creep.getActiveBodyparts(RANGED_ATTACK) > 0;
        let hasHeal = creep.getActiveBodyparts(HEAL) > 0;

        // ПРІОРИТЕТНИЙ ПОШУК ВОРОГІВ
        let hostiles = creep.room.find(FIND_HOSTILE_CREEPS);
        let hostile = null;

        if (hostiles.length > 0) {
            let healers = hostiles.filter(c => c.getActiveBodyparts(HEAL) > 0);
            if (healers.length > 0) {
                hostile = creep.pos.findClosestByRange(healers);
            } else {
                let attackers = hostiles.filter(c => c.getActiveBodyparts(ATTACK) > 0);
                if (attackers.length > 0) {
                    hostile = creep.pos.findClosestByRange(attackers);
                } else {
                    let rangedAttackers = hostiles.filter(c => c.getActiveBodyparts(RANGED_ATTACK) > 0);
                    if (rangedAttackers.length > 0) {
                        hostile = creep.pos.findClosestByRange(rangedAttackers);
                    } else {
                        hostile = creep.pos.findClosestByRange(hostiles);
                    }
                }
            }
        }

        if (!hostile) {
            hostile = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES, {
                filter: (s) => s.structureType != STRUCTURE_CONTROLLER
            });
        }

        // ПОШУК ШТУРМОВИКА ТА ПОРАНЕНИХ
        let mainAttacker = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
            filter: (c) => c.id !== creep.id && (c.getActiveBodyparts(ATTACK) > 0 || c.getActiveBodyparts(RANGED_ATTACK) > 0)
        });

        let injuredAlly = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
            filter: (c) => c.hits < c.hitsMax
        });

        // ==========================================
        // ЛОГІКА РЕЖИМУ ВІДСТУПУ (FLEE)
        // ==========================================
        if (creep.memory.fleeing) {
            // 1. Самолікування
            if (hasHeal) {
                creep.heal(creep);
            }

            // 2. Відстріл на ходу
            if (hasRanged && hostile && creep.pos.getRangeTo(hostile) <= 3) {
                creep.rangedAttack(hostile);
            }

            // 3. Рух геть від ворога або до рідної кімнати
            if (hostile && creep.pos.getRangeTo(hostile) <= 8) {
                let fleePath = PathFinder.search(creep.pos, { pos: hostile.pos, range: 8 }, { flee: true }).path;
                creep.moveByPath(fleePath);
            } 
            return; // Завершуємо тік, оскільки кріп у режимі втечі
        }

        // 1. ПЕРЕВІРКА КІМНАТИ (якщо не тікаємо)
        if (!creep.memory.targetRoom) return;

        if (creep.room.name !== creep.memory.targetRoom) {
            creep.moveTo(new RoomPosition(25, 25, creep.memory.targetRoom), {
                reusePath: 50,
                range: 5,
                visualizePathStyle: {stroke: '#ff00ff', lineStyle: 'dashed'}
            });
           
            return;
        }

        // ==========================================
        // ШТАТНІ ДІЇ (КОЛИ HP >= 50%)
        // ==========================================

        // А) ЛІКУВАННЯ СОЮЗНИКІВ
        if (hasHeal) {
            if (injuredAlly) {
                let rangeToInjured = creep.pos.getRangeTo(injuredAlly);
                if (rangeToInjured <= 1) {
                    creep.heal(injuredAlly);
                 
                } else if (rangeToInjured <= 3) {
                    creep.rangedHeal(injuredAlly);
               
                }
            } 
            else if (hostile && mainAttacker && creep.pos.getRangeTo(mainAttacker) <= 1) {
                creep.heal(mainAttacker);
       
            }
        }

        // Б) АТАКА
        if (hostile) {
            let rangeToHostile = creep.pos.getRangeTo(hostile);
            if (hasRanged && rangeToHostile <= 3) {
                creep.rangedAttack(hostile);
            }
            if (hasAttack && rangeToHostile <= 1) {
                creep.attack(hostile);
            }
        }

        // ==========================================
        // ЛОГІКА РУХУ
        // ==========================================

        if ((hasAttack || hasRanged) && hostile) {
            let desiredRange = hasAttack ? 1 : 3;
            creep.moveTo(hostile, {range: desiredRange, visualizePathStyle: {stroke: '#ff0000'}});
        }
        else if (injuredAlly) {
            if (creep.pos.getRangeTo(injuredAlly) > 1) {
                creep.moveTo(injuredAlly, {range: 1, visualizePathStyle: {stroke: '#00ff00'}});
            }
        }
        else if (mainAttacker) {
            if (creep.pos.getRangeTo(mainAttacker) > 1) {
                creep.moveTo(mainAttacker, {range: 1, visualizePathStyle: {stroke: '#00ff00'}});
            }
        }
        else if (creep.pos.x !== 25 || creep.pos.y !== 25) {
            creep.moveTo(new RoomPosition(25, 25, creep.memory.targetRoom), {range: 3});
        }
    }
};

module.exports = roleSicario;