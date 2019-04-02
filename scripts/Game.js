imagesToLoad = 0;
class Game {

    constructor(width, height) {

        this.keyboard = {};
        this.mouse = {};

        /* Entities are boats, birds, bullets,
        basically every object in a game is an entity */

        this.backgroundEntities = [];
        this.entities = [];

        /* Setup canvas */

        this.canvas = document.createElement("canvas");
        this.canvas.width = width / canvasScale;
        this.canvas.height = height / canvasScale;
        this.canvas.style.transform = `scale(${canvasScale})`;
        this.ctx = this.canvas.getContext("2d");
        this.ctx.imageSmoothingEnabled = false;

        /* Add events */

        this.canvas.addEventListener("click", this.onMouseClick.bind(this));

        this.canvas.addEventListener("mousedown", this.onMouseDown.bind(this));
        this.canvas.addEventListener("mouseup", this.onMouseUp.bind(this));
        this.canvas.addEventListener("mousemove", this.onMouseMove.bind(this));

        window.addEventListener("keypress", this.onKeyPress.bind(this));
        window.addEventListener("keydown", this.onKeyDown.bind(this));
        window.addEventListener("keyup", this.onKeyUp.bind(this));

        /* Add camera object */

        this.camera = new Camera(this);

        /* Run the game loop */

        this.lastTick = Date.now();

        this.process = this.process.bind(this);
        this.waitForImageLoad = this.waitForImageLoad.bind(this);

        requestAnimationFrame(this.waitForImageLoad);
        // requestAnimationFrame(this.process);


        this.images = {};

        this.loadImage('sancoca', 'assets/images/hyperlight-sancoca-char.png');

        this.playerInput = new Input(PlayerInput);


        this.add(new ExampleEntity(this, this.images.sancoca));
    }

    add(entity) {

        this.entities.push(entity);

        entity.collection = this;

    }
    addBackground(entity) {

        this.backgroundEntities.push(entity);

        entity.collection = this;

    }

    resizeCanvas() {
        this.canvas.width = width / canvasScale;
        this.canvas.height = height / canvasScale;
    }
    framesPerSecond() {
        this.ctx.save();
        this.ctx.fillStyle = "#000000";
        this.ctx.fillText(this.fps, 50, 50);
        this.ctx.restore();
    }
    checkLoadedAllImage() {
        let loaded = 0;
        for (var name in this.images) {

            if (this.images[name].ready) {
                console.log(this.images);

                loaded++;

                if (loaded === imagesToLoad) {
                    console.log('loaded');
                    return true;
                }

            }
        }
        return false;
    }
    loadImage(name, src) {
        imagesToLoad++;
        let image = new Image;

        image.ready = false;

        image.addEventListener("load", () => {

            image.ready = true;

        })

        image.src = src;

        this.images[name] = image;

    }
    waitForImageLoad() {

        if (this.checkLoadedAllImage()) {

            requestAnimationFrame(this.process);

        } else {

            requestAnimationFrame(this.waitForImageLoad);

        }
    }
    process() {

        this.step();
        this.render();

        /* schedule another game update when the browser is ready */

        requestAnimationFrame(this.process);

    }

    /* Step is anything related to calculating values */

    step() {
        let dt = (Date.now() - this.lastTick) / 1000;
        this.fps = `fps: ${Math.floor(1000 / (1000 * dt))}`;
        this.lastTick = Date.now();

        this.playerInput.step(dt);

        /* dt is deltaTime it means how many seconds passed
        from the last game update - you need that in every physics equation */

        /* Update all entities if DT has not surpassed more than half a second. */
        if (dt > 0.5) return;

        for (let entity of this.backgroundEntities) {

            if (entity.step) entity.step(dt);

        }
        for (let entity of this.entities) {

            if (entity.step) entity.step(dt);

        }
        for (let i = 0; i < this.entities.length; i++) {

            let entity = this.entities[i];

            if (entity.remove) this.entities.splice(i--, 1);

        }

        this.camera.updatePosition();


        /* sort entities by y */

        this.sortEntitiesByY(this.backgroundEntities);
        this.sortEntitiesByY(this.entities);

    }
    sortEntitiesByY(entities) {
        entities.sort(function(a, b) {
            return a.y - b.y;
        });
    }

    /* Render is where we put everything on the screen */

    render() {

        this.ctx.fillStyle = "#5B6EE1";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.save();
        this.ctx.translate(this.camera.x, this.camera.y);


        /* Render all background entities */
        for (let entity of this.backgroundEntities) {

            if (entity.render) entity.render(this.ctx);

        }
        /* Render all entities */
        for (let entity of this.entities) {

            if (entity.render) entity.render(this.ctx);

        }


        this.ctx.restore();
        this.framesPerSecond();
    }

    spriteImage(image, _direction) {

        let direction = Utils.modulo(_direction + Math.PI, Math.PI * 2);

        let frameIndex = Math.round(direction / (Math.PI * 2) * SPRITE_ANGLES | 0);

        if (frameIndex < 0 || frameIndex > SPRITE_ANGLES) alert('frameIndex is high: ' + frameIndex);

        let spriteWidth = image.width / SPRITE_ANGLES;

        this.ctx.drawImage(image, frameIndex * spriteWidth, 0, spriteWidth, image.height, -spriteWidth / 2, -image.height * 0.6, spriteWidth, image.height);

    }


    onKeyDown(event) {

        this.keyboard[event.code] = true;

    }

    onKeyUp(event) {

        this.keyboard[event.code] = false;

    }

    onKeyPress(event) {}

    onMouseClick(event) {}

    onMouseDown(event) {}

    onMouseUp(event) {}



    onMouseMove(event) {}

}
