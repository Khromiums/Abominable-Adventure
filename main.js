let PhaserConfig = {
    type: Phaser.Auto,
    parent: "game",
    width: 1280,
    height: 720,
    scene: {
        init: initScene,
        preload: preloadScene,
        create: createScene,
        update: updateScene
        
    }
};

let game = new Phaser.Game(PhaserConfig);

var snowman;
var background;

function initScene() {}

function preloadScene() {
    this.load.spritesheet("snowman", "snowman.png", {frameWidth: 300, frameHeight: 300});
	this.load.image("background1", "assets/pixilart-drawing.png");
}

function createScene() {
    this.anims.create({
        key: "stand",
        frameRate: 2,
        frames: this.anims.generateFrameNumbers("snowman", {start: 0, end: 1}),
        repeat: 10
    });
    
    snowman = this.add.sprite(640,360, "snowman");
    snowman.play("stand");
	
	background = this.add.image(300, 300, "background1");
	background.setScale(2);

}

function updateScene() {}