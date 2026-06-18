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

        if (!target) {
            target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (s) => s.structureType == STRUCTURE_INVADER_CORE
            });
        }

        // 3. БОЙОВА ЛОГІКА
        if (target) {
            // Атакуємо всім, чим можемо
            creep.rangedAttack(target);
            creep.attack(target);

            // 4. РОЗУМНЕ ПОЗИЦІОНУВАННЯ В БОЮ
            let rampart = target.pos.findInRange(FIND_MY_STRUCTURES, 3, {
                filter: (s) => s.structureType == STRUCTURE_RAMPART
            })[0];

            if (rampart) {
                creep.moveTo(rampart, {visualizePathStyle: {stroke: '#00ff00'}});
            } else {
                let desiredRange = 3; 
                if (target.structureType === STRUCTURE_INVADER_CORE || creep.getActiveBodyparts(ATTACK) > 0) {
                    desiredRange = 1;
                }

                if (creep.pos.getRangeTo(target) > desiredRange) {
                    creep.moveTo(target, {range: desiredRange, visualizePathStyle: {stroke: '#ff0000'}});
                }
            }
            
            creep.say('⚔️', true);
        } 
        // ==========================================
        // 5. МИРНИЙ ЧАС (ДОДАТКОВІ ФУНКЦІЇ)
        // ==========================================
        else {
            // Умова А: Якщо кріп поранений і має хілки — лікує себе
            if (creep.hits < creep.hitsMax && creep.getActiveBodyparts(HEAL) > 0) {
                creep.say('❤️', true);
                creep.heal(creep);
            }
            
           
           // Умова Б: Якщо в кишені немає енергії — шукаємо підніжну енергію, контейнер або сторедж
            else if (creep.store && creep.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
                
                // 1. Спочатку шукаємо енергію, що валяється на підлозі (Пріоритет №1, бо вона зникає)
                let droppedEnergy = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES, {
                    filter: (r) => r.resourceType == RESOURCE_ENERGY && r.amount > 50
                });

                if (droppedEnergy) {
                    creep.say('👇 Ground', true);
                    // Для підлоги використовуємо ПІКАП
                    if (creep.pickup(droppedEnergy) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(droppedEnergy, {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
                } 
                // 2. Якщо на підлозі порожньо, шукаємо найближчий Контейнер або Сторедж (Пріоритет №2)
                else {
                    let energyStructure = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: (s) => (s.structureType == STRUCTURE_CONTAINER || s.structureType == STRUCTURE_STORAGE) 
                                    && s.store[RESOURCE_ENERGY] > 50
                    });

                    if (energyStructure) {
                        creep.say('📦 Structure', true);
                        // Для споруд використовуємо ВІЗДРАВ
                        if (creep.withdraw(energyStructure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(energyStructure, {visualizePathStyle: {stroke: '#ffaa00'}});
                        }
                    } else {
                        // Якщо ніде в кімнаті немає доступної енергії — йдемо на пост
                        this.goToPost(creep);
                    }
                }
            }

            // Умова В: Якщо енергія є — БУДІВНИЦТВО ТА РЕМОНТ ДОРІГ
            else if (creep.store && creep.store[RESOURCE_ENERGY] > 0) {
                
                // 1. Спочатку шукаємо будівельні майданчики (Construction Sites)
                let constructionSite = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
                
                if (constructionSite) {
                    creep.say('🚧 Build', true);
                    if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(constructionSite, {visualizePathStyle: {stroke: '#ffff00'}});
                    }
                } 
                // 2. Якщо будувати нічого, шукаємо пошкоджені дороги (Roads)
                else {
                    let roadToRepair = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: (s) => s.structureType == STRUCTURE_ROAD && s.hits < s.hitsMax
                    });

                    if (roadToRepair) {
                        creep.say('🛠️ Road', true);
                        if (creep.repair(roadToRepair) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(roadToRepair, {visualizePathStyle: {stroke: '#00ffff'}});
                        }
                    } else {
                        // Якщо немає ні будівництва, ні зламаних доріг — відпочиваємо
                        this.goToPost(creep);
                    }
                }
            }

            // Умова Г: Бездіяльність
            else {
                this.goToPost(creep);
            }
        }
    },

    // Функція повернення на пост
    goToPost: function(creep) {
        if (creep.pos.x !== 25 || creep.pos.y !== 25) {
            creep.moveTo(new RoomPosition(25, 25, creep.memory.targetRoom), {range: 3});
        }
    }
};

module.exports = roleDefender;