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
var targetRoom = 'W29S28';
var targetRoom2 = 'W28S28';
var roleReserver = require('role.reserver')
var roleSpawnHauler = require('role.spawnhauler');
var roleRemoteMiner = require('role.remoteMiner');
var roleRemoteHauler = require('role.remoteHauler');
var roleLinkerSource = require('role.linkerSource');
var roleLinkerStorage = require('role.linkerStorage');
var roleHealer = require('role.healer');

module.exports.loop = function () {
    // 1. Очищення пам'яті
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Очищення пам\'яті неіснуючого кріпа:', name);
        }
    }

    // 2. Рахуємо наявні зміні
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var defenders = _.filter(Game.creeps, (creep) => creep.memory.role == 'defender'&& creep.memory.targetRoom == "W12N19");
    var defenders2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'defender'&& creep.memory.targetRoom == "W13N19");
    var healers = _.filter(Game.creeps, (creep) => creep.memory.role == 'healer'&& creep.memory.targetRoom =="W12N19");
    var healers2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'healer'&& creep.memory.targetRoom == "W13N19");
    var refillers = _.filter(Game.creeps, (creep) => creep.memory.role == 'refiller');
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    var miner = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');
    var towers = _.filter(Game.structures, s => s.structureType == STRUCTURE_TOWER);
    var haulers = _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler');
    var minersOnSource = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner' && creep.memory.targetSourceId == '55db3116efa8e3fe66e047c9');
    var remoteBuilders = _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteBuilder' && creep.memory.targetRoom == targetRoom);
    var remoteRepairer = _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteRepairer' && creep.memory.targetRoom == targetRoom);
    var remoteRepairer2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteRepairer' && creep.memory.targetRoom == targetRoom2);
    var reserver = _.filter(Game.creeps, (creep) => creep.memory.role == 'reserver' && creep.memory.targetRoom == 'W12N19');
    var reserver2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'reserver' && creep.memory.targetRoom == 'W13N19');
    var SpawnHaulers = _.filter(Game.creeps, (creep) => creep.memory.role == 'spawnhauler');
    var remoteMiners1 = _.filter(Game.creeps, (c) => c.memory.role == 'remoteMiner' && c.memory.sourceId == '695e9c0db48f5100290aa589');
    var remoteMiners2 = _.filter(Game.creeps, (c) => c.memory.role == 'remoteMiner' && c.memory.sourceId == '695e9c0db48f5100290aa586');
    var remoteMiners3 = _.filter(Game.creeps, (c) => c.memory.role == 'remoteMiner' && c.memory.sourceId == '695e9c0db48f5100290aa587');
    var remoteHaulers=_.filter(Game.creeps, (creep) => creep.memory.role == 'remoteHauler'&& creep.memory.targetRoom == targetRoom);
    var remoteHaulers2=_.filter(Game.creeps, (creep) => creep.memory.role == 'remoteHauler'&& creep.memory.targetRoom == targetRoom2);
    var LinkerSource1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'linkerSource');
    var LinkerStorage1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'linkerStorage');
    
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
                           s.hits < 30000;}
            });
            if(defensiveRepair) {
                tower.repair(defensiveRepair);
            }
        }
    }
}
        let sourceLink = Game.getObjectById('69ee860b93ea720048d06645');
        let targetLink = Game.getObjectById('69ee7b1e6919ad003ce84f4e');

        if (sourceLink && targetLink && sourceLink.cooldown == 0) {
        if (sourceLink.store.getUsedCapacity(RESOURCE_ENERGY) >= 400) {
        sourceLink.transferEnergy(targetLink);
    }
}
    // 3. Автоматичне створення кріпів
    if(harvesters.length <7) {
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK, CARRY, CARRY, CARRY,MOVE, MOVE], 'H' + Game.time, {memory: {role: 'harvester'}});
    } 
    else if(SpawnHaulers.length < 0) { 
        Game.spawns['Spawn1'].spawnCreep([ CARRY, CARRY, CARRY, CARRY, MOVE, MOVE], 'Spawnhauler'+Game.time,  {memory: {role: 'spawnhauler'}})
    }
    else if(miner.length < 2) {
        if(minersOnSource.length < 1) {
        Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, MOVE], 'Miner1_' + Game.time, {memory: { role: 'miner', targetSourceId: '55db3116efa8e3fe66e047c9' }});
        }
        else {
        Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, MOVE], 'Miner1_2_' + Game.time, {
            memory: { role: 'miner', targetSourceId: '55db3116efa8e3fe66e047cb' }});
        }
    }
    else if(haulers.length <0) { 
        Game.spawns['Spawn1'].spawnCreep([CARRY, CARRY, CARRY, CARRY, MOVE,MOVE, MOVE], 'hauler'+Game.time,  {memory: {role: 'hauler'}})
 }
    else if(refillers.length < 1) {
        Game.spawns['Spawn1'].spawnCreep([CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], 'refiller'+Game.time, {memory: {role: 'refiller'}});
    }
    else if (defenders.length < 0) {
    Game.spawns['Spawn1'].spawnCreep([TOUGH, TOUGH, TOUGH,TOUGH, TOUGH, MOVE,MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK], 'DEF_1_'+Game.time, {
        memory: { role: 'defender', targetRoom: 'W12N19' }
    });
}
    else if (healers.length < 0) {
    Game.spawns['Spawn1'].spawnCreep([TOUGH, TOUGH, RANGED_ATTACK, MOVE, MOVE, MOVE, HEAL,HEAL,HEAL,HEAL ], 'Medic_1_'+Game.time, {
        memory: { role: 'healer', targetRoom: 'W12N19' }
    });
}
    else if (defenders2.length < 0) {
    Game.spawns['Spawn1'].spawnCreep([TOUGH, TOUGH, TOUGH,TOUGH, TOUGH, MOVE , MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK ], 'DEF_2_'+Game.time, {
        memory: { role: 'defender', targetRoom: 'W13N19' }
    });
}
    else if (healers2.length < 0) {
    Game.spawns['Spawn1'].spawnCreep([TOUGH, TOUGH, MOVE, MOVE, MOVE,RANGED_ATTACK,HEAL,HEAL,HEAL,HEAL ], 'Medic_2_'+Game.time, {
        memory: { role: 'healer', targetRoom: 'W13N19' }
    });
}
     else if (LinkerSource1.length <0){
    Game.spawns['Spawn1'].spawnCreep([CARRY, CARRY, CARRY,CARRY, CARRY, MOVE], 'SourceLinker1_', {
    memory: { 
        role: 'linkerSource', 
        containerId: '69ee68dd2f9ec40037e43c83', 
        linkId: '69ee860b93ea720048d06645' 
    }
}); 
    }
    else if(remoteMiners1.length < 0) {
    Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE], 'RMiner1_' + Game.time, {
        memory: { role: 'remoteMiner', targetRoom: targetRoom, sourceId: '695e9c0db48f5100290aa589' }
    });
}
   
     else if (LinkerStorage1.length <0){
    Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY, CARRY, CARRY, CARRY, CARRY, MOVE], 'SourceStorage1', {
    memory: { 
        role: 'linkerStorage', 
        linkId: '69ee7b1e6919ad003ce84f4e' 
    }
}); 
    }


    else if(remoteMiners2.length < 0) {
    Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], 'RMiner2_' + Game.time, {
        memory: { role: 'remoteMiner', targetRoom: targetRoom2, sourceId: '695e9c0db48f5100290aa586' }
    });
}
    else if(remoteMiners3.length <0) {
    Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], 'RMiner3_' + Game.time, {
        memory: { role: 'remoteMiner', targetRoom: targetRoom2, sourceId: '695e9c0db48f5100290aa587' }
    });
}
    if(upgraders.length < 0) {
        Game.spawns['Spawn1'].spawnCreep([ WORK, CARRY, MOVE], 'upgrader' + Game.time, {memory: {role: 'upgrader'}});
    } 
    
    else if(reserver.length < 0) {
        Game.spawns['Spawn1'].spawnCreep([CLAIM, MOVE, MOVE, MOVE], 'Reserver1_'+ Game.time, {
        memory: {
            role: 'reserver',
            targetRoom: 'W12N19',
       }});
    }
    else if(reserver2.length < 0) {
        Game.spawns['Spawn1'].spawnCreep([CLAIM, MOVE, MOVE, MOVE], 'Reserver2_'+ Game.time, {
        memory: {
            role: 'reserver',
            targetRoom: 'W13N19',
       }});
    }
    else if(repairers.length < 0) {
        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE,WORK, CARRY, MOVE], 'repairer'+Game.time, {memory: {role: 'repairer'}});
    }
    if(builders.length <6) {
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK, CARRY, CARRY,MOVE], 'builder' + Game.time, {memory: {role: 'builder'}});
    }
    else if(remoteBuilders.length < 0) {
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,CARRY,CARRY, CARRY, CARRY,MOVE,MOVE,MOVE,MOVE,], 'RemoteBuilder_' + Game.time, {
        memory: {
            role: 'remoteBuilder',
            targetRoom: targetRoom,
            homeRoom: 'W11N19', // Твоя основна кімната
            building: false
        }});
    }
     
    else if(remoteRepairer.length <1) {
        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY,CARRY, MOVE, MOVE], 'RemoteRepairer1_'+ Game.time, {
        memory: {
            role: 'remoteRepairer',
            targetRoom: targetRoom,
            homeRoom: 'W29S28', // Твоя основна кімната
            repairing: false
        }});
    }
    else if(remoteRepairer2.length <0) {
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,CARRY, MOVE, MOVE, MOVE, MOVE], 'RemoteRepairer2_'+ Game.time, {
        memory: {
            role: 'remoteRepairer',
            targetRoom: targetRoom2,
            homeRoom: 'W11N19', // Твоя основна кімната
            repairing: false
        }});
    }
    else if (remoteHaulers.length < 0) {
    Game.spawns['Spawn1'].spawnCreep([CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], 'R_Hauler1_' + Game.time, {
        memory: {
            role: 'remoteHauler',
            homeRoom: 'W11N19',
            deliveryId: '69ee68dd2f9ec40037e43c83',
            targetRoom: 'W12N19', //  віддалена кімната для пошуку
            containerIds: [
                '69ec809dc86dcf00481e2ea6', // Контейнер 1
                //'69ee008f0868fe00476b24ac', // Контейнер 2
                           ],
            delivering: false
        }
         });
      }
    else if (remoteHaulers2.length < 0) {
    Game.spawns['Spawn1'].spawnCreep([CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], 'R_Hauler2_' + Game.time, {
        memory: {
            role: 'remoteHauler',
            homeRoom: 'W11N19',
            deliveryId: '69ee68dd2f9ec40037e43c83',
            targetRoom: 'W13N19', // "Основна" віддалена кімната для пошуку
            containerIds: [
            '69ef43b420fbc10048a0d52a', // Контейнер 2
            '69ee6cdccc9233004d2ca38c',  // Контейнер 1
            ],
            delivering: false
        }
         });
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
    }
};