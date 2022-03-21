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
        this.load.image("paper", "assets/Paper.png");
        this.load.image("roach", "assets/roach.png");
        this.load.image("rat","assets/rat1.png");
    },

    create: function createScene() {
		
	   //background
	   this.background = this.add.image(600, 300, "background1");
	   this.background.setScale(3);
       scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '40px', fill: '#0000ff' });
       healthText = this.add.text(16, 70, 'Health: 50' + '%', { fontSize: '40px', fill: '#0000ff' });
		
		//platforms
	platforms = this.physics.add.staticGroup();
	platforms.create(200, 670, 'ground').refreshBody();
	platforms.create(900, 670, 'ground');
	platforms.create (400, 400, 'ground');
	
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
    this.snowman.health = 50
    this.snowman.score = 0
        
    this.coffee = this.physics.add.staticSprite(440,630,"coffee");
    this.coffee.setScale(3);
    this.coffee.allowGravity = false
        
    this.roach = this.physics.add.staticSprite(1000, 630, "roach");
    this.roach.setScale(2)
    this.physics.add.collider(this.snowman,this.roach, function (snowman, roach){
        snowman.health -= 5
        healthText.setText('Health: ' + snowman.health + '%');
        roach.destroy()
    });
        
    this.rat = this.physics.add.staticSprite(1100, 630, "rat");
    //this.roach.setScale(2)
    this.physics.add.collider(this.snowman,this.rat, function (snowman, rat){
        snowman.health -= 10
        healthText.setText('Health: ' + snowman.health + '%');
        rat.destroy()
    });
    
	this.snowman.setBounce(0.2);
	this.snowman.setCollideWorldBounds(true);
        
    this.physics.add.collider(this.snowman, this.coffee, function (snowman, coffee) {
        snowman.health += 5
        healthText.setText('Health: ' + snowman.health + '%');
        coffee.destroy()

    });
        
    this.paper = this.physics.add.staticSprite(750,630,"paper");
    this.paper.setScale(3);
    this.paper.allowGravity = true
	
    this.physics.add.collider(this.snowman, this.paper, function (snowman, paper) {
        snowman.score += 5
        scoreText.setText('Score: ' + snowman.score);
        paper.destroy()
    });
	this.cursors = this.input.keyboard.createCursorKeys();
		
	this.physics.add.collider(player, platforms);
	
	
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
	else if (this.cursors.up.isDown)
	{
		this.snowman.setVelocityY(-100);
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

var tutorial_scene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function SceneTutorial ()
    {
        Phaser.Scene.call(this, { key: 'tutorial_scene' });
    },
    
    preload: function preloadScene () {
        this.load.image('tutorial', 'assets/tutorial.png');
        
    },
    create: function createScene () {
        this.background = this.add.image(600, 300, "tutorial");
	    this.background.setScale(2.3);  
        instructionText = this.add.text(110, 620, 'Press Enter to start', { fontSize: '80px', fill: '#000000' });
	    this.cursors = this.input.keyboard.createCursorKeys();
        this.input.keyboard.once('keydown-ENTER', function () {
            this.scene.start('sceneA');
        }, this);

    },

    
});

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
    scene: [tutorial_scene, SceneA]
};

let game = new Phaser.Game(PhaserConfig);

var snowman;
var background;
var platforms;
var cursors;

function initScene() {}
