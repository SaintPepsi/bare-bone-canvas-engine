class ExampleEntity extends Entity {
    constructor(game, imageReference) {
        /* Super initiates the base Entity variables. */

        super();

        this.game = game;

        this.image = imageReference;

        this.moveX = Utils.random(10, 30);
        this.moveY = Utils.random(10, 30);

    }

    /*

    can add run for a couple of functions to run right after instantiating.

    run() {}


    Step is where we calculate stuff/physics

    step(dt) {}


    render is where we display the this entity to the canvas.

    render(ctx) {}
    */

    step(dt) {

        this.x += this.moveX * dt;
        if (this.x >= this.game.canvas.width - this.image.width || this.x <= 0) this.moveX *= -1;

        this.y += this.moveY * dt;
        if (this.y >= this.game.canvas.height - this.image.height || this.y <= 0) this.moveY *= -1;

    }
    render(ctx) {

        ctx.save();
        console.log('rendering');
        ctx.drawImage(this.image, this.x, this.y);
        ctx.restore();

    }
}
