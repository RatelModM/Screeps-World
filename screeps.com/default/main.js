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
var roleRemoteMinerHauler = require('role.remoteMinerHauler');
var roleRemoteHauler = require('role.remoteHauler');
var roleLinkerSource = require('role.linkerSource');
var roleLinkerStorage = require('role.linkerStorage');
var roleHealer = require('role.healer');
var roleClaimer = require('role.claimer');
var roleMineralMiner = require('role.mineralMIner');
var industry = require ('industry')


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
    var harvesters2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester'&& creep.memory.targetRoom == "W27S29");
    var harvesters3 = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester'&& creep.memory.targetRoom == "W27S27");
    var harvesters4 = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester'&& creep.memory.targetRoom == "W29S27");
    var harvesters5 = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester'&& creep.memory.targetRoom == "W28S29");
    var upgraderS1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader'&& creep.memory.targetRoom == "W29S28");
    var upgraderS2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader'&& creep.memory.targetRoom == "W27S29");
    var upgraderS3 = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader'&& creep.memory.targetRoom == "W27S27");
    var upgraderS4 = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader'&& creep.memory.targetRoom == "W29S27");
    var upgraderS5 = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader'&& creep.memory.targetRoom == "W28S29");
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder'&& creep.memory.targetRoom == "W29S28");
    var builders2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder'&& creep.memory.targetRoom == "W27S29");
    var builders3 = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder'&& creep.memory.targetRoom == "W27S27");
    var builders4 = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder'&& creep.memory.targetRoom == "W29S27");
    var defenderS1_1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'defender'&& creep.memory.targetRoom == "W28S28");
     var defenderS2_1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'defender'&& creep.memory.targetRoom == "W29S29");
    var defenderS2_2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'defender'&& creep.memory.targetRoom == "W26S29");
    var defenderS1_2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'defender'&& creep.memory.targetRoom == "W29S27");
    var defenderS3 = _.filter(Game.creeps, (creep) => creep.memory.role == 'defender'&& creep.memory.targetRoom == "W27S27");
    var defenderS3_1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'defender'&& creep.memory.targetRoom == "W27S28");
    var defenderS3_2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'defender'&& creep.memory.targetRoom == "W27S26");
     var defenderS5_1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'defender'&& creep.memory.targetRoom == "W29S29");
    var healers = _.filter(Game.creeps, (creep) => creep.memory.role == 'healer'&& creep.memory.targetRoom =="W28S28");
    var healers2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'healer'&& creep.memory.targetRoom == "W29S27");
    var healerS2_1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'healer'&& creep.memory.targetRoom =="W29S29");
    var healerS2_2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'healer'&& creep.memory.targetRoom == "W26S29");
    var healerS3_1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'healer'&& creep.memory.targetRoom =="W27S28");
    var healerS3_2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'healer'&& creep.memory.targetRoom == "W27S26");
    var healerS5_1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'healer'&& creep.memory.targetRoom =="W29S29");

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
    var minerS5_1 = _.filter(Game.creeps, (c) => c.memory.role == 'remoteMiner' && c.memory.sourceId == '55db3134efa8e3fe66e04897');
    var minerS5_2 = _.filter(Game.creeps, (c) => c.memory.role == 'remoteMiner' && c.memory.sourceId == '55db3134efa8e3fe66e04898');
    var towers = _.filter(Game.structures, s => s.structureType == STRUCTURE_TOWER);
    var haulerS1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler'&& creep.memory.targetRoom == "W29S28");
    var haulerS2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler'&& creep.memory.targetRoom == "W27S29");
    var haulerS3 = _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler'&& creep.memory.targetRoom == "W27S27");
    var haulerS4 = _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler'&& creep.memory.targetRoom == "W29S27");
    var haulerS5 = _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler'&& creep.memory.targetRoom == "W28S29");
    var minersOnSource = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner' && creep.memory.targetSourceId == '55db3116efa8e3fe66e047c9');
    var remoteBuilderS1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteBuilder' && creep.memory.targetRoom == "W29S27");
    var remoteBuilderS2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteBuilder' && creep.memory.targetRoom == "W27S28");
    var remoteRepairer = _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteRepairer' && creep.memory.targetRoom == targetRoom);
    var remoteRepairer2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteRepairer' && creep.memory.targetRoom == targetRoom2);
    var reservers1_1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'reserver' && creep.memory.targetRoom == 'W28S28');
    var reservers1_2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'reserver' && creep.memory.targetRoom == 'W29S27');
    var reservers2_1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'reserver' && creep.memory.targetRoom == 'W27S28');
    var reservers2_2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'reserver' && creep.memory.targetRoom == 'W26S29');
    // var reservers2_3 = _.filter(Game.creeps, (creep) => creep.memory.role == 'reserver' && creep.memory.targetRoom == 'W27S28');
    var reservers3_1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'reserver' && creep.memory.targetRoom == 'W27S26');
    var reservers3_2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'reserver' && creep.memory.targetRoom == 'W28S27');
    var reservers5_1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'reserver' && creep.memory.targetRoom == 'W29S29');
    var SpawnHaulerS1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'spawnhauler'&& creep.memory.targetRoom == "W29S28");
    var SpawnHaulerS2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'spawnhauler'&& creep.memory.targetRoom == "W27S29");
    var SpawnHaulerS3 = _.filter(Game.creeps, (creep) => creep.memory.role == 'spawnhauler'&& creep.memory.targetRoom == "W27S27");
    var SpawnHaulerS4 = _.filter(Game.creeps, (creep) => creep.memory.role == 'spawnhauler'&& creep.memory.targetRoom == "W29S27");
    var SpawnHaulerS5 = _.filter(Game.creeps, (creep) => creep.memory.role == 'spawnhauler'&& creep.memory.targetRoom == "W28S29");
    var remoteMiners1_1 = _.filter(Game.creeps, (c) => c.memory.role == 'remoteMiner' && c.memory.sourceId == '55db3133efa8e3fe66e04894');
    var remoteMiners1_2 = _.filter(Game.creeps, (c) => c.memory.role == 'remoteMiner' && c.memory.sourceId == '55db3133efa8e3fe66e04892');
    // var remoteMiners1_5 = _.filter(Game.creeps, (c) => c.memory.role == 'remoteMiner' && c.memory.sourceId == '55db3154efa8e3fe66e04950');
    // var remoteMiners1_6 = _.filter(Game.creeps, (c) => c.memory.role == 'remoteMiner' && c.memory.sourceId == '55db3154efa8e3fe66e04951');
    var remoteMiners2_1 = _.filter(Game.creeps, (c) => c.memory.role == 'remoteMiner' && c.memory.sourceId == '55db3134efa8e3fe66e04897');
    var remoteMiners2_2 = _.filter(Game.creeps, (c) => c.memory.role == 'remoteMiner' && c.memory.sourceId == '55db3134efa8e3fe66e04898');
    var remoteMiners2_3 = _.filter(Game.creeps, (c) => c.memory.role == 'remoteMiner' && c.memory.sourceId == '55db3178efa8e3fe66e04a7d');
    var remoteMiners2_4 = _.filter(Game.creeps, (c) => c.memory.role == 'remoteMiner' && c.memory.sourceId == '55db3178efa8e3fe66e04a7e');
    var remoteMiners3_1 = _.filter(Game.creeps, (c) => c.memory.role == 'remoteMiner' && c.memory.sourceId == '55db3155efa8e3fe66e04953');
    var remoteMiners3_2 = _.filter(Game.creeps, (c) => c.memory.role == 'remoteMiner' && c.memory.sourceId == '55db3155efa8e3fe66e04955');
    var remoteMiners4_3 = _.filter(Game.creeps, (c) => c.memory.role == 'remoteMiner' && c.memory.sourceId == '55db3133efa8e3fe66e0488e');
    var remoteMiners4_4 = _.filter(Game.creeps, (c) => c.memory.role == 'remoteMiner' && c.memory.sourceId == '55db3133efa8e3fe66e04890');
    var remoteMiners4_1 = _.filter(Game.creeps, (c) => c.memory.role == 'remoteMiner' && c.memory.sourceId == '55db3116efa8e3fe66e047c5');
    var remoteMiners5_1 = _.filter(Game.creeps, (c) => c.memory.role == 'remoteMiner' && c.memory.sourceId == '55db3117efa8e3fe66e047cd');
    var remoteMiners4_2 = _.filter(Game.creeps, (c) => c.memory.role == 'remoteMiner' && c.memory.sourceId == '55db3116efa8e3fe66e047c6');

    var remoteMinerHauler3_1 = _.filter(Game.creeps, (c) => c.memory.role == 'remoteMinerHauler' && c.memory.sourceId == '55db3154efa8e3fe66e0494d');
    var remoteMinerHauler4_1 = _.filter(Game.creeps, (c) => c.memory.role == 'remoteMinerHauler' && c.memory.sourceId == '55db3115efa8e3fe66e047c3');
    var remoteMinerHauler4_2 = _.filter(Game.creeps, (c) => c.memory.role == 'remoteMinerHauler' && c.memory.sourceId == '55db3115efa8e3fe66e047c1');

    var MineralMiner_1=_.filter(Game.creeps, (creep) => creep.memory.role == 'mineralMIner'&& creep.memory.targetRoom == 'W29S28');
    var MineralMiner_2=_.filter(Game.creeps, (creep) => creep.memory.role == 'mineralMIner'&& creep.memory.targetRoom == 'W27S29');
    var MineralMiner_3=_.filter(Game.creeps, (creep) => creep.memory.role == 'mineralMIner'&& creep.memory.targetRoom == 'W27S27');
    var MineralMiner_4=_.filter(Game.creeps, (creep) => creep.memory.role == 'mineralMIner'&& creep.memory.targetRoom == 'W29S27');
    var remoteHaulers1_1=_.filter(Game.creeps, (creep) => creep.memory.role == 'remoteHauler'&& creep.memory.targetRoom == 'W28S28');
    var remoteHaulers1_2=_.filter(Game.creeps, (creep) => creep.memory.role == 'remoteHauler'&& creep.memory.targetRoom == targetRoom2);
    var remoteHaulers2_1=_.filter(Game.creeps, (creep) => creep.memory.role == 'remoteHauler'&& creep.memory.targetRoom == 'W27S28');
    var remoteHaulers2_2=_.filter(Game.creeps, (creep) => creep.memory.role == 'remoteHauler'&& creep.memory.targetRoom == 'W26S29');
    var remoteHaulers3_1=_.filter(Game.creeps, (creep) => creep.memory.role == 'remoteHauler'&& creep.memory.targetRoom == 'W27S28');
    var remoteHaulers4_1=_.filter(Game.creeps, (creep) => creep.memory.role == 'remoteHauler'&& creep.memory.targetRoom == 'W28S27');
     var remoteHaulers5_1=_.filter(Game.creeps, (creep) => creep.memory.role == 'remoteHauler'&& creep.memory.targetRoom == 'W29S29');
    var LinkerSource1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'linkerSource'&& creep.memory.linkId == '6a01e57a532f25f5ab19ec66');
    var LinkerStorage1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'linkerStorage'&& creep.memory.linkId == '6a1a9ad106382f425a860ee9');
    //var LinkerSource2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'linkerSource'&& creep.memory.linkId == '6a01e57a532f25f5ab19ec66');
    var LinkerStorage2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'linkerStorage'&& creep.memory.linkId == '6a17638d5d6bdcd5eeb4ca61');
    var LinkerStorage3 = _.filter(Game.creeps, (creep) => creep.memory.role == 'linkerStorage'&& creep.memory.linkId == '6a17496873d18470acf2ef44');
    var LinkerStorage4 = _.filter(Game.creeps, (creep) => creep.memory.role == 'linkerStorage'&& creep.memory.linkId == '6a19dfcad1a6e81d67d9dd27');
    var LinkerStorage5 = _.filter(Game.creeps, (creep) => creep.memory.role == 'linkerStorage'&& creep.memory.linkId == '6a28f72d0b346572948cf561');
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
    let sourceLinkS1_1 = Game.getObjectById('6a1431c777fce14e0c0e72a9');
    let sourceLinkS1_2 = Game.getObjectById('6a01e57a532f25f5ab19ec66'); 
    let sourceLinkS1_3 = Game.getObjectById('6a1765cbfc64d228760cf144');
    let targetLinkS1 = Game.getObjectById('6a1a9ad106382f425a860ee9');

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
        let sourceLinkS2_2 = Game.getObjectById('6a231e975e9ef622c6b11baf'); 
        let targetLinkS2_1 = Game.getObjectById('6a17638d5d6bdcd5eeb4ca61');
        let targetLinkS2_2 = Game.getObjectById('6a183a707162c3849c86d173');

    // 2. Перевіряємо перший лінк-джерелоS2
    if (sourceLinkS2_1 && targetLinkS2_2 && sourceLinkS2_1.cooldown == 0) {
    if (sourceLinkS2_1.store.getUsedCapacity(RESOURCE_ENERGY) >= 100) {
        sourceLinkS2_1.transferEnergy(targetLinkS2_2);
    }
    }

    // 3. Перевіряємо другий лінк-джерелоS2
    // Він працює незалежно: якщо перший на перезарядці, цей все одно відправить енергію
   if (sourceLinkS2_2 && targetLinkS2_1 && sourceLinkS2_2.cooldown == 0) {
    if (sourceLinkS2_2.store.getUsedCapacity(RESOURCE_ENERGY) >= 100) {
        sourceLinkS2_2.transferEnergy(targetLinkS2_1);
    }
    }
    // spawn3
        let sourceLinkS3_1 = Game.getObjectById('6a12d083c464bd850bf17bae');
        let sourceLinkS3_2 = Game.getObjectById('6a2712b759ab19389d8a2d1b'); 
        let targetLinkS3 = Game.getObjectById('6a17496873d18470acf2ef44');
        let targetLinkS3_1 = Game.getObjectById('6a19e3e4ff91507127143c46');

    // 2. Перевіряємо перший лінк-джерелоS2
    if (sourceLinkS3_1 && targetLinkS3 && sourceLinkS3_1.cooldown == 0) {
    if (sourceLinkS3_1.store.getUsedCapacity(RESOURCE_ENERGY) >= 100) {
        sourceLinkS3_1.transferEnergy(targetLinkS3);
    }
    }
     if (sourceLinkS3_2 && targetLinkS3 && sourceLinkS3_2.cooldown == 0) {
    if (sourceLinkS3_2.store.getUsedCapacity(RESOURCE_ENERGY) >= 100) {
        sourceLinkS3_2.transferEnergy(targetLinkS3);
    }
    }
 // spawn4
        let sourceLinkS4_1 = Game.getObjectById('6a1a03a14f03e80f8e25132f');
        let sourceLinkS4_2 = Game.getObjectById('6a1ec9cb34a2fbc89c868aba'); 
        let targetLinkS4 = Game.getObjectById('6a19dfcad1a6e81d67d9dd27');

    // 2. Перевіряємо перший лінк-джерелоS2
    if (sourceLinkS4_1 && targetLinkS4 && sourceLinkS4_1.cooldown == 0) {
    if (sourceLinkS4_1.store.getUsedCapacity(RESOURCE_ENERGY) >= 100) {
        sourceLinkS4_1.transferEnergy(targetLinkS4);
    }
    }
     if (sourceLinkS4_2 && targetLinkS4 && sourceLinkS4_2.cooldown == 0) {
    if (sourceLinkS4_2.store.getUsedCapacity(RESOURCE_ENERGY) >= 100) {
        sourceLinkS4_2.transferEnergy(targetLinkS4);
    }
    }
   // spawn5
        let sourceLinkS5_1 = Game.getObjectById('6a290dd0d90a1de551b1a71a');
        // let sourceLinkS5_2 = Game.getObjectById('6a1ec9cb34a2fbc89c868aba'); 
        let targetLinkS5 = Game.getObjectById('6a28f72d0b346572948cf561');

    // 2. Перевіряємо перший лінк-джерелоS2
    if (sourceLinkS5_1 && targetLinkS5 && sourceLinkS5_1.cooldown == 0) {
    if (sourceLinkS5_1.store.getUsedCapacity(RESOURCE_ENERGY) >= 100) {
        sourceLinkS5_1.transferEnergy(targetLinkS5);
    }
    }
    //  if (sourceLinkS4_2 && targetLinkS4 && sourceLinkS4_2.cooldown == 0) {
    // if (sourceLinkS4_2.store.getUsedCapacity(RESOURCE_ENERGY) >= 100) {
    //     sourceLinkS4_2.transferEnergy(targetLinkS4);
    // }
    // }

// 3. Автоматичне створення кріпів
// --- СПАВНЕР 1 (Основна база )  7 lvl
        let s1 = Game.spawns['Spawn1'];  
        if(!s1.spawning) { // Перевіряємо тільки якщо спавн вільний
        
        if(SpawnHaulerS1.length < 1) { 
            s1.spawnCreep([CARRY, CARRY,CARRY, CARRY,CARRY,CARRY, CARRY,CARRY, CARRY,CARRY,CARRY, CARRY,CARRY, CARRY,CARRY,CARRY, CARRY,CARRY, CARRY,CARRY,MOVE, MOVE, MOVE, MOVE, MOVE,MOVE, MOVE, MOVE, MOVE, MOVE], 'Spawnhauler'+Game.time,  {memory: {role: 'spawnhauler', targetRoom: 'W29S28'}})
        }
        else if(harvesters.length <0) {
            s1.spawnCreep([WORK, CARRY, CARRY, MOVE, MOVE], 'H' + Game.time, {memory: {role: 'harvester', targetRoom: 'W29S28'}});
        } 
        else if(haulerS1.length <1) { 
            s1.spawnCreep([CARRY, CARRY,CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE,MOVE, MOVE,MOVE,MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE,MOVE, MOVE,MOVE,MOVE, MOVE], 'hauler'+Game.time,  {memory: {role: 'hauler',targetRoom: 'W29S28'}})
        }
         else if (LinkerStorage1.length <1){
        s1.spawnCreep([WORK,WORK,CARRY, CARRY, CARRY, CARRY,CARRY, CARRY,CARRY, CARRY,CARRY, CARRY, CARRY, CARRY, CARRY,MOVE,MOVE,MOVE,MOVE,MOVE, MOVE], 'SourceStorage1', {
        memory: { 
            role: 'linkerStorage', 
            linkId: '6a1a9ad106382f425a860ee9' 
        }
        }); 
        }
        else if(MineralMiner_1.length < 1) {
        s1.spawnCreep([WORK, WORK, WORK, WORK,CARRY, CARRY, MOVE, MOVE, MOVE], 'MMiner2_' + Game.time, {
            memory: { role: 'mineralMIner', targetRoom: 'W29S28' }
        });
        }
        else if(refillers.length < 0) {
            s1.spawnCreep([CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], 'refiller'+Game.time, {memory: {role: 'refiller', targetRoom: 'W29S28'}});
        }
        else if(miner.length < 2) {
            if(minersOnSource.length < 1) {
            s1.spawnCreep([WORK, WORK,WORK, WORK, WORK,CARRY, MOVE, MOVE], 'Miner1_' + Game.time, {memory: { role: 'miner', targetSourceId: '55db3116efa8e3fe66e047c9' }});
            }
            else {
            s1.spawnCreep([WORK, WORK, WORK, WORK, WORK,CARRY, MOVE, MOVE], 'Miner1_2_' + Game.time, {
                memory: { role: 'miner', targetSourceId: '55db3116efa8e3fe66e047cb' }});
            }
        }       
        else if(remoteMiners1_1.length < 1) {
        s1.spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE,MOVE, CARRY], 'RMiner1W28S28_' + Game.time, {
            memory: { role: 'remoteMiner', targetRoom: targetRoom, sourceId: '55db3133efa8e3fe66e04894' }
        });
        }
        else if(remoteMiners1_2.length < 1) {
        s1.spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE,MOVE, CARRY], 'RMiner2W28S28_' + Game.time, {
            memory: { role: 'remoteMiner', targetRoom: targetRoom, sourceId: '55db3133efa8e3fe66e04892' }
        });
        }
        // else if(remoteMiners1_3.length <0) {
        // s1.spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], 'RMiner3W29S27_' + Game.time, {
        //     memory: { role: 'remoteMiner', targetRoom: "W29S27", sourceId: '55db3116efa8e3fe66e047c5' }
        // });
        // }

        
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
        // else if(reservers1_2.length < 0) {
        //     s1.spawnCreep([CLAIM, CLAIM, MOVE, MOVE, MOVE], 'ReserverW29S27_'+ Game.time, {
        //     memory: {
        //         role: 'reserver',
        //         targetRoom: 'W29S27',
        // }});
        // }
        // else if(repairers.length < 0) {
        //     s1.spawnCreep([WORK, CARRY, MOVE,WORK, CARRY, MOVE], 'repairer'+Game.time, {memory: {role: 'repairer', targetRoom: 'W29S28'}});
        // }
        
        else if(remoteRepairer.length <0) {
            s1.spawnCreep([WORK,WORK,WORK,WORK, CARRY,CARRY, MOVE, MOVE], 'RemoteRepairer1_'+ Game.time, {
            memory: {
                role: 'remoteRepairer',
                targetRoom: targetRoom,
                homeRoom: 'W29S28', // Твоя основна кімната
                repairing: false
            }});
        }
        // else if(remoteRepairer2.length <0) {
        //     s1.spawnCreep([WORK,WORK,WORK,WORK,CARRY,CARRY, MOVE, MOVE, MOVE, MOVE], 'RemoteRepairer2_'+ Game.time, {
        //     memory: {
        //         role: 'remoteRepairer',
        //         targetRoom: targetRoom2,
        //         homeRoom: 'W29N28', // Твоя основна кімната
        //         repairing: false
        //     }});
        // }
        else if (remoteHaulers1_1.length < 1) {
        s1.spawnCreep([CARRY, CARRY, CARRY, CARRY,CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                          MOVE,MOVE, MOVE, MOVE,MOVE,MOVE, MOVE, MOVE,MOVE, MOVE, MOVE, MOVE, MOVE,MOVE, MOVE, MOVE, MOVE, MOVE,HEAL], 'R_HaulerW28S28' + Game.time, {
            memory: {
                role: 'remoteHauler',
                homeRoom: 'W29S28',
                deliveryId: '6a1765cbfc64d228760cf144',
                targetRoom: 'W28S28', //  віддалена кімната для пошуку
                containerIds: [
                    '6a25d5c447f9fc70c6ab36fc', // Контейнер 1
                    '6a25d710b321a6bd63a9a483', // Контейнер 2
                    //'69fb669e5e59b641886bef1b', // Контейнер 2
                            ],
                delivering: false
            }
            });
        }
        // else if (remoteHaulers1_2.length < 0) {
        // s1.spawnCreep([CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], 'R_HaulerW29S27_' + Game.time, {
        //     memory: {
        //         role: 'remoteHauler',
        //         homeRoom: 'W29S28',
        //         deliveryId: '69fc24b9c613c7023ac183d3',
        //         targetRoom: 'W29S27', // "Основна" віддалена кімната для пошуку
        //         containerIds: [
        //         '69fc5953ac156a78bd67a636', // Контейнер 2
        //         '69fc825bf4382a11335ad746',  // Контейнер 1
        //                     ],
        //         delivering: false
        //     }
        //     });
        // }
        
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
            else if(haulerS1.length <0) { 
            s1_2.spawnCreep([CARRY, CARRY,CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE,MOVE, MOVE,MOVE,MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE,MOVE, MOVE,MOVE,MOVE, MOVE], 'hauler'+Game.time,  {memory: {role: 'hauler',targetRoom: 'W29S28'}})
        }
       
        // else if (LinkerSource1.length <0){
        // s1_2.spawnCreep([CARRY, CARRY, CARRY,CARRY, CARRY, MOVE], 'SourceLinker1_', {
        // memory: { 
        //     role: 'linkerSource', 
        //     containerId: '69f5e1abbcb70acd31555319', 
        //     linkId: '6a01e57a532f25f5ab19ec66' 
        // }
        // }); 
        // }
        else if(MineralMiner_1.length < 1) {
        s1_2.spawnCreep([WORK, WORK, WORK, WORK,CARRY, CARRY, MOVE, MOVE, MOVE], 'MMiner2_' + Game.time, {
            memory: { role: 'mineralMIner', targetRoom: 'W29S28' }
        });
        }
        else if (defenderS1_2.length < 0) {
        s1_2.spawnCreep([TOUGH, TOUGH, TOUGH,TOUGH, TOUGH, MOVE , MOVE, MOVE, MOVE, MOVE, RANGED_ATTACK, ATTACK, ATTACK ], 'DEFW29S27_2_'+Game.time, {
            memory: { role: 'defender', targetRoom: 'W29S27' }
        });
        }
        else if (healers2.length < 0) {
        s1_2.spawnCreep([TOUGH, TOUGH, MOVE, MOVE, MOVE,RANGED_ATTACK,HEAL,HEAL,HEAL,HEAL ], 'MedicW29S27_2_'+Game.time, {
            memory: { role: 'healer', targetRoom: 'W29S27' }
        });
        }
        else if (defenderS1_1.length < 1) {
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
            s1_2.spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
    WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
    CARRY,CARRY,CARRY,
    MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
    MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], 'builder' + Game.time, {memory: {role: 'builder', targetRoom: 'W29S28'}});
        }
        else if(Claimer.length < 0) {
            s1_2.spawnCreep([CLAIM,CLAIM,MOVE, MOVE, MOVE], 'Claimer_'+ Game.time, {
            memory: {
                role: 'claimer',
                targetRoom: 'W28S29',
        }});
            }
         else if(upgraderS1.length < 1) {
            s1_2.spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,
                 MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE ], 'upgrader' + Game.time, {memory: {role: 'upgrader', targetRoom: 'W29S28',linkId: '69f73a85788980053d456476'}});
        } 
         else if(remoteBuilderS1.length <0 ) {
            s1_2.spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
    WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
    CARRY,CARRY,CARRY,
    MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
    MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], 'RemoteBuilder_' + Game.time, {
            memory: {
                role: 'remoteBuilder',
                targetRoom: "W29S29",
                homeRoom: 'W28S29', // Твоя основна кімната
                building: false
            }});
        }
    }
    
// --- СПАВНЕР 2 (Друга база / Експансія)  7 lvl
        let s2 = Game.spawns['Spawn2'];
        if(s2 && !s2.spawning) { // Перевіряємо чи він вільний
        if (harvesters2.length <0) {
            s2.spawnCreep([WORK,CARRY,WORK,CARRY,CARRY, MOVE, MOVE, MOVE, MOVE], 'H2_' + Game.time, {memory: {role: 'harvester', targetRoom: 'W27S29'}});
        }      
        else if(refillers2.length < 0) {
            s2.spawnCreep([CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], 'refiller_2'+Game.time, {memory: {role: 'refiller',targetRoom: 'W27S29'}});
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
        s2.spawnCreep([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE,MOVE,MOVE,MOVE,MOVE,MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE,MOVE,MOVE,MOVE,MOVE,MOVE, MOVE,MOVE,MOVE, MOVE], 'haulerS2'+Game.time,  {memory: {role: 'hauler',targetRoom: 'W27S29'}})
        }
        
       else if(MineralMiner_2.length < 1) {
        s2.spawnCreep([WORK, WORK, WORK, WORK,CARRY, CARRY, MOVE, MOVE, MOVE], 'MMiner2_' + Game.time, {
            memory: { role: 'mineralMIner', targetRoom: 'W27S29' }
        });
        }
        else if(remoteBuilderS2.length < 1) {
            s2.spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
    WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
    CARRY,CARRY,CARRY,
    MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
    MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], 'RemoteBuilder_' + Game.time, {
            memory: {
                role: 'remoteBuilder',
                targetRoom: "W27S28",
                homeRoom: 'W28S28', // Твоя основна кімната
                building: false
            }});
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
        else if (remoteHaulers2_1.length < 1 ) {
        s2.spawnCreep([CARRY, CARRY, CARRY, CARRY,CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                          MOVE,MOVE, MOVE, MOVE,MOVE,MOVE, MOVE, MOVE,MOVE, MOVE, MOVE, MOVE, MOVE,MOVE, MOVE, MOVE, MOVE, MOVE,HEAL], 'R_HaulerW27S28' + Game.time, {
            memory: {
                role: 'remoteHauler',
                homeRoom: 'W27S29',
                deliveryId: '6a231e975e9ef622c6b11baf',
                targetRoom: 'W27S28', //  віддалена кімната для пошуку
                containerIds: [
                    '6a2912efd9bb9728ea855e30', // Контейнер 1
                    // '69fc9003fcb3376e1cc0a065', // Контейнер 2
                    //'69fb669e5e59b641886bef1b', // Контейнер 2
                               ],
                delivering: false
            }
            });
        }
       
        else if(reservers2_2.length < 1) {
            s2.spawnCreep([CLAIM,CLAIM, MOVE, MOVE, MOVE], 'ReserverW26S29_'+ Game.time, {
            memory: {
                role: 'reserver',
                targetRoom: 'W26S29',
        }});
        }
        else if(upgraderS2.length <1) {
            s2.spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK, 
                CARRY,CARRY,CARRY,CARRY, CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY, CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], 'upgrader' + Game.time, {memory: {role: 'upgrader', targetRoom: 'W27S29',linkId: '6a183a707162c3849c86d173'}});
        } 
    }
    let s2_1 = Game.spawns['Spawn2_2'];
        if(s2_1 && !s2_1.spawning) { // Перевіряємо чи він вільний
        if (SpawnHaulerS2.length < 1) { 
            s2_1.spawnCreep([CARRY, CARRY,CARRY, CARRY,CARRY,CARRY, CARRY,CARRY, CARRY,CARRY,CARRY, CARRY,CARRY, CARRY,CARRY,CARRY, CARRY,CARRY, CARRY,CARRY,MOVE, MOVE, MOVE, MOVE, MOVE,MOVE, MOVE, MOVE, MOVE, MOVE], 'Spawnhauler'+Game.time,  {memory: {role: 'spawnhauler', targetRoom: 'W27S29'}})
        }
        else if (LinkerStorage2.length <1){
        s2_1.spawnCreep([CARRY, CARRY, CARRY, CARRY,CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], 'linkStorage2', {
        memory: { 
            role: 'linkerStorage', 
            linkId: '6a17638d5d6bdcd5eeb4ca61' 
        }
        }); 
        }
       else if (defenderS2_1.length < 0) {
        s2_1.spawnCreep([TOUGH, TOUGH, MOVE,TOUGH, MOVE,TOUGH, MOVE,MOVE,RANGED_ATTACK, ATTACK, ATTACK], 'DEFW28S29_'+Game.time, {
            memory: { role: 'defender', targetRoom: 'W29S29' }
        });
        }
        else if (defenderS2_2.length < 1) {
        s2_1.spawnCreep([TOUGH, TOUGH, MOVE,TOUGH, MOVE,TOUGH, MOVE,MOVE,RANGED_ATTACK, ATTACK, ATTACK], 'DEFW26S29_'+Game.time, {
            memory: { role: 'defender', targetRoom: 'W26S29' }
        });
        }
        else if (healerS2_1.length < 0) {
        s2_1.spawnCreep([TOUGH, TOUGH, RANGED_ATTACK, MOVE, MOVE, MOVE, HEAL,HEAL,HEAL ], 'MedicW28S29_1_'+Game.time, {
            memory: { role: 'healer', targetRoom: 'W29S29' }
        });
        }
        else if (healerS2_2.length < 1) {
        s2_1.spawnCreep([TOUGH, TOUGH, RANGED_ATTACK, MOVE, MOVE, MOVE, HEAL,HEAL,HEAL ], 'MedicW28S29_1_'+Game.time, {
            memory: { role: 'healer', targetRoom: 'W26S29' }
        });
        }
         else if (remoteHaulers2_2.length < 2 ) {
        s2_1.spawnCreep([CARRY, CARRY, CARRY, CARRY,CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                          MOVE,MOVE, MOVE, MOVE,MOVE,MOVE, MOVE, MOVE,MOVE, MOVE, MOVE, MOVE, MOVE,MOVE, MOVE, MOVE, MOVE, MOVE,HEAL], 'R_HaulerW26S29' + Game.time, {
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
            s2_1.spawnCreep([CLAIM,CLAIM, MOVE, MOVE, MOVE], 'ReserverW27S28_'+ Game.time, {
            memory: {
                role: 'reserver',
                targetRoom: 'W27S28',
        }});
        }
       
        else if(remoteMiners2_1.length < 0) {
        s2_1.spawnCreep([WORK, WORK, WORK, WORK, WORK,CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], 'RMiner1W28S29_' + Game.time, {
            memory: { role: 'remoteMiner', targetRoom: 'W28S29', sourceId: '55db3134efa8e3fe66e04897' }
        });
        }
        else if(remoteMiners2_2.length < 0) {
        s2_1.spawnCreep([WORK, WORK, WORK, WORK, WORK,CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], 'RMiner1W28S29_' + Game.time, {
            memory: { role: 'remoteMiner', targetRoom: 'W28S29', sourceId: '55db3134efa8e3fe66e04898' }
        });
        }
        else if(builders2.length <0) {
            s2_1.spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
    WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
    CARRY,CARRY,CARRY,
    MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
    MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], 'builder_S2' + Game.time, {memory: {role: 'builder',targetRoom: 'W27S29'}});
        }
    }
// --- СПАВНЕР 3 (ТРетя база / Експансія) 6 lvl
     let s3_1 = Game.spawns['Spawn3_1'];
        if(s3_1 && !s3_1.spawning) { // Перевіряємо чи він вільний    
        if (LinkerStorage3.length <1){
        s3_1.spawnCreep([CARRY, CARRY, CARRY, CARRY,CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], 'linkStorage3', {
        memory: { 
            role: 'linkerStorage', 
            linkId: '6a17496873d18470acf2ef44' 
        }
        }); 
        }
         
        else  if(reservers3_2.length < 1) {
            s3_1.spawnCreep([CLAIM,CLAIM, MOVE, MOVE, MOVE], 'ReserverW28S27_'+ Game.time, {
            memory: {
                role: 'reserver',
                targetRoom: 'W28S27',
        }});
        }
        else if(upgraderS3.length <1) {
            s3_1.spawnCreep([WORK,WORK, CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], 'upgrader' + Game.time, {memory: {role: 'upgrader', targetRoom: 'W27S27',linkId: '6a0c13df9e9faf0e9c1182c3'}});
        } 
         else if (remoteMinerHauler3_1.length <0) {
            s3_1.spawnCreep([WORK, WORK, WORK,WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE,CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE,CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE,CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], 'RMH_' + Game.time, {memory: { 
            role: 'remoteMinerHauler', 
            homeRoom: 'W27S27', 
            remoteRoom: 'W27S26', 
            harvesting: true,
            sourceId: '55db3154efa8e3fe66e0494d', 
            linkId: '6a2712b759ab19389d8a2d1b'     
        }});
                } 
        else if (defenderS3_2.length < 0) {
        s3_1.spawnCreep([TOUGH, TOUGH, TOUGH,TOUGH, TOUGH, MOVE , MOVE, MOVE, MOVE, MOVE,MOVE , MOVE, MOVE, MOVE, MOVE, RANGED_ATTACK, ATTACK, ATTACK ], 'DEFW279S26_2_'+Game.time, {
            memory: { role: 'defender', targetRoom: 'W27S26' }
        });
    }
        else if (healerS3_2.length < 0) {
        s3_1.spawnCreep([TOUGH, TOUGH, MOVE, MOVE, MOVE,MOVE , MOVE, MOVE, MOVE, MOVE,RANGED_ATTACK,HEAL,HEAL,HEAL,HEAL ], 'MedicW27S26_2_'+Game.time, {
            memory: { role: 'healer', targetRoom: 'W27S26' }
        });
        }
          else if (remoteHaulers3_1.length < 0 ) {
        s3_1.spawnCreep([CARRY, CARRY, CARRY, CARRY,CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                          MOVE,MOVE, MOVE, MOVE,MOVE,MOVE, MOVE, MOVE,MOVE, MOVE, MOVE, MOVE, MOVE,MOVE, MOVE, MOVE, MOVE, MOVE,HEAL], 'R_HaulerW27S28' + Game.time, {
            memory: {
                role: 'remoteHauler',
                homeRoom: 'W27S27',
                deliveryId: '6a12d083c464bd850bf17bae',
                targetRoom: 'W27S28', //  віддалена кімната для пошуку
                containerIds: [
                    '6a2911fff6a1287a873a62df', // Контейнер 1
                    // '69fc9003fcb3376e1cc0a065', // Контейнер 2
                    //'69fb669e5e59b641886bef1b', // Контейнер 2
                               ],
                delivering: false
            }
            });
        }
        
    }
    let s3 = Game.spawns['Spawn3'];
        if(s3 && !s3.spawning) { // Перевіряємо чи він вільний
         if(SpawnHaulerS3.length < 1) { 
            s3.spawnCreep([CARRY, CARRY,CARRY, CARRY,CARRY, CARRY,CARRY, CARRY,CARRY, CARRY,CARRY, CARRY,CARRY, CARRY,CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], 'Spawnhauler'+Game.time,  {memory: {role: 'spawnhauler', targetRoom: 'W27S27'}})
        }      
           else  if (harvesters3.length <0) {
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
        else if(MineralMiner_3.length < 1) {
        s3.spawnCreep([WORK, WORK, WORK, WORK,CARRY, CARRY, MOVE, MOVE, MOVE], 'MMiner3_' + Game.time, {
            memory: { role: 'mineralMIner', targetRoom: 'W27S27' }
        });
        }
         
        // else if(refillers3.length < 0) {
        //     s3.spawnCreep([CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], 'refiller_2'+Game.time, {memory: {role: 'refiller',targetRoom: 'W27S27'}});
        // }
        else if(builders3.length <0) {
            s3.spawnCreep([ WORK,WORK, WORK,WORK, WORK,WORK, WORK,WORK,WORK,WORK, WORK, CARRY, CARRY,CARRY, CARRY,CARRY, CARRY,CARRY, CARRY,CARRY, CARRY,CARRY, CARRY,CARRY, CARRY,
                  MOVE, MOVE,MOVE, MOVE, MOVE, MOVE,MOVE, MOVE, MOVE, MOVE], 'builder_S3' + Game.time, {memory: {role: 'builder',targetRoom: 'W27S27'}});
        }
        // else if(repairers3.length < 0) {
        //     s3.spawnCreep([WORK, CARRY, MOVE,WORK, CARRY, MOVE], 'repairer_3'+Game.time, {memory: {role: 'repairer',targetRoom: 'W27S27'}});
        // }
    
        // else if (defenderS3.length < 0) {
        // s3.spawnCreep([TOUGH, TOUGH, MOVE,TOUGH, MOVE,TOUGH, MOVE,MOVE,RANGED_ATTACK, ATTACK, ATTACK], 'DEFW27S27_'+Game.time, {
        //     memory: { role: 'defender', targetRoom: 'W26S26' }
        // });
        // }
        

        else if(haulerS3.length <1) { 
        s3.spawnCreep([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,CARRY, CARRY, CARRY, CARRY, CARRY,CARRY, CARRY, CARRY, CARRY, CARRY,CARRY, CARRY, CARRY, CARRY, CARRY,CARRY,
            MOVE,MOVE,MOVE, MOVE, MOVE,MOVE,MOVE,MOVE, MOVE, MOVE,MOVE], 'haulerS3'+Game.time,  {memory: {role: 'hauler',targetRoom: 'W27S27'}})
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
        // else if(remoteMiners3_3.length < 0) {
        // s3.spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE], 'RMiner3W28S27_' + Game.time, {
        //     memory: { role: 'remoteMiner', targetRoom: 'W28S27', sourceId: '55db3133efa8e3fe66e0488e' }
        // });
        // }
        // else if(remoteMiners3_4.length < 0) {
        // s3.spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE], 'RMiner3W28S27_' + Game.time, {
        //     memory: { role: 'remoteMiner', targetRoom: 'W28S27', sourceId: '55db3133efa8e3fe66e04890' }
        // });
        // }
        
        else if (defenderS3_1.length < 1) {
        s3.spawnCreep([TOUGH, TOUGH, TOUGH,TOUGH, TOUGH, MOVE,MOVE, MOVE,MOVE, MOVE, RANGED_ATTACK,RANGED_ATTACK, ATTACK, ATTACK], 'DEFW27S28_1_'+Game.time, {
            memory: { role: 'defender', targetRoom: 'W27S28' }
        });
    }
        else if (healerS3_1.length < 1) {
        s3.spawnCreep([TOUGH, TOUGH, RANGED_ATTACK, MOVE, MOVE, MOVE, HEAL,HEAL,HEAL ], 'MedicW27S28_1_'+Game.time, {
            memory: { role: 'healer', targetRoom: 'W27S28' }
        });
    }
        
        else if(reservers3_1.length < 0) {
            s3.spawnCreep([CLAIM,CLAIM, MOVE, MOVE, MOVE], 'ReserverW27S26_'+ Game.time, {
            memory: {
                role: 'reserver',
                targetRoom: 'W27S26',
        }});
        }
        else if(reservers3_2.length < 1) {
            s3.spawnCreep([CLAIM,CLAIM, MOVE, MOVE, MOVE], 'ReserverW28S27_'+ Game.time, {
            memory: {
                role: 'reserver',
                targetRoom: 'W28S27',
        }});
        }
        else if(upgraderS3.length <1) {
            s3.spawnCreep([WORK,WORK, CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], 'upgrader' + Game.time, {memory: {role: 'upgrader', targetRoom: 'W27S27',linkId: '6a0c13df9e9faf0e9c1182c3'}});
        } 
         
        
    }
// --- СПАВНЕР 4 (четверта база / Експансія) 5 lvl
        let s4 = Game.spawns['Spawn4'];
        if(s4 && !s4.spawning) { // Перевіряємо чи він вільний
        
        if(SpawnHaulerS4.length < 1) { 
            s4.spawnCreep([CARRY, CARRY,CARRY, CARRY, MOVE, MOVE], 'Spawnhauler'+Game.time,  {memory: {role: 'spawnhauler', targetRoom: 'W29S27'}})
        }
        else if (harvesters4.length <0) {
            s4.spawnCreep([CARRY,CARRY, MOVE,CARRY, MOVE, MOVE], 'H4_' + Game.time, {memory: {role: 'harvester', targetRoom: 'W29S27'}});
                } 
        else if(remoteMiners4_1.length <1) {
        s4.spawnCreep([WORK, WORK, WORK, WORK, WORK,CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], 'RMiner3W29S27_' + Game.time, {
            memory: { role: 'remoteMiner', targetRoom: "W29S27", sourceId: '55db3116efa8e3fe66e047c5' }
        });
        }

        else if(remoteMiners4_2.length <1) {
        s4.spawnCreep([WORK, WORK, WORK, WORK, WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], 'RMiner4W29S27_' + Game.time, {
            memory: { role: 'remoteMiner', targetRoom: "W29S27", sourceId: '55db3116efa8e3fe66e047c6' }
        });
        }
        else if (remoteMinerHauler4_1.length <0) {
            s4.spawnCreep([WORK, WORK, WORK,WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE,CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE,CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE,CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], 'RMH_' + Game.time, {memory: { 
            role: 'remoteMinerHauler', 
            homeRoom: 'W29S27', 
            remoteRoom: 'W29S26', 
            harvesting: true,
            sourceId: '55db3115efa8e3fe66e047c3', 
            linkId: '6a1ec9cb34a2fbc89c868aba'     
        }});
                } 
        else if (remoteMinerHauler4_2.length <0) {
            s4.spawnCreep([WORK, WORK, WORK,WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE,CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE,CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE,CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], 'RMH_' + Game.time, {memory: { 
            role: 'remoteMinerHauler', 
            homeRoom: 'W29S27', 
            remoteRoom: 'W29S26', 
            harvesting: true,
            sourceId: '55db3115efa8e3fe66e047c1', 
            linkId: '6a1ec9cb34a2fbc89c868aba'     
        }});
                } 
        // else if(refillers3.length < 0) {
        //     s3.spawnCreep([CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], 'refiller_2'+Game.time, {memory: {role: 'refiller',targetRoom: 'W27S27'}});
        // }

        else if(MineralMiner_4.length < 1) {
        s4.spawnCreep([WORK, WORK, WORK, WORK,CARRY,CARRY, CARRY, MOVE, MOVE, MOVE], 'MMiner4_' + Game.time, {
            memory: { role: 'mineralMIner', targetRoom: 'W29S27' }
        });
        }
        else if(builders4.length <0) {
            s4.spawnCreep([WORK,WORK, WORK,WORK, WORK,WORK, WORK, CARRY, CARRY,CARRY, CARRY,CARRY, CARRY,CARRY, CARRY,CARRY, CARRY,CARRY, CARRY,
                  MOVE, MOVE,MOVE, MOVE, MOVE, MOVE,MOVE, MOVE, MOVE, MOVE], 'builder_S4' + Game.time, {memory: {role: 'builder',targetRoom: 'W29S27'}});
        }
       
        else if(haulerS4.length <1) { 
        s4.spawnCreep([CARRY, CARRY, CARRY,CARRY, CARRY, CARRY,CARRY, CARRY, CARRY,CARRY, CARRY, CARRY,CARRY, CARRY, CARRY,CARRY, CARRY, CARRY,MOVE, MOVE,MOVE,MOVE, MOVE,MOVE,MOVE, MOVE,MOVE], 'haulerS4'+Game.time,  {memory: {role: 'hauler',targetRoom: 'W29S27'}})
        }
        else if (LinkerStorage4.length <1){
        s4.spawnCreep([CARRY, CARRY, CARRY, CARRY,CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], 'linkStorage4', {
        memory: { 
            role: 'linkerStorage', 
            linkId: '6a19dfcad1a6e81d67d9dd27' 
        }
        }); 
        }
        else if(upgraderS4.length <2) {
            s4.spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY, MOVE,MOVE], 'upgrader' + Game.time, {memory: {role: 'upgrader', targetRoom: 'W29S27',linkId: '6a16f3baa0d86e511bb53c19'}});
        } 
        
        else if(remoteMiners4_3.length < 1) {
        s4.spawnCreep([WORK, WORK, WORK, WORK, WORK,CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], 'RMiner3W28S27_' + Game.time, {
            memory: { role: 'remoteMiner', targetRoom: 'W28S27', sourceId: '55db3133efa8e3fe66e0488e' }
        });
        }
        else if(remoteMiners4_4.length < 1) {
        s4.spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY,MOVE, MOVE, MOVE, MOVE, MOVE], 'RMiner3W28S27_' + Game.time, {
            memory: { role: 'remoteMiner', targetRoom: 'W28S27', sourceId: '55db3133efa8e3fe66e04890' }
        });
        }
        else if (remoteHaulers4_1.length < 2 ) {
        s4.spawnCreep([CARRY, CARRY, CARRY, CARRY,CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                           MOVE,MOVE,MOVE, MOVE, MOVE,MOVE, MOVE, MOVE, MOVE, MOVE,MOVE, MOVE, MOVE, MOVE, MOVE,HEAL], 'R_HaulerW28S27' + Game.time, {
            memory: {
                role: 'remoteHauler',
                homeRoom: 'W29S27',
                deliveryId: '6a1a03a14f03e80f8e25132f',
                targetRoom: 'W28S27', //  віддалена кімната для пошуку
                 containerIds: [
                    '6a19e9f3ace432d204526e3b', // Контейнер 1
                    '6a19eeab4fc55c134c4cc268', // Контейнер 2
                    //'69fb669e5e59b641886bef1b', // Контейнер 2
                            ],
                delivering: false
            }
            });
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
    // --- СПАВНЕР 5 (четверта база / Експансія) 5 lvl
        let s5 = Game.spawns['Spawn5'];
        if(s5 && !s5.spawning) { // Перевіряємо чи він вільний
        
        if(SpawnHaulerS5.length < 1) { 
            s5.spawnCreep([CARRY, CARRY,CARRY, CARRY, MOVE, MOVE], 'Spawnhauler'+Game.time,  {memory: {role: 'spawnhauler', targetRoom: 'W28S29'}})
        }
        //  if (harvesters5.length <1) {
        //     s5.spawnCreep([WORK,CARRY,CARRY, MOVE, MOVE], 'H5_' + Game.time, {memory: {role: 'harvester', targetRoom: 'W28S29'}});
        //         } 
        else if(minerS5_1.length <1) {
            s5.spawnCreep([WORK, WORK, WORK, WORK, WORK,CARRY, MOVE,MOVE], 'RMinerS5_' + Game.time, {
                memory: { role: 'remoteMiner', targetRoom: "W28S29", sourceId: '55db3134efa8e3fe66e04897' }
            });
            }
            else if(minerS5_2.length <1) {
        s5.spawnCreep([WORK, WORK, WORK, WORK, WORK,CARRY, MOVE,MOVE], 'RMinerS5_' + Game.time, {
            memory: { role: 'remoteMiner', targetRoom: "W28S29", sourceId: '55db3134efa8e3fe66e04898'  }
        });
        }
        else if (LinkerStorage5.length <0){
        s5.spawnCreep([CARRY, CARRY, CARRY, CARRY,CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], 'linkStorage5', {
        memory: { 
            role: 'linkerStorage', 
            linkId: '6a28f72d0b346572948cf561' 
        }
        }); 
        }
        else if(remoteMiners5_1.length <1) {
        s5.spawnCreep([WORK, WORK, WORK, WORK, WORK,CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], 'RMiner3W29S29_' + Game.time, {
            memory: { role: 'remoteMiner', targetRoom: "W29S29", sourceId: '55db3117efa8e3fe66e047cd' }
        });
        }

        // else if(remoteMiners4_2.length <1) {
        // s4.spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], 'RMiner4W29S27_' + Game.time, {
        //     memory: { role: 'remoteMiner', targetRoom: "W29S27", sourceId: '55db3116efa8e3fe66e047c6' }
        // });
        // }
        // else if(refillers3.length < 0) {
        //     s3.spawnCreep([CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], 'refiller_2'+Game.time, {memory: {role: 'refiller',targetRoom: 'W27S27'}});
        // }

        // else if(MineralMiner_4.length < 1) {
        // s4.spawnCreep([WORK, WORK, WORK, WORK,CARRY, CARRY, MOVE, MOVE, MOVE], 'MMiner4_' + Game.time, {
        //     memory: { role: 'mineralMIner', targetRoom: 'W29S27' }
        // });
        // }
        // else if(builders4.length <0) {
        //     s4.spawnCreep([WORK,WORK, WORK,WORK, WORK,WORK, WORK, CARRY, CARRY,CARRY, CARRY,CARRY, CARRY,CARRY, CARRY,CARRY, CARRY,CARRY, CARRY,
        //           MOVE, MOVE,MOVE, MOVE, MOVE, MOVE,MOVE, MOVE, MOVE, MOVE], 'builder_S3' + Game.time, {memory: {role: 'builder',targetRoom: 'W29S27'}});
        // }
        // else if(repairers3.length < 0) {
        //     s3.spawnCreep([WORK, CARRY, MOVE,WORK, CARRY, MOVE], 'repairer_3'+Game.time, {memory: {role: 'repairer',targetRoom: 'W27S27'}});
        // }
        // else if (defenderS3.length < 0) {
        //     s3.spawnCreep([TOUGH, TOUGH, MOVE,TOUGH, MOVE,TOUGH, MOVE,MOVE,RANGED_ATTACK, ATTACK, ATTACK], 'DEFW27S27_'+Game.time, {
        //     memory: { role: 'defender', targetRoom: 'W26S26' }
        // });
        // } 
        else if(haulerS5.length <1) { 
        s5.spawnCreep([CARRY, CARRY, CARRY,CARRY, CARRY,CARRY, CARRY, CARRY,CARRY, CARRY, CARRY, CARRY,CARRY, CARRY, CARRY,CARRY, CARRY,CARRY, CARRY, CARRY,MOVE, MOVE,MOVE,MOVE, MOVE,MOVE,MOVE, MOVE,MOVE,MOVE, MOVE,MOVE], 'haulerS5'+Game.time,  {memory: {role: 'hauler',targetRoom: 'W28S29'}})
        }
        // else if (LinkerStorage4.length <1){
        // s4.spawnCreep([CARRY, CARRY, CARRY, CARRY,CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], 'linkStorage4', {
        // memory: { 
        //     role: 'linkerStorage', 
        //     linkId: '6a19dfcad1a6e81d67d9dd27' 
        // }
        // }); 
        // }
        else if(upgraderS5.length <1) {
            s5.spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,WORK,WORK,CARRY,CARRY,CARRY,CARRY, MOVE,MOVE,CARRY,CARRY, MOVE,MOVE], 'upgrader' + Game.time, {memory: {role: 'upgrader', targetRoom: 'W28S29',linkId: '6a28f72d0b346572948cf561'}});
        } 
        
        // else if(remoteMiners4_3.length < 1) {
        // s4.spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE], 'RMiner3W28S27_' + Game.time, {
        //     memory: { role: 'remoteMiner', targetRoom: 'W28S27', sourceId: '55db3133efa8e3fe66e0488e' }
        // });
        // }
        // else if(remoteMiners4_4.length < 1) {
        // s4.spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE], 'RMiner3W28S27_' + Game.time, {
        //     memory: { role: 'remoteMiner', targetRoom: 'W28S27', sourceId: '55db3133efa8e3fe66e04890' }
        // });
        // }
        else if (remoteHaulers5_1.length < 1 ) {
        s5.spawnCreep([CARRY, CARRY, CARRY, CARRY,CARRY, CARRY,CARRY, CARRY, CARRY, CARRY,CARRY, CARRY, CARRY, CARRY, CARRY,
                           MOVE, MOVE, MOVE, MOVE, MOVE,MOVE,MOVE, MOVE, MOVE, MOVE, MOVE,MOVE, MOVE, MOVE, MOVE, MOVE,HEAL], 'R_HaulerW29S29' + Game.time, {
            memory: {
                role: 'remoteHauler',
                homeRoom: 'W28S29',
                deliveryId: '6a290dd0d90a1de551b1a71a',
                targetRoom: 'W29S29', //  віддалена кімната для пошуку
                 containerIds: [
                    '6a25c72506a19d03ff9dde79', // Контейнер 1
                    // '6a19eeab4fc55c134c4cc268', // Контейнер 2
                    //'69fb669e5e59b641886bef1b', // Контейнер 2
                            ],
                delivering: false
            }
            });
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
        else if (defenderS5_1.length < 1) {
        s5.spawnCreep([TOUGH, TOUGH, TOUGH,TOUGH, TOUGH, MOVE , MOVE, MOVE, MOVE, MOVE, RANGED_ATTACK, ATTACK, ATTACK, ATTACK, ATTACK ], 'DEFW29S29_'+Game.time, {
            memory: { role: 'defender', targetRoom: 'W29S29' }
        });
    }
        else if (healerS5_1.length < 1) {
        s5.spawnCreep([TOUGH, TOUGH, MOVE, MOVE, MOVE,RANGED_ATTACK,HEAL,HEAL,HEAL,HEAL ], 'MedicW29S29_'+Game.time, {
            memory: { role: 'healer', targetRoom: 'W29S29' }
        });
        }
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
        else if(reservers5_1.length < 1) {
            s5.spawnCreep([CLAIM,CLAIM,MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], 'ReserverW29S29_'+ Game.time, {
            memory: {
                role: 'reserver',
                targetRoom: 'W29S29',
        }});
        }
    //     else if(reservers3_2.length < 1) {
    //         s3.spawnCreep([CLAIM,CLAIM, MOVE, MOVE, MOVE], 'ReserverW28S27_'+ Game.time, {
    //         memory: {
    //             role: 'reserver',
    //             targetRoom: 'W28S27',
    //     }});
    //     }

        
    }
//indastry
    for(let roomName in Game.rooms){
        let room = Game.rooms[roomName];
        
        // Запускаємо виробництво тільки там, де кімната належить нам (активний контролер)
        if (room.controller && room.controller.my) {
            industry.run(room);
        }
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
        if(creep.memory.role == 'mineralMIner') {
                    roleMineralMiner.run(creep);
        }
        if(creep.memory.role == 'remoteMinerHauler') {
            roleRemoteMinerHauler.run(creep);
        }
    }
};