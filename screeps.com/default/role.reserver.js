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
                reusePath: 50,
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
                // Спроба зарезервувати
                const result = creep.reserveController(controller);
                
                if (result === ERR_NOT_IN_RANGE) {
                    creep.moveTo(controller, {
                        visualizePathStyle: {stroke: '#ff00ff'},
                        maxRooms: 1 
                    });
                } else if (result === OK) {
                    // Додатково: Підписуємо контролер (тільки один раз)
                    if (!controller.sign || controller.sign.text !== "Territory of Ratel. Peace") {
                        creep.signController(controller, "Territory of Ratel. Peace");
                    }
                    creep.say('🔒 Reserved');
                }
            }
        }
    }
};

module.exports = roleReserver;