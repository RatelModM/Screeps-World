var roleHauler = {
    run: function(creep) {
        // 1. ПЕРЕМИКАННЯ СТАНІВ (і скидання кешу цілі при зміні стану)
        if (creep.memory.delivering && creep.store.getUsedCapacity() == 0) {
            creep.memory.delivering = false;
            delete creep.memory.targetId;
        }
        if (!creep.memory.delivering && creep.store.getFreeCapacity() == 0) {
            creep.memory.delivering = true;
            delete creep.memory.targetId;
        }

        // =========================================================================
        // 2. ЛОГІКА ДОСТАВКИ (Має вантаж)
        // =========================================================================
        if (creep.memory.delivering) {
            var carriedResources = Object.keys(creep.store);
            var mineralType = carriedResources.find(r => r !== RESOURCE_ENERGY);
            var resourceToTransfer = mineralType || RESOURCE_ENERGY;

            // Отримуємо кешовану ціль
            var target = Game.getObjectById(creep.memory.targetId);

            // Перевіряємо, чи ціль все ще актуальна (чи є куди зливати)
            if (target && target.store.getFreeCapacity(resourceToTransfer) === 0) {
                target = null;
                delete creep.memory.targetId;
            }

            // ПОШУК НОВОЇ ЦІЛІ (виконується ТІЛЬКИ якщо немає кешованої)
            if (!target) {
                if (mineralType) {
                    // А. Мінерали -> Фабрика або Storage
                    var factory = creep.room.find(FIND_MY_STRUCTURES, {
                        filter: (s) => s.structureType == STRUCTURE_FACTORY && s.store.getFreeCapacity(mineralType) > 5000
                    })[0];

                    target = factory || creep.room.storage;
                } else {
                    // Б. Енергія -> Спавни / Екстеншени (FIND_MY_STRUCTURES значно швидший!)
                    target = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                        filter: (s) => (s.structureType == STRUCTURE_SPAWN || s.structureType == STRUCTURE_EXTENSION) &&
                                       s.store.getFreeCapacity(RESOURCE_ENERGY) > 0
                    });

                    // Тавери (< 50%)
                    if (!target) {
                        target = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                            filter: (s) => s.structureType == STRUCTURE_TOWER &&
                                           s.store[RESOURCE_ENERGY] < (s.store.getCapacity(RESOURCE_ENERGY) / 2)
                        });
                    }

                    // Storage
                    if (!target && creep.room.storage) {
                        target = creep.room.storage;
                    }
                }

                if (target) creep.memory.targetId = target.id;
            }

            // ДІЯ
            if (target) {
                if (creep.transfer(target, resourceToTransfer) == ERR_NOT_IN_RANGE) {
                    let strokeColor = '#ffffff';
                    if (target.structureType == STRUCTURE_FACTORY) strokeColor = '#00ffff';
                    if (target.structureType == STRUCTURE_STORAGE) strokeColor = '#00ff00';
                    if (target.structureType == STRUCTURE_TOWER) strokeColor = '#ffaa00';
                   
                    creep.moveTo(target, {reusePath: 50, visualizePathStyle: {stroke: strokeColor}});
                }
            }
        }
        // =========================================================================
        // 3. ЛОГІКА ЗАПРАВКИ (Порожній)
        // =========================================================================
        else {
            var targetSource = Game.getObjectById(creep.memory.targetId);
            var resourceToWithdraw = creep.memory.withdrawRes || RESOURCE_ENERGY;

            // Перевіряємо, чи в джерелі ще залишились ресурси
            if (targetSource && (targetSource.store[resourceToWithdraw] || 0) < 100) {
                targetSource = null;
                delete creep.memory.targetId;
                delete creep.memory.withdrawRes;
            }

            // ПОШУК НОВОГО ДЖЕРЕЛА (виконується ТІЛЬКИ якщо немає кешованого)
            if (!targetSource) {
                var needsEnergy = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                    filter: (s) => (s.structureType == STRUCTURE_SPAWN || s.structureType == STRUCTURE_EXTENSION) &&
                                   s.store.getFreeCapacity(RESOURCE_ENERGY) > 0
                });

                // КРОК 1: База голодна -> Storage / Terminal
                if (needsEnergy) {
                    var storage = creep.room.storage;
                    var terminal = creep.room.terminal;

                    let storageEnergy = storage ? storage.store[RESOURCE_ENERGY] : 0;
                    let terminalEnergy = terminal ? terminal.store[RESOURCE_ENERGY] : 0;

                    if (storageEnergy >= 376000) {
                        targetSource = storage;
                    } else if (terminalEnergy > 0) {
                        targetSource = terminal;
                    } else if (storageEnergy > 0) {
                        targetSource = storage;
                    }
                    resourceToWithdraw = RESOURCE_ENERGY;
                }

                // КРОК 2: База сита -> Контейнери
                if (!targetSource) {
                    // А. Контейнери з енергією (> 1000)
                    targetSource = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: (s) => s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 1000
                    });
                    resourceToWithdraw = RESOURCE_ENERGY;

                    // Б. Контейнери з мінералами (> 499)
                    if (!targetSource) {
                        var mineralContainer = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                            filter: (s) => s.structureType == STRUCTURE_CONTAINER &&
                                           Object.keys(s.store).some(r => r !== RESOURCE_ENERGY && s.store[r] > 499)
                        });

                        if (mineralContainer) {
                            targetSource = mineralContainer;
                            resourceToWithdraw = Object.keys(mineralContainer.store).find(r => r !== RESOURCE_ENERGY && mineralContainer.store[r] > 0);
                        }
                    }
                }

                if (targetSource) {
                    creep.memory.targetId = targetSource.id;
                    creep.memory.withdrawRes = resourceToWithdraw;
                }
            }

            // ДІЯ
            if (targetSource) {
                if (creep.withdraw(targetSource, resourceToWithdraw) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targetSource, {reusePath: 10, visualizePathStyle: {stroke: '#ffaa00'}});
                }
            } else if (creep.store.getUsedCapacity() > 0) {
                creep.memory.delivering = true;
                delete creep.memory.targetId;
            }
        }
    }
};

module.exports = roleHauler;