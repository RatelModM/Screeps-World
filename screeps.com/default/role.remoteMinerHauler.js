var roleRemoteMinerHauler = {
    /** @param {Creep} creep **/
    run: function(creep) {
        // Перемикання станів: копаємо (true) або веземо до лінка (false)
        if (creep.memory.harvesting && creep.store.getFreeCapacity() === 0) {
            creep.memory.harvesting = false;
            creep.say('⚡ лінк');
        }
        if (!creep.memory.harvesting && creep.store[RESOURCE_ENERGY] === 0) {
            creep.memory.harvesting = true;
            creep.say('🔄 руда');
        }

        if (creep.memory.harvesting) {
            // 1. ЕТАП ВИДОБУТКУ
            if (creep.room.name !== creep.memory.remoteRoom) {
                // Якщо ми не в тій кімнаті — йдемо туди
                const exitDir = creep.room.findExitTo(creep.memory.remoteRoom);
                const exit = creep.pos.findClosestByRange(exitDir);
                creep.moveTo(exit, { visualizePathStyle: { stroke: '#ffaa00' } });
            } else {
                // Ми на місці. Шукаємо джерело чітко за вказаним sourceId
                let source = Game.getObjectById(creep.memory.sourceId);
                if (source) {
                    if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
                    }
                }
            }
        } else {
            // 2. ЕТАП ДОСТАВКИ
            if (creep.room.name !== creep.memory.homeRoom) {
                // Повертаємось додому
                const exitDir = creep.room.findExitTo(creep.memory.homeRoom);
                const exit = creep.pos.findClosestByRange(exitDir);
                creep.moveTo(exit, { visualizePathStyle: { stroke: '#ffffff' } });
            } else {
                // Ми вдома. Шукаємо лінк чітко за вказаним linkId
                let targetLink = Game.getObjectById(creep.memory.linkId);
                if (targetLink) {
                    if (creep.transfer(targetLink, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(targetLink, { visualizePathStyle: { stroke: '#ffffff' } });
                    }
                }
            }
        }
    }
};

// КРИТИЧНО ВАЖЛИВО: цей рядок має бути в самому кінці файлу, поза всіма дужками!
module.exports = roleRemoteMinerHauler;