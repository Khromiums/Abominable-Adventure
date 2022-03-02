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
		this.load.image("ground", "assets/ground.png");
    },

    create: function createScene() {
	   //background
	   this.background = this.add.image(600, 300, "background1");
	   this.background.setScale(3);
	
	//player
    this.anims.create({
        key: "stand",
        frameRate: 2,
        frames: this.anims.generateFrameNumbers("snowman", {start: 0, end: 1}),
        repeat: -1
    });
    
    this.snowman = this.physics.add.sprite(140,500, "snowman");
	//this.snowman.scale.setTo(0.5);
    this.snowman.play("stand");
    this.snowman.health = 0
        
    this.coffee = this.physics.add.staticSprite(640,500,"coffee");
    this.coffee.setScale(3);
    this.coffee.allowGravity = false
        
    collisionText = this.add.text(23,23,"Snowman health increased by 10", {fontSize: '32px', fill: '#000'})
    collisionText.visible = false

	this.snowman.setBounce(0.2);
	this.snowman.setCollideWorldBounds(true);
        
    this.physics.add.collider(this.snowman, this.coffee, function (snowman, coffee) {
        snowman.health += 10
        coffee.destroy()
        console.log(snowman.health)
        collisionText.visible = true
        setTimeout(textGone, 2000);
        function textGone () {
            collisionText.visible = false
        }
    });
	
	this.cursors = this.input.keyboard.createCursorKeys();
		
	//platforms
	platforms = this.physics.add.staticGroup();
	platforms.create(200, 670, 'ground').refreshBody();
	
	
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
    width: 1200,
    height: 720,
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
