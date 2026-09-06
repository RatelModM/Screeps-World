var roleDefender = {
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
            creep.say('🛰️ В рейд');
            return;
        }

        // Перевірка бойових та робочих деталей
        let hasAttack = creep.getActiveBodyparts(ATTACK) > 0;
        let hasRanged = creep.getActiveBodyparts(RANGED_ATTACK) > 0;
        let hasHeal = creep.getActiveBodyparts(HEAL) > 0;
        let hasWork = creep.getActiveBodyparts(WORK) > 0;
        let hasCarry = creep.getActiveBodyparts(CARRY) > 0;

        // 2. ПОШУК ЦІЛІ (Пріоритет: Хілери -> Кріпи -> Споруди)
        let target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
            filter: (h) => h.getActiveBodyparts(HEAL) > 0
        });

        if (!target) {
            target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        }

        if (!target) {
            target = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES, {
                filter: (s) => s.structureType != STRUCTURE_CONTROLLER
            });
        }

        // 3. БОЙОВА ЛОГІКА
        if (target) {
            let rangeToTarget = creep.pos.getRangeTo(target);

            // --- ВІДСТУП (Якщо втрачена вся зброя) ---
            if (!hasAttack && !hasRanged) {
                this.healLogic(creep, hasHeal);

                let safeRampart = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                    filter: (s) => s.structureType == STRUCTURE_RAMPART
                });

                if (safeRampart && creep.pos.getRangeTo(safeRampart) > 0) {
                    creep.moveTo(safeRampart, {visualizePathStyle: {stroke: '#00ff00'}});
                } else if (rangeToTarget < 4) {
                    this.goToPost(creep);
                }
                return;
            }

            // --- ПРІОРИТЕТ: ЛІКУВАННЯ (при <50% HP) АБО АТАКА ---
            let didHeal = this.healLogic(creep, hasHeal);

            // Якщо лікування не потрібне — атакуємо
            if (!didHeal) {
                if (hasRanged && rangeToTarget <= 3) {
                    creep.rangedAttack(target);
                }
                if (hasAttack && rangeToTarget <= 1) {
                    creep.attack(target);
                }
            }

            // --- 4. ТАКТИКА МАНЕВРУВАННЯ ("БЕЙ-УХОДИ") ---
            if (hasRanged && !hasAttack) {
                if (rangeToTarget < 3) {
                    let fleePath = PathFinder.search(creep.pos, { pos: target.pos, range: 4 }, {
                        flee: true,
                        maxRooms: 1
                    }).path;

                    if (fleePath.length > 0) {
                        creep.moveTo(fleePath[0], {visualizePathStyle: {stroke: '#ff0000'}});
                    }
                    creep.say('🏹 Hit&Run', true);
                } 
                else if (rangeToTarget > 3) {
                    creep.moveTo(target, {range: 3, visualizePathStyle: {stroke: '#ffaa00'}});
                }
            } 
            else {
                if (rangeToTarget > 1) {
                    creep.moveTo(target, {range: 1, visualizePathStyle: {stroke: '#ff0000'}});
                }
            }
        } 

        // 5. МИРНИЙ ЧАС
        else {
            let didHeal = this.healLogic(creep, hasHeal);

            if (!didHeal) {
                if (hasCarry && hasWork) {
                    if (creep.store[RESOURCE_ENERGY] < 20) {
                        let droppedEnergy = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES, {
                            filter: (r) => r.resourceType == RESOURCE_ENERGY && r.amount > 50
                        });

                        if (droppedEnergy) {
                            creep.say('👇 Ground', true);
                            if (creep.pickup(droppedEnergy) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(droppedEnergy, {visualizePathStyle: {stroke: '#ffaa00'}});
                            }
                        } else {
                            let energyStructure = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                                filter: (s) => (s.structureType == STRUCTURE_CONTAINER || s.structureType == STRUCTURE_STORAGE) 
                                            && s.store[RESOURCE_ENERGY] > 50
                            });

                            if (energyStructure) {
                                creep.say('📦 Structure', true);
                                if (creep.withdraw(energyStructure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                    creep.moveTo(energyStructure, {visualizePathStyle: {stroke: '#ffaa00'}});
                                }
                            } else {
                                this.goToPost(creep);
                            }
                        }
                    } else {
                        let containerToRepair = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                            filter: (s) => s.structureType == STRUCTURE_CONTAINER && s.hits < s.hitsMax
                        });

                        if (containerToRepair) {
                            creep.say('🛠️ Con', true);
                            if (creep.repair(containerToRepair) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(containerToRepair, {visualizePathStyle: {stroke: '#00ffff'}});
                            }
                        } else {
                            let roadToRepair = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                                filter: (s) => s.structureType == STRUCTURE_ROAD && s.hits < s.hitsMax
                            });

                            if (roadToRepair) {
                                creep.say('🛠️ Road', true);
                                if (creep.repair(roadToRepair) == ERR_NOT_IN_RANGE) {
                                    creep.moveTo(roadToRepair, {visualizePathStyle: {stroke: '#00ffff'}});
                                }
                            } else {
                                let constructionSite = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
                                if (constructionSite) {
                                    creep.say('🚧 Build', true);
                                    if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
                                        creep.moveTo(constructionSite, {visualizePathStyle: {stroke: '#ffff00'}});
                                    }
                                } else {
                                    this.goToPost(creep);
                                }
                            }
                        }
                    }
                }
                else {
                    this.goToPost(creep);
                }
            }
        }
    },

    // ЛОГІКА ЛІКУВАННЯ (Тільки якщо HP < 50%)
    healLogic: function(creep, hasHeal) {
        if (!hasHeal) return false;

        // Пошук себе або союзника, у якого залишилось менше 50% HP
        let injuredAlly = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
            filter: (c) => c.hits < (c.hitsMax * 0.5)
        });

        if (injuredAlly) {
            let range = creep.pos.getRangeTo(injuredAlly);

            if (range <= 1) {
                creep.say(injuredAlly.id === creep.id ? '❤️ Heal' : '🩹 Heal Ally', true);
                creep.heal(injuredAlly);
                return true;
            } 
            else if (range <= 3) {
                creep.say('💉 R-Heal', true);
                creep.rangedHeal(injuredAlly);
                return true;
            }
            else if (!creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS)) {
                creep.moveTo(injuredAlly, {range: 1, visualizePathStyle: {stroke: '#00ff00'}});
            }
        }

        return false;
    },

    goToPost: function(creep) {
        if (creep.pos.x !== 25 || creep.pos.y !== 25) {
            creep.moveTo(new RoomPosition(25, 25, creep.memory.targetRoom), {range: 3});
        }
    }
};

module.exports = roleDefender;