var SceneA = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function SceneA ()
    {
        Phaser.Scene.call(this, { key: 'SceneA' });
    },

    preload: function preloadScene() {
        this.load.spritesheet("snowman", "assets/snowman2.png", {frameWidth: 65, frameHeight: 43});
	    this.load.image("background1", "assets/combined.png");
        this.load.image("coffee", "assets/coffee.png");
		this.load.image("ground", "assets/ground.png");
        this.load.image("paper", "assets/Paper.png");
        this.load.image("roach", "assets/roach.png");
        this.load.image("rat","assets/rat1.png");
        this.load.image("portal","assets/portal.png");
        this.load.audio("rat_noise","assets/rat_noise.mp3");
        this.load.audio("roach_noise", "assets/roach_sound.mp3");
		this.load.audio("sip","assets/sip.mp3");
        this.load.audio("paper","assets/paper.mp3");
		//background music
		this.load.audio('level1', "assets/level1dogpark.mp3");
    },

    create: function createScene() {
		
        //background
        //combined background ranges from 1800 to -600
        this.background = this.add.image(3700, 300, "background1");
        //this.background.setScale(3.5);
        scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '40px', fill: '#0000ff' });
        healthText = this.add.text(16, 70, 'Health: 50' + '%', { fontSize: '40px', fill: '#0000ff' });
        scoreText.setScrollFactor(0)
        healthText.setScrollFactor(0)
		
		rat_noise = this.sound.add("rat_noise", {loop: false});
        roach_sound = this.sound.add("roach_noise", {loop: false});
        sip = this.sound.add("sip", {loop: false});
        paper_sound = this.sound.add("paper", {loop: false});
		//music
		music = this.sound.play('level1');
		
        //platforms
        platforms = this.physics.add.staticGroup();
        platforms.create(200, 670, 'ground').refreshBody();
        platforms.create(900, 670, 'ground');
        platforms.create (500, 400, 'ground');
		platforms.create (1100, 550, 'ground');
		platforms.create (900, 300, 'ground');
		platforms.create (1500, 400, 'ground');
        platforms.create (1600, 400, 'ground');
        platforms.create (1500, 400, 'ground');
        platforms.create (2000, 700, 'ground');
		
        //player
        this.anims.create({
            key: "stand",
            frameRate: 2,
            frames: this.anims.generateFrameNumbers("snowman", {start: 0, end: 1}),
            repeat: -1
        });

        this.snowman = this.physics.add.sprite(140,500, "snowman");
        this.snowman.setScale(1);
        this.snowman.play("stand");
        this.snowman.health = 50
        this.snowman.score = 0
        //this.snowman.body.setSize(37, 0, -10, 0);
        //Second number is good

        this.coffee = this.physics.add.staticSprite(550,650,"coffee");
        this.coffee.setScale(3);
        this.coffee.allowGravity = false
        
        this.portal = this.physics.add.staticSprite(2500,630,"portal");
        this.portal.setScale(3);
        this.portal.allowGravity = false
		
		//roach
        roach = this.roach = this.physics.add.staticSprite(950, 645, "roach");
        this.roach.setScale(1)
        this.physics.add.collider(this.snowman,this.roach, function (snowman, roach){
            snowman.health -= 5
            healthText.setText('Health: ' + snowman.health + '%');
            roach_sound.play();
            roach.destroy()
        });

        this.rat = this.physics.add.staticSprite(300, 360, "rat");
        //this.roach.setScale(2)
        this.physics.add.collider(this.snowman,this.rat, function (snowman, rat){
            snowman.health -= 10
            rat_noise.play();
            healthText.setText('Health: ' + snowman.health + '%');
            rat.destroy()
        });

        this.snowman.setBounce(0.2);
        this.snowman.setCollideWorldBounds(false);

        this.physics.add.collider(this.snowman, this.coffee, function (snowman, coffee) {
            snowman.health += 5
            sip.play();
            healthText.setText('Health: ' + snowman.health + '%');
            coffee.destroy()

        });
        
        this.physics.add.collider(this.snowman, this.portal, function (snowman, portal) {
            
            //snowman.health += 5
            //sip.play();
            //healthText.setText('Health: ' + snowman.health + '%');
            portal.destroy()
            this.scene.start('SceneB');


        });

        this.paper = this.physics.add.staticSprite(750,630,"paper");
        this.paper.setScale(3);
        this.paper.allowGravity = true

        this.physics.add.collider(this.snowman, this.paper, function (snowman, paper) {
            snowman.score += 5
            paper_sound.play();
            scoreText.setText('Score: ' + snowman.score);
            paper.destroy()
        });
        
        

        
        
        
        
            this.cursors = this.input.keyboard.createCursorKeys();
        this.physics.add.collider(this.snowman, platforms);
    //camera
        this.cameras.main.setBounds(0,0,this.background.displayWidth,this.background.displayHeight)
        this.cameras.main.startFollow(this.snowman)
        
        
	
},
    update: function updateScene() {
	if (this.snowman.health == 0)
	{
		this.scene.start('gameOver_scene');
	}
	else if (this.snowman.y > 900)
	{
		this.scene.start('gameOver_scene');
	}
	if (this.cursors.left.isDown)
	{
		this.snowman.setVelocityX(-160);
	}
	else if (this.cursors.right.isDown)
	{
		this.snowman.setVelocityX(160);

	}
	else if (this.cursors.up.isDown  && this.snowman.body.touching.down)
	{
		this.snowman.setVelocityY(-430);
	}
	else
	{
		this.snowman.setVelocityX(0);

	}
		
	//enemy movement
	//true, move left, false, move right
	//roach
	if (rmove == true) {
		this.roach.flipX = false;
		if (this.roach.x < 950) {
			this.roach.x += 1;
		}
		else {
			rmove = false;
		}
		
	}
	else if (rmove == false) {
		this.roach.flipX = true;
		if (this.roach.x > 850) {
			this.roach.x -= 1;
		}
		else {
			rmove = true;
			
		}
	}
		
	
	//rat
	if (ramove == true) {
		this.rat.flipX = false;
		if (this.rat.x < 600) {
			this.rat.x += 1;
		}
		else {
			ramove = false;
		}
		
	}
	else if (ramove == false) {
		this.rat.flipX = true;
		if (this.rat.x > 300) {
			this.rat.x -= 1;
		}
		else {
			ramove = true;
			
		}
	}
		
	        
}
});

//End scene A

var SceneB = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function SceneB ()
    {
        Phaser.Scene.call(this, { key: 'SceneB' });
    },

    preload: function preloadScene() {
        this.load.spritesheet("snowman", "assets/snowman2.png", {frameWidth: 65, frameHeight: 43});
	    this.load.image("background1", "assets/citycombined.png");
        this.load.image("coffee", "assets/coffee.png");
		this.load.image("ground", "assets/ground.png");
        this.load.image("paper", "assets/Paper.png");
        this.load.image("roach", "assets/roach.png");
        this.load.image("rat","assets/rat1.png");
        this.load.image("portal","assets/portal.png");
        this.load.audio("rat_noise","assets/rat_noise.mp3");
        this.load.audio("roach_noise", "assets/roach_sound.mp3");
		this.load.audio("sip","assets/sip.mp3");
        this.load.audio("paper","assets/paper.mp3");
		//background music
		this.load.audio('level1', "assets/level1dogpark.mp3");
    },

    create: function createScene() {
		
        //background
        //combined background ranges from 1800 to -600
        this.background = this.add.image(3700, 300, "background1");
        //this.background.setScale(3.5);
        scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '40px', fill: '#0000ff' });
        healthText = this.add.text(16, 70, 'Health: 50' + '%', { fontSize: '40px', fill: '#0000ff' });
        scoreText.setScrollFactor(0)
        healthText.setScrollFactor(0)
		
		rat_noise = this.sound.add("rat_noise", {loop: false});
        roach_sound = this.sound.add("roach_noise", {loop: false});
        sip = this.sound.add("sip", {loop: false});
        paper_sound = this.sound.add("paper", {loop: false});
		//music
		music = this.sound.play('level1');
		
        //platforms
        platforms = this.physics.add.staticGroup();
        platforms.create(200, 670, 'ground').refreshBody();
        platforms.create(900, 670, 'ground');
        platforms.create (500, 400, 'ground');
		platforms.create (1100, 550, 'ground');
		platforms.create (900, 300, 'ground');
		platforms.create (1500, 400, 'ground');
        platforms.create (1600, 400, 'ground');
        platforms.create (1500, 400, 'ground');
        platforms.create (2000, 700, 'ground');
		
        //player
        this.anims.create({
            key: "stand",
            frameRate: 2,
            frames: this.anims.generateFrameNumbers("snowman", {start: 0, end: 1}),
            repeat: -1
        });

        this.snowman = this.physics.add.sprite(140,500, "snowman");
        this.snowman.setScale(1);
        this.snowman.play("stand");
        this.snowman.health = 50
        this.snowman.score = 0
        //this.snowman.body.setSize(37, 0, -10, 0);
        //Second number is good

        this.coffee = this.physics.add.staticSprite(550,650,"coffee");
        this.coffee.setScale(3);
        this.coffee.allowGravity = false
		
		//roach
        roach = this.roach = this.physics.add.staticSprite(950, 645, "roach");
        this.roach.setScale(1)
        this.physics.add.collider(this.snowman,this.roach, function (snowman, roach){
            snowman.health -= 5
            healthText.setText('Health: ' + snowman.health + '%');
            roach_sound.play();
            roach.destroy()
        });

        this.rat = this.physics.add.staticSprite(300, 360, "rat");
        //this.roach.setScale(2)
        this.physics.add.collider(this.snowman,this.rat, function (snowman, rat){
            snowman.health -= 10
            rat_noise.play();
            healthText.setText('Health: ' + snowman.health + '%');
            rat.destroy()
        });

        this.snowman.setBounce(0.2);
        this.snowman.setCollideWorldBounds(false);

        this.physics.add.collider(this.snowman, this.coffee, function (snowman, coffee) {
            snowman.health += 5
            sip.play();
            healthText.setText('Health: ' + snowman.health + '%');
            coffee.destroy()

        });
        
        

        this.paper = this.physics.add.staticSprite(750,630,"paper");
        this.paper.setScale(3);
        this.paper.allowGravity = true

        this.physics.add.collider(this.snowman, this.paper, function (snowman, paper) {
            snowman.score += 5
            paper_sound.play();
            scoreText.setText('Score: ' + snowman.score);
            paper.destroy()
        });
        
        
        
            this.cursors = this.input.keyboard.createCursorKeys();
        this.physics.add.collider(this.snowman, platforms);
    //camera
        this.cameras.main.setBounds(0,0,this.background.displayWidth,this.background.displayHeight)
        this.cameras.main.startFollow(this.snowman)
        
        
	
},
    update: function updateScene() {
	if (this.snowman.health == 0)
	{
		this.scene.start('gameOver_scene');
	}
	else if (this.snowman.y > 900)
	{
		this.scene.start('gameOver_scene');
	}
	if (this.cursors.left.isDown)
	{
		this.snowman.setVelocityX(-160);
	}
	else if (this.cursors.right.isDown)
	{
		this.snowman.setVelocityX(160);

	}
	else if (this.cursors.up.isDown  && this.snowman.body.touching.down)
	{
		this.snowman.setVelocityY(-430);
	}
	else
	{
		this.snowman.setVelocityX(0);

	}
		
	//enemy movement
	//true, move left, false, move right
	//roach
	if (rmove == true) {
		this.roach.flipX = false;
		if (this.roach.x < 950) {
			this.roach.x += 1;
		}
		else {
			rmove = false;
		}
		
	}
	else if (rmove == false) {
		this.roach.flipX = true;
		if (this.roach.x > 850) {
			this.roach.x -= 1;
		}
		else {
			rmove = true;
			
		}
	}
		
	
	//rat
	if (ramove == true) {
		this.rat.flipX = false;
		if (this.rat.x < 600) {
			this.rat.x += 1;
		}
		else {
			ramove = false;
		}
		
	}
	else if (ramove == false) {
		this.rat.flipX = true;
		if (this.rat.x > 300) {
			this.rat.x -= 1;
		}
		else {
			ramove = true;
			
		}
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
        instructionText = this.add.text(110, 620, 'Press Enter to start', { fontSize: '80px', fill: '#000000' });
	    this.cursors = this.input.keyboard.createCursorKeys();
        this.input.keyboard.once('keydown-ENTER', function () {
            this.scene.start('SceneA');
        }, this);

    },

    
});

var gameOver_scene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function GameOver ()
    {
        Phaser.Scene.call(this, { key: 'gameOver_scene' });
    },
    
    preload: function preloadScene () {
        this.load.image('gameOverimg', 'assets/gameover.png');
        
    },
    create: function createScene () {
        this.background = this.add.image(600, 300, "gameOverimg");
	    this.cursors = this.input.keyboard.createCursorKeys();
        this.input.keyboard.once('keydown-ENTER', function () {
            this.scene.start('SceneA');
        }, this);

    },
	update: function updateScene () {
		this.sound.stopAll();
	}

    
});

var title_scene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function TitleScene ()
    {
        Phaser.Scene.call(this, { key: 'title_scene' });
    },
    
    preload: function preloadScene () {
        this.load.image('title', 'assets/start screen.png');
        
    },
    create: function createScene () {
        this.background = this.add.image(600, 300, "title");
	    this.cursors = this.input.keyboard.createCursorKeys();
        this.input.keyboard.once('keydown-ENTER', function () {
            this.scene.start('tutorial_scene');
        }, this);

    },
	update: function updateScene () {
		this.sound.stopAll();
	}

    
});



let PhaserConfig = {
    type: Phaser.Auto,
    //parent: "game",
    width: 1200,
    height: 620,
	physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
	resolution: 3,
    scene: [title_scene, tutorial_scene, SceneA, SceneB, gameOver_scene]
};

let game = new Phaser.Game(PhaserConfig);

var snowman;
var background;
var platforms;
var cursors;
var gameover = false;
var rmove = false;
var ramove = false;
var music;


function initScene() {}
