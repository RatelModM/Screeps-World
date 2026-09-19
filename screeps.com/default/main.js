// === 1. ІНІЦІАЛІЗАЦІЯ ПРОФАЙЛЕРА ===
const profiler = require('screeps-profiler');

// Увімкнення профайлера та експорт у глобальний контекст для консолі
profiler.enable();
global.profiler = profiler;

// === 2. ІМПОРТ МОДУЛІВ ===
var roleUpgrader = require('role.upgrader');
var roleHarvester = require('role.harvester');
var roleBuilder = require('role.builder');
var roleDefender = require('role.defender');
var roleMiner = require('role.miner');
var roleHauler = require('role.hauler');
var roleRemoteBuilder = require('role.remoteBuilder');
var roleReserver = require('role.reserver');
var roleSpawnHauler = require('role.spawnhauler');
var roleRemoteMiner = require('role.remoteMiner');
var roleRemoteMinerHauler = require('role.remoteMinerHauler');
var roleRemoteHauler = require('role.remoteHauler');
var roleLinkerStorage = require('role.linkerStorage');
var roleClaimer = require('role.claimer');
var roleMineralMiner = require('role.mineralMIner');
const roleSicario = require('roleSicario');

var industry = require('industry');
var marketManager = require('marketManager');

const manageSpawns = require('spawner');
const getAllCounts = require('counts');
const manageLinks = require('links');

// === 3. РЕЄСТРАЦІЯ МОДУЛІВ У ПРОФАЙЛЕРІ ===
profiler.registerObject(roleUpgrader, 'roleUpgrader');
profiler.registerObject(roleHarvester, 'roleHarvester');
profiler.registerObject(roleBuilder, 'roleBuilder');
profiler.registerObject(roleDefender, 'roleDefender');
profiler.registerObject(roleMiner, 'roleMiner');
profiler.registerObject(roleHauler, 'roleHauler');
profiler.registerObject(roleRemoteBuilder, 'roleRemoteBuilder');
profiler.registerObject(roleReserver, 'roleReserver');
profiler.registerObject(roleSpawnHauler, 'roleSpawnHauler');
profiler.registerObject(roleRemoteMiner, 'roleRemoteMiner');
profiler.registerObject(roleRemoteMinerHauler, 'roleRemoteMinerHauler');
profiler.registerObject(roleRemoteHauler, 'roleRemoteHauler');
profiler.registerObject(roleLinkerStorage, 'roleLinkerStorage');
profiler.registerObject(roleClaimer, 'roleClaimer');
profiler.registerObject(roleMineralMiner, 'roleMineralMiner');

profiler.registerObject(industry, 'industry');
profiler.registerObject(marketManager, 'marketManager');

profiler.registerFN(manageSpawns, 'manageSpawns');
profiler.registerFN(getAllCounts, 'getAllCounts');
profiler.registerFN(manageLinks, 'manageLinks');

// === 4. ОСНОВНИЙ ЦИКЛ ===
module.exports.loop = function () {
    profiler.wrap(function () {

        // Очищення пам'яті
        for (var name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Очищення пам\'яті неіснуючого кріпа:', name);
            }
        }

        // Отримання кількості кріпів та об'єктів
        const counts = getAllCounts();
        const {
            harvesters, harvesters2, harvesters3, harvesters4, harvesters5, harvesters6,
            upgraderS1, upgraderS2, upgraderS3, upgraderS4, upgraderS5, upgraderS6,
            builders, builders2, builders3, builders4,
            defenderS1_1, defenderS2_1, defenderS2_2, defenderS3_1, defenderS3_2, defenderS4_1, defenderS5_1,
            miner, minersOnSource,
            minerS2_1, minerS2_2, minerS3_1, minerS3_2, minerS5_1, minerS5_2, minerS6_1, minerS6_2,
            towers,
            haulerS1, haulerS2, haulerS3, haulerS4, haulerS5, haulerS6,
            remoteBuilderS1, remoteBuilderS2,
            reservers1_1, reservers2_1, reservers2_2, reservers3_1, reservers4_1, reservers5_1,
            SpawnHaulerS1, SpawnHaulerS2, SpawnHaulerS3, SpawnHaulerS4, SpawnHaulerS5, SpawnHaulerS6,
            remoteMiners1_1, remoteMiners1_2, remoteMiners2_1, remoteMiners2_2, remoteMiners2_3, remoteMiners2_4,
            remoteMiners3_1, remoteMiners3_2, remoteMiners4_3, remoteMiners4_4, remoteMiners4_1, remoteMiners4_2, remoteMiners5_1,
            remoteMinerHauler2_1, remoteMinerHauler3_1, remoteMinerHauler4_1, remoteMinerHauler4_2,
            MineralMiner_1, MineralMiner_2, MineralMiner_3, MineralMiner_4, MineralMiner_5, MineralMiner_6,
            remoteHaulers1_1, remoteHaulers2_1, remoteHaulers2_2, remoteHaulers3_1, remoteHaulers4_1, remoteHaulers5_1, remoteHaulers6_1,
            LinkerStorage1, LinkerStorage2, LinkerStorage3, LinkerStorage4, LinkerStorage5, LinkerStorage6,
            Claimer
        } = counts;

            // === ЛОГІКА ВЕЖ ===

        // 1. Перевіряємо ремонт лише кожні 5 тіків (економить ~80% CPU)
        const shouldRepair = (Game.time % 3 === 0);

        // 2. Групуємо вежі за кімнатами
        let towersByRoom = {};
        for (let tower of towers) {
            if (!towersByRoom[tower.room.name]) towersByRoom[tower.room.name] = [];
            towersByRoom[tower.room.name].push(tower);
        }

        // 3. Обробляємо кожну кімнату окремо (1 пошук на всю кімнату!)
        for (let roomName in towersByRoom) {
            let roomTowers = towersByRoom[roomName];
            let room = Game.rooms[roomName];
            if (!room) continue;

            // ПРІОРИТЕТ №1: Пошук ворогів (1 виклик find на кімнату)
            let hostiles = room.find(FIND_HOSTILE_CREEPS);
            let targetHostile = null;
            if (hostiles.length > 0) {
                // Фокусуємося на цілі з HEAL, якщо немає — беремо першого ворога
                targetHostile = hostiles.find(c => c.getActiveBodyparts(HEAL) > 0) || hostiles[0];
            }

            // ПРІОРИТЕТ №2: Пошук поранених (тільки якщо немає ворогів)
            let injuredCreep = null;
            if (!targetHostile) {
                injuredCreep = room.find(FIND_MY_CREEPS, { filter: c => c.hits < c.hitsMax })[0];
            }

            // ПРІОРИТЕТ №3: Пошук ремонтних цілей (тільки якщо треба ремонтувати і немає бою)
            let urgentRepair = null;
            let defensiveRepair = null;

            if (!targetHostile && !injuredCreep && shouldRepair) {
                // Шукаємо пошкоджені дороги/контейнери
                urgentRepair = room.find(FIND_STRUCTURES, {
                    filter: (s) => (s.structureType === STRUCTURE_ROAD || s.structureType === STRUCTURE_CONTAINER) &&
                                s.hits < s.hitsMax * 0.8
                })[0];

                // Якщо доріг немає — шукаємо стіни/рампарти
                if (!urgentRepair) {
                    defensiveRepair = room.find(FIND_STRUCTURES, {
                        filter: (s) => (s.structureType === STRUCTURE_WALL || s.structureType === STRUCTURE_RAMPART) &&
                                    s.hits < 350000
                    })[0];
                }
            }

            // 4. Виконуємо дії для всіх веж кімнати
            for (let tower of roomTowers) {
                if (targetHostile) {
                    tower.attack(targetHostile);
                } else if (injuredCreep) {
                    tower.heal(injuredCreep);
                } else if (shouldRepair && tower.store[RESOURCE_ENERGY] > 500) {
                    if (urgentRepair) {
                        tower.repair(urgentRepair);
                    } else if (defensiveRepair) {
                        tower.repair(defensiveRepair);
                    }
                }
            }
        }

        // Логіка ЛіНКів
        manageLinks();

        // Автоматичне створення
        manageSpawns(counts);

        // Industry
        for (let roomName in Game.rooms) {
            let room = Game.rooms[roomName];
            if (room.controller && room.controller.my) {
                industry.run(room);
            }
        }

        // marketManager
        if (Game.time % 10 === 0) {
            marketManager.run();
        }

        // Запуск логіки кріпів
        for (var name in Game.creeps) {
            var creep = Game.creeps[name];

            if (creep.memory.role == 'harvester') roleHarvester.run(creep);
            if (creep.memory.role == 'upgrader') roleUpgrader.run(creep);
            if (creep.memory.role == 'builder') roleBuilder.run(creep);
            if (creep.memory.role == 'defender') roleDefender.run(creep);
            if (creep.memory.role == 'miner') roleMiner.run(creep);
            if (creep.memory.role == 'hauler') roleHauler.run(creep);
            if (creep.memory.role == 'remoteBuilder') roleRemoteBuilder.run(creep);
            if (creep.memory.role == 'reserver') roleReserver.run(creep);
            if (creep.memory.role == 'spawnhauler') roleSpawnHauler.run(creep);
            if (creep.memory.role == 'remoteMiner') roleRemoteMiner.run(creep);
            if (creep.memory.role == 'remoteHauler') roleRemoteHauler.run(creep);
            if (creep.memory.role == 'linkerStorage') roleLinkerStorage.run(creep);
            if (creep.memory.role == 'claimer') roleClaimer.run(creep);
            if (creep.memory.role == 'mineralMIner') roleMineralMiner.run(creep);
            if (creep.memory.role == 'remoteMinerHauler') roleRemoteMinerHauler.run(creep);
            if (creep.memory.role == 'sicario') roleSicario.run(creep);
        }

        console.log(`🪣 Bucket: ${Game.cpu.bucket} / 10000 | CPU Used: ${Game.cpu.getUsed().toFixed(2)}`);
    });
    // Game.cpu.generatePixel()
};