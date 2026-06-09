var roleHauler = {
    run: function(creep) {
        // 1. ПЕРЕМИКАННЯ СТАНІВ
        if (creep.memory.delivering && creep.store.getUsedCapacity() == 0) {
            creep.memory.delivering = false;
        }
        if (!creep.memory.delivering && creep.store.getFreeCapacity() == 0) {
            creep.memory.delivering = true;
        }

        // 2. ЛОГІКА ДОСТАВКИ (Має вантаж)
        if (creep.memory.delivering) {
            
            // Визначаємо, який саме мінерал несе кріп (все, що не енергія)
            var carriedResources = Object.keys(creep.store);
            var mineralType = carriedResources.find(r => r !== RESOURCE_ENERGY);
            var holdsMinerals = !!mineralType;

            var target = null;
            var resourceToTransfer = RESOURCE_ENERGY;
            
            // =========================================================================
            // ЯКЩО В ТОРБІ Є МІНЕРАЛИ -> ВЕЗЕМО НА ЗАВОД (ФАБРИКУ)
            // =========================================================================
            if (holdsMinerals) {
                resourceToTransfer = mineralType;
                
                var factory = creep.room.find(FIND_MY_STRUCTURES, {
                    filter: (s) => s.structureType == STRUCTURE_FACTORY && s.store.getFreeCapacity(mineralType) > 5000
                })[0];
                
                if (factory) {
                    target = factory;
                } 
                else if (creep.room.storage) {
                    target = creep.room.storage;
                }
            } 
            // =========================================================================
            // ЯКЩО В ТОРБІ ЧИСТА ЕНЕРГІЯ -> ГОДУЄМО БАЗУ
            // =========================================================================
            else {
                target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (s) => (s.structureType == STRUCTURE_SPAWN || s.structureType == STRUCTURE_EXTENSION) && 
                                   s.store.getFreeCapacity(RESOURCE_ENERGY) > 0
                });
                
                if (!target && creep.room.storage) {
                    target = creep.room.storage;
                }
            }

            if (target) {
                if (creep.transfer(target, resourceToTransfer) == ERR_NOT_IN_RANGE) {
                    let strokeColor = '#ffffff';
                    if (target.structureType == STRUCTURE_FACTORY) strokeColor = '#00ffff';
                    if (target.structureType == STRUCTURE_STORAGE) strokeColor = '#00ff00';
                    
                    creep.moveTo(target, {reusePath: 50, visualizePathStyle: {stroke: strokeColor}});
                }
            }
        } 
        
        // 3. ЛОГІКА ЗАПРАВКИ (Порожній)
        else {
            // ПРІОРИТЕТ 1: Шукаємо повні контейнери з енергією (> 700)
            var container = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (s) => s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 700
            });

            if (container) {
                if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(container, {reusePath: 20, visualizePathStyle: {stroke: '#ffaa00'}});
                }
            } 
            // ПРІОРИТЕТ 2: Шукаємо мінерали в контейнерах (> 900)
            else {
                var mineralContainer = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (s) => s.structureType == STRUCTURE_CONTAINER && 
                                   Object.keys(s.store).some(r => r !== RESOURCE_ENERGY && s.store[r] > 900)
                });

                if (mineralContainer) {
                    var mineralTypeToWithdraw = Object.keys(mineralContainer.store).find(r => r !== RESOURCE_ENERGY && mineralContainer.store[r] > 0);
                    
                    if (creep.withdraw(mineralContainer, mineralTypeToWithdraw) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(mineralContainer, {reusePath: 20, visualizePathStyle: {stroke: '#ffaa00'}});
                    }
                }
                // ПРІОРИТЕТ 3: Якщо контейнери порожні, а база голодна — беремо енергію зі Storage
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
                    // =========================================================================
                    // ПРІОРИТЕТ 4 (ОСТАННЯ ЧЕРГА): Підбираємо БУДЬ-ЯКІ ресурси з землі
                    // =========================================================================
                    else {
                        var droppedResource = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES, {
                            filter: (r) => r.amount > 0 // Будь-який ресурс (і енергія, і мінерали)
                        });

                        if (droppedResource) {
                            if (creep.pickup(droppedResource) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(droppedResource, {reusePath: 5, visualizePathStyle: {stroke: '#ff0000'}});
                            }
                        }
                        // ПРІОРИТЕТ 5: Якщо навіть на землі нічого немає — йдемо відпочивати
                        else {
                            creep.say('💤');
                            let parkFlag = creep.pos.findClosestByRange(FIND_FLAGS, {
                                filter: (flag) => flag.name.includes('Park')
                            });
                            
                            if (parkFlag) {
                                if (!creep.pos.inRangeTo(parkFlag, 3)) {
                                    creep.moveTo(parkFlag, {range: 3, visualizePathStyle: {stroke: '#888888'}});
                                }
                            } else {
                                if (creep.room.storage && creep.pos.getRangeTo(creep.room.storage) > 4) {
                                    creep.moveTo(creep.room.storage, {range: 4, visualizePathStyle: {stroke: '#888888'}});
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};

module.exports = roleHauler;