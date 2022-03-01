let PhaserConfig = {
    type: Phaser.Auto,
    //parent: "game",
    width: 800,
    height: 600,
	physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
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
var platforms;
var cursors;

function initScene() {}

function preloadScene() {
    this.load.spritesheet("snowman", "snowman.png", {frameWidth: 300, frameHeight: 300});
	this.load.image("background1", "assets/pixilart-drawing.png");
	//this.load.image("ground", "assets/ground.png");
}

function createScene() {
	//background
	background = this.add.image(400, 300, "background1");
	background.setScale(2);
	
	//player
    this.anims.create({
        key: "stand",
        frameRate: 2,
        frames: this.anims.generateFrameNumbers("snowman", {start: 0, end: 1}),
        repeat: 10
    });
    
    snowman = this.physics.add.sprite(240,500, "snowman");
    snowman.play("stand");
	
	//player = this.physics.add.sprite(100, 450, 'dude');

	snowman.setBounce(0.2);
	snowman.setCollideWorldBounds(true);
	
	cursors = this.input.keyboard.createCursorKeys();
	
	//platform
	//platforms = this.physics.add.staticGroup();
	//platforms.create(400, 300, 'ground').setScale(2).refreshBody();
	
}

function updateScene() {
	if (cursors.left.isDown)
	{
		snowman.setVelocityX(-160);

	}
	else if (cursors.right.isDown)
	{
		snowman.setVelocityX(160);

	}
	else
	{
		snowman.setVelocityX(0);

	}

	if (cursors.up.isDown && snowman.body.touching.down)
	{
		snowman.setVelocityY(-330);
	}
}