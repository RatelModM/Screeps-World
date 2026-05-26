var roleUpgrader = require('role.upgrader');
var roleHarvester = require('role.harvester');
var roleBuilder = require('role.builder');
var roleDefender = require('role.defender');
var roleRefiller = require('role.refiller');
var roleRepairer = require('role.repairer');
var roleMiner = require ('role.miner');
var roleHauler = require('role.hauler');
var roleRemoteBuilder = require('role.remoteBuilder');
var roleRemoteRepairer = require('role.remoteRepairer');
var targetRoom = 'W28S28';
var targetRoom2 = 'W29S27';
var roleReserver = require('role.reserver')
var roleSpawnHauler = require('role.spawnhauler');
var roleRemoteMiner = require('role.remoteMiner');
var roleRemoteHauler = require('role.remoteHauler');
var roleLinkerSource = require('role.linkerSource');
var roleLinkerStorage = require('role.linkerStorage');
var roleHealer = require('role.healer');
var roleClaimer = require('role.claimer');

module.exports.loop = function () {
    // 1. Очищення пам'яті
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Очищення пам\'яті неіснуючого кріпа:', name);
        }
    }

    // 2. Рахуємо наявні зміні
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester'&& creep.memory.targetRoom == "W29S28");
    var harvesters2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester'&& creep.memory.targetRoom == "W29S28");
    var harvesters3 = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester'&& creep.memory.targetRoom == "W27S27");
    var harvesters4 = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester'&& creep.memory.targetRoom == "W29S27");
    var upgraderS1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader'&& creep.memory.targetRoom == "W29S28");
    var upgraderS2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader'&& creep.memory.targetRoom == "W27S29");
    var upgraderS3 = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader'&& creep.memory.targetRoom == "W27S27");
    var upgraderS4 = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader'&& creep.memory.targetRoom == "W29S27");
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder'&& creep.memory.targetRoom == "W29S28");
    var builders2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder'&& creep.memory.targetRoom == "W27S29");
    var builders3 = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder'&& creep.memory.targetRoom == "W27S27");
    var builders4 = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder'&& creep.memory.targetRoom == "W29S27");
    var defenderS1_1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'defender'&& creep.memory.targetRoom == "W28S28");
     var defenderS2_1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'defender'&& creep.memory.targetRoom == "W28S29");
    var defenderS2_2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'defender'&& creep.memory.targetRoom == "W26S29");
    var defenderS1_2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'defender'&& creep.memory.targetRoom == "W29S27");
    var defenderS3 = _.filter(Game.creeps, (creep) => creep.memory.role == 'defender'&& creep.memory.targetRoom == "W27S27");
    var defenderS3_1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'defender'&& creep.memory.targetRoom == "W27S28");
    var defenderS3_2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'defender'&& creep.memory.targetRoom == "W28S27");
    var healers = _.filter(Game.creeps, (creep) => creep.memory.role == 'healer'&& creep.memory.targetRoom =="W28S28");
    var healers2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'healer'&& creep.memory.targetRoom == "W29S27");
    var healerS2_1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'healer'&& creep.memory.targetRoom =="W28S29");
    var healerS2_2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'healer'&& creep.memory.targetRoom == "W26S29");
    var healerS3_1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'healer'&& creep.memory.targetRoom =="W27S28");
    var healerS3_2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'healer'&& creep.memory.targetRoom == "W28S27");
    var refillers = _.filter(Game.creeps, (creep) => creep.memory.role == 'refiller'&& creep.memory.targetRoom == "W29S28");
    var refillers2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'refiller'&& creep.memory.targetRoom == "W27S29");
    var refillers3 = _.filter(Game.creeps, (creep) => creep.memory.role == 'refiller'&& creep.memory.targetRoom == "W27S27");
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer'&& creep.memory.targetRoom == "W29S28");
    var repairers2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer'&& creep.memory.targetRoom == "W27S29");
    var repairers3 = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer'&& creep.memory.targetRoom == "W27S27");
    var miner = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');
    var minerS2_1 = _.filter(Game.creeps, (c) => c.memory.role == 'remoteMiner' && c.memory.sourceId == '55db3155efa8e3fe66e04958');
    var minerS2_2 = _.filter(Game.creeps, (c) => c.memory.role == 'remoteMiner' && c.memory.sourceId == '55db3155efa8e3fe66e04957');
    var minerS3_1 = _.filter(Game.creeps, (c) => c.memory.role == 'remoteMiner' && c.memory.sourceId == '55db3154efa8e3fe66e04950');
    var minerS3_2 = _.filter(Game.creeps, (c) => c.memory.role == 'remoteMiner' && c.memory.sourceId == '55db3154efa8e3fe66e04951');
    var towers = _.filter(Game.structures, s => s.structureType == STRUCTURE_TOWER);
    var haulerS1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler'&& creep.memory.targetRoom == "W29S28");
    var haulerS2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler'&& creep.memory.targetRoom == "W27S29");
    var haulerS3 = _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler'&& creep.memory.targetRoom == "W27S27");
    var haulerS4 = _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler'&& creep.memory.targetRoom == "W29S27");
    var minersOnSource = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner' && creep.memory.targetSourceId == '55db3116efa8e3fe66e047c9');
    var remoteBuilderS1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteBuilder' && creep.memory.targetRoom == "W29S27");
    var remoteBuilderS2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteBuilder' && creep.memory.targetRoom == "W29S27");
    var remoteRepairer = _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteRepairer' && creep.memory.targetRoom == targetRoom);
    var remoteRepairer2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteRepairer' && creep.memory.targetRoom == targetRoom2);
    var reservers1_1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'reserver' && creep.memory.targetRoom == 'W28S28');
    var reservers1_2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'reserver' && creep.memory.targetRoom == 'W29S27');
    var reservers2_1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'reserver' && creep.memory.targetRoom == 'W28S29');
    var reservers2_2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'reserver' && creep.memory.targetRoom == 'W26S29');
    var reservers3_1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'reserver' && creep.memory.targetRoom == 'W27S28');
    var reservers3_2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'reserver' && creep.memory.targetRoom == 'W28S27');
    var SpawnHaulerS1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'spawnhauler'&& creep.memory.targetRoom == "W29S28");
    var SpawnHaulerS2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'spawnhauler'&& creep.memory.targetRoom == "W27S29");
    var SpawnHaulerS3 = _.filter(Game.creeps, (creep) => creep.memory.role == 'spawnhauler'&& creep.memory.targetRoom == "W27S27");
    var SpawnHaulerS4 = _.filter(Game.creeps, (creep) => creep.memory.role == 'spawnhauler'&& creep.memory.targetRoom == "W29S27");
    var remoteMiners1_1 = _.filter(Game.creeps, (c) => c.memory.role == 'remoteMiner' && c.memory.sourceId == '55db3133efa8e3fe66e04894');
    var remoteMiners1_2 = _.filter(Game.creeps, (c) => c.memory.role == 'remoteMiner' && c.memory.sourceId == '55db3133efa8e3fe66e04892');
    var remoteMiners1_3 = _.filter(Game.creeps, (c) => c.memory.role == 'remoteMiner' && c.memory.sourceId == '55db3116efa8e3fe66e047c5');
    var remoteMiners1_4 = _.filter(Game.creeps, (c) => c.memory.role == 'remoteMiner' && c.memory.sourceId == '55db3116efa8e3fe66e047c6');
    // var remoteMiners1_5 = _.filter(Game.creeps, (c) => c.memory.role == 'remoteMiner' && c.memory.sourceId == '55db3154efa8e3fe66e04950');
    // var remoteMiners1_6 = _.filter(Game.creeps, (c) => c.memory.role == 'remoteMiner' && c.memory.sourceId == '55db3154efa8e3fe66e04951');
    var remoteMiners2_1 = _.filter(Game.creeps, (c) => c.memory.role == 'remoteMiner' && c.memory.sourceId == '55db3134efa8e3fe66e04897');
    var remoteMiners2_2 = _.filter(Game.creeps, (c) => c.memory.role == 'remoteMiner' && c.memory.sourceId == '55db3134efa8e3fe66e04898');
    var remoteMiners2_3 = _.filter(Game.creeps, (c) => c.memory.role == 'remoteMiner' && c.memory.sourceId == '55db3178efa8e3fe66e04a7d');
    var remoteMiners2_4 = _.filter(Game.creeps, (c) => c.memory.role == 'remoteMiner' && c.memory.sourceId == '55db3178efa8e3fe66e04a7e');
    var remoteMiners3_1 = _.filter(Game.creeps, (c) => c.memory.role == 'remoteMiner' && c.memory.sourceId == '55db3155efa8e3fe66e04953');
    var remoteMiners3_2 = _.filter(Game.creeps, (c) => c.memory.role == 'remoteMiner' && c.memory.sourceId == '55db3155efa8e3fe66e04955');
    var remoteMiners3_3 = _.filter(Game.creeps, (c) => c.memory.role == 'remoteMiner' && c.memory.sourceId == '55db3133efa8e3fe66e0488e');
    var remoteMiners3_4 = _.filter(Game.creeps, (c) => c.memory.role == 'remoteMiner' && c.memory.sourceId == '55db3133efa8e3fe66e04890');
    var remoteHaulers1_1=_.filter(Game.creeps, (creep) => creep.memory.role == 'remoteHauler'&& creep.memory.targetRoom == 'W28S28');
    var remoteHaulers1_2=_.filter(Game.creeps, (creep) => creep.memory.role == 'remoteHauler'&& creep.memory.targetRoom == targetRoom2);
    var remoteHaulers2_1=_.filter(Game.creeps, (creep) => creep.memory.role == 'remoteHauler'&& creep.memory.targetRoom == 'W28S29');
    var remoteHaulers2_2=_.filter(Game.creeps, (creep) => creep.memory.role == 'remoteHauler'&& creep.memory.targetRoom == 'W26S29');
    var remoteHaulers3_1=_.filter(Game.creeps, (creep) => creep.memory.role == 'remoteHauler'&& creep.memory.targetRoom == 'W27S28');
    var remoteHaulers3_2=_.filter(Game.creeps, (creep) => creep.memory.role == 'remoteHauler'&& creep.memory.targetRoom == 'W28S27');
    var LinkerSource1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'linkerSource'&& creep.memory.linkId == '6a01e57a532f25f5ab19ec66');
    var LinkerStorage1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'linkerStorage'&& creep.memory.linkId == '69fc2634d975101081adde17');
    //var LinkerSource2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'linkerSource'&& creep.memory.linkId == '6a01e57a532f25f5ab19ec66');
    var LinkerStorage2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'linkerStorage'&& creep.memory.linkId == '6a0c0d545a88a562acb865d3');
    var Claimer = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer');

    // логіка вежі
for(let tower of towers) {    
    // 1.1 Пріоритет №1: Атака ворогів
    var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if(closestHostile) {
        tower.attack(closestHostile);
    } 
    // 1.2 Пріоритет №2: Ремонт (якщо немає ворогів)
    else {
        // Шукаємо критичні пошкодження: Дороги та Контейнери
        var urgentRepair = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (s) => {
                return (s.structureType == STRUCTURE_ROAD || s.structureType == STRUCTURE_CONTAINER) && 
                       s.hits < s.hitsMax;}});
        if(urgentRepair) {tower.repair(urgentRepair);} 
        
        else {
         // Якщо дороги цілі, займаємося стінами та рампартами
        var defensiveRepair = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (s) => {
                    return (s.structureType == STRUCTURE_WALL || s.structureType == STRUCTURE_RAMPART) && 
                           s.hits < 100000;}
            });
            if(defensiveRepair) {
                tower.repair(defensiveRepair);
            }
        }
    }
}
    let sourceLinkS1_1 = Game.getObjectById('69fc24b9c613c7023ac183d3');
    let sourceLinkS1_2 = Game.getObjectById('6a01e57a532f25f5ab19ec66'); 
    let sourceLinkS1_3 = Game.getObjectById('6a0cc076baa5b41f3d6337be');
    let targetLinkS1 = Game.getObjectById('6a1422d8a0d86e8da2b47459');

    // 2. Перевіряємо перший лінк-джерелоS1
    if (sourceLinkS1_1 && targetLinkS1 && sourceLinkS1_1.cooldown == 0) {
    if (sourceLinkS1_1.store.getUsedCapacity(RESOURCE_ENERGY) >= 100) {
        sourceLinkS1_1.transferEnergy(targetLinkS1);
    }
    }

    // 3. Перевіряємо другий лінк-джерелоS1
    // Він працює незалежно: якщо перший на перезарядці, цей все одно відправить енергію
    if (sourceLinkS1_2 && targetLinkS1 && sourceLinkS1_2.cooldown == 0) {
    if (sourceLinkS1_2.store.getUsedCapacity(RESOURCE_ENERGY) >= 100) {
        sourceLinkS1_2.transferEnergy(targetLinkS1);
    }
    }
// 4 Перевіряємо 3 лінк-джерелоS1
    // Він працює незалежно: якщо перший на перезарядці, цей все одно відправить енергію
    if (sourceLinkS1_3 && targetLinkS1 && sourceLinkS1_3.cooldown == 0) {
    if (sourceLinkS1_3.store.getUsedCapacity(RESOURCE_ENERGY) >= 100) {
        sourceLinkS1_3.transferEnergy(targetLinkS1);
    }
    }

// spawn2
        let sourceLinkS2_1 = Game.getObjectById('6a0c505ae7e8d2a68cdffb4c');
        let sourceLinkS2_2 = Game.getObjectById('6a11890ea70f433191fc00a4'); 
        let targetLinkS2 = Game.getObjectById('6a105a7749816f096a7ae974');

    // 2. Перевіряємо перший лінк-джерелоS2
    if (sourceLinkS2_1 && targetLinkS2 && sourceLinkS2_1.cooldown == 0) {
    if (sourceLinkS2_1.store.getUsedCapacity(RESOURCE_ENERGY) >= 100) {
        sourceLinkS2_1.transferEnergy(targetLinkS2);
    }
    }

    // 3. Перевіряємо другий лінк-джерелоS2
    // Він працює незалежно: якщо перший на перезарядці, цей все одно відправить енергію
   if (sourceLinkS2_2 && targetLinkS2 && sourceLinkS2_2.cooldown == 0) {
    if (sourceLinkS2_2.store.getUsedCapacity(RESOURCE_ENERGY) >= 100) {
        sourceLinkS2_2.transferEnergy(targetLinkS2);
    }
    }
    // spawn3
        let sourceLinkS3_1 = Game.getObjectById('6a12d083c464bd850bf17bae');
        //let sourceLinkS2_2 = Game.getObjectById('6a11890ea70f433191fc00a4'); 
        let targetLinkS3 = Game.getObjectById('6a105759cef2c67b41fc0d1f');

    // 2. Перевіряємо перший лінк-джерелоS2
    if (sourceLinkS3_1 && targetLinkS3 && sourceLinkS3_1.cooldown == 0) {
    if (sourceLinkS3_1.store.getUsedCapacity(RESOURCE_ENERGY) >= 100) {
        sourceLinkS3_1.transferEnergy(targetLinkS3);
    }
    }

    // 3. Перевіряємо другий лінк-джерелоS2
    // Він працює незалежно: якщо перший на перезарядці, цей все одно відправить енергію
//    if (sourceLinkS2_2 && targetLinkS2 && sourceLinkS2_2.cooldown == 0) {
//     if (sourceLinkS2_2.store.getUsedCapacity(RESOURCE_ENERGY) >= 100) {
//         sourceLinkS2_2.transferEnergy(targetLinkS2);
//     }
// }

// 3. Автоматичне створення кріпів
// --- СПАВНЕР 1 (Основна база )  7 lvl
        let s1 = Game.spawns['Spawn1'];  
        if(!s1.spawning) { // Перевіряємо тільки якщо спавн вільний
        if(harvesters.length <0) {
            s1.spawnCreep([WORK, CARRY, CARRY, MOVE, MOVE], 'H' + Game.time, {memory: {role: 'harvester', targetRoom: 'W29S28'}});
        } 
        else if(SpawnHaulerS1.length < 1) { 
            s1.spawnCreep([CARRY, CARRY,CARRY, CARRY,CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], 'Spawnhauler'+Game.time,  {memory: {role: 'spawnhauler', targetRoom: 'W29S28'}})
        }
        
        else if(haulerS1.length <2) { 
            s1.spawnCreep([CARRY, CARRY,CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE,MOVE, MOVE,MOVE,MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE,MOVE, MOVE,MOVE,MOVE, MOVE], 'hauler'+Game.time,  {memory: {role: 'hauler',targetRoom: 'W29S28'}})
        }
        else if(refillers.length < 1) {
            s1.spawnCreep([CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], 'refiller'+Game.time, {memory: {role: 'refiller', targetRoom: 'W29S28'}});
        }
            
                
        
        else if(remoteMiners1_1.length < 1) {
        s1.spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE], 'RMiner1W28S28_' + Game.time, {
            memory: { role: 'remoteMiner', targetRoom: targetRoom, sourceId: '55db3133efa8e3fe66e04894' }
        });
        }
        else if(remoteMiners1_2.length < 1) {
        s1.spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], 'RMiner2W28S28_' + Game.time, {
            memory: { role: 'remoteMiner', targetRoom: targetRoom, sourceId: '55db3133efa8e3fe66e04892' }
        });
        }
        else if(remoteMiners1_3.length <1) {
        s1.spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], 'RMiner3W29S27_' + Game.time, {
            memory: { role: 'remoteMiner', targetRoom: "W29S27", sourceId: '55db3116efa8e3fe66e047c5' }
        });
        }

        else if(remoteMiners1_4.length <1) {
        s1.spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], 'RMiner4W29S27_' + Game.time, {
            memory: { role: 'remoteMiner', targetRoom: "W29S27", sourceId: '55db3116efa8e3fe66e047c6' }
        });
        }
        // else if(remoteMiners1_5.length <0) {
        // s1.spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], 'RMiner4_' + Game.time, {
        //     memory: { role: 'remoteMiner', targetRoom: "W27S27", sourceId: '55db3154efa8e3fe66e04950' }
        // });
        // }
        // else if(remoteMiners1_6.length <0) {
        // s1.spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], 'RMiner5_' + Game.time, {
        //     memory: { role: 'remoteMiner', targetRoom: "W27S27", sourceId: '55db3154efa8e3fe66e04951'  }
        // });
        // }
        
        else if(reservers1_1.length < 1) {
            s1.spawnCreep([CLAIM, CLAIM, MOVE, MOVE, MOVE], 'ReserverW28S28_'+ Game.time, {
            memory: {
                role: 'reserver',
                targetRoom: 'W28S28',
        }});
        }
        else if(reservers1_2.length < 0) {
            s1.spawnCreep([CLAIM, CLAIM, MOVE, MOVE, MOVE], 'ReserverW29S27_'+ Game.time, {
            memory: {
                role: 'reserver',
                targetRoom: 'W29S27',
        }});
        }
        else if(repairers.length < 0) {
            s1.spawnCreep([WORK, CARRY, MOVE,WORK, CARRY, MOVE], 'repairer'+Game.time, {memory: {role: 'repairer', targetRoom: 'W29S28'}});
        }
        
        else if(remoteRepairer.length <1) {
            s1.spawnCreep([WORK,WORK,WORK,WORK, CARRY,CARRY, MOVE, MOVE], 'RemoteRepairer1_'+ Game.time, {
            memory: {
                role: 'remoteRepairer',
                targetRoom: targetRoom,
                homeRoom: 'W29S28', // Твоя основна кімната
                repairing: false
            }});
        }
        else if(remoteRepairer2.length <1) {
            s1.spawnCreep([WORK,WORK,WORK,WORK,CARRY,CARRY, MOVE, MOVE, MOVE, MOVE], 'RemoteRepairer2_'+ Game.time, {
            memory: {
                role: 'remoteRepairer',
                targetRoom: targetRoom2,
                homeRoom: 'W29N28', // Твоя основна кімната
                repairing: false
            }});
        }
        else if (remoteHaulers1_1.length < 3) {
        s1.spawnCreep([ CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], 'R_HaulerW28S28' + Game.time, {
            memory: {
                role: 'remoteHauler',
                homeRoom: 'W29S28',
                deliveryId: '6a0cc076baa5b41f3d6337be',
                targetRoom: 'W28S28', //  віддалена кімната для пошуку
                containerIds: [
                    '69fb61de5ebc757f37c144d8', // Контейнер 1
                    '6a08c20a0fd83057265a147f', // Контейнер 2
                    //'69fb669e5e59b641886bef1b', // Контейнер 2
                            ],
                delivering: false
            }
            });
        }
        else if (remoteHaulers1_2.length < 0) {
        s1.spawnCreep([CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], 'R_HaulerW29S27_' + Game.time, {
            memory: {
                role: 'remoteHauler',
                homeRoom: 'W29S28',
                deliveryId: '69fc24b9c613c7023ac183d3',
                targetRoom: 'W29S27', // "Основна" віддалена кімната для пошуку
                containerIds: [
                '69fc5953ac156a78bd67a636', // Контейнер 2
                '69fc825bf4382a11335ad746',  // Контейнер 1
                            ],
                delivering: false
            }
            });
        }
        
    }
        let s1_2 = Game.spawns['Spawn1_2'];
        if(!s1_2.spawning) { // Перевіряємо чи він вільний
        
         if(miner.length < 2) {
            if(minersOnSource.length < 1) {
            s1_2.spawnCreep([WORK, WORK,WORK, WORK, WORK,CARRY, MOVE, MOVE], 'Miner1_' + Game.time, {memory: { role: 'miner', targetSourceId: '55db3116efa8e3fe66e047c9' }});
            }
            else {
            s1_2.spawnCreep([WORK, WORK, WORK, WORK, WORK,CARRY, MOVE, MOVE], 'Miner1_2_' + Game.time, {
                memory: { role: 'miner', targetSourceId: '55db3116efa8e3fe66e047cb' }});
            }
        }
        // else if (LinkerStorage1.length <0){
        // s1_2.spawnCreep([WORK,WORK,CARRY, CARRY, CARRY, CARRY,CARRY, CARRY,CARRY, CARRY,CARRY, CARRY, CARRY, CARRY, CARRY,MOVE,MOVE,MOVE,MOVE,MOVE, MOVE], 'SourceStorage1', {
        // memory: { 
        //     role: 'linkerStorage', 
        //     linkId: '69fc2634d975101081adde17' 
        // }
        // }); 
        // }
        // else if (LinkerSource1.length <0){
        // s1_2.spawnCreep([CARRY, CARRY, CARRY,CARRY, CARRY, MOVE], 'SourceLinker1_', {
        // memory: { 
        //     role: 'linkerSource', 
        //     containerId: '69f5e1abbcb70acd31555319', 
        //     linkId: '6a01e57a532f25f5ab19ec66' 
        // }
        // }); 
        // }
        else if (defenderS1_2.length < 2) {
        s1_2.spawnCreep([TOUGH, TOUGH, TOUGH,TOUGH, TOUGH, MOVE , MOVE, MOVE, MOVE, MOVE, RANGED_ATTACK, ATTACK, ATTACK ], 'DEFW29S27_2_'+Game.time, {
            memory: { role: 'defender', targetRoom: 'W29S27' }
        });
        }
        else if (healers2.length < 1) {
        s1_2.spawnCreep([TOUGH, TOUGH, MOVE, MOVE, MOVE,RANGED_ATTACK,HEAL,HEAL,HEAL,HEAL ], 'MedicW29S27_2_'+Game.time, {
            memory: { role: 'healer', targetRoom: 'W29S27' }
        });
        }
        else if (defenderS1_1.length < 2) {
        s1_2.spawnCreep([TOUGH, TOUGH, TOUGH,TOUGH, TOUGH, MOVE,MOVE, MOVE,MOVE, MOVE, RANGED_ATTACK,RANGED_ATTACK, ATTACK, ATTACK], 'DEFW28S28_1_'+Game.time, {
            memory: { role: 'defender', targetRoom: 'W28S28' }
        });
        }
        else if (healers.length < 1) {
        s1_2.spawnCreep([TOUGH, TOUGH, RANGED_ATTACK, MOVE, MOVE, MOVE, HEAL,HEAL,HEAL ], 'MedicW28S28_1_'+Game.time, {
            memory: { role: 'healer', targetRoom: 'W28S28' }
        });
        }
        if(builders.length <0) {
            s1_2.spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK, CARRY, CARRY,CARRY, CARRY,MOVE,MOVE], 'builder' + Game.time, {memory: {role: 'builder', targetRoom: 'W29S28'}});
        }
        else if(Claimer.length < 1) {
            s1_2.spawnCreep([CLAIM,CLAIM,MOVE, MOVE, MOVE], 'Claimer_'+ Game.time, {
            memory: {
                role: 'claimer',
                targetRoom: 'W29S27',
        }});
            }
         else if(upgraderS1.length < 2) {
            s1_2.spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK, CARRY,CARRY,CARRY,CARRY, MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE ], 'upgrader' + Game.time, {memory: {role: 'upgrader', targetRoom: 'W29S28',linkId: '6a1422d8a0d86e8da2b47459'}});
        } 
         else if(remoteBuilderS1.length < 2) {
            s1_2.spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
    WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
    CARRY,CARRY,CARRY,
    MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
    MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], 'RemoteBuilder_' + Game.time, {
            memory: {
                role: 'remoteBuilder',
                targetRoom: "W29S27",
                homeRoom: 'W28S28', // Твоя основна кімната
                building: false
            }});
        }
    }
    
// --- СПАВНЕР 2 (Друга база / Експансія)  6 lvl
        let s2 = Game.spawns['Spawn2'];
        if(s2 && !s2.spawning) { // Перевіряємо чи він вільний
            if (harvesters2.length < 0) {
            s2.spawnCreep([WORK,CARRY,WORK,CARRY,CARRY, MOVE, MOVE, MOVE, MOVE], 'H2_' + Game.time, {memory: {role: 'harvester', targetRoom: 'W27S27'}});
        } 
        else if(SpawnHaulerS2.length < 2) { 
            s2.spawnCreep([CARRY, CARRY,CARRY, CARRY,CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], 'Spawnhauler'+Game.time,  {memory: {role: 'spawnhauler', targetRoom: 'W27S29'}})
        }
        else if(builders2.length <1) {
            s2.spawnCreep([WORK,WORK,WORK, CARRY,WORK, CARRY, CARRY,MOVE, MOVE], 'builder_S2' + Game.time, {memory: {role: 'builder',targetRoom: 'W27S29'}});
        }
        else if(repairers2.length < 0) {
            s2.spawnCreep([WORK, CARRY, MOVE,WORK, CARRY, MOVE], 'repairer_2'+Game.time, {memory: {role: 'repairer',targetRoom: 'W27S29'}});
        }
        else if(refillers2.length < 0) {
            s2.spawnCreep([CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], 'refiller_2'+Game.time, {memory: {role: 'refiller',targetRoom: 'W27S29'}});
        }
        else if (defenderS2_1.length < 1) {
        s2.spawnCreep([TOUGH, TOUGH, MOVE,TOUGH, MOVE,TOUGH, MOVE,MOVE,RANGED_ATTACK, ATTACK, ATTACK], 'DEFW28S29_'+Game.time, {
            memory: { role: 'defender', targetRoom: 'W28S29' }
        });
        }
        else if (defenderS2_2.length < 1) {
        s2.spawnCreep([TOUGH, TOUGH, MOVE,TOUGH, MOVE,TOUGH, MOVE,MOVE,RANGED_ATTACK, ATTACK, ATTACK], 'DEFW26S29_'+Game.time, {
            memory: { role: 'defender', targetRoom: 'W26S29' }
        });
        }
        else if (healerS2_1.length < 1) {
        s2.spawnCreep([TOUGH, TOUGH, RANGED_ATTACK, MOVE, MOVE, MOVE, HEAL,HEAL,HEAL ], 'MedicW28S29_1_'+Game.time, {
            memory: { role: 'healer', targetRoom: 'W28S29' }
        });
        }
        else if (healerS2_2.length < 1) {
        s2.spawnCreep([TOUGH, TOUGH, RANGED_ATTACK, MOVE, MOVE, MOVE, HEAL,HEAL,HEAL ], 'MedicW28S29_1_'+Game.time, {
            memory: { role: 'healer', targetRoom: 'W26S29' }
        });
        }
        else if(minerS2_1.length <1) {
        s2.spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE,MOVE,MOVE], 'RMinerS2_' + Game.time, {
            memory: { role: 'remoteMiner', targetRoom: "W27S29", sourceId: '55db3155efa8e3fe66e04958' }
        });
        }
        else if(minerS2_2.length <1) {
        s2.spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE,MOVE,MOVE], 'RMinerS2_' + Game.time, {
            memory: { role: 'remoteMiner', targetRoom: "W27S29", sourceId: '55db3155efa8e3fe66e04957'  }
        });
        }
        else if(haulerS2.length <1) { 
        s2.spawnCreep([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE,MOVE,MOVE,MOVE,MOVE,MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE,MOVE,MOVE,MOVE,MOVE,MOVE, MOVE,MOVE,MOVE, MOVE], 'haulerS2'+Game.time,  {memory: {role: 'hauler',targetRoom: 'W27S29'}})
        }
        else if (LinkerStorage2.length <0){
        s2.spawnCreep([CARRY, CARRY, CARRY, CARRY,CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], 'linkStorage2', {
        memory: { 
            role: 'linkerStorage', 
            linkId: '6a0c0d545a88a562acb865d3' 
        }
        }); 
        }
        
        
        else if(remoteBuilderS2.length < 0) {
            s2.spawnCreep([WORK,WORK,WORK,CARRY,CARRY, CARRY, CARRY,MOVE,MOVE,MOVE,MOVE], 'RemoteBuilder_' + Game.time, {
            memory: {
                role: 'remoteBuilder',
                targetRoom: "W29S27",
                homeRoom: 'W28S28', // Твоя основна кімната
                building: false
            }});
        }
        else if(remoteMiners2_1.length < 1) {
        s2.spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE], 'RMiner1W28S29_' + Game.time, {
            memory: { role: 'remoteMiner', targetRoom: 'W28S29', sourceId: '55db3134efa8e3fe66e04897' }
        });
        }
        else if(remoteMiners2_2.length < 1) {
        s2.spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE], 'RMiner1W28S29_' + Game.time, {
            memory: { role: 'remoteMiner', targetRoom: 'W28S29', sourceId: '55db3134efa8e3fe66e04898' }
        });
        }
        else if(remoteMiners2_3.length < 1) {
        s2.spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE], 'RMiner1W26S29_' + Game.time, {
            memory: { role: 'remoteMiner', targetRoom: 'W26S29', sourceId: '55db3178efa8e3fe66e04a7d' }
        });
        }
        else if(remoteMiners2_4.length < 1) {
        s2.spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE], 'RMiner2W26S29_' + Game.time, {
            memory: { role: 'remoteMiner', targetRoom: 'W26S29', sourceId: '55db3178efa8e3fe66e04a7e' }
        });
        }
        else if (remoteHaulers2_1.length < 2 ) {
        s2.spawnCreep([CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], 'R_HaulerW28S29' + Game.time, {
            memory: {
                role: 'remoteHauler',
                homeRoom: 'W27S29',
                deliveryId: '6a11890ea70f433191fc00a4',
                targetRoom: 'W28S29', //  віддалена кімната для пошуку
                // containerIds: [
                //     '69fb61de5ebc757f37c144d8', // Контейнер 1
                //     '69fc9003fcb3376e1cc0a065', // Контейнер 2
                //     //'69fb669e5e59b641886bef1b', // Контейнер 2
                //                ],
                delivering: false
            }
            });
        }
        else if (remoteHaulers2_2.length < 2 ) {
        s2.spawnCreep([CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], 'R_HaulerW26S29' + Game.time, {
            memory: {
                role: 'remoteHauler',
                homeRoom: 'W27S29',
                deliveryId: '6a0c505ae7e8d2a68cdffb4c',
                targetRoom: 'W26S29', //  віддалена кімната для пошуку
                // containerIds: [
                //     '69fb61de5ebc757f37c144d8', // Контейнер 1
                //     '69fc9003fcb3376e1cc0a065', // Контейнер 2
                //     //'69fb669e5e59b641886bef1b', // Контейнер 2
                //                ],
                delivering: false
            }
            });
        }
        else if(reservers2_1.length < 1) {
            s2.spawnCreep([CLAIM,CLAIM, MOVE, MOVE, MOVE], 'ReserverW28S29_'+ Game.time, {
            memory: {
                role: 'reserver',
                targetRoom: 'W28S29',
        }});
        }
        else if(reservers2_2.length < 1) {
            s2.spawnCreep([CLAIM,CLAIM, MOVE, MOVE, MOVE], 'ReserverW26S29_'+ Game.time, {
            memory: {
                role: 'reserver',
                targetRoom: 'W26S29',
        }});
        }
        else if(upgraderS2.length <6) {
            s2.spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK, CARRY,CARRY,CARRY,CARRY, MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], 'upgrader' + Game.time, {memory: {role: 'upgrader', targetRoom: 'W27S29',linkId: '6a105a7749816f096a7ae974'}});
        } 
    }
// --- СПАВНЕР 3 (ТРетя база / Експансія) 5 lvl
        let s3 = Game.spawns['Spawn3'];
        if(s3 && !s3.spawning) { // Перевіряємо чи він вільний
                if (harvesters3.length <0) {
                s3.spawnCreep([WORK,CARRY,CARRY, MOVE, MOVE], 'H3_' + Game.time, {memory: {role: 'harvester', targetRoom: 'W27S27'}});
                } 
                else if(minerS3_1.length <1) {
            s3.spawnCreep([WORK, WORK, WORK, WORK, WORK,CARRY, MOVE,MOVE], 'RMinerS3_' + Game.time, {
                memory: { role: 'remoteMiner', targetRoom: "W27S27", sourceId: '55db3154efa8e3fe66e04950' }
            });
            }
            else if(minerS3_2.length <1) {
        s3.spawnCreep([WORK, WORK, WORK, WORK, WORK,CARRY, MOVE,MOVE], 'RMinerS3_' + Game.time, {
            memory: { role: 'remoteMiner', targetRoom: "W27S27", sourceId: '55db3154efa8e3fe66e04951'  }
        });
        }
        else if(refillers3.length < 0) {
            s3.spawnCreep([CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], 'refiller_2'+Game.time, {memory: {role: 'refiller',targetRoom: 'W27S27'}});
        }
        else if(builders3.length <5) {
            s3.spawnCreep([WORK, CARRY,WORK, CARRY, CARRY,MOVE, MOVE, MOVE, MOVE], 'builder_S3' + Game.time, {memory: {role: 'builder',targetRoom: 'W27S27'}});
        }
        else if(repairers3.length < 0) {
            s3.spawnCreep([WORK, CARRY, MOVE,WORK, CARRY, MOVE], 'repairer_3'+Game.time, {memory: {role: 'repairer',targetRoom: 'W27S27'}});
        }
    
        else if (defenderS3.length < 0) {
        s3.spawnCreep([TOUGH, TOUGH, MOVE,TOUGH, MOVE,TOUGH, MOVE,MOVE,RANGED_ATTACK, ATTACK, ATTACK], 'DEFW27S27_'+Game.time, {
            memory: { role: 'defender', targetRoom: 'W26S26' }
        });
        }
        

        else if(haulerS3.length <3) { 
        s3.spawnCreep([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE,MOVE, MOVE], 'haulerS2'+Game.time,  {memory: {role: 'hauler',targetRoom: 'W27S27'}})
        }
        else if(upgraderS3.length <4) {
            s3.spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK, CARRY,CARRY,CARRY,CARRY, MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], 'upgrader' + Game.time, {memory: {role: 'upgrader', targetRoom: 'W27S27',linkId: '6a105759cef2c67b41fc0d1f'}});
        } 
        else if(SpawnHaulerS3.length < 2) { 
            s3.spawnCreep([CARRY, CARRY,CARRY, CARRY,CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], 'Spawnhauler'+Game.time,  {memory: {role: 'spawnhauler', targetRoom: 'W27S27'}})
        }
        else if(remoteMiners3_1.length < 1) {
        s3.spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE], 'RMiner3W27S28_' + Game.time, {
            memory: { role: 'remoteMiner', targetRoom: 'W27S28', sourceId: '55db3155efa8e3fe66e04953' }
        });
        }
        else if(remoteMiners3_2.length < 1) {
        s3.spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE], 'RMiner3W27S28_' + Game.time, {
            memory: { role: 'remoteMiner', targetRoom: 'W27S28', sourceId: '55db3155efa8e3fe66e04955' }
        });
        }
        else if(remoteMiners3_3.length < 1) {
        s3.spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE], 'RMiner3W28S27_' + Game.time, {
            memory: { role: 'remoteMiner', targetRoom: 'W28S27', sourceId: '55db3133efa8e3fe66e0488e' }
        });
        }
        else if(remoteMiners3_4.length < 1) {
        s3.spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE], 'RMiner3W28S27_' + Game.time, {
            memory: { role: 'remoteMiner', targetRoom: 'W28S27', sourceId: '55db3133efa8e3fe66e04890' }
        });
        }
        else if (defenderS3_2.length < 2) {
        s3.spawnCreep([TOUGH, TOUGH, TOUGH,TOUGH, TOUGH, MOVE , MOVE, MOVE, MOVE, MOVE, RANGED_ATTACK, ATTACK, ATTACK ], 'DEFW289S27_2_'+Game.time, {
            memory: { role: 'defender', targetRoom: 'W28S27' }
        });
    }
        else if (healerS3_2.length < 1) {
        s3.spawnCreep([TOUGH, TOUGH, MOVE, MOVE, MOVE,RANGED_ATTACK,HEAL,HEAL,HEAL,HEAL ], 'MedicW28S27_2_'+Game.time, {
            memory: { role: 'healer', targetRoom: 'W28S27' }
        });
        }
        else if (defenderS3_1.length < 2) {
        s3.spawnCreep([TOUGH, TOUGH, TOUGH,TOUGH, TOUGH, MOVE,MOVE, MOVE,MOVE, MOVE, RANGED_ATTACK,RANGED_ATTACK, ATTACK, ATTACK], 'DEFW27S28_1_'+Game.time, {
            memory: { role: 'defender', targetRoom: 'W27S28' }
        });
    }
        else if (healerS3_1.length < 1) {
        s3.spawnCreep([TOUGH, TOUGH, RANGED_ATTACK, MOVE, MOVE, MOVE, HEAL,HEAL,HEAL ], 'MedicW27S28_1_'+Game.time, {
            memory: { role: 'healer', targetRoom: 'W27S28' }
        });
    }
        else if (remoteHaulers3_1.length < 4 ) {
        s3.spawnCreep([CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], 'R_HaulerW27S28' + Game.time, {
            memory: {
                role: 'remoteHauler',
                homeRoom: 'W27S27',
                deliveryId: '6a12d083c464bd850bf17bae',
                targetRoom: 'W27S28', //  віддалена кімната для пошуку
                // containerIds: [
                //     '69fb61de5ebc757f37c144d8', // Контейнер 1
                //     '69fc9003fcb3376e1cc0a065', // Контейнер 2
                //     //'69fb669e5e59b641886bef1b', // Контейнер 2
                //                ],
                delivering: false
            }
            });
        }
        else if (remoteHaulers3_2.length < 4 ) {
        s3.spawnCreep([CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], 'R_HaulerW28S27' + Game.time, {
            memory: {
                role: 'remoteHauler',
                homeRoom: 'W27S27',
                deliveryId: '6a12db3e09a47e31a765ed4d',
                targetRoom: 'W28S27', //  віддалена кімната для пошуку
                // containerIds: [
                //     '69fb61de5ebc757f37c144d8', // Контейнер 1
                //     '69fc9003fcb3376e1cc0a065', // Контейнер 2
                //     //'69fb669e5e59b641886bef1b', // Контейнер 2
                //                ],
                delivering: false
            }
            });
        }
        else if(reservers3_1.length < 1) {
            s3.spawnCreep([CLAIM,CLAIM, MOVE, MOVE, MOVE], 'ReserverW27S28_'+ Game.time, {
            memory: {
                role: 'reserver',
                targetRoom: 'W27S28',
        }});
        }
        else if(reservers3_2.length < 1) {
            s3.spawnCreep([CLAIM,CLAIM, MOVE, MOVE, MOVE], 'ReserverW28S27_'+ Game.time, {
            memory: {
                role: 'reserver',
                targetRoom: 'W28S27',
        }});
        }

        
    }
// --- СПАВНЕР 4 (четверта база / Експансія) 1 lvl
        let s4 = Game.spawns['Spawn4'];
        if(s4 && !s4.spawning) { // Перевіряємо чи він вільний
        if (harvesters4.length <4) {
            s4.spawnCreep([CARRY,CARRY, MOVE,CARRY, MOVE, MOVE], 'H4_' + Game.time, {memory: {role: 'harvester', targetRoom: 'W29S27'}});
                } 
        // else if(minerS4_1.length <0) {
        //     s4.spawnCreep([WORK, WORK, WORK, WORK, WORK,CARRY, MOVE,MOVE], 'RMinerS3_' + Game.time, {
        //         memory: { role: 'remoteMiner', targetRoom: "W27S27", sourceId: '55db3154efa8e3fe66e04950' }
        //     });
        //     }
        // else if(minerS3_2.length <0) {
        //     s3.spawnCreep([WORK, WORK, WORK, WORK, WORK,CARRY, MOVE,MOVE], 'RMinerS3_' + Game.time, {
        //     memory: { role: 'remoteMiner', targetRoom: "W27S27", sourceId: '55db3154efa8e3fe66e04951'  }
        // });
        // }
        // else if(refillers3.length < 0) {
        //     s3.spawnCreep([CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], 'refiller_2'+Game.time, {memory: {role: 'refiller',targetRoom: 'W27S27'}});
        // }
        else if(builders4.length <0) {
            s4.spawnCreep([WORK, CARRY,WORK, CARRY, CARRY,MOVE, MOVE, MOVE, MOVE], 'builder_S3' + Game.time, {memory: {role: 'builder',targetRoom: 'W29S27'}});
        }
        // else if(repairers3.length < 0) {
        //     s3.spawnCreep([WORK, CARRY, MOVE,WORK, CARRY, MOVE], 'repairer_3'+Game.time, {memory: {role: 'repairer',targetRoom: 'W27S27'}});
        // }
        // else if (defenderS3.length < 0) {
        //     s3.spawnCreep([TOUGH, TOUGH, MOVE,TOUGH, MOVE,TOUGH, MOVE,MOVE,RANGED_ATTACK, ATTACK, ATTACK], 'DEFW27S27_'+Game.time, {
        //     memory: { role: 'defender', targetRoom: 'W26S26' }
        // });
        // } 
        else if(haulerS4.length <0) { 
        s4.spawnCreep([CARRY, CARRY, CARRY,MOVE, MOVE,MOVE], 'haulerS2'+Game.time,  {memory: {role: 'hauler',targetRoom: 'W29S27'}})
        }
        else if(upgraderS4.length <0) {
            s4.spawnCreep([WORK,CARRY,CARRY, MOVE,MOVE,], 'upgrader' + Game.time, {memory: {role: 'upgrader', targetRoom: 'W29S27',linkId: '6a105759cef2c67b41fc0d1f'}});
        } 
        else if(SpawnHaulerS4.length < 0) { 
            s4.spawnCreep([CARRY, CARRY,CARRY, CARRY, MOVE, MOVE], 'Spawnhauler'+Game.time,  {memory: {role: 'spawnhauler', targetRoom: 'W29S27'}})
        }
    //     else if(remoteMiners3_1.length < 1) {
    //     s3.spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE], 'RMiner3W27S28_' + Game.time, {
    //         memory: { role: 'remoteMiner', targetRoom: 'W27S28', sourceId: '55db3155efa8e3fe66e04953' }
    //     });
    //     }
    //     else if(remoteMiners3_2.length < 1) {
    //     s3.spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE], 'RMiner3W27S28_' + Game.time, {
    //         memory: { role: 'remoteMiner', targetRoom: 'W27S28', sourceId: '55db3155efa8e3fe66e04955' }
    //     });
    //     }
    //     else if(remoteMiners3_3.length < 1) {
    //     s3.spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE], 'RMiner3W28S27_' + Game.time, {
    //         memory: { role: 'remoteMiner', targetRoom: 'W28S27', sourceId: '55db3133efa8e3fe66e0488e' }
    //     });
    //     }
    //     else if(remoteMiners3_4.length < 1) {
    //     s3.spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE], 'RMiner3W28S27_' + Game.time, {
    //         memory: { role: 'remoteMiner', targetRoom: 'W28S27', sourceId: '55db3133efa8e3fe66e04890' }
    //     });
    //     }
    //     else if (defenderS3_2.length < 2) {
    //     s3.spawnCreep([TOUGH, TOUGH, TOUGH,TOUGH, TOUGH, MOVE , MOVE, MOVE, MOVE, MOVE, RANGED_ATTACK, ATTACK, ATTACK ], 'DEFW289S27_2_'+Game.time, {
    //         memory: { role: 'defender', targetRoom: 'W28S27' }
    //     });
    // }
    //     else if (healerS3_2.length < 1) {
    //     s3.spawnCreep([TOUGH, TOUGH, MOVE, MOVE, MOVE,RANGED_ATTACK,HEAL,HEAL,HEAL,HEAL ], 'MedicW28S27_2_'+Game.time, {
    //         memory: { role: 'healer', targetRoom: 'W28S27' }
    //     });
    //     }
    //     else if (defenderS3_1.length < 2) {
    //     s3.spawnCreep([TOUGH, TOUGH, TOUGH,TOUGH, TOUGH, MOVE,MOVE, MOVE,MOVE, MOVE, RANGED_ATTACK,RANGED_ATTACK, ATTACK, ATTACK], 'DEFW27S28_1_'+Game.time, {
    //         memory: { role: 'defender', targetRoom: 'W27S28' }
    //     });
    // }
    //     else if (healerS3_1.length < 1) {
    //     s3.spawnCreep([TOUGH, TOUGH, RANGED_ATTACK, MOVE, MOVE, MOVE, HEAL,HEAL,HEAL ], 'MedicW27S28_1_'+Game.time, {
    //         memory: { role: 'healer', targetRoom: 'W27S28' }
    //     });
    // }
    //     else if (remoteHaulers3_1.length < 4 ) {
    //     s3.spawnCreep([CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], 'R_HaulerW27S28' + Game.time, {
    //         memory: {
    //             role: 'remoteHauler',
    //             homeRoom: 'W27S27',
    //             deliveryId: '6a12d083c464bd850bf17bae',
    //             targetRoom: 'W27S28', //  віддалена кімната для пошуку
    //             // containerIds: [
    //             //     '69fb61de5ebc757f37c144d8', // Контейнер 1
    //             //     '69fc9003fcb3376e1cc0a065', // Контейнер 2
    //             //     //'69fb669e5e59b641886bef1b', // Контейнер 2
    //             //                ],
    //             delivering: false
    //         }
    //         });
    //     }
    //     else if (remoteHaulers3_2.length < 4 ) {
    //     s3.spawnCreep([CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], 'R_HaulerW28S27' + Game.time, {
    //         memory: {
    //             role: 'remoteHauler',
    //             homeRoom: 'W27S27',
    //             deliveryId: '6a12db3e09a47e31a765ed4d',
    //             targetRoom: 'W28S27', //  віддалена кімната для пошуку
    //             // containerIds: [
    //             //     '69fb61de5ebc757f37c144d8', // Контейнер 1
    //             //     '69fc9003fcb3376e1cc0a065', // Контейнер 2
    //             //     //'69fb669e5e59b641886bef1b', // Контейнер 2
    //             //                ],
    //             delivering: false
    //         }
    //         });
    //     }
    //     else if(reservers3_1.length < 1) {
    //         s3.spawnCreep([CLAIM,CLAIM, MOVE, MOVE, MOVE], 'ReserverW27S28_'+ Game.time, {
    //         memory: {
    //             role: 'reserver',
    //             targetRoom: 'W27S28',
    //     }});
    //     }
    //     else if(reservers3_2.length < 1) {
    //         s3.spawnCreep([CLAIM,CLAIM, MOVE, MOVE, MOVE], 'ReserverW28S27_'+ Game.time, {
    //         memory: {
    //             role: 'reserver',
    //             targetRoom: 'W28S27',
    //     }});
    //     }

        
    }



    
        // 4. Запуск логіки 
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'defender') {
            roleDefender.run(creep);
        }
        if(creep.memory.role == 'refiller') {
            roleRefiller.run(creep);
        }
        if(creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
        if(creep.memory.role == 'miner') {
            roleMiner.run(creep);
        }
        if(creep.memory.role == 'hauler') {
            roleHauler.run(creep);
        }
        if(creep.memory.role == 'remoteBuilder') {
            roleRemoteBuilder.run(creep);
        }
        if(creep.memory.role == 'remoteRepairer') {
            roleRemoteRepairer.run(creep);
        }
        if(creep.memory.role == 'reserver') {
            roleReserver.run(creep);
        }
        if(creep.memory.role == 'spawnhauler') {
            roleSpawnHauler.run(creep);
        }
        if(creep.memory.role == 'remoteMiner') {
            roleRemoteMiner.run(creep);
        }
         if(creep.memory.role == 'remoteHauler') {
            roleRemoteHauler.run(creep);
        }
        if(creep.memory.role == 'linkerSource') {
            roleLinkerSource.run(creep);
        }
        if(creep.memory.role == 'linkerStorage') {
            roleLinkerStorage.run(creep);
        }
        if(creep.memory.role == 'healer') {
            roleHealer.run(creep);
        }
        if(creep.memory.role == 'claimer') {
                    roleClaimer.run(creep);
        }
    }
};