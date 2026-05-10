var roleClaimer = {
    run: function(creep) {
             // 1. Перевірка: чи ми в цільовій кімнаті?
        if (creep.room.name !== targetRoom) {
            // Рух до іншої кімнати
            const exitDir = creep.room.findExitTo(targetRoom);
            const exit = creep.pos.findClosestByRange(exitDir);
            creep.moveTo(exit);
        } else {
            // 2. Ми в кімнаті. Шукаємо контролер
            const controller = creep.room.controller;
            
            if (controller) {
                // Намагаємось захопити
                const result = creep.claimController(controller);
                
                if (result === ERR_NOT_IN_RANGE) {
                    creep.moveTo(controller, { visualizePathStyle: {stroke: '#ffffff'} });
                } else if (result === ERR_GCL_NOT_ENOUGH) {
                    // Якщо GCL не дозволяє захопити, просто резервуємо
                    creep.reserveController(controller);
                }
            }
        }
    }
};

module.exports = roleClaimer;