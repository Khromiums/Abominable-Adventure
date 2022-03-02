var SceneA = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function SceneA ()
    {
        Phaser.Scene.call(this, { key: 'sceneA' });
    },

    preload: function preloadScene() {
        this.load.spritesheet("snowman", "snowman.png", {frameWidth: 300, frameHeight: 300});
	    this.load.image("background1", "assets/pixilart-drawing.png");
        this.load.image("coffee", "assets/coffee.png");
	//this.load.image("ground", "assets/ground.png");
    },

    create: function createScene() {
	   //background
	   this.background = this.add.image(400, 300, "background1");
	   this.background.setScale(2);
	
	//player
    this.anims.create({
        key: "stand",
        frameRate: 2,
        frames: this.anims.generateFrameNumbers("snowman", {start: 0, end: 1}),
        repeat: 10
    });
    
    
    this.snowman = this.physics.add.sprite(240,500, "snowman");
    this.snowman.play("stand");
	
	//player = this.physics.add.sprite(100, 450, 'dude');

	this.snowman.setBounce(0.2);
	this.snowman.setCollideWorldBounds(true);
	
	this.cursors = this.input.keyboard.createCursorKeys();
	
	//platform
	//platforms = this.physics.add.staticGroup();
	//platforms.create(400, 300, 'ground').setScale(2).refreshBody();
	
},
    update: function updateScene() {
	if (this.cursors.left.isDown)
	{
		this.snowman.setVelocityX(-160);

	}
	else if (this.cursors.right.isDown)
	{
		this.snowman.setVelocityX(160);

	}
	else
	{
		this.snowman.setVelocityX(0);

	}

	if (this.cursors.up.isDown && this.snowman.body.touching.down)
	{
		this.snowman.setVelocityY(-330);
	}
}
});


//this.scene.start('sceneA');

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
    scene: [SceneA]
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
        repeat: -1
    });
    
    snowman = this.physics.add.sprite(240,500, "snowman");
    snowman.play("stand");
    snowman.health = 0
	
    coffee = this.physics.add.staticSprite(640,500,"coffee");
    coffee.setScale(3);
    coffee.allowGravity = false
	//player = this.physics.add.sprite(100, 450, 'dude');
    
    collisionText = this.add.text(23,23,"Snowman health increased by 10", {fontSize: '32px', fill: '#000'})
    collisionText.visible = false

	snowman.setBounce(0.2);
	snowman.setCollideWorldBounds(true);
    
    this.physics.add.collider(snowman, coffee, function (snowman, coffee) {
        snowman.health += 10
        coffee.destroy()
        console.log(snowman.health)
        collisionText.visible = true
        setTimeout(textGone, 2000);
        function textGone () {
            collisionText.visible = false
        }
    });
	
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