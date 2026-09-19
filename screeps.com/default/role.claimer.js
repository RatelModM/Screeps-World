var roleClaimer = {
    /** @param {Creep} creep **/
    run: function(creep) {
        const targetRoom = creep.memory.targetRoom;

        if (!targetRoom) {
            console.log(`Помилка: ${creep.name} не має targetRoom в пам'яті!`);
            return;
        }

        // 1. Рух до цільової кімнати
        if (creep.room.name !== targetRoom) {
            const destination = new RoomPosition(25, 25, targetRoom);
            creep.moveTo(destination, { reusePath: 20, visualizePathStyle: { stroke: '#ff00ff' } });
            return;
        }

        // 2. Дії в цільовій кімнаті
        const controller = creep.room.controller;
        if (!controller) return;

        const myUsername = creep.owner.username;

        // КРОК 1: Якщо є БУДЬ-ЯКА резервація (навіть ваша) або чужий власник
        // claimController не спрацює, поки є резервація, тому спочатку збиваємо її
        if (controller.reservation || (controller.owner && controller.owner.username !== myUsername)) {
            const attackResult = creep.attackController(controller);
            if (attackResult === ERR_NOT_IN_RANGE) {
                creep.moveTo(controller, { reusePath: 10, visualizePathStyle: { stroke: '#ff0000' } });
            }
        } 
        // КРОК 2: Контролер повністю нейтральний — захоплюємо або резервуємо
        else {
            // Спочатку намагаємося ЗАХОПИТИ (claimController)
            const claimResult = creep.claimController(controller);

            if (claimResult === ERR_NOT_IN_RANGE) {
                creep.moveTo(controller, { reusePath: 10, visualizePathStyle: { stroke: '#00ffff' } });
            } 
            // Якщо не вистачає рівня GCL — переходимо на резервацію (reserveController)
            else if (claimResult === ERR_GCL_NOT_ENOUGH) {
                const reserveResult = creep.reserveController(controller);
                if (reserveResult === ERR_NOT_IN_RANGE) {
                    creep.moveTo(controller, { reusePath: 10, visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
        }
    }
};

module.exports = roleClaimer;