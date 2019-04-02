class Camera {
    constructor(game) {
        this.game = game;
        this.x = 0;
        this.y = 0;


        this.target;
    }

    updatePosition() {
        if (this.target !== undefined) {
            this.x = Math.floor(-this.target.x) + Math.floor(this.game.canvas.width/2);
            this.y = Math.floor(-this.target.y) + Math.floor(this.game.canvas.height/2);
        }
    }
    newTargetToFollow(target) {
        this.target = target;
    }
}
