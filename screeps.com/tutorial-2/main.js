var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');

Game.creeps['Upgrader1'].memory.role = 'upgrader';
Game.creeps['Harvester1'].memory.role = 'harvester';

module.exports.loop = function () {
    
    // 1. Очищення пам'яті померлих кріпів (важливо для продуктивності)
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    // 2. Підрахунок кріпів за ролями
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');


    // 3. Логіка створення нових кріпів
    if(harvesters.length < 2) {
        var newName = 'Harvester' + Game.time;
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName, 
            {memory: {role: 'harvester'}});
    } 
    else if(upgraders.length < 3) {
        var newName = 'Upgrader' + Game.time;
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName, 
            {memory: {role: 'upgrader'}});
    }

    // 4. Запуск логіку для кожного кріпа
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
       
        if(creep.memory.role == `upgrader`) {
            roleUpgrader.run(creep);}

        if(creep.memory.role ==`harvester`) {
            roleHarvester.run(creep);
        }   
    }
}