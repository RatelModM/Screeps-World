var roleRepairer = {
    /** @param {Creep} creep **/
    run: function(creep) {
        // Перемикання станів (ремонт / збір енергії)
        if(creep.memory.repairing && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.repairing = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.repairing && creep.store.getFreeCapacity() == 0) {
            creep.memory.repairing = true;
            creep.say('🛠 repair');
        }

        if(creep.memory.repairing) {
            // ШУКАЄМО ЦІЛІ ДЛЯ РЕМОНТУ
            // Пріоритет 1: Дороги та контейнери (те, що швидко руйнується)
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (s) => (s.structureType == STRUCTURE_ROAD || s.structureType == STRUCTURE_CONTAINER || s.structureType == STRUCTURE_STORAGE) && s.hits < s.hitsMax
            });

            // Пріоритет 2: Якщо все ціле, чинимо стіни та рампарти (але не до нескінченності)
            if(targets.length == 0) {
                targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (s) => (s.structureType == STRUCTURE_WALL || s.structureType == STRUCTURE_RAMPART) && s.hits < 20000 // Ліміт 50к, 
                });
            }

            if(targets.length > 0) {
                // Сортуємо за здоров'ям (чинимо найшвидше те, що майже зламалося)
                targets.sort((a,b) => a.hits - b.hits);

                if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ff8800'}});
                }
            } else {
                // Якщо чинити нічого — йдемо допомагати білдерам або апгрейдерам
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
            }
        }
        else {
            // ЗБІР ЕНЕРГІЇ: Найкраще брати зі Storage
            var storage = creep.room.storage;
            if(storage && storage.store[RESOURCE_ENERGY] > 0) {
                if(creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storage);
                }
            } else {
                // Якщо сховища немає, збираємо з джерела
                var source = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
                    if (source) {
                        if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(source, {reusePath: 20, visualizePathStyle: {stroke: '#ffaa00'}});
                        }
                    }
                    
            }
        }
    }
};

module.exports = roleRepairer;