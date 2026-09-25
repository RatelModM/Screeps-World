// Конфігурація руху між кімнатами (закешована поза функцією = 0 CPU overhead)
const TRAVEL_OPTIONS = {
    reusePath: 50,         // Кешуємо шлях на 50 тіків між кімнатами
    plainCost: 2,
    swampCost: 10,
    range: 20,             // КРИТИЧНО: зупиняємось при вході в кімнату (не шукаємо exact 25,25)
    ignoreCreeps: true     // Ігноруємо інших кріпів під час далекої дороги
};

// Конфігурація руху всередині кімнати
const IN_ROOM_OPTIONS = {
    reusePath: 15,
    plainCost: 2,
    swampCost: 10
};

var roleRemoteMinerHauler = {
    /** @param {Creep} creep **/
    run: function(creep) {
        
        // 1. ПЕРЕМИКАННЯ СТАНІВ
        if (creep.memory.harvesting && creep.store.getFreeCapacity() === 0) {
            creep.memory.harvesting = false;
        }
        if (!creep.memory.harvesting && creep.store[RESOURCE_ENERGY] === 0) {
            creep.memory.harvesting = true;
        }

        // 2. ЗАХИСТ ВІД ЗАСТРЯГАННЯ НА МЕЖІ КІМНАТ (Anti-Bounce)
        if (creep.pos.x === 0 || creep.pos.x === 49 || creep.pos.y === 0 || creep.pos.y === 49) {
            creep.moveTo(new RoomPosition(25, 25, creep.room.name), { range: 20, reusePath: 10 });
            return; // Перериваємо execution для цього тіка
        }

        // 3. ЕТАП 1: ВИДОБУТОК (Рух до віддаленої кімнати / копання)
        if (creep.memory.harvesting) {
            if (creep.room.name !== creep.memory.remoteRoom) {
                // Долаємо шлях між кімнатами з range: 20 (не шукає стіни на 25,25)
                creep.moveTo(new RoomPosition(25, 25, creep.memory.remoteRoom), TRAVEL_OPTIONS);
                return; // Заощаджуємо CPU: не виконуємо внутрішньокімнатні перевірки
            }

            // Ми у віддаленій кімнаті
            let source = Game.getObjectById(creep.memory.sourceId);
            if (source) {
                if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(source, IN_ROOM_OPTIONS);
                }
            }
        } 
        
        // 4. ЕТАП 2: ДОСТАВКА (Рух до домашньої кімнати / розвантаження)
        else {
            if (creep.room.name !== creep.memory.homeRoom) {
                // Долаємо шлях додому
                creep.moveTo(new RoomPosition(25, 25, creep.memory.homeRoom), TRAVEL_OPTIONS);
                return; // Заощаджуємо CPU
            }

            // Ми вдома
            let targetLink = Game.getObjectById(creep.memory.linkId);
            if (targetLink) {
                if (creep.transfer(targetLink, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(targetLink, IN_ROOM_OPTIONS);
                }
            }
        }
    }
};

module.exports = roleRemoteMinerHauler;