const limits = require('limits');

var roleLinkerStorage = {
    run: function(creep) {
        let link = Game.getObjectById(creep.memory.linkId);
        let storage = creep.room.storage;
        let terminal = creep.room.terminal;
        
        let factory = creep.room.find(FIND_MY_STRUCTURES, {
            filter: (s) => s.structureType == STRUCTURE_FACTORY
        })[0];

        if (!link || !storage) return;

        // =========================================================================
        // ЕТАП 1: КРІП ЩОСЬ НЕСЕ (Логіка розвантаження)
        // =========================================================================
        if (creep.store.getUsedCapacity() > 0) {
            for (let resourceType in creep.store) {
                if (creep.store[resourceType] > 0) {
                    
                    // А. Якщо несемо ЕНЕРГІЮ
                    if (resourceType === RESOURCE_ENERGY) {
                        let storageEnergyTarget = limits.get(STRUCTURE_STORAGE, RESOURCE_ENERGY).target;
                        let factoryEnergyTarget = limits.get(STRUCTURE_FACTORY, RESOURCE_ENERGY).target;
                        let storageEnergyMax = limits.get(STRUCTURE_STORAGE, RESOURCE_ENERGY).max;
                        let factoryEnergyMax = limits.get(STRUCTURE_FACTORY, RESOURCE_ENERGY).max;
                        
                        let terminalEnergyTarget = limits.get(STRUCTURE_TERMINAL, RESOURCE_ENERGY).target || limits.get(STRUCTURE_TERMINAL, RESOURCE_ENERGY).max;
                        let totalStorageEnergy = storage.store[RESOURCE_ENERGY] + creep.store[RESOURCE_ENERGY];

                        if (storage && totalStorageEnergy < storageEnergyTarget) {
                            if (creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(storage, {visualizePathStyle: {stroke: '#ffffff'}});
                            }
                        } 
                        else if (factory && factory.store[RESOURCE_ENERGY] < factoryEnergyTarget) {
                            if (creep.transfer(factory, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(factory, {visualizePathStyle: {stroke: '#00ff00'}});
                            }
                        } 
                        else if (terminal && terminal.store[RESOURCE_ENERGY] < terminalEnergyTarget) {
                            if (creep.transfer(terminal, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(terminal, {visualizePathStyle: {stroke: '#ffaa00'}});
                            }
                        } 
                        else if (storage && storage.store[RESOURCE_ENERGY] < storageEnergyMax) {
                            if (creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(storage, {visualizePathStyle: {stroke: '#ffffff'}});
                            }
                        } 
                        else if (factory && factory.store[RESOURCE_ENERGY] < factoryEnergyMax) {
                            if (creep.transfer(factory, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(factory, {visualizePathStyle: {stroke: '#ff00ff'}});
                            }
                        }
                    }
                    // Б. Якщо несемо МІНЕРАЛИ або СТИСНУТІ БАРИ
                    else {
                        let factoryTarget = limits.get(STRUCTURE_FACTORY, resourceType).target;
                        
                        // 1. Якщо фабриці ПОТРІБЕН цей ресурс і рівень нижчий за TARGET
                        if (factory && factoryTarget > 0 && factory.store[resourceType] < factoryTarget) {
                            if (creep.transfer(factory, resourceType) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(factory, {visualizePathStyle: {stroke: '#00ff00'}});
                            }
                            return;
                        }
                        
                        // 2. Наповнюємо Термінал до TARGET
                        let terminalTarget = limits.get(STRUCTURE_TERMINAL, resourceType).target;
                        let currentInTerminal = terminal ? (terminal.store[resourceType] || 0) : 0;

                        if (terminal && currentInTerminal < terminalTarget) {
                            if (creep.transfer(terminal, resourceType) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(terminal, {visualizePathStyle: {stroke: '#ff00ff'}});
                            }
                        } 
                        // 3. Усі надлишки скидаємо в Storage
                        else {
                            if (creep.transfer(storage, resourceType) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(storage, {visualizePathStyle: {stroke: '#ffffff'}});
                            }
                        }
                    }
                    return; 
                }
            }
        }

        // =========================================================================
        // ЕТАП 2: КРІП ПОРОЖНІЙ (Пошук роботи згідно з пріоритетами)
        // =========================================================================
        
        // ПРІОРИТЕТ 1: Збирати енергію з лінку
        if (link.store[RESOURCE_ENERGY] > 0) {
            if (creep.withdraw(link, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(link, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
            return; 
        }

        // ПРІОРИТЕТ 2: ЕВАКУАЦІЯ НАДЛИШКІВ / БАРІВ З ФАБРИКИ
        if (factory) {
            for (let resourceType in factory.store) {
                if (resourceType === RESOURCE_ENERGY) continue;
                
                let currentAmount = factory.store[resourceType];
                if (currentAmount > 0) {
                    let maxAllowed = limits.get(STRUCTURE_FACTORY, resourceType).max;
                    
                    if (currentAmount > maxAllowed) {
                        let amountToEvacuate = Math.min(creep.store.getFreeCapacity(), currentAmount - maxAllowed);
                        
                        if (amountToEvacuate > 0) {
                            if (creep.withdraw(factory, resourceType, amountToEvacuate) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(factory, {visualizePathStyle: {stroke: '#00ffff'}});
                            }
                            return;
                        }
                    }
                }
            }
        }

        // ПРІОРИТЕТ 3: ЕВАКУАЦІЯ З ТЕРМІНАЛА (Забираємо лише точний надлишок)
        if (terminal) {
            for (let resourceType in terminal.store) {
                if (resourceType === RESOURCE_ENERGY) continue;

                let currentAmount = terminal.store[resourceType];
                if (currentAmount > 0) {
                    let maxAllowed = limits.get(STRUCTURE_TERMINAL, resourceType).max;
                    
                    if (currentAmount > maxAllowed) {
                        let amountToEvacuate = Math.min(creep.store.getFreeCapacity(), currentAmount - maxAllowed);
                        
                        if (amountToEvacuate > 0) {
                            if (creep.withdraw(terminal, resourceType, amountToEvacuate) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(terminal, {visualizePathStyle: {stroke: '#ff0000'}});
                            }
                            return;
                        }
                    }
                }
            }
        }

        // ПРІОРИТЕТ 4: НАПОВНЕННЯ ТЕРМІНАЛА ЗІ СХОВИЩА (ЕНЕРГІЯ ТА МІНЕРАЛИ/СИРОВИНА)
        if (terminal) {
            // 4.1. Перевірка енергії для Термінала
            let terminalEnergyTarget = limits.get(STRUCTURE_TERMINAL, RESOURCE_ENERGY).target || limits.get(STRUCTURE_TERMINAL, RESOURCE_ENERGY).max;
            
            if (terminal.store[RESOURCE_ENERGY] < terminalEnergyTarget) {
                let storageEnergyTarget = limits.get(STRUCTURE_STORAGE, RESOURCE_ENERGY).target;
                
                if (storage.store[RESOURCE_ENERGY] > storageEnergyTarget) {
                    if (creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(storage, {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
                    return;
                }
            }

            // 4.2. Перевірка мінералів/ресурсів для Термінала згідно з limits.terminal
            if (limits.terminal) {
                for (let resourceType in limits.terminal) {
                    if (resourceType === RESOURCE_ENERGY) continue;

                    let target = limits.get(STRUCTURE_TERMINAL, resourceType).target;
                    let currentInTerminal = terminal.store[resourceType] || 0;

                    if (currentInTerminal < target) {
                        let availableInStorage = storage.store[resourceType] || 0;

                        if (availableInStorage > 0) {
                            let amountNeeded = target - currentInTerminal;
                            let amountToWithdraw = Math.min(creep.store.getFreeCapacity(), amountNeeded, availableInStorage);

                            if (amountToWithdraw > 0) {
                                if (creep.withdraw(storage, resourceType, amountToWithdraw) == ERR_NOT_IN_RANGE) {
                                    creep.moveTo(storage, {visualizePathStyle: {stroke: '#ff00ff'}});
                                }
                                return;
                            }
                        }
                    }
                }
            }
        }

        // ПРІОРИТЕТ 5: НАПОВНЕННЯ ФАБРИКИ СИРОВИНОЮ З ТЕРМІНАЛА / СХОВИЩА
        if (factory && limits.factory) {
            for (let resourceType in limits.factory) {
                let target = limits.get(STRUCTURE_FACTORY, resourceType).target;
                
                if (factory.store[resourceType] < target) {
                    
                    if (resourceType === RESOURCE_ENERGY) {
                        let storageEnergyTarget = limits.get(STRUCTURE_STORAGE, RESOURCE_ENERGY).target;
                        if (storage.store[RESOURCE_ENERGY] < storageEnergyTarget) continue; 
                    }

                    // Шукаємо в Терміналі
                    if (terminal && terminal.store[resourceType] > 0) {
                        if (creep.withdraw(terminal, resourceType) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(terminal, {visualizePathStyle: {stroke: '#00ffff'}});
                        }
                        return; 
                    }
                    
                    // Шукаємо в Сховищі
                    if (storage.store[resourceType] > 0) {
                        if (creep.withdraw(storage, resourceType) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(storage, {visualizePathStyle: {stroke: '#00ffff'}});
                        }
                        return; 
                    }
                }
            }
        }
    }
};

module.exports = roleLinkerStorage;