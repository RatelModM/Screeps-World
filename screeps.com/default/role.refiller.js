var roleRefiller = {
    /** @param {Creep} creep **/
    run: function(creep) {
        // --- 1. ПЕРЕМИКАННЯ СТАНІВ ---
        
        // Якщо розвозив і став ПОВНІСТЮ порожній — йде заправлятися
        if(!creep.memory.refilling && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.refilling = true;
            creep.say('🔄');
        }

        // Якщо заправлявся — перевіряємо, чи час йти працювати
        if(creep.memory.refilling) {
            var storage = creep.room.storage;
            var dropped = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
            
            // Умова: Рюкзак повний АБО (має хоч трохи енергії, а взяти більше ніде)
            if(creep.store.getFreeCapacity() == 0 || 
              (creep.store[RESOURCE_ENERGY] > 0 && !dropped && (!storage || storage.store[RESOURCE_ENERGY] == 0))) {
                
                creep.memory.refilling = false;
                creep.say('📦');
            }
        }

        // --- 2. ОСНОВНА ЛОГІКА ДІЙ ---

        if(creep.memory.refilling) {
            // ЗВІДКИ БЕРЕМО:
            var source = creep.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: (s) => {
            return (s.structureType == STRUCTURE_STORAGE || s.structureType == STRUCTURE_CONTAINER) &&
                   s.store.getUsedCapacity(RESOURCE_ENERGY) > 400;
        }
    });

    // 2. Якщо знайшли склад (контейнер чи сторедж) — їдемо до нього
       if(source) {
          if(creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
        }
    } 
    // 3. Якщо складів немає, шукаємо енергію, що просто лежить на землі
       else {
        var dropped = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
        if(dropped) {
            if(creep.pickup(dropped) == ERR_NOT_IN_RANGE) {
                creep.moveTo(dropped);
            }
        }
    }
}
        else {
            // КУДИ ВІДДАЄМО:
            
            // Пріоритет 1: Вежі (тільки свої)
            var tower = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                filter: (s) => s.structureType == STRUCTURE_TOWER && s.store.getFreeCapacity(RESOURCE_ENERGY) > 150
            });

            if(tower) {
                if(creep.transfer(tower, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(tower, {visualizePathStyle: {stroke: '#ff1111'}});
                }
            } 
            else {
                // Пріоритет 2: Спавн та Розширення (тільки свої)
                var target = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                    filter: (s) => (s.structureType == STRUCTURE_SPAWN || s.structureType == STRUCTURE_EXTENSION) &&
                                    s.store.getFreeCapacity(RESOURCE_ENERGY) > 0
                });
                
                if(target) {
                    if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                } else {
                    // ПАРКОВКА: якщо все заповнено, відходимо, щоб не блокувати дорогу
                    if(Game.spawns['Spawn1']) {
                        creep.moveTo(Game.spawns['Spawn1'].pos.x + 2, Game.spawns['Spawn1'].pos.y + 1);
                    }
                }
            }
        }
    }
};

module.exports = roleRefiller;
