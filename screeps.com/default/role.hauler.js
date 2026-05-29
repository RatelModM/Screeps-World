var roleHauler = {
    run: function(creep) {
        // 1. ПЕРЕМИКАННЯ СТАНІВ
        if (creep.memory.delivering && creep.store.getUsedCapacity() == 0) {
            creep.memory.delivering = false;
        }
        if (!creep.memory.delivering && creep.store.getFreeCapacity() == 0) {
            creep.memory.delivering = true;
        }

        // 2. ЛОГІКА ДОСТАВКИ (Має енергію)
        if (creep.memory.delivering) {
            
            // ПРІОРИТЕТ 1: Спавни ТА Розширення (Extensions)
            var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (s) => (s.structureType == STRUCTURE_SPAWN || s.structureType == STRUCTURE_EXTENSION) && 
                               s.store.getFreeCapacity(RESOURCE_ENERGY) > 0
            });

            if (target) {
                if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {reusePath: 50, visualizePathStyle: {stroke: '#ffffff'}});
                }
            } 
            // ПРІОРИТЕТ 2: Якщо база повна — скидаємо енергію в Storage
            else if (creep.room.storage) {
                if (creep.transfer(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.storage, {reusePath: 50});
                }
            }
        } 
        
        // 3. ЛОГІКА ЗАПРАВКИ (Порожній)
        else {
            // ОСНОВНА РОБОТА: Шукаємо повні контейнери (> 1200)
            var container = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (s) => s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 1200
            });

            if (container) {
                if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(container, {reusePath: 20, visualizePathStyle: {stroke: '#ffaa00'}});
                }
            } 
            // РЕЗЕРВНА РОБОТА: Якщо контейнери порожні ("немає роботи")
            else {
                var needsEnergy = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (s) => (s.structureType == STRUCTURE_SPAWN || s.structureType == STRUCTURE_EXTENSION) && 
                                   s.store.getFreeCapacity(RESOURCE_ENERGY) > 0
                });

                if (needsEnergy && creep.room.storage && creep.room.storage.store[RESOURCE_ENERGY] > 0) {
                    if (creep.withdraw(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.storage, {reusePath: 20, visualizePathStyle: {stroke: '#ffaa00'}});
                    }
                } 
                // === ЛОГІКА "ВІДХОДУ В СТОРОНУ" ===
                else {
                    creep.say('💤 Парк');
                    
                    // Шукаємо найближчий прапорець ТІЛЬКИ В СВОЇЙ КІМНАТІ, 
                    // в назві якого є слово 'Park'
                    let parkFlag = creep.pos.findClosestByRange(FIND_FLAGS, {
                        filter: (flag) => flag.name.includes('Park')
                    });
                    
                    if (parkFlag) {
                        // Йдемо до прапорця своєї кімнати
                        if (!creep.pos.inRangeTo(parkFlag, 3)) {
                            creep.moveTo(parkFlag, {
                                range: 3, 
                                visualizePathStyle: {stroke: '#888888'}
                            });
                        }
                    } else {
                        // Якщо прапорця саме в ЦІЙ кімнаті немає, збираємось біля Storage
                        if (creep.room.storage && creep.pos.getRangeTo(creep.room.storage) > 4) {
                            creep.moveTo(creep.room.storage, {range: 4, visualizePathStyle: {stroke: '#888888'}});
                        }
                    }
                }
            }
        }
    }
};

module.exports = roleHauler;