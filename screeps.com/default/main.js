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
    var harvesters2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester'&& creep.memory.targetRoom == "W27S29");
    var upgraderS1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader'&& creep.memory.targetRoom == "W29S28");
    var upgraderS2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader'&& creep.memory.targetRoom == "W27S29");
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder'&& creep.memory.targetRoom == "W29S28");
    var builders2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder'&& creep.memory.targetRoom == "W27S29");
    var defenders = _.filter(Game.creeps, (creep) => creep.memory.role == 'defender'&& creep.memory.targetRoom == "W28S28");
    var defendersS2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'defender'&& creep.memory.targetRoom == "W27S29");
    var defenders2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'defender'&& creep.memory.targetRoom == "W29S27");
    var healers = _.filter(Game.creeps, (creep) => creep.memory.role == 'healer'&& creep.memory.targetRoom =="W28S28");
    var healers2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'healer'&& creep.memory.targetRoom == "W29S27");
    var refillers = _.filter(Game.creeps, (creep) => creep.memory.role == 'refiller'&& creep.memory.targetRoom == "W29S28");
    var refillers2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'refiller'&& creep.memory.targetRoom == "W27S29");
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer'&& creep.memory.targetRoom == "W29S28");
    var repairers2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer'&& creep.memory.targetRoom == "W27S29");
    var miner = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');
    var minerS2_1 = _.filter(Game.creeps, (c) => c.memory.role == 'remoteMiner' && c.memory.sourceId == '55db3155efa8e3fe66e04958');
    var minerS2_2 = _.filter(Game.creeps, (c) => c.memory.role == 'remoteMiner' && c.memory.sourceId == '55db3155efa8e3fe66e04957');
    var towers = _.filter(Game.structures, s => s.structureType == STRUCTURE_TOWER);
    var haulerS1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler'&& creep.memory.targetRoom == "W29S28");
    var haulerS2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler'&& creep.memory.targetRoom == "W27S29");
    var minersOnSource = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner' && creep.memory.targetSourceId == '55db3116efa8e3fe66e047c9');
    var remoteBuilders = _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteBuilder' && creep.memory.targetRoom == "W29S27");
    var remoteRepairer = _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteRepairer' && creep.memory.targetRoom == targetRoom);
    var remoteRepairer2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteRepairer' && creep.memory.targetRoom == targetRoom2);
    var reserver = _.filter(Game.creeps, (creep) => creep.memory.role == 'reserver' && creep.memory.targetRoom == 'W28S28');
    var reserver2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'reserver' && creep.memory.targetRoom == 'W29S27');
    var SpawnHaulerS1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'spawnhauler'&& creep.memory.targetRoom == "W29S28");
    var SpawnHaulerS2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'spawnhauler'&& creep.memory.targetRoom == "W27S29");
    var remoteMiners1 = _.filter(Game.creeps, (c) => c.memory.role == 'remoteMiner' && c.memory.sourceId == '55db3133efa8e3fe66e04894');
    var remoteMiners2 = _.filter(Game.creeps, (c) => c.memory.role == 'remoteMiner' && c.memory.sourceId == '55db3133efa8e3fe66e04892');
    var remoteMiners3 = _.filter(Game.creeps, (c) => c.memory.role == 'remoteMiner' && c.memory.sourceId == '55db3116efa8e3fe66e047c5');
    var remoteMiners4 = _.filter(Game.creeps, (c) => c.memory.role == 'remoteMiner' && c.memory.sourceId == '55db3116efa8e3fe66e047c6');
    var remoteMiners5 = _.filter(Game.creeps, (c) => c.memory.role == 'remoteMiner' && c.memory.sourceId == '55db3155efa8e3fe66e04958');
    var remoteMiners6 = _.filter(Game.creeps, (c) => c.memory.role == 'remoteMiner' && c.memory.sourceId == '55db3155efa8e3fe66e04957');
    var remoteHaulers=_.filter(Game.creeps, (creep) => creep.memory.role == 'remoteHauler'&& creep.memory.targetRoom == targetRoom);
    var remoteHaulers2=_.filter(Game.creeps, (creep) => creep.memory.role == 'remoteHauler'&& creep.memory.targetRoom == targetRoom2);
    var LinkerSource1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'linkerSource');
    var LinkerStorage1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'linkerStorage');
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
        let sourceLink1 = Game.getObjectById('69fc24b9c613c7023ac183d3');
        let sourceLink2 = Game.getObjectById('6a01e57a532f25f5ab19ec66'); 
        let targetLink = Game.getObjectById('69fc2634d975101081adde17');

    // 2. Перевіряємо перший лінк-джерело
    if (sourceLink1 && targetLink && sourceLink1.cooldown == 0) {
    if (sourceLink1.store.getUsedCapacity(RESOURCE_ENERGY) >= 100) {
        sourceLink1.transferEnergy(targetLink);
    }
}

    // 3. Перевіряємо другий лінк-джерело
    // Він працює незалежно: якщо перший на перезарядці, цей все одно відправить енергію
    if (sourceLink2 && targetLink && sourceLink2.cooldown == 0) {
    if (sourceLink2.store.getUsedCapacity(RESOURCE_ENERGY) >= 100) {
        sourceLink2.transferEnergy(targetLink);
    }
}
    // 3. Автоматичне створення кріпів
    let s1 = Game.spawns['Spawn1'];
    if(!s1.spawning) { // Перевіряємо тільки якщо спавн вільний
    if(harvesters.length <1) {
        s1.spawnCreep([WORK, CARRY, CARRY, MOVE, MOVE], 'H' + Game.time, {memory: {role: 'harvester', targetRoom: 'W29S28'}});
    } 
    else if(SpawnHaulerS1.length < 1) { 
        s1.spawnCreep([CARRY, CARRY,CARRY, CARRY,CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], 'Spawnhauler'+Game.time,  {memory: {role: 'spawnhauler', targetRoom: 'W29S28'}})
    }
    else if(miner.length < 2) {
        if(minersOnSource.length < 1) {
        s1.spawnCreep([WORK, WORK,WORK, WORK, WORK, MOVE], 'Miner1_' + Game.time, {memory: { role: 'miner', targetSourceId: '55db3116efa8e3fe66e047c9' }});
        }
        else {
        s1.spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE], 'Miner1_2_' + Game.time, {
            memory: { role: 'miner', targetSourceId: '55db3116efa8e3fe66e047cb' }});
        }
    }
    else if(haulerS1.length <2) { 
        s1.spawnCreep([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE,MOVE, MOVE], 'hauler'+Game.time,  {memory: {role: 'hauler',targetRoom: 'W29S28'}})
 }
    else if(refillers.length < 1) {
        s1.spawnCreep([CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], 'refiller'+Game.time, {memory: {role: 'refiller', targetRoom: 'W29S28'}});
    }
    else if (defenders.length < 2) {
    s1.spawnCreep([TOUGH, TOUGH, TOUGH,TOUGH, TOUGH, MOVE,MOVE, MOVE,MOVE, MOVE, RANGED_ATTACK,RANGED_ATTACK, ATTACK, ATTACK], 'DEFW28S28_1_'+Game.time, {
        memory: { role: 'defender', targetRoom: 'W28S28' }
    });
}
    else if (healers.length < 1) {
    s1.spawnCreep([TOUGH, TOUGH, RANGED_ATTACK, MOVE, MOVE, MOVE, HEAL,HEAL,HEAL ], 'MedicW28S28_1_'+Game.time, {
        memory: { role: 'healer', targetRoom: 'W28S28' }
    });
}
    else if (defenders2.length < 2) {
    s1.spawnCreep([TOUGH, TOUGH, TOUGH,TOUGH, TOUGH, MOVE , MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK ], 'DEFW29S27_2_'+Game.time, {
        memory: { role: 'defender', targetRoom: 'W29S27' }
    });
}
    else if (healers2.length < 1) {
    s1.spawnCreep([TOUGH, TOUGH, MOVE, MOVE, MOVE,RANGED_ATTACK,HEAL,HEAL,HEAL,HEAL ], 'MedicW29S27_2_'+Game.time, {
        memory: { role: 'healer', targetRoom: 'W29S27' }
    });
}
     else if (LinkerSource1.length <1){
    s1.spawnCreep([CARRY, CARRY, CARRY,CARRY, CARRY, MOVE], 'SourceLinker1_', {
    memory: { 
        role: 'linkerSource', 
        containerId: '69f5e1abbcb70acd31555319', 
        linkId: '6a01e57a532f25f5ab19ec66' 
    }
    }); 
    }
    else if(remoteMiners1.length < 1) {
    s1.spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE], 'RMiner1W28S28_' + Game.time, {
        memory: { role: 'remoteMiner', targetRoom: targetRoom, sourceId: '55db3133efa8e3fe66e04894' }
    });
}
   
     else if (LinkerStorage1.length <1){
    s1.spawnCreep([WORK,WORK,CARRY, CARRY, CARRY, CARRY,CARRY, CARRY, CARRY, CARRY, CARRY, MOVE], 'SourceStorage1', {
    memory: { 
        role: 'linkerStorage', 
        linkId: '69fc2634d975101081adde17' 
    }
    }); 
    }
    else if(remoteMiners2.length < 1) {
    s1.spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], 'RMiner2W28S28_' + Game.time, {
        memory: { role: 'remoteMiner', targetRoom: targetRoom, sourceId: '55db3133efa8e3fe66e04892' }
    });
}
    else if(remoteMiners3.length <1) {
    s1.spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], 'RMiner3W29S27_' + Game.time, {
        memory: { role: 'remoteMiner', targetRoom: "W29S27", sourceId: '55db3116efa8e3fe66e047c5' }
    });
    }

    else if(remoteMiners4.length <1) {
    s1.spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], 'RMiner4W29S27_' + Game.time, {
        memory: { role: 'remoteMiner', targetRoom: "W29S27", sourceId: '55db3116efa8e3fe66e047c6' }
    });
    }
    else if(remoteMiners5.length <0) {
    s1.spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], 'RMiner4_' + Game.time, {
        memory: { role: 'remoteMiner', targetRoom: "W27S29", sourceId: '' }
    });
    }
    else if(remoteMiners6.length <0) {
    s1.spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], 'RMiner5_' + Game.time, {
        memory: { role: 'remoteMiner', targetRoom: "W27S29", sourceId: ''  }
    });
    }
    else if(upgraderS1.length < 3) {
        s1.spawnCreep([ WORK, WORK, WORK,  WORK, WORK,WORK,WORK,WORK, CARRY,CARRY, CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], 'upgrader' + Game.time, {memory: {role: 'upgrader', targetRoom: 'W29S28'}});
    } 
    else if(reserver.length < 1) {
        s1.spawnCreep([CLAIM, MOVE, MOVE, MOVE], 'ReserverW28S28_'+ Game.time, {
        memory: {
            role: 'reserver',
            targetRoom: 'W28S28',
       }});
    }
    else if(reserver2.length < 1) {
        s1.spawnCreep([CLAIM, MOVE, MOVE, MOVE], 'ReserverW29S27_'+ Game.time, {
        memory: {
            role: 'reserver',
            targetRoom: 'W29S27',
       }});
    }
    else if(repairers.length < 0) {
        s1.spawnCreep([WORK, CARRY, MOVE,WORK, CARRY, MOVE], 'repairer'+Game.time, {memory: {role: 'repairer', targetRoom: 'W29S28'}});
    }
    if(builders.length <1) {
        s1.spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK, CARRY, CARRY,CARRY, CARRY,MOVE,MOVE], 'builder' + Game.time, {memory: {role: 'builder', targetRoom: 'W29S28'}});
    }
    else if(remoteBuilders.length < 1) {
        s1.spawnCreep([WORK,WORK,WORK,CARRY,CARRY, CARRY, CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], 'RemoteBuilder_' + Game.time, {
        memory: {
            role: 'remoteBuilder',
            targetRoom: "W29S27",
            homeRoom: 'W28S28', // Твоя основна кімната
            building: false
        }});
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
    else if (remoteHaulers.length < 3) {
    s1.spawnCreep([CARRY, CARRY, CARRY, CARRY, CARRY,CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], 'R_HaulerW28S28' + Game.time, {
        memory: {
            role: 'remoteHauler',
            homeRoom: 'W29S28',
            deliveryId: '69fcde94d4fa99eda6797c61',
            targetRoom: 'W28S28', //  віддалена кімната для пошуку
            containerIds: [
                '69fb61de5ebc757f37c144d8', // Контейнер 1
                '69fc9003fcb3376e1cc0a065', // Контейнер 2
                //'69fb669e5e59b641886bef1b', // Контейнер 2
                           ],
            delivering: false
        }
         });
      }
    else if (remoteHaulers2.length < 3) {
    s1.spawnCreep([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], 'R_HaulerW29S27_' + Game.time, {
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
      else if(Claimer.length < 0) {
        s1.spawnCreep([CLAIM,MOVE, MOVE, MOVE], 'Claimer_'+ Game.time, {
        memory: {
            role: 'claimer',
            targetRoom: 'W27S29',
       }});
        }
    }

// --- СПАВНЕР 2 (Друга база / Експансія) ---
    let s2 = Game.spawns['Spawn2'];
    if(s2 && !s2.spawning) { // Перевіряємо, чи існує Spawn2 і чи він вільний
        if (harvesters2.length < 1) {
        s2.spawnCreep([WORK,CARRY,CARRY, MOVE, MOVE], 'H2_' + Game.time, {memory: {role: 'harvester', targetRoom: 'W27S29'}});
    } 
    else if(builders2.length <1) {
        s2.spawnCreep([WORK, CARRY, CARRY,MOVE, MOVE], 'builder_S2' + Game.time, {memory: {role: 'builder',targetRoom: 'W27S29'}});
    }
    else if(repairers2.length < 0) {
        s2.spawnCreep([WORK, CARRY, MOVE,WORK, CARRY, MOVE], 'repairer_2'+Game.time, {memory: {role: 'repairer',targetRoom: 'W27S29'}});
    }
    else if(refillers2.length < 1) {
        s2.spawnCreep([CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], 'refiller_2'+Game.time, {memory: {role: 'refiller',targetRoom: 'W27S29'}});
    }
    else if (defendersS2.length < 2) {
    s2.spawnCreep([TOUGH, TOUGH, MOVE,TOUGH, MOVE,TOUGH, MOVE,MOVE, ATTACK, ATTACK], 'DEFW27S29_'+Game.time, {
        memory: { role: 'defender', targetRoom: 'W27S29' }
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
    else if(haulerS2.length <2) { 
     s2.spawnCreep([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE,MOVE, MOVE], 'haulerS2'+Game.time,  {memory: {role: 'hauler',targetRoom: 'W27S29'}})
    }
    else if(upgraderS2.length <1) {
        s2.spawnCreep([ WORK, WORK, WORK,  WORK, WORK,WORK,WORK,WORK, CARRY,CARRY, CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], 'upgrader' + Game.time, {memory: {role: 'upgrader', targetRoom: 'W27S29'}});
    } 
    else if(SpawnHaulerS2.length < 1) { 
        s2.spawnCreep([CARRY, CARRY,CARRY, CARRY,CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], 'Spawnhauler'+Game.time,  {memory: {role: 'spawnhauler', targetRoom: 'W27S29'}})
    }
}

        // 4. Запуск логіки (тепер він поза умовами спавну і працює завжди)
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