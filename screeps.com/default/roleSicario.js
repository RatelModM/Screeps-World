var roleSicario = {
    /** @param {Creep} creep **/
    run: function(creep) {
        // 0. СИЛОВИЙ ВИХІД З КОРДОНУ
        if (creep.pos.x <= 0 || creep.pos.x >= 49 || creep.pos.y <= 0 || creep.pos.y >= 49) {
            creep.moveTo(new RoomPosition(25, 25, creep.room.name), {
                reusePath: 10,
                visualizePathStyle: {stroke: '#ff00ff'}
            });
            return;
        }

        // ==========================================
        // ПЕРЕКЛЮЧЕННЯ СТАНУ ВІДСТУПУ (HP < 50%)
        // ==========================================
        if (!creep.memory.fleeing && creep.hits < creep.hitsMax * 0.5) {
            creep.memory.fleeing = true;
            creep.say('🏃 Flee', true);
        }
        if (creep.memory.fleeing && creep.hits >= creep.hitsMax) {
            creep.memory.fleeing = false;
            creep.say('⚔️ Ready', true);
        }

        let hasAttack = creep.getActiveBodyparts(ATTACK) > 0;
        let hasRanged = creep.getActiveBodyparts(RANGED_ATTACK) > 0;
        let hasHeal = creep.getActiveBodyparts(HEAL) > 0;

        // ==========================================
        // КЕШУВАННЯ ДАНИХ КІМНАТИ (Виконується 1 раз на тік для всієї кімнати)
        // ==========================================
        let room = creep.room;
        if (room._sicarioTick !== Game.time) {
            room._sicarioTick = Game.time;
            room._hostiles = room.find(FIND_HOSTILE_CREEPS);
            room._injuredAllies = room.find(FIND_MY_CREEPS, { filter: c => c.hits < c.hitsMax });
            room._mainAttackers = room.find(FIND_MY_CREEPS, {
                filter: c => c.getActiveBodyparts(ATTACK) > 0 || c.getActiveBodyparts(RANGED_ATTACK) > 0
            });
            room._hostileStructures = room.find(FIND_HOSTILE_STRUCTURES, {
                filter: s => s.structureType !== STRUCTURE_CONTROLLER
            });
        }

        // ==========================================
        // ОДНОПРОХІДНИЙ ПОШУК ЦІЛІ
        // ==========================================
        let hostile = null;

        if (room._hostiles.length > 0) {
            let inRangeHostiles = [];
            let healers = [];
            let attackers = [];
            let rangedAttackers = [];

            // Класифікуємо ворогів за один цикл замість 4x .filter()
            for (let i = 0; i < room._hostiles.length; i++) {
                let h = room._hostiles[i];
                if (creep.pos.getRangeTo(h) <= 3) inRangeHostiles.push(h);
                if (h.getActiveBodyparts(HEAL) > 0) healers.push(h);
                else if (h.getActiveBodyparts(ATTACK) > 0) attackers.push(h);
                else if (h.getActiveBodyparts(RANGED_ATTACK) > 0) rangedAttackers.push(h);
            }

            if (inRangeHostiles.length > 0) {
                hostile = inRangeHostiles.reduce((min, c) => c.body.length < min.body.length ? c : min, inRangeHostiles[0]);
            } else if (healers.length > 0) {
                hostile = creep.pos.findClosestByRange(healers);
            } else if (attackers.length > 0) {
                hostile = creep.pos.findClosestByRange(attackers);
            } else if (rangedAttackers.length > 0) {
                hostile = creep.pos.findClosestByRange(rangedAttackers);
            } else {
                hostile = creep.pos.findClosestByRange(room._hostiles);
            }
        }

        if (!hostile && room._hostileStructures.length > 0) {
            hostile = creep.pos.findClosestByRange(room._hostileStructures);
        }

        // ==========================================
        // РЕЖИМ ВІДСТУПУ (FLEE)
        // ==========================================
        if (creep.memory.fleeing) {
            if (hostile && creep.pos.getRangeTo(hostile) < 5) {
                let fleeResult = PathFinder.search(
                    creep.pos, 
                    { pos: hostile.pos, range: 6 }, 
                    { flee: true }
                );
                if (fleeResult.path.length > 0) {
                    creep.move(creep.pos.getDirectionTo(fleeResult.path[0]));
                }
            } else if (creep.memory.homeRoom && creep.room.name !== creep.memory.homeRoom) {
                creep.moveTo(new RoomPosition(25, 25, creep.memory.homeRoom), {
                    reusePath: 5,
                    visualizePathStyle: { stroke: '#00ffff' }
                });
            }

            if (hasRanged && hostile && creep.pos.getRangeTo(hostile) <= 3) {
                creep.rangedAttack(hostile);
            }
            if (hasHeal) {
                creep.heal(creep);
            }
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

        // Пошук союзників із локального кешу кімнати
        let injuredAlly = room._injuredAllies.length > 0 ? creep.pos.findClosestByRange(room._injuredAllies) : null;
        let mainAttacker = room._mainAttackers.length > 0 
            ? creep.pos.findClosestByRange(room._mainAttackers, { filter: c => c.id !== creep.id }) 
            : null;

        // ==========================================
        // ДІЇ (АТАКА ТА ЛІКУВАННЯ)
        // ==========================================

        // А) Пошук цілі для атаки (ворог або стіна за ID)
        let targetWall = creep.memory.targetWallId ? Game.getObjectById(creep.memory.targetWallId) : null;
        let attackTarget = hostile || targetWall;

        if (attackTarget) {
            let range = creep.pos.getRangeTo(attackTarget);
            if (hasRanged && range <= 3) creep.rangedAttack(attackTarget);
            if (hasAttack && range <= 1) creep.attack(attackTarget);
        }

        // Б) Лікування
        if (hasHeal) {
            if (injuredAlly) {
                let range = creep.pos.getRangeTo(injuredAlly);
                if (range <= 1) creep.heal(injuredAlly);
                else if (range <= 3) creep.rangedHeal(injuredAlly);
            } else if (attackTarget && mainAttacker && creep.pos.getRangeTo(mainAttacker) <= 1) {
                creep.heal(mainAttacker);
            } else if (creep.hits < creep.hitsMax) {
                creep.heal(creep);
            }
        }

        // ==========================================
        // ЕДИНА ЛОГІКА РУХУ (Викликається строго 1 раз за тік)
        // ==========================================

        // 1. Пріоритет: Наближення до пораненого
        if (hasHeal && injuredAlly && creep.pos.getRangeTo(injuredAlly) > 1) {
            creep.moveTo(injuredAlly, { range: 1, reusePath: 5, visualizePathStyle: { stroke: '#00ff00' } });
        } 
        // 2. Пріоритет: Зближення з ціллю атаки
        else if (attackTarget) {
            let desiredRange = hasAttack ? 1 : 3;
            if (creep.pos.getRangeTo(attackTarget) > desiredRange) {
                creep.moveTo(attackTarget, { range: desiredRange, reusePath: 5, visualizePathStyle: { stroke: '#ff0000' } });
            }
        } 
        // 3. Пріоритет: Супровід основного штурмовика
        else if (mainAttacker && creep.pos.getRangeTo(mainAttacker) > 1) {
            creep.moveTo(mainAttacker, { range: 1, reusePath: 5, visualizePathStyle: { stroke: '#00ff00' } });
        } 
        // 4. Пріоритет: Позиціонування за будь-яким прапором або в центрі кімнати
        else {
            let targetRoomName = creep.memory.targetRoom || creep.room.name;

            // Знаходимо першого-ліпшого прапора у цільовій кімнаті
            let targetFlag = _.find(Game.flags, f => f.pos.roomName === targetRoomName);

            if (targetFlag) {
                // Зближуємося з прапором на відстань 3
                if (!creep.pos.inRangeTo(targetFlag, 2)) {
                    creep.moveTo(targetFlag, {
                        range: 2, 
                        reusePath: 50,
                        visualizePathStyle: { stroke: '#ffffff', lineStyle: 'dotted' }
                    });
                }
            } else {
                if (creep.room.name !== targetRoomName) {
                    creep.moveTo(new RoomPosition(25, 25, targetRoomName), { range: 10, reusePath: 50 });
                } else if (creep.pos.x <= 1 || creep.pos.x >= 48 || creep.pos.y <= 1 || creep.pos.y >= 48) {
                    creep.moveTo(new RoomPosition(25, 25, targetRoomName), { range: 5, reusePath: 50 });
                }
            }
        }
    }
};

module.exports = roleSicario;