var roleUpgrader = require('role.upgrader');
var roleHarvester = require('role.harvester');
var roleBuilder = require('role.builder');
var roleDefender = require('role.defender');
var roleMiner = require('role.miner');
var roleHauler = require('role.hauler');
var roleRemoteBuilder = require('role.remoteBuilder');
var roleReserver = require('role.reserver')
var roleSpawnHauler = require('role.spawnhauler');
var roleRemoteMiner = require('role.remoteMiner');
var roleRemoteMinerHauler = require('role.remoteMinerHauler');
var roleRemoteHauler = require('role.remoteHauler');
var roleLinkerStorage = require('role.linkerStorage');
var roleClaimer = require('role.claimer');
var roleMineralMiner = require('role.mineralMIner');

var industry = require('industry')
var marketManager = require('marketManager')

const manageSpawns = require('spawner');
const getAllCounts = require('counts');
const manageLinks = require('links');

const profiler = require('screeps-profiler');
      profiler.enable();



module.exports.loop = function () {
    
    
    profiler.wrap(function () {


        // === БЛОК ПО СКЛАДАМ===
        //  if (Game.time % 5 === 0) {
        //         let tSUsed = 0, tSCap = 0, tTUsed = 0, tTCap = 0;
        //         let tTBatteries = 0, tTLemergium = 0, tTMinerals = 0; // Тепер рахуємо батареї замість енергії
        //         let report = ["📊 === СТАТИСТИКА СКЛАДІВ==="];

        //         for (let rName in Game.rooms) {
        //             let r = Game.rooms[rName];
        //             if (!r.controller || !r.controller.my) continue;

        //             let info = `  [${rName}]:`;
        //             let hasStructures = false;

        //             // Лічильники конкретних ресурсів на всю кімнату (Storage + Terminal)
        //             let roomLemergium = 0;
        //             let roomBatteries = 0;

        //             if (r.storage) {
        //                 let u = r.storage.store.getUsedCapacity(), c = r.storage.store.getCapacity();

        //                 let sEnergy = r.storage.store[RESOURCE_ENERGY] || 0;
        //                 let bInStorage = r.storage.store[RESOURCE_BATTERY] || 0;
        //                 let lInStorage = r.storage.store[RESOURCE_LEMERGIUM] || 0;

        //                 roomBatteries += bInStorage;
        //                 roomLemergium += lInStorage;

        //                 info += `📦 Storage: ⚡${sEnergy.toLocaleString()} (${u.toLocaleString()}/${c.toLocaleString()})`;
        //                 tSUsed += u; tSCap += c;
        //                 hasStructures = true;
        //             }
        //             if (r.terminal) {
        //                 let u = r.terminal.store.getUsedCapacity(), c = r.terminal.store.getCapacity();

        //                 let bInTerminal = r.terminal.store[RESOURCE_BATTERY] || 0; // Шукаємо батареї
        //                 let lInTerminal = r.terminal.store[RESOURCE_LEMERGIUM] || 0;

        //                 roomBatteries += bInTerminal;
        //                 roomLemergium += lInTerminal;

        //                 // Решта (чиста енергія, інші мінерали тощо)
        //                 let otherResources = u - bInTerminal - lInTerminal; 

        //                 info += ` | 🌌 Terminal: 🔋${bInTerminal.toLocaleString()} / 🟢L:${lInTerminal.toLocaleString()} / 💎${otherResources.toLocaleString()} (${u.toLocaleString()}/${c.toLocaleString()})`;

        //                 tTUsed += u; tTCap += c;
        //                 tTBatteries += bInTerminal;
        //                 tTLemergium += lInTerminal;
        //                 tTMinerals += otherResources;
        //                 hasStructures = true;
        //             }

        //             // Красивий підсумок цінних ресурсів кімнати в кінці рядка
        //             let extras = [];
        //             if (roomBatteries > 0) extras.push(`🔋B: ${roomBatteries.toLocaleString()}`);
        //             if (roomLemergium > 0) extras.push(`🟢L: ${roomLemergium.toLocaleString()}`);

        //             // if (extras.length > 0) {
        //             //     info += ` <font color='#00ffaa'>[${extras.join(" | ")}]</font>`;
        //             // }

        //             if (hasStructures) report.push(info);
        //         }

        //         report.push("-----------------------------------------");
        //         report.push(`  Всього в Storage:  ${tSUsed.toLocaleString()} / ${tSCap.toLocaleString()} забито`);
        //         report.push(`  Всього в Terminal: ${tTUsed.toLocaleString()} / ${tTCap.toLocaleString()} забито (🔋${tTBatteries.toLocaleString()} батарей, 🟢L:${tTLemergium.toLocaleString()}, 💎${tTMinerals.toLocaleString()} інших ресурсів)`);
        //         report.push("=========================================");

        //         console.log(report.join("\n"));
        //     }

        // Очищення пам'яті
        for (var name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Очищення пам\'яті неіснуючого кріпа:', name);
            }
        }

        //  Рахуємо наявні зміні
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
        } = getAllCounts();
       
        // логіка вежі
        for (let tower of towers) {
            // 1.1 Пріоритет №1: Атака ворогів
            var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if (closestHostile) {
                tower.attack(closestHostile);
            }
            // 1.2 Пріоритет №2: Ремонт (якщо немає ворогів)
            else {
                // Шукаємо критичні пошкодження: Дороги та Контейнери
                var urgentRepair = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (s) => {
                        return (s.structureType == STRUCTURE_ROAD || s.structureType == STRUCTURE_CONTAINER) &&
                            s.hits < s.hitsMax;
                    }
                });
                if (urgentRepair) { tower.repair(urgentRepair); }

                else {
                    // Якщо дороги цілі, займаємося стінами та рампартами
                    var defensiveRepair = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: (s) => {
                            return (s.structureType == STRUCTURE_WALL || s.structureType == STRUCTURE_RAMPART) &&
                                s.hits < 300000;
                        }
                    });
                    if (defensiveRepair) {
                        tower.repair(defensiveRepair);
                    }
                }
            }
        }
        // Логіка ЛіНКів
           manageLinks();

        // Автоматичне створення 
           manageSpawns(counts);
       
        //indastry
        for (let roomName in Game.rooms) {
            let room = Game.rooms[roomName];

            // Запускаємо виробництво тільки там, де кімната належить нам (активний контролер)
            if (room.controller && room.controller.my) {
                industry.run(room);
            }
        }
        // marketManager
        if (Game.time % 10 === 0) {
            marketManager.run();
        }
        //  Запуск логіки кріпів
        for (var name in Game.creeps) {
            var creep = Game.creeps[name];

            if (creep.memory.role == 'harvester') {
                roleHarvester.run(creep);
            }
            if (creep.memory.role == 'upgrader') {
                roleUpgrader.run(creep);
            }
            if (creep.memory.role == 'builder') {
                roleBuilder.run(creep);
            }
            if (creep.memory.role == 'defender') {
                roleDefender.run(creep);
            }

            if (creep.memory.role == 'miner') {
                roleMiner.run(creep);
            }
            if (creep.memory.role == 'hauler') {
                roleHauler.run(creep);
            }
            if (creep.memory.role == 'remoteBuilder') {
                roleRemoteBuilder.run(creep);
            }

            if (creep.memory.role == 'reserver') {
                roleReserver.run(creep);
            }
            if (creep.memory.role == 'spawnhauler') {
                roleSpawnHauler.run(creep);
            }
            if (creep.memory.role == 'remoteMiner') {
                roleRemoteMiner.run(creep);
            }
            if (creep.memory.role == 'remoteHauler') {
                roleRemoteHauler.run(creep);
            }

            if (creep.memory.role == 'linkerStorage') {
                roleLinkerStorage.run(creep);
            }

            if (creep.memory.role == 'claimer') {
                roleClaimer.run(creep);
            }
            if (creep.memory.role == 'mineralMIner') {
                roleMineralMiner.run(creep);
            }
            if (creep.memory.role == 'remoteMinerHauler') {
                roleRemoteMinerHauler.run(creep);
            }
        }

    });
    console.log(`🪣 Bucket: ${Game.cpu.bucket} / 10000 | CPU Used: ${Game.cpu.getUsed().toFixed(2)}`);
}