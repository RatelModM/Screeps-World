module.exports = function(counts) {
    //  counts лише ті масиви, які потрібні для перевірки лімітів
    const {
        harvesters, harvesters2, harvesters3, harvesters4, harvesters5, harvesters6,harvesters7,harvesters9,
        upgraderS1, upgraderS2, upgraderS3, upgraderS4, upgraderS5, upgraderS6, upgraderS7, upgraderS8, upgraderS9,
        builders, builders2, builders3, builders4,
        defenderS1_1, defenderS2_1, defenderS2_2, defenderS3_1, defenderS3_2, defenderS4_1, defenderS5_1, defenderS7_1,
        miner, minersOnSource,
        minerS2_1, minerS2_2, minerS3_1, minerS3_2, minerS5_1, minerS5_2, minerS6_1, minerS6_2, minerS7_1, minerS7_2, minerS8_1, minerS8_2, minerS9_1, minerS9_2,
        haulerS1, haulerS2, haulerS3, haulerS4, haulerS5, haulerS6, haulerS7, haulerS8, haulerS9,
        remoteBuilderS1, remoteBuilderS2,
        reservers1_1, reservers2_1, reservers2_2, reservers3_1, reservers4_1, reservers4_2, reservers5_1,
        SpawnHaulerS1, SpawnHaulerS2, SpawnHaulerS3, SpawnHaulerS4, SpawnHaulerS5, SpawnHaulerS6,
        remoteMiners1_1, remoteMiners1_2, remoteMiners2_1, remoteMiners2_2, remoteMiners2_3, remoteMiners2_4,
        remoteMiners3_1, remoteMiners3_2, remoteMiners4_3, remoteMiners4_4, remoteMiners4_1, remoteMiners4_2, remoteMiners5_1,
        remoteMinerHauler2_1, remoteMinerHauler3_1, remoteMinerHauler4_1, remoteMinerHauler4_2,remoteMinerHauler6,remoteMinerHauler9,
        MineralMiner_1, MineralMiner_2, MineralMiner_3, MineralMiner_4, MineralMiner_5, MineralMiner_6, MineralMiner_7, MineralMiner_8, MineralMiner_9,
        remoteHaulers1_1, remoteHaulers2_1, remoteHaulers2_2, remoteHaulers3_1, remoteHaulers4_1, remoteHaulers5_1, remoteHaulers6_1,
        LinkerStorage1, LinkerStorage2, LinkerStorage3, LinkerStorage4, LinkerStorage5, LinkerStorage6, LinkerStorage7, LinkerStorage8,LinkerStorage9,
        Claimer, 
        } = counts;
        
        // --- СПАВНЕР 1
        let s1 = Game.spawns['Spawn1'];
        if (!s1.spawning) {

            // if(SpawnHaulerS1.length < 1) { 
            //     s1.spawnCreep([CARRY, CARRY,CARRY, CARRY, MOVE, MOVE], 'Spawnhauler'+Game.time, 
            //          {memory: {
            //             role: 'spawnhauler', 
            //             targetRoom: 'W29S28'}})
            // }
             if (haulerS1.length < 1) {
                // 1. Беремо доступну енергію в кімнаті прямо зараз
                let energy = s1.room.energyAvailable; 

                // 2. Рахуємо кількість блоків [CARRY, CARRY, MOVE] (150 energy за блок)
                let units = Math.floor(energy / 150);
                
                // 3. Обмеження гри: максимум 50 деталей на кріпа (16 блоків * 3 = 48 деталей)
                if (units > 16) units = 16;

                let body = [];

                // Якщо енергії менше 150, але є хоча б 100 — створюємо мінімального кріпа [CARRY, MOVE]
                if (units < 1 && energy >= 100) {
                    body = [CARRY, MOVE];
                } else if (units >= 1) {
                    for (let i = 0; i < units * 2; i++) body.push(CARRY);
                    for (let i = 0; i < units; i++) body.push(MOVE);
                }

                // 4. Спавнимо кріпа (якщо назбиралося хоча б на мінімальний body)
                if (body.length > 0) {
                    s1.spawnCreep(body, 'haulerS7' + Game.time, { 
                        memory: { role: 'hauler', targetRoom: 'W29S28' } 
                    });
                }
            }
           
            else if (LinkerStorage1.length < 1) {
                s1.spawnCreep([WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], 'SourceStorage1',
                    {
                        memory: {
                            role: 'linkerStorage',
                            linkId: '6a1a9ad106382f425a860ee9'
                        }
                    });
            }
            else if (MineralMiner_1.length < 1) {
                s1.spawnCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE], 'MMiner2_' + Game.time, {
                    memory: {
                        role: 'mineralMIner',
                        targetRoom: 'W29S28'
                    }
                });
            }
            else if (remoteMiners1_1.length < 1) {
                s1.spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, CARRY], 'RMiner1W28S28_' + Game.time, {
                    memory: {
                        role: 'remoteMiner',
                        targetRoom: 'W28S28', sourceId: '55db3133efa8e3fe66e04894'
                    }
                });
            }
            else if (remoteMiners1_2.length < 1) {
                s1.spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, CARRY], 'RMiner2W28S28_' + Game.time, {
                    memory: {
                        role: 'remoteMiner',
                        targetRoom: 'W28S28', sourceId: '55db3133efa8e3fe66e04892'
                    }
                });
            }

            else if (reservers1_1.length < 1) {
                s1.spawnCreep([CLAIM, CLAIM, MOVE, MOVE, MOVE], 'ReserverW28S28_' + Game.time, {
                    memory: {
                        role: 'reserver',
                        targetRoom: 'W28S28',
                    }
                });
            }
            else if (remoteHaulers1_1.length < 1) {
                s1.spawnCreep([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, HEAL], 'R_HaulerW28S28' + Game.time, {
                    memory: {
                        role: 'remoteHauler',
                        homeRoom: 'W29S28',
                        deliveryId: '6a2fa1f5a9c1c077f350c3f7',
                        targetRoom: 'W28S28',
                        containerIds: [
                            '6a6afe74cbcf7171477b292b',
                            '6a6b0574a5f1793726ac5795',
                        ],
                        delivering: false
                    }
                });
            }
        }
        let s1_2 = Game.spawns['Spawn1_2'];
        if (!s1_2.spawning) {

            if (miner.length < 2) {
                if (minersOnSource.length < 1) {
                    s1_2.spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE], 'Miner1_' + Game.time, {
                        memory: {
                            role: 'miner',
                            targetSourceId: '55db3116efa8e3fe66e047c9'
                        }
                    });
                }
                else {
                    s1_2.spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE], 'Miner1_2_' + Game.time, {
                        memory: {
                            role: 'miner',
                            targetSourceId: '55db3116efa8e3fe66e047cb'
                        }
                    });
                }
            }
            else if (MineralMiner_1.length < 1) {
                s1_2.spawnCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE], 'MMiner2_' + Game.time, {
                    memory: {
                        role: 'mineralMIner',
                        targetRoom: 'W29S28'
                    }
                });
            }

            else if (defenderS1_1.length < 1) {
                s1_2.spawnCreep([TOUGH, TOUGH, TOUGH, TOUGH, TOUGH,
                    WORK, WORK, WORK, WORK,
                    CARRY, CARRY, CARRY, CARRY,
                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                    RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK,
                    ATTACK, ATTACK, ATTACK, ATTACK, ATTACK,
                    HEAL, HEAL], 'DEFW28S28_1_' + Game.time, {
                    memory: {
                        role: 'defender',
                        targetRoom: 'W28S28'
                    }
                });
            }
            else if (builders.length < 0) {
                s1_2.spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                    CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], 'builder' + Game.time, {
                    memory: {
                        role: 'builder',
                        targetRoom: 'W29S28'
                    }
                });
            }
            else if (Claimer.length <0 ) {
                s1_2.spawnCreep([CLAIM, MOVE, MOVE, MOVE], 'Claimer_' + Game.time, {
                    memory: {
                        role: 'claimer',
                        targetRoom: 'W23S29',
                    }
                });
            }
            else if (upgraderS1.length < 1) {
                s1_2.spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, 
                    CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                    CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], 'upgrader' + Game.time,
                    {
                        memory: {
                            role: 'upgrader',
                            targetRoom: 'W29S28',
                            linkId: '6a1ac4cb4f03e8f542254857'
                        }
                    });
            }
            else if (remoteBuilderS1.length < 0) {
                s1_2.spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                    WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                    CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                    CARRY, CARRY, CARRY,
                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], 'RemoteBuilder_' + Game.time, {
                    memory: {
                        role: 'remoteBuilder',
                        targetRoom: "W28S27",
                        homeRoom: 'W29S28', // Твоя основна кімната
                        building: false
                    }
                });
            }
        }
        // --- СПАВНЕР 2
        let s2 = Game.spawns['Spawn2'];
        if (s2 && !s2.spawning) { 
            // if (harvesters2.length <0) {
            //     s2.spawnCreep([WORK,CARRY,WORK,CARRY,CARRY, MOVE, MOVE, MOVE, MOVE], 'H2_' + Game.time, {memory: {role: 'harvester', targetRoom: 'W27S29'}});
            // }      
             if (haulerS2.length < 1) {
                // 1. Беремо доступну енергію в кімнаті прямо зараз
                let energy = s2.room.energyAvailable; 

                // 2. Рахуємо кількість блоків [CARRY, CARRY, MOVE] (150 energy за блок)
                let units = Math.floor(energy / 150);
                
                // 3. Обмеження гри: максимум 50 деталей на кріпа (16 блоків * 3 = 48 деталей)
                if (units > 24) units = 24;

                let body = [];

                // Якщо енергії менше 150, але є хоча б 100 — створюємо мінімального кріпа [CARRY, MOVE]
                if (units < 1 && energy >= 100) {
                    body = [CARRY, MOVE];
                } else if (units >= 1) {
                    for (let i = 0; i < units * 2; i++) body.push(CARRY);
                    for (let i = 0; i < units; i++) body.push(MOVE);
                }

                // 4. Спавнимо кріпа (якщо назбиралося хоча б на мінімальний body)
                if (body.length > 0) {
                    s2.spawnCreep(body, 'haulerS2' + Game.time, { 
                        memory: { role: 'hauler', targetRoom: 'W27S29' } 
                    });
                }
            }
            else if (minerS2_1.length < 1) {
                s2.spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE], 'RMinerS2_' + Game.time, {
                    memory: { role: 'remoteMiner', targetRoom: "W27S29", sourceId: '55db3155efa8e3fe66e04958' }
                });
            }
            else if (minerS2_2.length < 1) {
                s2.spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE], 'RMinerS2_' + Game.time, {
                    memory: { role: 'remoteMiner', targetRoom: "W27S29", sourceId: '55db3155efa8e3fe66e04957' }
                });
            }


            else if (MineralMiner_2.length < 1) {
                s2.spawnCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE], 'MMiner2_' + Game.time, {
                    memory: { role: 'mineralMIner', targetRoom: 'W27S29' }
                });
            }
            else if (remoteBuilderS2.length < 0) {
                s2.spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                    WORK, WORK, 
                    CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                    CARRY, CARRY, CARRY,
                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                    MOVE, MOVE,MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], 'RemoteBuilder_S2' + Game.time, {
                    memory: {
                        role: 'remoteBuilder',
                        targetRoom: "W23S29",
                        homeRoom: 'W27S29', // Твоя основна кімната
                        building: false
                    }
                });
            }

            else if (remoteMiners2_3.length < 1) {
                s2.spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], 'RMiner1W26S29_' + Game.time, {
                    memory: { role: 'remoteMiner', targetRoom: 'W26S29', sourceId: '55db3178efa8e3fe66e04a7d' }
                });
            }
            else if (remoteMiners2_4.length < 1) {
                s2.spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], 'RMiner2W26S29_' + Game.time, {
                    memory: { role: 'remoteMiner', targetRoom: 'W26S29', sourceId: '55db3178efa8e3fe66e04a7e' }
                });
            }
            else if (remoteHaulers2_1.length < 0) {
                s2.spawnCreep([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, HEAL], 'R_HaulerW27S28' + Game.time, {
                    memory: {
                        role: 'remoteHauler',
                        homeRoom: 'W27S28',
                        deliveryId: '6a231e975e9ef622c6b11baf',
                        targetRoom: 'W27S28', //  віддалена кімната для пошуку
                        containerIds: [
                            '6a2ad67b6d352ee8e7160802', // Контейнер 1
                            '6a2add144b12a44309a319df', // Контейнер 2
                        ],
                        delivering: false
                    }
                });
            }

            else if (reservers2_2.length < 1) {
                s2.spawnCreep([CLAIM, CLAIM, MOVE, MOVE, MOVE], 'ReserverW26S29_' + Game.time, {
                    memory: {
                        role: 'reserver',
                        targetRoom: 'W26S29',
                    }
                });
            }
            else if (defenderS2_1.length <0) {
                s2.spawnCreep([                   
                   RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
                    RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,MOVE,MOVE,MOVE,
                     MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    HEAL,HEAL, HEAL, HEAL,HEAL,HEAL,HEAL, HEAL,HEAL,HEAL], 'Sicario_' + Game.time, {
                    memory: { role: 'sicario', targetRoom: 'W23S29',
                    targetWallId: null }
                });
            }
            else if (upgraderS2.length < 1) {
                s2.spawnCreep([WORK, WORK, WORK, WORK, WORK,
                    CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                    CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
                    'upgrader' + Game.time, { memory: { role: 'upgrader', targetRoom: 'W27S29', linkId: '6a1ab026c671d80815ca15d1' } });
            }
           
        }
        let s2_3 = Game.spawns['Spawn2_3'];
        if (s2_3 && !s2_3.spawning) {   
        
            if (haulerS2.length < 1) {
                s2_3.spawnCreep([CARRY, CARRY,CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], 
                    'haulerS2' + Game.time, { memory: { role: 'hauler', targetRoom: 'W27S29' } })
            }
            else if (LinkerStorage2.length < 1) {
                s2_3.spawnCreep([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], 'linkStorage2', {
                    memory: {
                        role: 'linkerStorage',
                        linkId: '6a17638d5d6bdcd5eeb4ca61'
                    }
                });
            }
            else if (defenderS2_1.length < 0) {
                s2_3.spawnCreep([                   
                    RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
                    RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
                    RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,MOVE,MOVE,MOVE,
                     MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    HEAL, HEAL,HEAL,], 'Sicario_' + Game.time, {
                    memory: { role: 'sicario', targetRoom: 'W23S29',
                    targetWallId: null
                     }
                });
            }
            else if (defenderS2_2.length < 1) {
                s2_3.spawnCreep([TOUGH, TOUGH, TOUGH, TOUGH, TOUGH,
                    WORK, WORK, WORK, WORK,
                    CARRY, CARRY, CARRY, CARRY,
                    RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK,
                    ATTACK, ATTACK, ATTACK, ATTACK, ATTACK,
                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                    HEAL, HEAL], 'DEFW26S29_' + Game.time, {
                    memory: { role: 'defender', targetRoom: 'W26S29' }
                });
            }
//             else if (reservers2_1.length < 0 && (!Memory.lastReserverSpawn || Game.time - Memory.lastReserverSpawn >= 2000)) {
//                  let result = s2_3.spawnCreep([
//                     CLAIM, CLAIM, CLAIM,CLAIM, CLAIM,CLAIM, CLAIM, CLAIM,
//                     MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE
//                 ],
//                 'ReserverW24S29_' + Game.time, {
//                     memory: {
//                         role: 'reserver',
//                         targetRoom: 'W23S29',
//                     }
//                 });

//     // Записуємо час ТІЛЬКИ у разі успішного запуску спавну
//     if (result === OK) {
//         Memory.lastReserverSpawn = Game.time;
//     }
// }

                                  
        }
        let s2_1 = Game.spawns['Spawn2_2'];
        if (s2_1 && !s2_1.spawning) {   

            // if (SpawnHaulerS2.length < 1) { 
            //     s2_1.spawnCreep([CARRY, CARRY,CARRY, CARRY, MOVE, MOVE], 'Spawnhauler'+Game.time,  {memory: {role: 'spawnhauler', targetRoom: 'W27S29'}})
            // }
           if (haulerS2.length < 1) {
                // 1. Беремо доступну енергію в кімнаті прямо зараз
                let energy = s2_1.room.energyAvailable; 

                // 2. Рахуємо кількість блоків [CARRY, CARRY, MOVE] (150 energy за блок)
                let units = Math.floor(energy / 150);
                
                // 3. Обмеження гри: максимум 50 деталей на кріпа (16 блоків * 3 = 48 деталей)
                if (units > 16) units = 16;

                let body = [];

                // Якщо енергії менше 150, але є хоча б 100 — створюємо мінімального кріпа [CARRY, MOVE]
                if (units < 2 && energy >= 300) {
                    body = [CARRY, MOVE];
                } else if (units >= 1) {
                    for (let i = 0; i < units * 2; i++) body.push(CARRY);
                    for (let i = 0; i < units; i++) body.push(MOVE);
                }

                // 4. Спавнимо кріпа (якщо назбиралося хоча б на мінімальний body)
                if (body.length > 0) {
                    s2_1.spawnCreep(body, 'haulerS2' + Game.time, { 
                        memory: { role: 'hauler', targetRoom: 'W27S29' } 
                    });
                }
            }
            else if (LinkerStorage2.length < 1) {
                s2_1.spawnCreep([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], 'linkStorage2', {
                    memory: {
                        role: 'linkerStorage',
                        linkId: '6a17638d5d6bdcd5eeb4ca61'
                    }
                });
            }
            else if (remoteMinerHauler2_1.length < 0) {
                s2_1.spawnCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], 'RMH_' + Game.time, {
                    memory: {
                        role: 'remoteMinerHauler',
                        homeRoom: 'W23S29',
                        remoteRoom: 'W24S29',
                        harvesting: true,
                        sourceId: '55db31a7efa8e3fe66e04ccb',
                        linkId: '6ab02599c6e50eeb509f27c1'
                    }
                });
            }
            else if (defenderS2_2.length < 1) {
                s2_1.spawnCreep([TOUGH, TOUGH, TOUGH, TOUGH, TOUGH,
                    WORK, WORK, WORK, WORK,
                    CARRY, CARRY, CARRY, CARRY,
                    RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK,
                    ATTACK, ATTACK, ATTACK, ATTACK, ATTACK,
                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                    HEAL, HEAL], 'DEFW26S29_' + Game.time, {
                    memory: { role: 'defender', targetRoom: 'W26S29' }
                });
            }

            else if (remoteHaulers2_2.length < 2) {
                s2_1.spawnCreep([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, HEAL], 'R_HaulerW26S29' + Game.time, {
                    memory: {
                        role: 'remoteHauler',
                        homeRoom: 'W27S29',
                        deliveryId: '6a0c505ae7e8d2a68cdffb4c',
                        targetRoom: 'W26S29', //  віддалена кімната для пошуку
                        containerIds: [
                            '6a6b182093ee893a439b5b16', // Контейнер 1
                            '6a6b0a1988b524ac5a44da8a', // Контейнер 2
                        ],
                        delivering: false
                    }
                });
            }
            
           else if (defenderS2_1.length < 0) {
                s2_1.spawnCreep([RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
                    RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
                    RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,MOVE,MOVE,MOVE,
                     MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                     HEAL,HEAL, HEAL], 'Sikario_' + Game.time, {
                    memory: { role: 'sicario', targetRoom: 'W23S29',
                    targetWallId: null }
                });
            }
            else if (remoteBuilderS2.length < 0) {
                s2_1.spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                    WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                    CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                    CARRY, CARRY, CARRY,
                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], 'RemoteBuilder_S2' + Game.time, {
                    memory: {
                        role: 'remoteBuilder',
                        targetRoom: "W23S29",
                        homeRoom: 'W27S29', // Твоя основна кімната
                        building: false
                    }
                });
            }

        }

        // --- СПАВНЕР 3 
        let s3_1 = Game.spawns['Spawn3_1'];
        if (s3_1 && !s3_1.spawning) {    
           

          if (LinkerStorage3.length < 1) {
                s3_1.spawnCreep([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
                     'linkStorage3'+ Game.time, {
                    memory: {
                        role: 'linkerStorage',
                        linkId: '6a58f9655ef34826f219d8ad'
                    }
                });
            }

            // else if (upgraderS3.length < 1) {
            //     s3_1.spawnCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE,
            //         WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE 
            //     ],
            //         'upgrader' + Game.time, { memory: { role: 'upgrader', targetRoom: 'W27S27', linkId: '6a32bfa22a5f581a771e6b7b' } });
            // }
            
         else if (defenderS3_2.length < 0) {
                 s3_1.spawnCreep([
                    RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
                    RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
                    RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,MOVE,MOVE,MOVE,
                     MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                     HEAL,HEAL, HEAL], 'sicario3_' + Game.time, {
                    memory: { role: 'sicario', targetRoom: 'W24S29' }
                });
                           }

        }
        let s3 = Game.spawns['Spawn3'];
        if (s3 && !s3.spawning) { 

            if (haulerS3.length < 1) {
                // 1. Беремо доступну енергію в кімнаті прямо зараз
                let energy = s3.room.energyAvailable; 

                // 2. Рахуємо кількість блоків [CARRY, CARRY, MOVE] (150 energy за блок)
                let units = Math.floor(energy / 150);
                
                // 3. Обмеження гри: максимум 50 деталей на кріпа (16 блоків * 3 = 48 деталей)
                if (units > 16) units = 16;

                let body = [];

                // Якщо енергії менше 150, але є хоча б 100 — створюємо мінімального кріпа [CARRY, MOVE]
                if (units < 1 && energy >= 100) {
                    body = [CARRY, MOVE];
                } else if (units >= 1) {
                    for (let i = 0; i < units * 2; i++) body.push(CARRY);
                    for (let i = 0; i < units; i++) body.push(MOVE);
                }

                // 4. Спавнимо кріпа (якщо назбиралося хоча б на мінімальний body)
                if (body.length > 0) {
                    s3.spawnCreep(body, 'haulerS3' + Game.time, { 
                        memory: { role: 'hauler', targetRoom: 'W27S27' } 
                    });
                }
            }

            //     if(SpawnHaulerS3.length < 1) { 
            //     s3.spawnCreep([CARRY, CARRY,CARRY, CARRY, MOVE, MOVE], 'Spawnhauler'+Game.time,  {memory: {role: 'spawnhauler', targetRoom: 'W27S27'}})
            // }      
            else if (harvesters3.length < 0) {
                s3.spawnCreep([WORK, CARRY, , MOVE, ], 'H3_' + Game.time, { memory: { role: 'harvester', targetRoom: 'W27S27' } });
            }
            else if (minerS3_1.length < 1) {
                s3.spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE], 'RMinerS31_' + Game.time, {
                    memory: { role: 'remoteMiner', targetRoom: "W27S27", sourceId: '55db3154efa8e3fe66e04950' }
                });
            }
            else if (minerS3_2.length < 1) {
                s3.spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE], 'RMinerS32_' + Game.time, {
                    memory: { role: 'remoteMiner', targetRoom: "W27S27", sourceId: '55db3154efa8e3fe66e04951' }
                });
            }
            else if (MineralMiner_3.length < 1) {
                s3.spawnCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE], 'MMiner3_' + Game.time, {
                    memory: { role: 'mineralMIner', targetRoom: 'W27S27' }
                });
            }
            else if (upgraderS3.length < 1) {
                s3.spawnCreep([ WORK, WORK, WORK, WORK,WORK, WORK, WORK, WORK,WORK, WORK, WORK, WORK,
                     CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE
                ],
                    'upgrader' + Game.time, { memory: { role: 'upgrader', targetRoom: 'W27S27', linkId: '6a32bfa22a5f581a771e6b7b' } });
            }

            else if (builders3.length < 0) {
                s3.spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], 'builder_S3' + Game.time, { memory: { role: 'builder', targetRoom: 'W28S26' } });
            }



            else if (remoteMiners3_1.length < 0) {
                s3.spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], 'RMiner3W28S26_' + Game.time, {
                    memory: { role: 'remoteMiner', targetRoom: 'W28S26', sourceId: '55db3132efa8e3fe66e0488a' }
                });
            }
            else if (remoteMiners3_2.length < 0) {
                s3.spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], 'RMiner3W28S26_' + Game.time, {
                    memory: { role: 'remoteMiner', targetRoom: 'W28S26', sourceId: '55db3132efa8e3fe66e0488c' }
                });
            }
            else if (defenderS3_1.length < 0) {
                s3.spawnCreep([ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK,ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK,
                    ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK,ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK,
                     ATTACK, ATTACK, ATTACK, ATTACK,
                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,MOVE,
                     MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,MOVE,MOVE,
                    HEAL, HEAL], 'DEFW27S28_1_' + Game.time, {
                    memory: { role: 'defender', targetRoom: 'W28S26' }
                });
            }

            // else if (reservers3_1.length < 1 && (!Memory.lastReserverSpawn || Game.time - Memory.lastReserverSpawn >= 2000)) {
            //     s3.spawnCreep([CLAIM, CLAIM, CLAIM, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], 
            //         'ReserverS3_' + Game.time, {
            //         memory: {
            //             role: 'reserver',
            //             targetRoom: 'W24S29',
            //         }
            //     });
            // }
            else if (defenderS3_2.length < 0) {
                 s3.spawnCreep([
                    TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,
                    TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,
                    ATTACK,
                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,MOVE,
                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,MOVE,
                    HEAL, HEAL,HEAL, HEAL, HEAL, HEAL,HEAL, HEAL, HEAL,HEAL], 'BigBen_' + Game.time, {
                    memory: { role: 'sicario', targetRoom: 'W24S29' }
                });
                           }
            // else if(upgraderS3.length <0) {
            //     s3.spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK, CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,
            //         WORK,WORK,WORK,WORK,WORK,WORK, CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE ],
            //          'upgrader' + Game.time, {memory: {role: 'upgrader', targetRoom: 'W27S27',linkId: '6a0c13df9e9faf0e9c1182c3'}});
            // } 


        }

        // --- СПАВНЕР 4 
        let s4 = Game.spawns['Spawn4'];
        if (s4 && !s4.spawning) { 
        
            if (haulerS4.length < 1) {
                // 1. Беремо доступну енергію в кімнаті прямо зараз
                let energy = s4.room.energyAvailable; 

                // 2. Рахуємо кількість блоків [CARRY, CARRY, MOVE] (150 energy за блок)
                let units = Math.floor(energy / 150);
                
                // 3. Обмеження гри: максимум 50 деталей на кріпа (16 блоків * 3 = 48 деталей)
                if (units > 16) units = 16;

                let body = [];

                // Якщо енергії менше 150, але є хоча б 100 — створюємо мінімального кріпа [CARRY, MOVE]
                if (units < 1 && energy >= 100) {
                    body = [CARRY, MOVE];
                } else if (units >= 1) {
                    for (let i = 0; i < units * 2; i++) body.push(CARRY);
                    for (let i = 0; i < units; i++) body.push(MOVE);
                }

                // 4. Спавнимо кріпа (якщо назбиралося хоча б на мінімальний body)
                if (body.length > 0) {
                    s4.spawnCreep(body, 'haulerS4' + Game.time, { 
                        memory: { role: 'hauler', targetRoom: 'W29S27' } 
                    });
                }
            }

            else if (remoteMiners4_1.length < 1) {
                s4.spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], 'RMiner3W29S27_' + Game.time, {
                    memory: { role: 'remoteMiner', targetRoom: "W29S27", sourceId: '55db3116efa8e3fe66e047c5' }
                });
            }

            else if (remoteMiners4_2.length < 1) {
                s4.spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], 'RMiner4W29S27_' + Game.time, {
                    memory: { role: 'remoteMiner', targetRoom: "W29S27", sourceId: '55db3116efa8e3fe66e047c6' }
                });
            }
            else if (remoteMinerHauler4_1.length < 1) {
                s4.spawnCreep([WORK, WORK, WORK, WORK,WORK, WORK,WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], 'RMH_' + Game.time, {
                    memory: {
                        role: 'remoteMinerHauler',
                        homeRoom: 'W29S27',
                        remoteRoom: 'W29S26',
                        harvesting: true,
                        sourceId: '55db3115efa8e3fe66e047c3',
                        linkId: '6a1ec9cb34a2fbc89c868aba'
                    }
                });
            }
            

            else if (MineralMiner_4.length < 1 && s4.room.find(FIND_MINERALS)[0].mineralAmount > 0) {
                s4.spawnCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], 'MMiner4_' + Game.time, {
                    memory: { role: 'mineralMIner', targetRoom: 'W29S27' }
                });
            }


            else if (LinkerStorage4.length < 1) {
                s4.spawnCreep([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,CARRY,MOVE, MOVE,MOVE, MOVE,MOVE, MOVE, MOVE],
                    'linkStorage4' + Game.time, {
                    memory: {
                        role: 'linkerStorage',
                        linkId: '6a58f2831834efde698d694f'
                    }
                });

            }
            else if (remoteMiners4_4.length < 0) {
                s4.spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], 'RMiner4W28S27_' + Game.time, {
                    memory: { role: 'remoteMiner', targetRoom: 'W28S27', sourceId: '55db3133efa8e3fe66e04890' }
                });
            }
            else if (upgraderS4.length < 1) {
                s4.spawnCreep([WORK, WORK, WORK, WORK,WORK, WORK, WORK, 
                    CARRY, CARRY, CARRY, CARRY, CARRY,CARRY, CARRY, CARRY,
                     MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
                    'upgrader' + Game.time, { memory: { role: 'upgrader', targetRoom: 'W29S27', linkId: '6a21b479d1a6e8ded3dbf184' } });
            }
             else if (reservers4_2.length < 1) {
                s4.spawnCreep([CLAIM, CLAIM, MOVE, MOVE, MOVE], 'ReserverW29S26_' + Game.time, {
                    memory: {
                        role: 'reserver',
                        targetRoom: 'W29S26',
                    }
                });
            }
        }
           
        let s4_1 = Game.spawns['Spawn4_1'];
        if (s4_1 && !s4_1.spawning) { 
            if (haulerS4.length < 1) {
                // 1. Беремо доступну енергію в кімнаті прямо зараз
                let energy = s4.room.energyAvailable; 

                // 2. Рахуємо кількість блоків [CARRY, CARRY, MOVE] (150 energy за блок)
                let units = Math.floor(energy / 150);
                
                // 3. Обмеження гри: максимум 50 деталей на кріпа (16 блоків * 3 = 48 деталей)
                if (units > 16) units = 16;

                let body = [];

                // Якщо енергії менше 150, але є хоча б 100 — створюємо мінімального кріпа [CARRY, MOVE]
                if (units < 1 && energy >= 100) {
                    body = [CARRY, MOVE];
                } else if (units >= 1) {
                    for (let i = 0; i < units * 2; i++) body.push(CARRY);
                    for (let i = 0; i < units; i++) body.push(MOVE);
                }

                // 4. Спавнимо кріпа (якщо назбиралося хоча б на мінімальний body)
                if (body.length > 0) {
                    s4_1.spawnCreep(body, 'haulerS4' + Game.time, { 
                        memory: { role: 'hauler', targetRoom: 'W29S27' } 
                    });
                }
            }
            else if (LinkerStorage4.length < 1) {
                s4.spawnCreep([
                    CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                     MOVE, MOVE, MOVE],
                    'linkStorage4' + Game.time, {
                    memory: {
                        role: 'linkerStorage',
                        linkId: '6a58f2831834efde698d694f'
                    }
                });

            }
            else if (reservers4_1.length < 0) {
                s4_1.spawnCreep([CLAIM, CLAIM, MOVE, MOVE, MOVE], 'ReserverW28S27_' + Game.time, {
                    memory: {
                        role: 'reserver',
                        targetRoom: 'W28S27',
                    }
                });
            }
            else if (remoteMiners4_1.length < 1) {
                s4_1.spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], 'RMiner3W29S27_' + Game.time, {
                    memory: { role: 'remoteMiner', targetRoom: "W29S27", sourceId: '55db3116efa8e3fe66e047c5' }
                });
            }

            else if (remoteMiners4_2.length < 1) {
                s4_1.spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], 'RMiner4W29S27_' + Game.time, {
                    memory: { role: 'remoteMiner', targetRoom: "W29S27", sourceId: '55db3116efa8e3fe66e047c6' }
                });
            }
            else if (defenderS4_1.length < 0) {
                s4_1.spawnCreep([TOUGH, TOUGH, TOUGH, TOUGH, TOUGH,
                    WORK, WORK, WORK, WORK,
                    CARRY, CARRY, CARRY, CARRY,
                    RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK,
                    ATTACK, ATTACK, ATTACK, ATTACK, ATTACK,
                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                    HEAL, HEAL], 'DEFW28S27_1_' + Game.time, {
                    memory: { role: 'defender', targetRoom: 'W28S27' }
                });
            }
             else if (remoteMiners4_3.length < 0) {
                s4_1.spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], 'RMiner3W28S27_' + Game.time, {
                    memory: { role: 'remoteMiner', targetRoom: 'W28S27', sourceId: '55db3133efa8e3fe66e0488e' }
                });
            }
            else if (remoteHaulers4_1.length < 0) {
                s4_1.spawnCreep([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, HEAL], 'R_HaulerW28S26' + Game.time, {
                    memory: {
                        role: 'remoteHauler',
                        homeRoom: 'W28S27',
                        deliveryId: '6a8abd86c836f24bd538f3c5',
                        targetRoom: 'W28S27', //  віддалена кімната для пошуку
                        containerIds: [
                            '6a6b0adec836f26f90305990', // Контейнер 1
                            //'6a6b00a16c26a049959b1669', // Контейнер 2
                        ],
                        delivering: false
                    }
                });
            }
            else if (builders4.length < 0) {
                s4_1.spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                    CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], 'builder_S4' + Game.time, { memory: { role: 'builder', targetRoom: 'W28S26' } });
            }
            else if (upgraderS4.length < 1) {
                s4_1.spawnCreep([ WORK, WORK, WORK, WORK,WORK, WORK, WORK,  
                    CARRY, CARRY, CARRY, CARRY, CARRY,CARRY, CARRY, CARRY,
                     MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
                    'upgrader' + Game.time, { memory: { role: 'upgrader', targetRoom: 'W29S27', linkId: '6a21b479d1a6e8ded3dbf184' } });
            }
           

        }

        // --- СПАВНЕР 5 
        let s5 = Game.spawns['Spawn5'];
        if (s5 && !s5.spawning) { 

            if (haulerS5.length < 1) {
                // 1. Беремо доступну енергію в кімнаті прямо зараз
                let energy = s5.room.energyAvailable; 

                // 2. Рахуємо кількість блоків [CARRY, CARRY, MOVE] (150 energy за блок)
                let units = Math.floor(energy / 150);
                
                // 3. Обмеження гри: максимум 50 деталей на кріпа (16 блоків * 3 = 48 деталей)
                if (units > 16) units = 16;

                let body = [];

                // Якщо енергії менше 150, але є хоча б 100 — створюємо мінімального кріпа [CARRY, MOVE]
                if (units < 1 && energy >= 100) {
                    body = [CARRY, MOVE];
                } else if (units >= 1) {
                    for (let i = 0; i < units * 2; i++) body.push(CARRY);
                    for (let i = 0; i < units; i++) body.push(MOVE);
                }

                // 4. Спавнимо кріпа (якщо назбиралося хоча б на мінімальний body)
                if (body.length > 0) {
                    s5.spawnCreep(body, 'haulerS5' + Game.time, { 
                        memory: { role: 'hauler', targetRoom: 'W28S29' } 
                    });
                }
            }
        //    if (SpawnHaulerS5.length < 1) {
        //         s5.spawnCreep([CARRY, CARRY, CARRY, CARRY,  MOVE, MOVE], 'Spawnhauler' + Game.time, { memory: { role: 'spawnhauler', targetRoom: 'W28S29' } })
        //     }
            //  if (harvesters5.length <1) {
            //     s5.spawnCreep([WORK,CARRY,CARRY, MOVE, MOVE], 'H5_' + Game.time, {memory: {role: 'harvester', targetRoom: 'W28S29'}});
            //         } 

            else if (LinkerStorage5.length < 1) {
                s5.spawnCreep([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], 'linkStorage5', {
                    memory: {
                        role: 'linkerStorage',
                        linkId: '6a28f72d0b346572948cf561'
                    }
                });
            }
            else if (remoteMiners5_1.length < 0) {
                s5.spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], 'RMiner3W29S29_' + Game.time, {
                    memory: { role: 'remoteMiner', targetRoom: "W29S29", sourceId: '55db3117efa8e3fe66e047cd' }
                });
            }
            else if (MineralMiner_5.length < 1) {
                s5.spawnCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], 'MMiner5_' + Game.time, {
                    memory: { role: 'mineralMIner', targetRoom: 'W28S29' }
                });
            }




            else if (remoteHaulers5_1.length < 0) {
                s5.spawnCreep([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, HEAL], 'R_HaulerW29S29' + Game.time, {
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



            else if (reservers5_1.length < 0) {
                s5.spawnCreep([CLAIM, CLAIM, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], 'ReserverW29S29_' + Game.time, {
                    memory: {
                        role: 'reserver',
                        targetRoom: 'W29S29',
                    }
                });
            }
            else if (remoteMiners5_1.length < 0) {
                s5_1.spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], 'RMiner3W29S29_' + Game.time, {
                    memory: { role: 'remoteMiner', targetRoom: "W29S29", sourceId: '55db3117efa8e3fe66e047cd' }
                });
            }
            else if (upgraderS5.length < 1) {
                s5.spawnCreep([WORK, WORK, WORK, WORK, WORK,
                    CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, 
                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,  MOVE, MOVE, MOVE, MOVE, MOVE], 'upgrader' + Game.time, { memory: { role: 'upgrader', targetRoom: 'W28S29', linkId: '6a2e728ea9c1c0040b507382' } });
            }

        }
        let s5_1 = Game.spawns['Spawn5_1'];
        if (s5_1 && !s5_1.spawning) { 

            if (minerS5_1.length < 1) {
                s5_1.spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE], 'RMinerS5_' + Game.time, {
                    memory: { role: 'remoteMiner', targetRoom: "W28S29", sourceId: '55db3134efa8e3fe66e04897' }
                });
            }
            else if (minerS5_2.length < 1) {
                s5_1.spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE], 'RMinerS5_' + Game.time, {
                    memory: { role: 'remoteMiner', targetRoom: "W28S29", sourceId: '55db3134efa8e3fe66e04898' }
                });
            }
            else if (defenderS5_1.length < 0) {
                s5_1.spawnCreep([TOUGH, TOUGH, TOUGH, TOUGH,
                    WORK, WORK, WORK, WORK,
                    CARRY, CARRY, CARRY, CARRY,
                    RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK,
                    ATTACK, ATTACK, ATTACK, ATTACK, ATTACK,
                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                    HEAL, HEAL], 'DEFW29S29_' + Game.time, {
                    memory: { role: 'defender', targetRoom: 'W29S29' }
                });
            }
            
            else if (upgraderS5.length < 1) {
                s5_1.spawnCreep([WORK, WORK, WORK, WORK, WORK,
                    CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, 
                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,  MOVE, MOVE, MOVE, MOVE, MOVE], 'upgrader' + Game.time, { memory: { role: 'upgrader', targetRoom: 'W28S29', linkId: '6a2e728ea9c1c0040b507382' } });
                }
            }
         let s5_2 = Game.spawns['Spawn5_2'];
         if (s5_2 && !s5_2.spawning) { 

            if (minerS5_1.length < 1) {
                s5_2.spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE], 'RMinerS5_' + Game.time, {
                    memory: { role: 'remoteMiner', targetRoom: "W28S29", sourceId: '55db3134efa8e3fe66e04897' }
                });
            }
            else if (minerS5_2.length < 1) {
                s5_2.spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE], 'RMinerS5_' + Game.time, {
                    memory: { role: 'remoteMiner', targetRoom: "W28S29", sourceId: '55db3134efa8e3fe66e04898' }
                });
            }
            else if (upgraderS5.length < 1) {
                s5_1.spawnCreep([WORK, WORK, WORK, WORK, WORK,
                    CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, 
                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,  MOVE, MOVE, MOVE, MOVE, MOVE], 'upgrader' + Game.time, { memory: { role: 'upgrader', targetRoom: 'W28S29', linkId: '6a2e728ea9c1c0040b507382' } });
                }
            else if (defenderS5_1.length < 0) {
                s5_2.spawnCreep([TOUGH, TOUGH, TOUGH, TOUGH,
                    WORK, WORK, WORK, WORK,
                    CARRY, CARRY, CARRY, CARRY,
                    RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK,
                    ATTACK, ATTACK, ATTACK, ATTACK, ATTACK,
                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                    HEAL, HEAL], 'DEFW29S29_' + Game.time, {
                    memory: { role: 'defender', targetRoom: 'W29S29' }
                });
            }
        }
        // --- СПАВНЕР 6 
        let s6 = Game.spawns['Spawn6'];
        if (s6 && !s6.spawning) { 

            if (haulerS6.length < 1) {
                // 1. Беремо доступну енергію в кімнаті прямо зараз
                let energy = s6.room.energyAvailable; 

                // 2. Рахуємо кількість блоків [CARRY, CARRY, MOVE] (150 energy за блок)
                let units = Math.floor(energy / 150);
                
                // 3. Обмеження гри: максимум 50 деталей на кріпа (16 блоків * 3 = 48 деталей)
                if (units > 16) units = 16;

                let body = [];

                // Якщо енергії менше 150, але є хоча б 100 — створюємо мінімального кріпа [CARRY, MOVE]
                if (units < 1 && energy >= 100) {
                    body = [CARRY, MOVE];
                } else if (units >= 1) {
                    for (let i = 0; i < units * 2; i++) body.push(CARRY);
                    for (let i = 0; i < units; i++) body.push(MOVE);
                }

                // 4. Спавнимо кріпа (якщо назбиралося хоча б на мінімальний body)
                if (body.length > 0) {
                    s6.spawnCreep(body, 'haulerS6' + Game.time, { 
                        memory: { role: 'hauler', targetRoom: 'W27S28' } 
                    });
                }
            }
            else if (minerS6_1.length < 1) {
                s6.spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], 'Miner3W27S28_' + Game.time, {
                    memory: { role: 'remoteMiner', targetRoom: 'W27S28', sourceId: '55db3155efa8e3fe66e04953' }
                });
            }
            else if (minerS6_2.length < 1) {
                s6.spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], 'Miner3W27S28_' + Game.time, {
                    memory: { role: 'remoteMiner', targetRoom: 'W27S28', sourceId: '55db3155efa8e3fe66e04955' }
                });
            }
            else if (upgraderS6.length < 1) {
                s6.spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, 
                    CARRY, CARRY, MOVE, MOVE, CARRY, CARRY, MOVE, MOVE, CARRY, CARRY, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY,], 'upgrader' + Game.time, { memory: { role: 'upgrader', targetRoom: 'W27S28', linkId: '6a47c6e7f7209b36b87dcc44' } });
            }
            else if (LinkerStorage6.length < 1) {
                s6.spawnCreep([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], 'linkStorage6', {
                    memory: {
                        role: 'linkerStorage',
                        linkId: '6a420a4ae4e7cf835ecb98e2'
                    }
                });
            }
         
            else if (MineralMiner_6.length < 1) {
                s6.spawnCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], 'MMiner6_' + Game.time, {
                    memory: { role: 'mineralMIner', targetRoom: 'W27S28' }
                });
            }


            else if (remoteHaulers6_1.length < 0) {
                s6.spawnCreep([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, HEAL], 'R_HaulerW27S29' + Game.time, {
                    memory: {
                        role: 'remoteHauler',
                        homeRoom: 'W27S28',
                        deliveryId: '6a47d126c02cb4f8836f60fe',
                        targetRoom: 'W27S29', //  віддалена кімната для пошуку
                        containerIds: [
                            '6a231e975e9ef622c6b11baf', // Контейнер 1
                            // '6a19eeab4fc55c134c4cc268', // Контейнер 2
                            //'69fb669e5e59b641886bef1b', // Контейнер 2
                        ],
                        delivering: false
                    }
                });
            }
      
        }
        let s6_1 = Game.spawns['Spawn6_1'];
        if (s6_1 && !s6_1.spawning) { 

            if (haulerS6.length < 1) {
                // 1. Беремо доступну енергію в кімнаті прямо зараз
                let energy = s6_1.room.energyAvailable; 

                // 2. Рахуємо кількість блоків [CARRY, CARRY, MOVE] (150 energy за блок)
                let units = Math.floor(energy / 150);
                
                // 3. Обмеження гри: максимум 50 деталей на кріпа (16 блоків * 3 = 48 деталей)
                if (units > 16) units = 16;

                let body = [];

                // Якщо енергії менше 150, але є хоча б 100 — створюємо мінімального кріпа [CARRY, MOVE]
                if (units < 1 && energy >= 100) {
                    body = [CARRY, MOVE];
                } else if (units >= 1) {
                    for (let i = 0; i < units * 2; i++) body.push(CARRY);
                    for (let i = 0; i < units; i++) body.push(MOVE);
                }

                // 4. Спавнимо кріпа (якщо назбиралося хоча б на мінімальний body)
                if (body.length > 0) {
                    s6_1.spawnCreep(body, 'haulerS6' + Game.time, { 
                        memory: { role: 'hauler', targetRoom: 'W27S28' } 
                    });
                }
            }

            else if (upgraderS6.length < 1) {
                s6_1.spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, 
                    CARRY, CARRY, MOVE, MOVE, CARRY, CARRY, MOVE, MOVE, CARRY, CARRY, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY,], 'upgrader' + Game.time, { memory: { role: 'upgrader', targetRoom: 'W27S28', linkId: '6a47c6e7f7209b36b87dcc44' } });
            }
            else if (LinkerStorage6.length < 1) {
                s6_1.spawnCreep([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], 'linkStorage6', {
                    memory: {
                        role: 'linkerStorage',
                        linkId: '6a420a4ae4e7cf835ecb98e2'
                    }
                });
            }
         
            else if (remoteHaulers6_1.length < 0) {
                s6_1.spawnCreep([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, HEAL], 'R_HaulerW27S29' + Game.time, {
                    memory: {
                        role: 'remoteHauler',
                        homeRoom: 'W27S28',
                        deliveryId: '6a47d126c02cb4f8836f60fe',
                        targetRoom: 'W27S29', //  віддалена кімната для пошуку
                        containerIds: [
                            '6a231e975e9ef622c6b11baf', // Контейнер 1
                            // '6a19eeab4fc55c134c4cc268', // Контейнер 2
                            //'69fb669e5e59b641886bef1b', // Контейнер 2
                        ],
                        delivering: false
                    }
                });
            }
            else if (remoteMinerHauler6.length < 0) {
                s6_1.spawnCreep([WORK, WORK, WORK, WORK,WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], 'RMH_' + Game.time, {
                    memory: {
                        role: 'remoteMinerHauler',
                        homeRoom: 'W27S28',
                        remoteRoom: 'W26S28',
                        harvesting: true,
                        sourceId: '55db3177efa8e3fe66e04a7a',
                        linkId: '6a54a7e62f05b3c7f32ddc72'
                    }
                });
            }
        
        }

        // --- СПАВНЕР 7
        let s7 = Game.spawns['Spawn7'];
        if (s7 && !s7.spawning) { 

            if (haulerS7.length < 1) {
                // 1. Беремо доступну енергію в кімнаті прямо зараз
                let energy = s7.room.energyAvailable; 

                // 2. Рахуємо кількість блоків [CARRY, CARRY, MOVE] (150 energy за блок)
                let units = Math.floor(energy / 150);
                
                // 3. Обмеження гри: максимум 50 деталей на кріпа (16 блоків * 3 = 48 деталей)
                if (units > 16) units = 16;

                let body = [];

                // Якщо енергії менше 150, але є хоча б 100 — створюємо мінімального кріпа [CARRY, MOVE]
                if (units < 1 && energy >= 100) {
                    body = [CARRY, MOVE];
                } else if (units >= 1) {
                    for (let i = 0; i < units * 2; i++) body.push(CARRY);
                    for (let i = 0; i < units; i++) body.push(MOVE);
                }

                // 4. Спавнимо кріпа (якщо назбиралося хоча б на мінімальний body)
                if (body.length > 0) {
                    s7.spawnCreep(body, 'haulerS7' + Game.time, { 
                        memory: { role: 'hauler', targetRoom: 'W28S26' } 
                    });
                }
            }
            else if (minerS7_1.length < 1) {
                s7.spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE], 'Miner7W28S26_' + Game.time, {
                    memory: { role: 'remoteMiner', targetRoom: 'W28S26', sourceId: '55db3132efa8e3fe66e0488a' }
                });
            }
            else if (minerS7_2.length < 1) {
                s7.spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE], 'Miner7W28S26_' + Game.time, {
                    memory: { role: 'remoteMiner', targetRoom: 'W28S26', sourceId: '55db3132efa8e3fe66e0488c' }
                });
            }
            else if (upgraderS7.length < 1) {
                // 1. Беремо доступну енергію в кімнаті прямо зараз
                let energy = s7.room.energyAvailable; 

                // 2. Рахуємо кількість блоків [WORK,CARRY, CARRY, MOVE] (150 energy за блок)
                let units = Math.floor(energy / 350);
                
                // 3. Обмеження гри: максимум 50 деталей на кріпа (16 блоків * 3 = 48 деталей)
                if (units > 5) units = 5;

                let body = [];

                // Якщо енергії менше 150, але є хоча б 100 — створюємо мінімального кріпа [CARRY, MOVE]
                if (units < 3 && energy >= 1050) {
                    body = [WORK, CARRY, MOVE];
                } else if (units >= 1) {
                    for (let i = 0; i < units; i++) body.push(WORK);
                    for (let i = 0; i < units* 3 ; i++) body.push(CARRY);
                    for (let i = 0; i < units* 2; i++) body.push(MOVE);
                }

                // 4. Спавнимо кріпа (якщо назбиралося хоча б на мінімальний body)
                if (body.length > 0) {
                    s7.spawnCreep(body, 'upgrader' + Game.time, { 
                        memory: { role: 'upgrader', targetRoom: 'W28S26', linkId: '6a6f43875790f10f42d6a211' } 
                    });
                }
            }
            else if (LinkerStorage7.length < 1) {
                s7.spawnCreep([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], 'linkStorage7'+ Game.time, {
                    memory: {
                        role: 'linkerStorage',
                        linkId: '6a6efc3a6ada3760776043e3'
                    }
                });
            }
            else if (remoteMinerHauler4_2.length < 1) {
                s7.spawnCreep([WORK, WORK, WORK, WORK,WORK, WORK,WORK,WORK,WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, 
                    CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY,
                     MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], 'RMH7_' + Game.time, {
                    memory: {
                        role: 'remoteMinerHauler',
                        homeRoom: 'W28S26',
                        remoteRoom: 'W29S26',
                        harvesting: true,
                        sourceId: '55db3115efa8e3fe66e047c1',
                        linkId: '6a6f6bfd3b087e367770b181'
                    }
                });
            }

            else if (MineralMiner_7.length < 1) {
                s7.spawnCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], 'MMiner7_' + Game.time, {
                    memory: { role: 'mineralMIner', targetRoom: 'W28S26' }
                });
            }
            else if (defenderS7_1.length < 1) {
                s7.spawnCreep([TOUGH, TOUGH, TOUGH, TOUGH, TOUGH,
                    WORK, WORK, WORK, WORK,
                    CARRY, CARRY, CARRY, CARRY,
                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                    RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK,
                    ATTACK, ATTACK, ATTACK, ATTACK, ATTACK,
                    HEAL, HEAL], 'DEFW29S26_' + Game.time, {
                    memory: { role: 'defender', targetRoom: 'W29S26' }
                });
            }

           
        }
           let s7_1 = Game.spawns['Spawn7_1'];
        if (s7_1 && !s7_1.spawning) { 

            if (haulerS7.length < 1) {
                // 1. Беремо доступну енергію в кімнаті прямо зараз
                let energy = s7_1.room.energyAvailable; 

                // 2. Рахуємо кількість блоків [CARRY, CARRY, MOVE] (150 energy за блок)
                let units = Math.floor(energy / 150);
                
                // 3. Обмеження гри: максимум 50 деталей на кріпа (16 блоків * 3 = 48 деталей)
                if (units > 16) units = 16;

                let body = [];

                // Якщо енергії менше 150, але є хоча б 100 — створюємо мінімального кріпа [CARRY, MOVE]
                if (units < 1 && energy >= 100) {
                    body = [CARRY, MOVE];
                } else if (units >= 1) {
                    for (let i = 0; i < units * 2; i++) body.push(CARRY);
                    for (let i = 0; i < units; i++) body.push(MOVE);
                }

                // 4. Спавнимо кріпа (якщо назбиралося хоча б на мінімальний body)
                if (body.length > 0) {
                    s7_1.spawnCreep(body, 'haulerS7' + Game.time, { 
                        memory: { role: 'hauler', targetRoom: 'W28S26' } 
                    });
                }
            }
            else if (minerS7_1.length < 1) {
                s7_1.spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE], 'Miner7W28S26_' + Game.time, {
                    memory: { role: 'remoteMiner', targetRoom: 'W28S26', sourceId: '55db3132efa8e3fe66e0488a' }
                });
            }
            else if (minerS7_2.length < 1) {
                s7_1.spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE], 'Miner7W28S26_' + Game.time, {
                    memory: { role: 'remoteMiner', targetRoom: 'W28S26', sourceId: '55db3132efa8e3fe66e0488c' }
                });
            }
            
            else if (LinkerStorage7.length < 1) {
                s7_1.spawnCreep([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], 'linkStorage7'+ Game.time, {
                    memory: {
                        role: 'linkerStorage',
                        linkId: '6a6efc3a6ada3760776043e3'
                    }
                });
            }
            
           
            // // else if(reservers5_1.length < 1) {
            // //     s5.spawnCreep([CLAIM,CLAIM,MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], 'ReserverW29S29_'+ Game.time, {
            // //     memory: {
            // //         role: 'reserver',
            // //         targetRoom: 'W29S29',
            // // }});
            // // }

        }
    // --- СПАВНЕР 8
        let s8 = Game.spawns['Spawn8'];
        if (s8 && !s8.spawning) { 

            if (haulerS8.length < 1) {
                // 1. Беремо доступну енергію в кімнаті прямо зараз
                let energy = s8.room.energyAvailable; 

                // 2. Рахуємо кількість блоків [CARRY, CARRY, MOVE] (150 energy за блок)
                let units = Math.floor(energy / 150);
                
                // 3. Обмеження гри: максимум 50 деталей на кріпа (16 блоків * 3 = 48 деталей)
                if (units > 16) units = 16;

                let body = [];

                // Якщо енергії менше 150, але є хоча б 100 — створюємо мінімального кріпа [CARRY, MOVE]
                if (units < 2 && energy >= 300) {
                    body = [CARRY, MOVE];
                } else if (units >= 1) {
                    for (let i = 0; i < units * 2; i++) body.push(CARRY);
                    for (let i = 0; i < units; i++) body.push(MOVE);
                }

                // 4. Спавнимо кріпа (якщо назбиралося хоча б на мінімальний body)
                if (body.length > 0) {
                    s8.spawnCreep(body, 'haulerS8' + Game.time, { 
                        memory: { role: 'hauler', targetRoom: 'W28S27' } 
                    });
                }
            }
            else if (minerS8_1.length < 1) {
                s8.spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE], 'Miner8W28S27_' + Game.time, {
                    memory: { role: 'remoteMiner', targetRoom: 'W28S27', sourceId: '55db3133efa8e3fe66e04890' }
                });
            }
            else if (minerS8_2.length < 1) {
                s8.spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE], 'Miner8W28S27_' + Game.time, {
                    memory: { role: 'remoteMiner', targetRoom: 'W28S27', sourceId: '55db3133efa8e3fe66e0488e' }
                });
            }
            else if (upgraderS8.length < 1) {
                // 1. Беремо доступну енергію в кімнаті прямо зараз
                let energy = s8.room.energyAvailable; 

                // 2. Рахуємо кількість блоків [WORK,CARRY, CARRY, MOVE] (150 energy за блок)
                let units = Math.floor(energy / 400);
                
                // 3. Обмеження гри: максимум 50 деталей на кріпа (16 блоків * 3 = 48 деталей)
                if (units > 4) units = 4;

                let body = [];

                // Якщо енергії менше 150, але є хоча б 100 — створюємо мінімального кріпа [CARRY, MOVE]
                if (units < 4 && energy >= 1600) {
                    body = [WORK, CARRY, MOVE];
                } else if (units >= 4) {
                    for (let i = 0; i < units; i++) body.push(WORK);
                    for (let i = 0; i < units*3; i++) body.push(CARRY);
                    for (let i = 0; i < units*3; i++) body.push(MOVE);
                }

                // 4. Спавнимо кріпа (якщо назбиралося хоча б на мінімальний body)
                if (body.length > 0) {
                    s8.spawnCreep(body, 'upgrader' + Game.time, { 
                        memory: { role: 'upgrader', targetRoom: 'W28S27', linkId: '6a94ac311038afb213a20df9' } 
                    });
                }
            }
            else if (LinkerStorage8.length < 1) {
                s8.spawnCreep([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], 'linkStorage8'+ Game.time, {
                    memory: {
                        role: 'linkerStorage',
                        linkId: '6a954b8348a56f1bb906a194'
                    }
                });
            }
            else if (MineralMiner_8.length < 1) {
                s8.spawnCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], 'MMiner8_' + Game.time, {
                    memory: { role: 'mineralMIner', targetRoom: 'W28S27' }
                });
            }
           
        }
        let s8_1 = Game.spawns['Spawn8_1'];
        if (s8_1 && !s8_1.spawning) { 

            if (haulerS8.length < 1) {
                // 1. Беремо доступну енергію в кімнаті прямо зараз
                let energy = s8_1.room.energyAvailable; 

                // 2. Рахуємо кількість блоків [CARRY, CARRY, MOVE] (150 energy за блок)
                let units = Math.floor(energy / 150);
                
                // 3. Обмеження гри: максимум 50 деталей на кріпа (16 блоків * 3 = 48 деталей)
                if (units > 16) units = 16;

                let body = [];

                // Якщо енергії менше 150, але є хоча б 100 — створюємо мінімального кріпа [CARRY, MOVE]
                if (units < 2 && energy >= 300) {
                    body = [CARRY, MOVE];
                } else if (units >= 1) {
                    for (let i = 0; i < units * 2; i++) body.push(CARRY);
                    for (let i = 0; i < units; i++) body.push(MOVE);
                }

                // 4. Спавнимо кріпа (якщо назбиралося хоча б на мінімальний body)
                if (body.length > 0) {
                    s8_1.spawnCreep(body, 'haulerS8' + Game.time, { 
                        memory: { role: 'hauler', targetRoom: 'W28S27' } 
                    });
                }
            }
            else if (minerS8_1.length < 1) {
                s8_1.spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE], 'Miner8W28S27_' + Game.time, {
                    memory: { role: 'remoteMiner', targetRoom: 'W28S27', sourceId: '55db3133efa8e3fe66e04890' }
                });
            }
            else if (minerS8_2.length < 1) {
                s8_1.spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE], 'Miner8W28S27_' + Game.time, {
                    memory: { role: 'remoteMiner', targetRoom: 'W28S27', sourceId: '55db3133efa8e3fe66e0488e' }
                });
            }
            else if (upgraderS8.length < 1) {
                // 1. Беремо доступну енергію в кімнаті прямо зараз
                let energy = s8.room.energyAvailable; 

                // 2. Рахуємо кількість блоків [WORK,CARRY, CARRY, MOVE] (150 energy за блок)
                let units = Math.floor(energy / 400);
                
                // 3. Обмеження гри: максимум 50 деталей на кріпа (16 блоків * 3 = 48 деталей)
                if (units > 4) units = 4;

                let body = [];

                // Якщо енергії менше 150, але є хоча б 100 — створюємо мінімального кріпа [CARRY, MOVE]
                if (units < 4 && energy >= 1600) {
                    body = [WORK, CARRY, MOVE];
                } else if (units >= 4) {
                    for (let i = 0; i < units; i++) body.push(WORK);
                    for (let i = 0; i < units*3; i++) body.push(CARRY);
                    for (let i = 0; i < units*3; i++) body.push(MOVE);
                }

                // 4. Спавнимо кріпа (якщо назбиралося хоча б на мінімальний body)
                if (body.length > 0) {
                    s8_1.spawnCreep(body, 'upgrader' + Game.time, { 
                        memory: { role: 'upgrader', targetRoom: 'W28S27', linkId: '6a94ac311038afb213a20df9' } 
                    });
                }
            }
            else if (LinkerStorage8.length < 1) {
                s8_1.spawnCreep([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], 'linkStorage8'+ Game.time, {
                    memory: {
                        role: 'linkerStorage',
                        linkId: '6a954b8348a56f1bb906a194'
                    }
                });
            }
            else if (MineralMiner_8.length < 1) {
                s8_1.spawnCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], 'MMiner8_' + Game.time, {
                    memory: { role: 'mineralMIner', targetRoom: 'W28S27' }
                });
            }
           
        }
        // --- СПАВНЕР 9
        let s9 = Game.spawns['Spawn9'];
        if (s9 && !s9.spawning) { 

            // if (harvesters9.length < 2) {
            //     // 1. Беремо доступну енергію в кімнаті прямо зараз
            //     let energy = s9.room.energyAvailable; 

            //     // 2. Рахуємо кількість блоків [CARRY, CARRY, MOVE] (150 energy за блок)
            //     let units = Math.floor(energy / 250);
                
            //     // 3. Обмеження гри: максимум 50 деталей на кріпа (16 блоків * 3 = 48 деталей)
            //     if (units > 16) units = 16;

            //     let body = [];

            //     // Якщо енергії менше 150, але є хоча б 100 — створюємо мінімального кріпа [CARRY, MOVE]
            //     if (units < 1 && energy >= 250) {
            //         body = [WORK,CARRY, MOVE];
            //     } else if (units >= 1) {
            //         for (let i = 0; i < units; i++) body.push(WORK);
            //         for (let i = 0; i < units; i++) body.push(CARRY);
            //         for (let i = 0; i < units*2; i++) body.push(MOVE);
            //     }

            //     // 4. Спавнимо кріпа (якщо назбиралося хоча б на мінімальний body)
            //     if (body.length > 0) {
            //         s9.spawnCreep(body, 'harvestS9' + Game.time, { 
            //             memory: { role: 'harvester', targetRoom: 'W23S29' } 
            //         });
            //     }
            // }
            if (haulerS9.length < 1) {
                // 1. Беремо доступну енергію в кімнаті прямо зараз
                let energy = s9.room.energyAvailable; 

                // 2. Рахуємо кількість блоків [CARRY, CARRY, MOVE] (150 energy за блок)
                let units = Math.floor(energy / 150);
                
                // 3. Обмеження гри: максимум 50 деталей на кріпа (16 блоків * 3 = 48 деталей)
                if (units > 16) units = 16;

                let body = [];

                // Якщо енергії менше 150, але є хоча б 100 — створюємо мінімального кріпа [CARRY, MOVE]
                if (units < 2 && energy >= 300) {
                    body = [CARRY, MOVE];
                } else if (units >= 1) {
                    for (let i = 0; i < units*2; i++) body.push(CARRY);
                    for (let i = 0; i < units; i++) body.push(MOVE);
                }

                // 4. Спавнимо кріпа (якщо назбиралося хоча б на мінімальний body)
                if (body.length > 0) {
                    s9.spawnCreep(body, 'haulerS9' + Game.time, { 
                        memory: { role: 'hauler', targetRoom: 'W23S29' } 
                    });
                }
            }
            else if (minerS9_1.length < 1) {
                s9.spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE], 'Mine1_9W23S29_' + Game.time, {
                    memory: { role: 'remoteMiner', targetRoom: 'W23S29', sourceId: '55db31c9efa8e3fe66e04d8e' }
                });
            }
            else if (minerS9_2.length < 1) {
                s9.spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE], 'Miner2_9W23S29_' + Game.time, {
                    memory: { role: 'remoteMiner', targetRoom: 'W23S29', sourceId: '55db31c9efa8e3fe66e04d90' }
                });
            }
            else if (LinkerStorage9.length < 1&& (!Memory.lastReserverSpawn || Game.time - Memory.lastReserverSpawn >= 1300)) {
                s9.spawnCreep([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], 'linkStorage9'+ Game.time, {
                    memory: {
                        role: 'linkerStorage',
                        linkId: '6ab410e400d0166ee859332b'
                    }
                });
            }
            else if (upgraderS9.length < 2) {
                // 1. Беремо доступну енергію в кімнаті прямо зараз
                let energy = s9.room.energyAvailable; 

                // 2. Рахуємо кількість блоків [WORK, WORK, CARRY, MOVE] (300 energy за блок)
                let units = Math.floor(energy / 400);
                
                // 3. Обмеження гри: максимум 50 деталей на кріпа (12 блоків * 3 = 48 деталей)
                if (units > 10) units = 10;

                let body = [];

                // Якщо енергії менше 150, але є хоча б 100 — створюємо мінімального кріпа [CARRY, MOVE]
                if (units < 5 && energy >= 2000) {
                    body = [WORK, CARRY, MOVE];
                } else if (units >= 5) {
                    for (let i = 0; i < units*3; i++) body.push(WORK);
                    for (let i = 0; i < units; i++) body.push(CARRY);
                    for (let i = 0; i < units; i++) body.push(MOVE);
                }

                // 4. Спавнимо кріпа (якщо назбиралося хоча б на мінімальний body)
                if (body.length > 0) {
                    s9.spawnCreep(body, 'upgrader' + Game.time, { 
                        memory: { role: 'upgrader', targetRoom: 'W23S29', linkId: '6abc754ccf0b2b6712cbd338' } 
                    });
                }
            }
            
            //  else if (remoteMinerHauler9.length < 0) {
            //     s9.spawnCreep([WORK, WORK, WORK,WORK,   
            //         CARRY, CARRY, CARRY, CARRY,
            //         CARRY, CARRY, CARRY,
            //         MOVE, MOVE, MOVE, MOVE,
            //         MOVE, MOVE, MOVE, MOVE,
            //         MOVE, MOVE, MOVE, ], 'RMH9_' + Game.time, {
            //         memory: {
            //             role: 'remoteMinerHauler',
            //             homeRoom: 'W23S29',
            //             remoteRoom: 'W24S29',
            //             harvesting: true,
            //             sourceId: '55db31a7efa8e3fe66e04ccb',
            //             linkId: '6ab02599c6e50eeb509f27c1'
            //         }
            //     });
            // }
            //  else if (MineralMiner_9.length < 0) {
            // s9.spawnCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], 'MMiner9_' + Game.time, {
            //     memory: { role: 'mineralMIner', targetRoom: 'W23S29' }
            //     });
            // }
            else if (MineralMiner_9.length < 1 && s9.room.find(FIND_MINERALS)[0].mineralAmount > 0) {
            s9.spawnCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], 'MMiner9_' + Game.time, {
                memory: { role: 'mineralMIner', targetRoom: 'W23S29' }
                });
            }
    }
        let s9_1 = Game.spawns['Spawn9_1'];
        if (s9_1 && !s9_1.spawning) { 

            // if (harvesters9.length < 2) {
            //     // 1. Беремо доступну енергію в кімнаті прямо зараз
            //     let energy = s9.room.energyAvailable; 

            //     // 2. Рахуємо кількість блоків [CARRY, CARRY, MOVE] (150 energy за блок)
            //     let units = Math.floor(energy / 250);
                
            //     // 3. Обмеження гри: максимум 50 деталей на кріпа (16 блоків * 3 = 48 деталей)
            //     if (units > 16) units = 16;

            //     let body = [];

            //     // Якщо енергії менше 150, але є хоча б 100 — створюємо мінімального кріпа [CARRY, MOVE]
            //     if (units < 1 && energy >= 250) {
            //         body = [WORK,CARRY, MOVE];
            //     } else if (units >= 1) {
            //         for (let i = 0; i < units; i++) body.push(WORK);
            //         for (let i = 0; i < units; i++) body.push(CARRY);
            //         for (let i = 0; i < units*2; i++) body.push(MOVE);
            //     }

            //     // 4. Спавнимо кріпа (якщо назбиралося хоча б на мінімальний body)
            //     if (body.length > 0) {
            //         s9.spawnCreep(body, 'harvestS9' + Game.time, { 
            //             memory: { role: 'harvester', targetRoom: 'W23S29' } 
            //         });
            //     }
            // }
            if (haulerS9.length < 1) {
                // 1. Беремо доступну енергію в кімнаті прямо зараз
                let energy = s9_1.room.energyAvailable; 

                // 2. Рахуємо кількість блоків [CARRY, CARRY, MOVE] (150 energy за блок)
                let units = Math.floor(energy / 150);
                
                // 3. Обмеження гри: максимум 50 деталей на кріпа (16 блоків * 3 = 48 деталей)
                if (units > 16) units = 16;

                let body = [];

                // Якщо енергії менше 150, але є хоча б 100 — створюємо мінімального кріпа [CARRY, MOVE]
                if (units < 2 && energy >= 300) {
                    body = [CARRY, MOVE];
                } else if (units >= 1) {
                    for (let i = 0; i < units*2; i++) body.push(CARRY);
                    for (let i = 0; i < units; i++) body.push(MOVE);
                }

                // 4. Спавнимо кріпа (якщо назбиралося хоча б на мінімальний body)
                if (body.length > 0) {
                    s9_1.spawnCreep(body, 'haulerS9' + Game.time, { 
                        memory: { role: 'hauler', targetRoom: 'W23S29' } 
                    });
                }
            }
            else if (minerS9_1.length < 1) {
                s9_1.spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE], 'Mine1_9W23S29_' + Game.time, {
                    memory: { role: 'remoteMiner', targetRoom: 'W23S29', sourceId: '55db31c9efa8e3fe66e04d8e' }
                });
            }
            else if (minerS9_2.length < 1) {
                s9_1.spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE], 'Miner2_9W23S29_' + Game.time, {
                    memory: { role: 'remoteMiner', targetRoom: 'W23S29', sourceId: '55db31c9efa8e3fe66e04d90' }
                });
            }
            else if (LinkerStorage9.length < 1) {
                s9_1.spawnCreep([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], 'linkStorage9'+ Game.time, {
                    memory: {
                        role: 'linkerStorage',
                        linkId: '6ab410e400d0166ee859332b'
                    }
                });
            }
            else if (upgraderS9.length < 2) {
                // 1. Беремо доступну енергію в кімнаті прямо зараз
                let energy = s9_1.room.energyAvailable; 

                // 2. Рахуємо кількість блоків [WORK, WORK, CARRY, MOVE] (300 energy за блок)
                let units = Math.floor(energy / 400);
                
                // 3. Обмеження гри: максимум 50 деталей на кріпа (12 блоків * 3 = 48 деталей)
                if (units > 10) units = 10;

                let body = [];

                // Якщо енергії менше 150, але є хоча б 100 — створюємо мінімального кріпа [CARRY, MOVE]
                if (units < 5 && energy >= 2000) {
                    body = [WORK, CARRY, MOVE];
                } else if (units >= 5) {
                    for (let i = 0; i < units*3; i++) body.push(WORK);
                    for (let i = 0; i < units; i++) body.push(CARRY);
                    for (let i = 0; i < units; i++) body.push(MOVE);
                }

                // 4. Спавнимо кріпа (якщо назбиралося хоча б на мінімальний body)
                if (body.length > 0) {
                    s9_1.spawnCreep(body, 'upgrader' + Game.time, { 
                        memory: { role: 'upgrader', targetRoom: 'W23S29', linkId: '6abc754ccf0b2b6712cbd338' } 
                    });
                }
            }
            
            //  else if (remoteMinerHauler9.length < 0) {
            //     s9.spawnCreep([WORK, WORK, WORK,WORK,   
            //         CARRY, CARRY, CARRY, CARRY,
            //         CARRY, CARRY, CARRY,
            //         MOVE, MOVE, MOVE, MOVE,
            //         MOVE, MOVE, MOVE, MOVE,
            //         MOVE, MOVE, MOVE, ], 'RMH9_' + Game.time, {
            //         memory: {
            //             role: 'remoteMinerHauler',
            //             homeRoom: 'W23S29',
            //             remoteRoom: 'W24S29',
            //             harvesting: true,
            //             sourceId: '55db31a7efa8e3fe66e04ccb',
            //             linkId: '6ab02599c6e50eeb509f27c1'
            //         }
            //     });
            // }
            // else if (MineralMiner_9.length < 1 && s9_1.room.find(FIND_MINERALS)[0].mineralAmount > 0) {
            // s9_1.spawnCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], 'MMiner9_' + Game.time, {
            //     memory: { role: 'mineralMiner', targetRoom: 'W23S29' }
            //     });
            // }
    }
};