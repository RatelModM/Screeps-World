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
    
    // 1. ПЕРШИЙ ПРІОРИТЕТ: Наповнюємо Сховище до ліміту target
    if (storage && storage.store[RESOURCE_ENERGY] < storageEnergyTarget) {
        if (creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(storage, {visualizePathStyle: {stroke: '#ffffff'}});
        }
    } 
    // 2. ДРУГИЙ ПРІОРИТЕТ: Якщо Сховище повне, годуємо Фабрику
    else if (factory && factory.store[RESOURCE_ENERGY] < factoryEnergyTarget) {
        if (creep.transfer(factory, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(factory, {visualizePathStyle: {stroke: '#00ff00'}});
        }
    } 
    // 3. РЕЗЕРВ: Якщо і Сховище, і Фабрика виконали свої плани — просто скидаємо в Сховище далі
    else {
        if (creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(storage, {visualizePathStyle: {stroke: '#ffffff'}});
        }
    }
}
                    // Б. Якщо несемо МІНЕРАЛИ або КОМПОНЕНТИ
                    else {
                        if (factory) {
                            let target = limits.get(STRUCTURE_FACTORY, resourceType).target;
                            if (factory.store[resourceType] < target) {
                                if (creep.transfer(factory, resourceType) == ERR_NOT_IN_RANGE) {
                                    creep.moveTo(factory, {visualizePathStyle: {stroke: '#00ff00'}});
                                }
                                return;
                            }
                        }
                        if (terminal && terminal.store.getFreeCapacity() > 0) {
                            if (creep.transfer(terminal, resourceType) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(terminal, {visualizePathStyle: {stroke: '#ff00ff'}});
                            }
                        } else {
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

        // ПРІОРИТЕТ 2: ЕВАКУАЦІЯ ГОТОВИХ ПРОДУКТІВ ТА НАДЛИШКІВ З ФАБРИКИ
        if (factory) {
            for (let resourceType in factory.store) {
                if (factory.store[resourceType] > 0) {
                    let maxAllowed = limits.get(STRUCTURE_FACTORY, resourceType).max;
                    
                    // Якщо ресурсу більше, ніж дозволено (наприклад, продуктів там > 0, а ліміт max: 0)
                    if (factory.store[resourceType] > maxAllowed) {
                        if (terminal && terminal.store.getFreeCapacity() > 0) {
                            if (creep.withdraw(factory, resourceType) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(factory, {visualizePathStyle: {stroke: '#00ffff'}});
                            }
                            return; // Завдання знайдено, йдемо забирати продукт
                        }
                    }
                }
            }
        }

        // ПРІОРИТЕТ 3: Наповнення фабрики компонентами за лімітами
        if (factory && limits.factory) {
            for (let resourceType in limits.factory) {
                let target = limits.get(STRUCTURE_FACTORY, resourceType).target;
                
                if (factory.store[resourceType] < target) {
                    
                    // Крок А: Шукаємо в ТЕРМІНАЛІ
                    if (terminal && terminal.store[resourceType] > 0) {
                        if (creep.withdraw(terminal, resourceType) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(terminal, {visualizePathStyle: {stroke: '#00ffff'}});
                        }
                        return; 
                    }
                    
                    // Крок Б: Шукаємо в СХОВИЩІ
                    if (storage.store[resourceType] > 375000) {
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