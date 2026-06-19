var marketManager = {
    // Базові налаштування ринку
    config: {
        TERMINAL_ENERGY_BUFFER: 40000, // Скільки енергії тримати в терміналі для відправок / оплати доставки
        TRADE_AMOUNT: 1000,            // Розмір однієї партії для продажу/пересилки/закупівлі
        SURPLUS_THRESHOLD: 15000,      // Загальний поріг для твоїх мінералів (якщо більше — продаємо)
        
        SELL_THRESHOLDS: {
            [RESOURCE_BATTERY]: 30000,       // Батареї продаємо тільки якщо їх більше 30к
            [RESOURCE_LEMERGIUM_BAR]: 1000,  // Бари продаємо, якщо накопичилось більше 6к
            // [RESOURCE_KEANIUM_BAR]: 10000,
            // [RESOURCE_OXIDANT]: 20000,
            // [RESOURCE_PURIFIER]: 3000,
            
            // // Базові мінерали (наприклад, продаємо тільки надлишки вище 20к)
            // [RESOURCE_HYDROGEN]: 20000,
            // [RESOURCE_OXYGEN]: 20000,
            // [RESOURCE_UTRIUM]: 20000,
            // [RESOURCE_LEMERGIUM]: 25000,     // Захист: продаємо лише якщо вище 25к (для фабрики)
            // [RESOURCE_KEANIUM]: 20000,
            // [RESOURCE_ZYNTHIUM]: 20000,
            // [RESOURCE_CATALYST]: 20000
        },
        // Мінімальні ціни продажу (Запобіжник: ціна SELL-ордера ніколи не впаде нижче цих значень)
        MIN_PRICES: {
            [RESOURCE_BATTERY]: 300,
            // [RESOURCE_OXIDANT]: 2200.5,
            // [RESOURCE_PURIFIER]: 4500.05,
            // [RESOURCE_KEANIUM_BAR]: 800.05,
            
            
            // Захист дефіцитних ресурсів (ціна продажу обов'язково вища за ціну закупівлі)
            [RESOURCE_LEMERGIUM]: 880,       
            [RESOURCE_LEMERGIUM_BAR]: 3900   
        },

        // НАЛАШТУВАННЯ ДЛЯ ЗАКУПІВЛІ (Миттєва скупка та пасивні BUY-ордери)
        BUY_CONFIG: {
            [RESOURCE_LEMERGIUM]: {
                maxAmount: 10000,     // Нам потрібно 10к для фабрики
                maxPrice: 450,        // Купуємо не дорожче ніж 650
                sellThreshold: 25000  // Продаємо лише якщо накопичилось більше 25к (захист від зациклення)
            },
            // [RESOURCE_LEMERGIUM_BAR]: {
            //     maxAmount: 2000,  
            //     maxPrice: 2900,   
            //     sellThreshold: 2500  
            // }
        }
    },

    run: function() {
        for (let roomName in Game.rooms) {
            let room = Game.rooms[roomName];
            
            // Перевіряємо термінал та його cooldown
            if (room.controller && room.controller.my && room.terminal && room.terminal.cooldown === 0) {
                
                // ЕТАП 1: Внутрішня допомога між своїми кімнатами
                if (this.handleInternalTransfers(room)) continue; 

                // ЕТАП 2: Миттєвий продаж надлишків (за чужими BUY-ордерами)
                if (this.handleInstantDeals(room)) continue;

                // ЕТАП 3: Миттєва скупка дефіциту (за чужими SELL-ордерами)
                if (this.handleInstantBuys(room)) continue;

                // ЕТАП 4: Створення, поповнення та актуалізація власних ордерів (SELL / BUY)
                this.manageOrders(room);
            }
        }
    },

   // 1. ВНУТРІШНЯ ПЕРЕДАЧА ЕНЕРГІЇ ТА БАТАРЕЙ
    handleInternalTransfers: function(room) {
        let terminalStore = room.terminal.store;

        // --- ЧАСТИНА А: ПЕРЕСИЛКА ЕНЕРГІЇ ---
        let energyInTerminal = terminalStore[RESOURCE_ENERGY];
        if (energyInTerminal > this.config.TERMINAL_ENERGY_BUFFER + this.config.TRADE_AMOUNT) {
            for (let otherRoomName in Game.rooms) {
                let targetRoom = Game.rooms[otherRoomName];
                if (targetRoom.controller && targetRoom.controller.my && targetRoom.terminal && targetRoom.name !== room.name) {
                    // Якщо у сусідній кімнаті менше 8000 енергії
                    if (targetRoom.terminal.store[RESOURCE_ENERGY] < 10000) {
                        let result = room.terminal.send(RESOURCE_ENERGY, this.config.TRADE_AMOUNT, targetRoom.name, "Internal energy support");
                        if (result === OK) {
                            console.log(`[Market] 👍 УСПІХ: ${room.name} відправила ${this.config.TRADE_AMOUNT} ЕНЕРГІЇ в ${targetRoom.name}`);
                            return true; 
                        }
                    }
                }
            }
        }

        // --- ЧАСТИНА Б: ПЕРЕСИЛКА БАТАРЕЙ (Нова логіка) ---
        let batteriesInTerminal = terminalStore[RESOURCE_BATTERY] || 0;
        // Відправляємо тільки якщо у нас накопичився солідний надлишок (більше 50к)
       if (batteriesInTerminal > 50000) {
            for (let otherRoomName in Game.rooms) {
                let targetRoom = Game.rooms[otherRoomName];
                if (targetRoom.controller && targetRoom.controller.my && targetRoom.terminal && targetRoom.name !== room.name) {
                    
                    let targetBatteries = targetRoom.terminal.store[RESOURCE_BATTERY] || 0;
                    // Якщо в цільовій кімнаті батарей менше ніж 30000 (вона голодує)
                    if (targetBatteries < 30000) {
                        
                        // Розраховуємо вартість доставки в енергії
                        let energyCost = Game.market.calcTransactionCost(this.config.TRADE_AMOUNT, room.name, targetRoom.name);
                        
                        // Перевіряємо, чи вистачить енергії в терміналі на цю відправку
                        if (terminalStore[RESOURCE_ENERGY] >= energyCost) {
                            let result = room.terminal.send(RESOURCE_BATTERY, this.config.TRADE_AMOUNT, targetRoom.name, "Internal battery support");
                            if (result === OK) {
                                console.log(`[Market] 🔋 УСПІХ: ${room.name} переслала пачку ${this.config.TRADE_AMOUNT} БАТАРЕЙ в ${targetRoom.name}. Оплата доставки: ${energyCost} енергії.`);
                                return true; 
                            }
                        }
                    }
                }
            }
        }

        return false;
    },

    // 2. МИТТЄВИЙ ПРОДАЖ НАДЛИШКІВ
    handleInstantDeals: function(room) {
        let terminalStore = room.terminal.store;
        for (let resourceType in terminalStore) {
            if (resourceType === RESOURCE_ENERGY) continue;

            let amount = terminalStore[resourceType];
            
            // Визначаємо індивідуальний поріг надлишків для ресурсу
            let surplusLimit = this.config.SELL_THRESHOLDS[resourceType] !== undefined 
              ? this.config.SELL_THRESHOLDS[resourceType] 
              : (this.config.BUY_CONFIG[resourceType] ? this.config.BUY_CONFIG[resourceType].sellThreshold : this.config.SURPLUS_THRESHOLD);

            if (amount >= surplusLimit) {
                let orders = Game.market.getAllOrders({type: ORDER_BUY, resourceType: resourceType});
                let minPrice = this.config.MIN_PRICES[resourceType] || 0.01;
                orders = orders.filter(o => o.price >= minPrice);

                if (orders.length > 0) {
                    orders.sort((a, b) => {
                        if (b.price !== a.price) return b.price - a.price;
                        return Game.map.getRoomLinearDistance(room.name, a.roomName) - Game.map.getRoomLinearDistance(room.name, b.roomName);
                    });

                    let bestOrder = orders[0];
                    let tradeAmount = Math.min(this.config.TRADE_AMOUNT, bestOrder.amount);
                    let energyCost = Game.market.calcTransactionCost(tradeAmount, room.name, bestOrder.roomName);
                    
                    if (terminalStore[RESOURCE_ENERGY] >= energyCost) {
                        let result = Game.market.deal(bestOrder.id, tradeAmount, room.name);
                        if (result === OK) {
                            console.log(`[Market] ${room.name} миттєво продала ${tradeAmount} ${resourceType} по ціні ${bestOrder.price}`);
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    },

    // З. МИТТЄВА СКУПКА ДЕФІЦИТУ
    handleInstantBuys: function(room) {
        let terminalStore = room.terminal.store;

        for (let resourceType in this.config.BUY_CONFIG) {
            let buySettings = this.config.BUY_CONFIG[resourceType];
            let currentAmount = terminalStore[resourceType] || 0;

            if (currentAmount < buySettings.maxAmount) {
                let neededAmount = buySettings.maxAmount - currentAmount;
                let tradeAmount = Math.min(this.config.TRADE_AMOUNT, neededAmount);

                let orders = Game.market.getAllOrders({type: ORDER_SELL, resourceType: resourceType});
                orders = orders.filter(o => o.price <= buySettings.maxPrice && o.amount > 0);

                if (orders.length > 0) {
                    orders.sort((a, b) => {
                        if (a.price !== b.price) return a.price - b.price;
                        return Game.map.getRoomLinearDistance(room.name, a.roomName) - Game.map.getRoomLinearDistance(room.name, b.roomName);
                    });

                    let bestOrder = orders[0];
                    let finalTradeAmount = Math.min(tradeAmount, bestOrder.amount);
                    let energyCost = Game.market.calcTransactionCost(finalTradeAmount, room.name, bestOrder.roomName);

                    if (terminalStore[RESOURCE_ENERGY] >= energyCost) {
                        let result = Game.market.deal(bestOrder.id, finalTradeAmount, room.name);
                        if (result === OK) {
                            console.log(`[Market] 🛒 МИТТЄВА ЗАКУПІВЛЯ: ${room.name} купила ${finalTradeAmount} ${resourceType} по ціні ${bestOrder.price}. Енергія доставки: ${energyCost}`);
                            return true; 
                        }
                    }
                }
            }
        }
        return false;
    },

    // 4. УПРАВЛІННЯ ВЛАСНИМИ ОРДЕРАМИ (Створення та актуалізація порожніх/неактивних ордерів)
    manageOrders: function(room) {
        let myOrders = Object.values(Game.market.orders).filter(o => o.roomName === room.name);
        let terminalStore = room.terminal.store;

        // ЧАСТИНА А: Робота з SELL-ордерами (Продаж та поповнення)
        for (let resourceType in terminalStore) {
            if (resourceType === RESOURCE_ENERGY) continue;

            let amount = terminalStore[resourceType];
            
            let surplusLimit = this.config.SELL_THRESHOLDS[resourceType] !== undefined 
              ? this.config.SELL_THRESHOLDS[resourceType] 
              : (this.config.BUY_CONFIG[resourceType] ? this.config.BUY_CONFIG[resourceType].sellThreshold : this.config.SURPLUS_THRESHOLD);
            if (amount >= surplusLimit) {
                let existingSellOrder = myOrders.find(o => o.resourceType === resourceType && o.type === ORDER_SELL);
                
                if (!existingSellOrder) {
                    // Якщо ордера взагалі немає в базі — створюємо новий
                    let history = Game.market.getHistory(resourceType);
                    let avgPrice = history.length ? history[history.length - 1].avgPrice : this.config.MIN_PRICES[resourceType];
                    let targetPrice = Math.max(avgPrice, this.config.MIN_PRICES[resourceType] || 0.1);

                    let result = Game.market.createOrder({
                        type: ORDER_SELL,
                        resourceType: resourceType,
                        price: targetPrice,
                        totalAmount: this.config.TRADE_AMOUNT,
                        roomName: room.name
                    });

                    if (result === OK) {
                        console.log(`[Market] 📈 Створено новий SELL-ордер у ${room.name} на ${resourceType} за ціною ${targetPrice}`);
                    }
                } else {
                    // АКТУАЛІЗАЦІЯ ОРДЕРА: якщо ордер існує, але його викупили (навіть якщо active: false)
                    if (existingSellOrder.remainingAmount < 1000) {
                        let result = Game.market.extendOrder(existingSellOrder.id, this.config.TRADE_AMOUNT);
                        if (result === OK) {
                            console.log(`[Market] 🔄 Актуалізовано та поповнено ордер ${existingSellOrder.id} на +${this.config.TRADE_AMOUNT} ${resourceType} у кімнаті ${room.name}`);
                        }
                    }
                }
            }
        }

        // ЧАСТИНА Б: Робота з BUY-ордерами (Пасивне скуповування)
        for (let resourceType in this.config.BUY_CONFIG) {
            let buySettings = this.config.BUY_CONFIG[resourceType];
            let currentAmount = terminalStore[resourceType] || 0;

            if (currentAmount < buySettings.maxAmount) {
                let existingBuyOrder = myOrders.find(o => o.resourceType === resourceType && o.type === ORDER_BUY);

                if (!existingBuyOrder) {
                    let history = Game.market.getHistory(resourceType);
                    let marketPrice = history.length ? history[history.length - 1].avgPrice : buySettings.maxPrice;
                    let targetPrice = Math.min(marketPrice, buySettings.maxPrice);

                    let result = Game.market.createOrder({
                        type: ORDER_BUY,
                        resourceType: resourceType,
                        price: targetPrice,
                        totalAmount: this.config.TRADE_AMOUNT,
                        roomName: room.name
                    });

                    if (result === OK) {
                        console.log(`[Market] 📉 Створено пасивний BUY-ордер у ${room.name} для закупки ${resourceType}`);
                    }
                } else {
                    // Якщо нам розпродали ордер на закупівлю — розширюємо його
                    if (existingBuyOrder.remainingAmount < 200) {
                        let potentialTotal = currentAmount + existingBuyOrder.remainingAmount + this.config.TRADE_AMOUNT;
                        if (potentialTotal <= buySettings.maxAmount) {
                            Game.market.extendOrder(existingBuyOrder.id, this.config.TRADE_AMOUNT);
                        }
                    }
                }
            }
        }
    }
};

module.exports = marketManager;