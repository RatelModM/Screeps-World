var roleLinkerStorage = {
    run: function(creep) {
        let link = Game.getObjectById(creep.memory.linkId);
        let storage = creep.room.storage;

        // Перевірка наявності базових об'єктів 
        if (!link) {
            creep.say('❓ No Link');
            return;
        }
        if (!storage) {
            creep.say('❓ No Stor');
            return;
        }

        // ШУКАЄМО ВЕЖУ, якій потрібна енергія (залишилося місця більше ніж на 100 одиниць)
        let tower = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
            filter: (s) => s.structureType == STRUCTURE_TOWER && s.store.getFreeCapacity(RESOURCE_ENERGY) > 100
        });

        // 1. ЛОГІКА СКИНУ ЕНЕРГІЇ (Кріп має вантаж)
        if (creep.store[RESOURCE_ENERGY] > 0 && (link.store[RESOURCE_ENERGY] === 0 || creep.store.getFreeCapacity() === 0)) {
            
            // ПРІОРИТЕТ 1: Якщо вежа потребує зарядки — заправляємо її
            if (tower) {
                if (creep.transfer(tower, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(tower, {visualizePathStyle: {stroke: '#ff0000'}});
                }
            } 
            // ПРІОРИТЕТ 2: Якщо вежі повні — скидаємо в Storage
            else {
                if (creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storage, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        } 
        
        // 2. ЛОГІКА НАБОРУ ЕНЕРГІЇ (Кріп має вільне місце)
        else if (creep.store.getFreeCapacity() > 0) {
            
            // Якщо в лінку є енергія — беремо з лінка
            if (link.store[RESOURCE_ENERGY] > 0) {
                if (creep.withdraw(link, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(link, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
            // СМАРТ-ЛОГІКА: Якщо лінк порожній, але вежі потрібна енергія — беремо її зі Storage
            else if (tower && storage.store[RESOURCE_ENERGY] > 0) {
                if (creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storage, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
        }
    }
};

module.exports = roleLinkerStorage;