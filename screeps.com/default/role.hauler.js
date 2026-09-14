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
                // 1. Спочатку шукаємо найближчий спавн або екстеншн, який потребує енергії
            target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (s) => {
                    return (s.structureType == STRUCTURE_SPAWN || s.structureType == STRUCTURE_EXTENSION) &&
                        s.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });

            // 2. Якщо всі спавни та екстеншени повністю заправлені (target не знайдено)
            if (!target) {
                target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (s) => {
                        return s.structureType == STRUCTURE_TOWER &&
                            s.store[RESOURCE_ENERGY] < (s.store.getCapacity(RESOURCE_ENERGY) / 2);
                    }
                });
            }
        // Якщо все заправлено — веземо надлишки в Storage
        if (!target && creep.room.storage) {
            target = creep.room.storage;
        }
    }

    if (target) {
        if (creep.transfer(target, resourceToTransfer) == ERR_NOT_IN_RANGE) {
            let strokeColor = '#ffffff'; // Дефолтний білий для спавнів та екстеншенів
            if (target.structureType == STRUCTURE_FACTORY) strokeColor = '#00ffff';
            if (target.structureType == STRUCTURE_STORAGE) strokeColor = '#00ff00';
            if (target.structureType == STRUCTURE_TOWER) strokeColor = '#ffaa00'; // Помаранчевий трек до вежі
            
            creep.moveTo(target, {reusePath: 50, visualizePathStyle: {stroke: strokeColor}});
        }
    }
}
        // 3. ЛОГІКА ЗАПРАВКИ (Порожній)
        else {
            // ПРІОРИТЕТ 1: Шукаємо повні контейнери з енергією (> 700)
            var container = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (s) => s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 1999
            });

            if (container) {
                if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(container, {reusePath: 50, visualizePathStyle: {stroke: '#ffaa00'}});
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
                        creep.moveTo(mineralContainer, {reusePath: 50, visualizePathStyle: {stroke: '#ffaa00'}});
                    }
                }
                       
                // ПРІОРИТЕТ 3: Якщо контейнери порожні, а база голодна — беремо з Storage/Terminal
          
              else {
                    var needsEnergy = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: (s) => (s.structureType == STRUCTURE_SPAWN || s.structureType == STRUCTURE_EXTENSION) && 
                                    s.store.getFreeCapacity(RESOURCE_ENERGY) > 0
                    });

                    if (needsEnergy) {
                        var storage = creep.room.storage;
                        var terminal = creep.room.terminal;
                        var targetSource = null;

                        let storageEnergy = storage ? storage.store[RESOURCE_ENERGY] : 0;
                        let terminalEnergy = terminal ? terminal.store[RESOURCE_ENERGY] : 0;

                        // 1. Пріоритет: Якщо Storage наповнений (>= 374k) — беремо з Storage
                        if (storageEnergy >= 376000) {
                            targetSource = storage;
                        } 
                        // 2. Якщо Storage < 374k і в Terminal є ЕНЕРГІЯ — спустошуємо Terminal
                        else if (terminalEnergy > 0) {
                            targetSource = terminal;
                        } 
                        // 3. Фолбек: Якщо Terminal порожній — забираємо залишки зі Storage
                        else if (storageEnergy > 0) {
                            targetSource = storage;
                        }

                        // Забір енергії з обраного джерела
                        if (targetSource) {
                            if (creep.withdraw(targetSource, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(targetSource, {reusePath: 50, visualizePathStyle: {stroke: '#ffaa00'}});
                            }
                        }
                    }
                }
            }
        }
    }
};

module.exports = roleHauler;