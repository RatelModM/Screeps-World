var roleLinkerStorage = {
    run: function(creep) {
        let link = Game.getObjectById(creep.memory.linkId);
        let storage = creep.room.storage;
        let terminal = creep.room.terminal;

        let factory = creep.room.find(FIND_MY_STRUCTURES, {
            filter: (s) => s.structureType == STRUCTURE_FACTORY
        })[0];

        if (!link || !storage) return;

        // Список усього, що фабрика виробляє і що треба відносити в термінал
        const PRODUCTS = [RESOURCE_BATTERY, RESOURCE_OXIDANT, RESOURCE_PURIFIER, RESOURCE_KEANIUM_BAR];

        // =========================================================================
        // ВАРІАНТ А: КІМНАТА БЕЗ ФАБРИКИ
        // =========================================================================
        if (!factory) {
            if (creep.store[RESOURCE_ENERGY] > 0) {
                if (creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) creep.moveTo(storage, {visualizePathStyle: {stroke: '#ffffff'}});
            } 
            else if (creep.store.getFreeCapacity() > 0 && link.store[RESOURCE_ENERGY] > 0) {
                if (creep.withdraw(link, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) creep.moveTo(link, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
            return;
        }

        // =========================================================================
        // ВАРІАНТ Б: КІМНАТА З ФАБРИКОЮ
        // =========================================================================
        
        // 0. ПРІОРИТЕТ ПОНАД УСЕ: Очищення торби кріпа від будь-яких готових продуктів фабрики
        for (let product of PRODUCTS) {
            if (creep.store[product] > 0) {
                if (terminal && terminal.store.getFreeCapacity() > 0) {
                    if (creep.transfer(terminal, product) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(terminal, {visualizePathStyle: {stroke: '#00ffff'}});
                    }
                }
                return;
            }
        }

        // 1. ЛОГІКА СКИНУ ЕНЕРГІЇ (Кріп повний енергії)
        if (creep.store[RESOURCE_ENERGY] > 0 && (link.store[RESOURCE_ENERGY] === 0 || creep.store.getFreeCapacity() === 0)) {
            if (storage.store[RESOURCE_ENERGY] > 500000 && factory.store[RESOURCE_ENERGY] < 20000) {
                if (creep.transfer(factory, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) creep.moveTo(factory, {visualizePathStyle: {stroke: '#00ff00'}});
            } else {
                if (creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) creep.moveTo(storage, {visualizePathStyle: {stroke: '#ffffff'}});
            }
            return;
        } 
        
        // 2. ЛОГІКА НАБОРУ РЕСУРСІВ (Кріп пустий і шукає роботу)
        if (creep.store.getFreeCapacity() > 0) {
            // Крок 1: Очищаємо лінк
            if (link.store[RESOURCE_ENERGY] > 0) {
                if (creep.withdraw(link, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) creep.moveTo(link, {visualizePathStyle: {stroke: '#ffaa00'}});
                return;
            }
            
            // Крок 2: Перевіряємо фабрику на наявність ГОТОВИХ продуктів для евакуації в Термінал
            for (let product of PRODUCTS) {
                if (factory.store[product] > 0 && terminal && terminal.store.getFreeCapacity() > 0) {
                    if (creep.withdraw(factory, product) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(factory, {visualizePathStyle: {stroke: '#00ffff'}});
                    }
                    return;
                }
            }

            // Крок 3: Якщо іншої роботи немає — заправляємо фабрику енергією зі сховища
            if (storage.store[RESOURCE_ENERGY] > 500000 && factory.store[RESOURCE_ENERGY] < 25000) {
                if (creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) creep.moveTo(storage, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
};

module.exports = roleLinkerStorage;