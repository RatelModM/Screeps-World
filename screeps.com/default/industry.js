var industry = {
    run: function(room) {
        let factory = room.find(FIND_MY_STRUCTURES, {
            filter: (s) => s.structureType == STRUCTURE_FACTORY
        })[0];

        // Якщо фабрики немає або вона на кулдауні — чекаємо
        if (!factory || factory.cooldown > 0) return;

        // ПРІОРИТЕТ 1: Стиснення сирих мінералів (Keanium, Catalyst, Oxygen)
        // Структура: { сировина: потрібна_кількість, продукт: що_вийде, енергія: 200 }
        const mineralRecipes = [
            // { ingredient: RESOURCE_OXYGEN, product: RESOURCE_OXIDANT },
            // { ingredient: RESOURCE_CATALYST, product: RESOURCE_PURIFIER },
            // { ingredient: RESOURCE_KEANIUM, product: RESOURCE_KEANIUM_BAR },
            // { ingredient: RESOURCE_LEMERGIUM, product: RESOURCE_LEMERGIUM_BAR }
        ];

        for (let recipe of mineralRecipes) {
            if (factory.store[recipe.ingredient] >= 500 && factory.store[RESOURCE_ENERGY] >= 200) {
                if (factory.store.getFreeCapacity(recipe.product) > 100) {
                    let result = factory.produce(recipe.product);
                    if (result == OK) {
                        factory.room.visual.text('🏭⚙️ ' + recipe.product, factory.pos.x, factory.pos.y, {size: 0.4, opacity: 0.8});
                        return; // Зупиняємо цикл на цьому тіку, бо фабрика може робити лише 1 дію за тік
                    }
                }
            }
        }

        // ПРІОРИТЕТ 2: Якщо мінералів немає, плавимо надлишки енергії в батарейки
        if (factory.store[RESOURCE_ENERGY] >= 11000 && factory.store.getFreeCapacity(RESOURCE_BATTERY) > 500) {
            let result = factory.produce(RESOURCE_BATTERY);
            if (result == OK) {
                factory.room.visual.text('🔋', factory.pos.x, factory.pos.y, {size: 0.4, opacity: 0.8});
            }
        }
    }
};

module.exports = industry;