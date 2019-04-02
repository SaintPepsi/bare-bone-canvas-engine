PlayerInput = {};

PlayerInput.turnLeft = {

    key: "KeyA",

    onStep(dt) {

        if (!this.pressed) return;

    },

};

PlayerInput.turnRight = {

    key: "KeyD",

    onStep(dt) {

        if (!this.pressed) return;

    }

};

PlayerInput.accelerate = {

    key: "KeyW",

    onStep(dt) {

        if (!this.pressed) return;

    }

}


PlayerInput.decelerate = {

    key: "KeyS",

    onStep(dt) {

        if (!this.pressed) return;

    }

}
