module.exports = function() {
    // Допоміжна функція, щоб не писати купу однакових if-перевірок
    function processLink(sourceId, targetId, minEnergy = 700) {
        const source = Game.getObjectById(sourceId);
        const target = Game.getObjectById(targetId);

        if (source && target && source.cooldown === 0) {
            if (source.store.getUsedCapacity(RESOURCE_ENERGY) >= minEnergy) {
                source.transferEnergy(target);
            }
        }
    }

    // === SPAWN 1 ===
    const targetS1 = '6a1a9ad106382f425a860ee9';
    processLink('6a1431c777fce14e0c0e72a9', targetS1);
    processLink('6a01e57a532f25f5ab19ec66', targetS1);
    processLink('6a2fa1f5a9c1c077f350c3f7', targetS1);

    // === SPAWN 2 ===
    const targetS2 = '6a17638d5d6bdcd5eeb4ca61';
    processLink('6a0c505ae7e8d2a68cdffb4c', targetS2);
    processLink('6a58ff9adb6eed661217b59c', targetS2);

    // === SPAWN 3 ===
    const targetS3 = '6a58f9655ef34826f219d8ad';
    processLink('6a32bfa22a5f581a771e6b7b', targetS3, 800); // Тут ліміт 800 енергії!
    processLink('6a2712b759ab19389d8a2d1b', targetS3);

    // === SPAWN 4 ===
    const targetS4 = '6a58f2831834efde698d694f';
    processLink('6a1a03a14f03e80f8e25132f', targetS4);
    processLink('6a1ec9cb34a2fbc89c868aba', targetS4);
    processLink('6a2aad18ee0887a45a89d95c', targetS4);

    // === SPAWN 5 ===
    const targetS5 = '6a28f72d0b346572948cf561';
    processLink('6a4a2f2946522b636e1cb472', targetS5);
    processLink('6a34ed6f5d1621514c166b19', targetS5);

    // === SPAWN 6 ===
    const targetS6 = '6a420a4ae4e7cf835ecb98e2';
    processLink('6a422d0e7d65b3c30e6484e2', targetS6);
    processLink('6a47d126c02cb4f8836f60fe', targetS6);
};