var roleClaimer = {
    run: function(creep) {
        // Отримуємо назву цільової кімнати з пам'яті
        const targetRoom = creep.memory.targetRoom;

        // Захист: якщо кімната не вказана, виводимо помилку і зупиняємось
        if (!targetRoom) {
            console.log('Помилка: ' + creep.name + ' не знає, куди йти (немає targetRoom в пам\'яті)!');
            return;
        }

        // 1. Перевірка: чи ми в цільовій кімнаті?
        if (creep.room.name !== targetRoom) {
            const destination = new RoomPosition(25, 25, targetRoom);
            creep.moveTo(destination, { visualizePathStyle: {stroke: '#ff00ff'} });
        } 
        // 2. Ми в потрібній кімнаті. Шукаємо контролер
        else {
            const controller = creep.room.controller;
            
            if (controller) {
                const myUsername = creep.owner.username;

                // Перевіряємо, чи є у контролера чужий власник або чужа резервація
                const isForeignOwner = controller.owner && controller.owner.username !== myUsername;
                const isForeignReservation = controller.reservation && controller.reservation.username !== myUsername;

                // КРОК А: Нейтралізація (якщо контролер чужий)
                if (isForeignOwner || isForeignReservation) {
                    const attackResult = creep.attackController(controller);
                    
                    if (attackResult === ERR_NOT_IN_RANGE) {
                        creep.moveTo(controller, { visualizePathStyle: {stroke: '#ff0000'} });
                    }
                } 
                // КРОК Б: Захоплення або резервація (якщо контролер нейтральний)
                else {
                    const claimResult = creep.reserveController(controller);
                    
                    if (claimResult === ERR_NOT_IN_RANGE) {
                        creep.moveTo(controller, { visualizePathStyle: {stroke: '#ffffff'} });
                    } 
                    else if (claimResult === ERR_GCL_NOT_ENOUGH) {
                        // Якщо рівень GCL не дозволяє захопити, резервуємо
                        const reserveResult = creep.claimController(controller);
                        
                        if (reserveResult === ERR_NOT_IN_RANGE) {
                            creep.moveTo(controller, { visualizePathStyle: {stroke: '#00ffff'} });
                        }
                    }
                }
            }
        }
    }
};

module.exports = roleClaimer;