var roleRemoteHauler = {
    run: function(creep) {
        // 1. ПЕРЕМИКАННЯ СТАНІВ
        if (creep.memory.delivering && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.delivering = false;
            creep.say('🔄 Збір');
        }
        if (!creep.memory.delivering && creep.store.getFreeCapacity() == 0) {
            creep.memory.delivering = true;
            creep.say('🚚 Додому');
        }

        // 2. ЛОГІКА ДОСТАВКИ (ДОДОМУ)
        if (creep.memory.delivering) {
    // 1. ПЕРЕВІРКА КІМНАТИ
    if (creep.room.name !== creep.memory.homeRoom) {
        creep.moveTo(new RoomPosition(25, 25, creep.memory.homeRoom), {reusePath: 20});
        return; // Виходимо, поки не дійдемо додому
    }

    // 2. ВИБІР ЦІЛІ (Пріоритетність)
    let target = null;

    // Спроба знайти ціль за ID з пам'яті (якщо ти його там прописав)
    if (creep.memory.deliveryId) {
        let deliveryTarget = Game.getObjectById(creep.memory.deliveryId);
        if (deliveryTarget && deliveryTarget.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
            target = deliveryTarget;
        }
    }

    // Якщо за ID цілі немає, шукаємо Storage
    if (!target) {
        if (creep.room.storage && creep.room.storage.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
            target = creep.room.storage;
        }
    }

    // Якщо немає Storage, шукаємо Спавн або Екстеншени
    if (!target) {
        target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (s) => (s.structureType == STRUCTURE_SPAWN || s.structureType == STRUCTURE_EXTENSION) &&
                            s.store.getFreeCapacity(RESOURCE_ENERGY) > 0
        });
    }

    // 3. ВИКОНАННЯ ПЕРЕДАЧІ
    if (target) {
        if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target, {visualizePathStyle: {stroke: '#00ff00'}});
        }
    } else {
        creep.say('💤 Full'); // Всі склади забиті
    }
}
// 3. ЛОГІКА ЗБОРУ (В ЦІЛЬОВІЙ КІМНАТІ)
else {
    // КРОК 1: ПЕРЕВІРКА КІМНАТИ (Обов'язково!)
    if (creep.room.name !== creep.memory.targetRoom) {
        creep.moveTo(new RoomPosition(25, 25, creep.memory.targetRoom), {reusePath: 50});
        return; 
    }

    // КРОК 2: ПОШУК КАНДИДАТІВ З ПАМ'ЯТІ
    let containerIds = creep.memory.containerIds || [];
    let candidates = [];

    for (let id of containerIds) {
        let obj = Game.getObjectById(id);
        // Беремо тільки ті, що існують і мають енергію
        if (obj && obj.store.getUsedCapacity(RESOURCE_ENERGY) > 0) {
            candidates.push(obj);
        }
    }

    // КРОК 3: СКЛАДНЕ СОРТУВАННЯ (Енергія -> Відстань)
    if (candidates.length > 0) {
        candidates.sort((a, b) => {
            let energyA = a.store.getUsedCapacity(RESOURCE_ENERGY);
            let energyB = b.store.getUsedCapacity(RESOURCE_ENERGY);

            // 1. Пріоритет: де більше енергії
            if (energyB !== energyA) {
                return energyB - energyA; 
            }
            // 2. Пріоритет: хто ближче (якщо енергії однаково)
            return creep.pos.getRangeTo(a) - creep.pos.getRangeTo(b);
        });

        let target = candidates[0];

        // КРОК 4: ДІЯ
        if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
        }
    } 
    else {
        // Якщо контейнери порожні — шукаємо енергію на землі
        let dropped = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES, {
            filter: r => r.resourceType == RESOURCE_ENERGY && r.amount > 50
        });

        if (dropped) {
            if (creep.pickup(dropped) == ERR_NOT_IN_RANGE) {
                creep.moveTo(dropped, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        } else {
            creep.say('💤 Чекаю');
            // Відпочиваємо біля точки (25,25), щоб не заважати майнерам
            if (!creep.pos.isNearTo(25, 25)) {
                creep.moveTo(25, 25, {range: 3});
            }
        }
    }
}
    }
};

module.exports = roleRemoteHauler;