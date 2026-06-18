const limits = {
    // =========================================================================
    // ГОЛОВНИЙ СКЛАД (Storage)
    // =========================================================================
    storage: {
        energy: { target: 375000, max: 800000 }
    },
 //  (Storage)
    // =========================================================================
    terminal: {
        energy: { target: 50000, max: 55000 },
        
     
    },
    // =========================================================================
    // ЗАВОД (Factory)
    // =========================================================================
    factory: {
        // Енергетичний баланс
        energy:         { target: 10000, max: 20000 },
        battery:        { target: 0,     max: 0 },

        // ---------------------------------------------------------------------
        // 1. БАЗОВІ МІНЕРАЛИ (В грі вони позначаються однією літерою)
        // ---------------------------------------------------------------------
        H:              { target: 3000,  max: 5000 }, // RESOURCE_HYDROGEN
        O:              { target: 3000,  max: 5000 }, // RESOURCE_OXYGEN
        U:              { target: 3000,  max: 5000 }, // RESOURCE_UTRIUM
        L:              { target: 3000,  max: 5000 }, // RESOURCE_LEMERIUM
        K:              { target: 3000,  max: 5000 }, // RESOURCE_KEANIUM
        Z:              { target: 3000,  max: 5000 }, // RESOURCE_ZYNTHIUM
        X:              { target: 3000,  max: 5000 }, // RESOURCE_CATALYST
        G:              { target: 2000,  max: 4000 }, // RESOURCE_GHODIUM

        // ---------------------------------------------------------------------
        // 2. СТИСНУТІ БАРИ ТА ОЧИЩЕНІ КОМПОНЕНТИ
        // ---------------------------------------------------------------------
        reductant:      { target: 0,     max: 100 },
        oxidant:        { target: 0,     max: 100 },
        utrium_bar:     { target: 0,     max: 100 },
        lemergium_bar:   { target: 0,    max: 100 },
        keanium_bar:    { target: 0,     max: 100 },
        zynthium_bar:   { target: 0,     max: 100 },
        purifier:       { target: 0,     max: 100},
        ghodium_melt:   { target: 0,     max: 100 },

        // ---------------------------------------------------------------------
        // 3. СПЕЦІАЛЬНА СИРОВИНА (З депозит-джерел)
        // ---------------------------------------------------------------------
        metal:          { target: 3000,  max: 5000 },
        biomass:        { target: 3000,  max: 5000 },
        silicon:        { target: 3000,  max: 5000 },
        mist:           { target: 3000,  max: 5000 },

        // ---------------------------------------------------------------------
        // 4. ТОВАРИ / СПОЛУКИ (Commodities високих рівнів)
        // ---------------------------------------------------------------------
        // Механічна гілка
        alloy:          { target: 0,     max: 0 },
        tube:           { target: 0,     max: 0 },
        fixtures:       { target: 0,     max: 0 },
        frame:          { target: 0,     max: 0 },
        hydraulics:     { target: 0,     max: 0 },
        machine:        { target: 0,     max: 0 },

        // Електронна гілка
        wire:           { target: 0,     max: 0 },
        switch:         { target: 0,     max: 0 },
        transistor:     { target: 0,     max: 0 },
        microchip:      { target: 0,     max: 0 },
        circuit:        { target: 0,     max: 0 },
        device:         { target: 0,     max: 0 },

        // Біологічна гілка
        cell:           { target: 0,     max: 0 },
        phlegm:         { target: 0,     max: 0 },
        tissue:         { target: 0,     max: 0 },
        muscle:         { target: 0,     max: 0 },
        organoid:       { target: 0,     max: 0 },
        organism:       { target: 0,     max: 0 },

        // Магічна гілка
        condensate:     { target: 0,     max: 0 },
        concentrate:    { target: 0,     max: 0 },
        extract:        { target: 0,     max: 0 },
        spirit:         { target: 0,     max: 0 },
        essence:        { target: 0,     max: 0 },
        emanation:      { target: 0,     max: 0 }
    },

    // =========================================================================
    // УНІВЕРСАЛЬНА ФУНКЦІЯ ДОСТУПУ
    // =========================================================================
    get: function(structureType, resourceType) {
        // Перетворюємо STRUCTURE_FACTORY ("factory") або подібні константи у ключ
        const structKey = structureType.replace('structure', '').toLowerCase();
        
        if (this[structKey] && this[structKey][resourceType]) {
            return this[structKey][resourceType];
        }

        // Якщо ресурсу немає в списках — ми його НЕ чіпаємо
        return { target: 0, max: Infinity };
    }
};

module.exports = limits;