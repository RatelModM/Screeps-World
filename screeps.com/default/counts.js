module.exports = function() {
    // Ініціалізуємо всі масиви порожніми
    const counts = {
        harvesters: [], harvesters2: [], harvesters3: [], harvesters4: [], harvesters5: [], harvesters6: [],
        upgraderS1: [], upgraderS2: [], upgraderS3: [], upgraderS4: [], upgraderS5: [], upgraderS6: [],
        builders: [], builders2: [], builders3: [], builders4: [],
        defenderS1_1: [], defenderS2_1: [], defenderS2_2: [], defenderS3_1: [], defenderS3_2: [], defenderS4_1: [], defenderS5_1: [],
        miner: [], minersOnSource: [],
        minerS2_1: [], minerS2_2: [], minerS3_1: [], minerS3_2: [], minerS5_1: [], minerS5_2: [], minerS6_1: [], minerS6_2: [],
        haulerS1: [], haulerS2: [], haulerS3: [], haulerS4: [], haulerS5: [], haulerS6: [],
        remoteBuilderS1: [], remoteBuilderS2: [],
        reservers1_1: [], reservers2_1: [], reservers2_2: [], reservers3_1: [], reservers4_1: [], reservers5_1: [],
        SpawnHaulerS1: [], SpawnHaulerS2: [], SpawnHaulerS3: [], SpawnHaulerS4: [], SpawnHaulerS5: [], SpawnHaulerS6: [],
        remoteMiners1_1: [], remoteMiners1_2: [], remoteMiners2_1: [], remoteMiners2_2: [], remoteMiners2_3: [], remoteMiners2_4: [],
        remoteMiners3_1: [], remoteMiners3_2: [], remoteMiners4_3: [], remoteMiners4_4: [], remoteMiners4_1: [], remoteMiners4_2: [], remoteMiners5_1: [],
        remoteMinerHauler2_1: [], remoteMinerHauler3_1: [], remoteMinerHauler4_1: [], remoteMinerHauler4_2: [],
        MineralMiner_1: [], MineralMiner_2: [], MineralMiner_3: [], MineralMiner_4: [], MineralMiner_5: [], MineralMiner_6: [],
        remoteHaulers1_1: [], remoteHaulers2_1: [], remoteHaulers2_2: [], remoteHaulers3_1: [], remoteHaulers4_1: [], remoteHaulers5_1: [], remoteHaulers6_1: [],
        LinkerStorage1: [], LinkerStorage2: [], LinkerStorage3: [], LinkerStorage4: [], LinkerStorage5: [], LinkerStorage6: [],
        Claimer: [],
        towers: []
    };

    // ОДИН цикл для перебору всіх кріпів (Замість 60+ важких фільтрів)
    for (const name in Game.creeps) {
        const creep = Game.creeps[name];
        const mem = creep.memory;

        switch (mem.role) {
            case 'harvester':
                if (mem.targetRoom === "W29S28") counts.harvesters.push(creep);
                else if (mem.targetRoom === "W27S29") counts.harvesters2.push(creep);
                else if (mem.targetRoom === "W27S27") counts.harvesters3.push(creep);
                else if (mem.targetRoom === "W29S27") counts.harvesters4.push(creep);
                else if (mem.targetRoom === "W28S29") counts.harvesters5.push(creep);
                else if (mem.targetRoom === "W27S28") counts.harvesters6.push(creep);
                break;

            case 'upgrader':
                if (mem.targetRoom === "W29S28") counts.upgraderS1.push(creep);
                else if (mem.targetRoom === "W27S29") counts.upgraderS2.push(creep);
                else if (mem.targetRoom === "W27S27") counts.upgraderS3.push(creep);
                else if (mem.targetRoom === "W29S27") counts.upgraderS4.push(creep);
                else if (mem.targetRoom === "W28S29") counts.upgraderS5.push(creep);
                else if (mem.targetRoom === "W27S28") counts.upgraderS6.push(creep);
                break;

            case 'builder':
                if (mem.targetRoom === "W29S28") counts.builders.push(creep);
                else if (mem.targetRoom === "W27S29") counts.builders2.push(creep);
                else if (mem.targetRoom === "W27S27") counts.builders3.push(creep);
                else if (mem.targetRoom === "W29S27") counts.builders4.push(creep);
                break;

            case 'defender':
                if (mem.targetRoom === "W28S28") counts.defenderS1_1.push(creep);
                else if (mem.targetRoom === "W29S29") counts.defenderS2_1.push(creep);
                else if (mem.targetRoom === "W26S29") counts.defenderS2_2.push(creep);
                else if (mem.targetRoom === "W27S28") counts.defenderS3_1.push(creep);
                else if (mem.targetRoom === "W27S26") counts.defenderS3_2.push(creep);
                else if (mem.targetRoom === "W28S27") counts.defenderS4_1.push(creep);
                else if (mem.targetRoom === "W29S29") counts.defenderS5_1.push(creep);
                break;

            case 'miner':
                counts.miner.push(creep);
                if (mem.targetSourceId === '55db3116efa8e3fe66e047c9') counts.minersOnSource.push(creep);
                break;

            case 'remoteMiner':
                // Група minerS
                if (mem.sourceId === '55db3155efa8e3fe66e04958') counts.minerS2_1.push(creep);
                else if (mem.sourceId === '55db3155efa8e3fe66e04957') counts.minerS2_2.push(creep);
                else if (mem.sourceId === '55db3154efa8e3fe66e04950') counts.minerS3_1.push(creep);
                else if (mem.sourceId === '55db3154efa8e3fe66e04951') counts.minerS3_2.push(creep);
                else if (mem.sourceId === '55db3134efa8e3fe66e04897') counts.minerS5_1.push(creep);
                else if (mem.sourceId === '55db3134efa8e3fe66e04898') counts.minerS5_2.push(creep);
                else if (mem.sourceId === '55db3155efa8e3fe66e04953') counts.minerS6_1.push(creep);
                else if (mem.sourceId === '55db3155efa8e3fe66e04955') counts.minerS6_2.push(creep);
                
                // Група remoteMiners
                if (mem.sourceId === '55db3133efa8e3fe66e04894') counts.remoteMiners1_1.push(creep);
                else if (mem.sourceId === '55db3133efa8e3fe66e04892') counts.remoteMiners1_2.push(creep);
                else if (mem.sourceId === '55db3134efa8e3fe66e04897') counts.remoteMiners2_1.push(creep);
                else if (mem.sourceId === '55db3134efa8e3fe66e04898') counts.remoteMiners2_2.push(creep);
                else if (mem.sourceId === '55db3178efa8e3fe66e04a7d') counts.remoteMiners2_3.push(creep);
                else if (mem.sourceId === '55db3178efa8e3fe66e04a7e') counts.remoteMiners2_4.push(creep);
                else if (mem.sourceId === '55db3155efa8e3fe66e04953') counts.remoteMiners3_1.push(creep);
                else if (mem.sourceId === '55db3155efa8e3fe66e04955') counts.remoteMiners3_2.push(creep);
                else if (mem.sourceId === '55db3133efa8e3fe66e0488e') counts.remoteMiners4_3.push(creep);
                else if (mem.sourceId === '55db3133efa8e3fe66e04890') counts.remoteMiners4_4.push(creep);
                else if (mem.sourceId === '55db3116efa8e3fe66e047c5') counts.remoteMiners4_1.push(creep);
                else if (mem.sourceId === '55db3116efa8e3fe66e047c6') counts.remoteMiners4_2.push(creep);
                else if (mem.sourceId === '55db3117efa8e3fe66e047cd') counts.remoteMiners5_1.push(creep);
                break;

            case 'hauler':
                if (mem.targetRoom === "W29S28") counts.haulerS1.push(creep);
                else if (mem.targetRoom === "W27S29") counts.haulerS2.push(creep);
                else if (mem.targetRoom === "W27S27") counts.haulerS3.push(creep);
                else if (mem.targetRoom === "W29S27") counts.haulerS4.push(creep);
                else if (mem.targetRoom === "W28S29") counts.haulerS5.push(creep);
                else if (mem.targetRoom === "W27S28") counts.haulerS6.push(creep);
                break;

            case 'remoteBuilder':
                if (mem.targetRoom === "W27S28") counts.remoteBuilderS1.push(creep);
                else if (mem.targetRoom === "W28S29") counts.remoteBuilderS2.push(creep);
                break;

            case 'reserver':
                if (mem.targetRoom === 'W28S28') counts.reservers1_1.push(creep);
                else if (mem.targetRoom === 'W27S28') counts.reservers2_1.push(creep);
                else if (mem.targetRoom === 'W26S29') counts.reservers2_2.push(creep);
                else if (mem.targetRoom === 'W29S26') counts.reservers3_1.push(creep);
                else if (mem.targetRoom === 'W28S27') counts.reservers4_1.push(creep);
                else if (mem.targetRoom === 'W29S29') counts.reservers5_1.push(creep);
                break;

            case 'spawnhauler':
                if (mem.targetRoom === "W29S28") counts.SpawnHaulerS1.push(creep);
                else if (mem.targetRoom === "W27S29") counts.SpawnHaulerS2.push(creep);
                else if (mem.targetRoom === "W27S27") counts.SpawnHaulerS3.push(creep);
                else if (mem.targetRoom === "W29S27") counts.SpawnHaulerS4.push(creep);
                else if (mem.targetRoom === "W28S29") counts.SpawnHaulerS5.push(creep);
                else if (mem.targetRoom === "W27S28") counts.SpawnHaulerS6.push(creep);
                break;

            case 'remoteMinerHauler':
                if (mem.sourceId === '55db318befa8e3fe66e04ba5') counts.remoteMinerHauler2_1.push(creep);
                else if (mem.sourceId === '55db3154efa8e3fe66e0494d') counts.remoteMinerHauler3_1.push(creep);
                else if (mem.sourceId === '55db3115efa8e3fe66e047c3') counts.remoteMinerHauler4_1.push(creep);
                else if (mem.sourceId === '55db3115efa8e3fe66e047c1') counts.remoteMinerHauler4_2.push(creep);
                break;

            case 'mineralMIner':
                if (mem.targetRoom === 'W29S28') counts.MineralMiner_1.push(creep);
                else if (mem.targetRoom === 'W27S29') counts.MineralMiner_2.push(creep);
                else if (mem.targetRoom === 'W27S27') counts.MineralMiner_3.push(creep);
                else if (mem.targetRoom === 'W29S27') counts.MineralMiner_4.push(creep);
                else if (mem.targetRoom === 'W28S29') counts.MineralMiner_5.push(creep);
                else if (mem.targetRoom === 'W27S28') counts.MineralMiner_6.push(creep);
                break;

            case 'remoteHauler':
                if (mem.targetRoom === 'W28S28') counts.remoteHaulers1_1.push(creep);
                else if (mem.targetRoom === 'W27S28') counts.remoteHaulers2_1.push(creep);
                else if (mem.targetRoom === 'W26S29') counts.remoteHaulers2_2.push(creep);
                else if (mem.targetRoom === 'W27S28') counts.remoteHaulers3_1.push(creep);
                else if (mem.targetRoom === 'W28S27') counts.remoteHaulers4_1.push(creep);
                else if (mem.targetRoom === 'W29S29') counts.remoteHaulers5_1.push(creep);
                else if (mem.targetRoom === 'W27S29') counts.remoteHaulers6_1.push(creep);
                break;

            case 'linkerStorage':
                if (mem.linkId === '6a1a9ad106382f425a860ee9') counts.LinkerStorage1.push(creep);
                else if (mem.linkId === '6a17638d5d6bdcd5eeb4ca61') counts.LinkerStorage2.push(creep);
                else if (mem.linkId === '6a17496873d18470acf2ef44') counts.LinkerStorage3.push(creep);
                else if (mem.linkId === '6a58f2831834efde698d694f') counts.LinkerStorage4.push(creep);
                else if (mem.linkId === '6a28f72d0b346572948cf561') counts.LinkerStorage5.push(creep);
                else if (mem.linkId === '6a420a4ae4e7cf835ecb98e2') counts.LinkerStorage6.push(creep);
                break;

            case 'claimer':
                counts.Claimer.push(creep);
                break;
        }
    }

    // Рахуємо вежі окремо (по структурах)
    counts.towers = _.filter(Game.structures, s => s.structureType == STRUCTURE_TOWER);

    return counts;
};