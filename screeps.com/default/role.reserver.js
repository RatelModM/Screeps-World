var roleReserver = {
    /** @param {Creep} creep **/
    run: function(creep) {
        // 1. СИЛОВИЙ ВИХІД З КОРДОНУ
        if (creep.pos.x <= 0 || creep.pos.x >= 49 || creep.pos.y <= 0 || creep.pos.y >= 49) {
            creep.moveTo(new RoomPosition(25, 25, creep.room.name), {
                visualizePathStyle: {stroke: '#ff00ff'}
            });
            return;
        }

        // 2. ПЕРЕВІРКА КІМНАТИ
        if (creep.room.name !== creep.memory.targetRoom) {
            // Йдемо до цільової кімнати
            creep.moveTo(new RoomPosition(20, 20, creep.memory.targetRoom ), {
                reusePath: 100,
                range: 0,
                visualizePathStyle: {stroke: '#ff00ff', lineStyle: 'dashed'}
            });
            creep.say('🛰️ У рейд');
            return;
        } 
        else {
            // 3. РОБОТА З КОНТРОЛЕРОМ
            const controller = creep.room.controller;
            
            if (controller) {
                // Перевіряємо, чи контролер зайнятий ворогом (чистий власник або чужий резерв)
                let isEnemyOwned = controller.owner && controller.owner.username !== creep.owner.username;
                let isEnemyReserved = controller.reservation && controller.reservation.username !== creep.owner.username;

                // --- ЛОГІКА АТАКИ ---
                if (isEnemyOwned || isEnemyReserved) {
                    const attackResult = creep.attackController(controller);
                    
                    if (attackResult === ERR_NOT_IN_RANGE) {
                        creep.moveTo(controller, {
                            visualizePathStyle: {stroke: '#ff0000'},
                            maxRooms: 1 
                        });
                    } else if (attackResult === OK) {
                        creep.say('⚔️ Attack!');
                    }
                } 
                // --- ЛОГІКА РЕЗЕРВУВАННЯ (якщо контролер вільний або вже наш) ---
                else {
                    const reserveResult = creep.reserveController(controller);
                    
                    if (reserveResult === ERR_NOT_IN_RANGE) {
                        creep.moveTo(controller, {
                            visualizePathStyle: {stroke: '#ff00ff'},
                            maxRooms: 1 
                        });
                    } else if (reserveResult === OK) {
                        // Додатково: Підписуємо контролер (тільки один раз)
                        if (!controller.sign || controller.sign.text !== "Territory of Ratel. Peace") {
                            creep.signController(controller, "Territory of Ratel. Peace");
                        }
                        creep.say('🔒 Reserved');
                    }
                }
            }
        }
    }
};

module.exports = roleReserver;