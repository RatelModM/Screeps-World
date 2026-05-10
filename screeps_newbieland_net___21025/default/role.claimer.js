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
            // Набагато простіший і надійніший спосіб переходу між кімнатами.
            // Кріп сам знайде шлях до координат x:25, y:25 у вказаній кімнаті.
            const destination = new RoomPosition(25, 25, targetRoom);
            creep.moveTo(destination, { visualizePathStyle: {stroke: '#ff00ff'} });
        } 
        // 2. Ми в потрібній кімнаті. Шукаємо контролер
        else {
            const controller = creep.room.controller;
            
            if (controller) {
                // Намагаємось захопити
                const result = creep.claimController(controller);
                
                if (result === ERR_NOT_IN_RANGE) {
                    creep.moveTo(controller, { visualizePathStyle: {stroke: '#ffffff'} });
                } else if (result === ERR_GCL_NOT_ENOUGH) {
                    // Якщо рівень GCL не дозволяє захопити, резервуємо
                    const reserveResult = creep.reserveController(controller);
                    if (reserveResult === ERR_NOT_IN_RANGE) {
                        creep.moveTo(controller, { visualizePathStyle: {stroke: '#ffffff'} });
                    }
                }
            }
        }
    }
};

module.exports = roleClaimer;