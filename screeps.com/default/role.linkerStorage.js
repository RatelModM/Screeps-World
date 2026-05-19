var roleLinkerStorage = {
    run: function(creep) {
        let link = Game.getObjectById(creep.memory.linkId);
        let storage = creep.room.storage;

        //  Перевірка наявності об'єктів 
        if (!link) {
            creep.say('❓ No Link');
            return;
        }
        if (!storage) {
            creep.say('❓ No Stor');
            return;
        }

            // ПРИОРИТЕТ 1: В Линке есть энергия
       
        if (link.store[RESOURCE_ENERGY] > 0) {
            
            // Если у крипа есть свободное место — забираем из линка
            if (creep.store.getFreeCapacity() > 0) {
                if (creep.withdraw(link, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(link, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            } 
            // Если крип заполнился — скидываем в хранилище (Storage)
            else {
                if (creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storage, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        } 
        
        
        // ПРИОРИТЕТ 2: Линк ПУСТОЙ -> Апгрейдим
        
        else {
            
            // Если крип пустой — берем энергию из хранилища (Storage)
            if (creep.store.getUsedCapacity() == 0) {
                if (creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    // Идем к storage
                    creep.moveTo(storage, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            } 
            // Если энергия есть — идем качать controller
            else {
                if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    // Идем к controller
                    creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#00ff00'}});
                }
            }
        }
    }
};

module.exports = roleLinkerStorage;