class Input {

    constructor(commands) {

        this.commands = commands;

        this.keys = {};

        for (let commandName in this.commands) {

            let command = this.commands[commandName];

            this.keys[command.key] = commandName;

        }


    }

    step(dt) {

        for (let commandName in this.commands) {

            let command = this.commands[commandName];

            if (command.onStep) command.onStep(dt);

        }

    }

    onKeyDown(e) {

        let commandName = this.keys[e.code];

        if (!commandName) return;

        let command = this.commands[commandName];

        if (!command) return;

        command.pressed = true;

        if (command.onPress) command.onPress();

    }

    onKeyUp(e) {

        let commandName = this.keys[e.code];

        if (!commandName) return;

        let command = this.commands[commandName];

        if (!command) return;

        command.pressed = false;

        if (command.onRelease) command.onRelease();

    }

}
