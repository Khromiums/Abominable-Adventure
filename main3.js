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
        this.load.spritesheet("roach", "assets/Cockroach.png",{frameWidth: 32, frameHeight: 32});
        this.load.spritesheet("rat","assets/Rat.png",{frameWidth: 70, frameHeight: 70} );
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
        scoreText = this.add.text(16, 16, `Score: ${score}`, { fontSize: '40px', fill: '#0000ff'});
        healthText = this.add.text(16, 70, `Health: ${health}%`, { fontSize: '40px', fill: '#0000ff' });
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
		platforms.create (200, 250, 'ground');
		platforms.create (500, 420, 'ground');
        platforms.create(900, 670, 'ground');
		platforms.create (880, 285, 'ground');
		platforms.create (1100, 550, 'ground');
        platforms.create (1600, 430, 'ground');
		platforms.create (1700, 750, 'ground');
		//platforms.create(2200, 500, 'ground');
        platforms.create (2200, 700, 'ground');
        this.snowman = this.physics.add.sprite(200,600, "snowman");
		
		
        //player
        this.anims.create({
            key: "stand",
            frameRate: 2,
            frames: this.anims.generateFrameNumbers("snowman", {start: 0, end: 1}),
            repeat: -1
        });

        
        this.snowman.setScale(2.5).refreshBody();
        this.snowman.play("stand");
        this.snowman.health = 50;
        this.snowman.score = 0;
        this.snowman.body.setSize(25, 27).setOffset(20, 15);
        //The third and fourth number don't seem to do anything
        

        this.coffee = this.physics.add.staticSprite(550,750,"coffee");
        this.coffee.setScale(3);
        this.coffee.allowGravity = false;
		this.coffee2 = this.physics.add.staticSprite(1900, 600, "coffee");
		this.coffee2.setScale(3);
		this.coffee.allowGravity = false;
        
        this.portal = this.physics.add.staticSprite(1000,630,"portal");
        this.portal.setScale(10);
        this.portal.allowGravity = false
        
        const abcd = this;
        this.physics.add.collider(this.snowman, this.portal, function (snowman, portal) {           
            abcd.scene.start('SceneB');
            abcd.sound.stopAll();
            
        });
		


        
        EnemyRoach = (index,game,x,y) =>{
    
            this.roach = this.physics.add.sprite(x,y,'roach');
            this.roach.name = index.toString();
            this.roach.body.immovable = false;
            this.roach.body.collideWorldBounds = false;
            this.physics.add.collider(this.roach, platforms);
            
            this.physics.add.collider(this.snowman,this.roach, function (snowman, roach){
            snowman.health -= 5;
            health -= 5;
            healthText.setText('Health: ' + snowman.health + '%');
            roach_sound.play();
            roach.destroy()
        });
            
            this.anims.create({
            key: "walk",
            frameRate: 2,
            frames: this.anims.generateFrameNumbers("roach", {start: 0, end: 3}),
            repeat: -1
        });
        this.roach.play("walk");
            
            
        this.tweens.add({
            targets: this.roach,
            x: x+380,
            duration: 3000,
            yoyo: true,
            repeat: -1,
            ease: 'Linear',
            delay: 500
        });

        }
        
        
        roach1 = EnemyRoach(0,game,320,300); 
        
        //rat
        EnemyRat = (index,game,x,y) =>{
    
            this.rat = this.physics.add.sprite(x,y,'rat');
            this.rat.name = index.toString();
            this.rat.body.immovable = true;
            this.rat.body.collideWorldBounds = true;
            this.physics.add.collider(this.snowman,this.rat, function (snowman, rat){
            snowman.health -= 10
            rat_noise.play();
            healthText.setText('Health: ' + snowman.health + '%');
            rat.destroy()
        });
            
            this.anims.create({
            key: "walk1",
            frameRate: 2,
            frames: this.anims.generateFrameNumbers("rat", {start: 0, end: 3}),
            repeat: -1
        });
        this.rat.play("walk1");
            
            
        this.tweens.add({
            targets: this.rat,
            x: x+100,
            duration: 3000,
            yoyo: true,
            repeat: -1,
            ease: 'Linear',
            delay: 1000
        });

        }
        
        rat1 = EnemyRat(0,game,600,600);




        this.snowman.setBounce(0.2);
        this.snowman.setCollideWorldBounds(false);

        this.physics.add.collider(this.snowman, this.coffee, function (snowman, coffee) {
            snowman.health += 5
            sip.play();
            healthText.setText('Health: ' + snowman.health + '%');
            coffee.destroy()

        });
		this.physics.add.collider(this.snowman, this.coffee2, function (snowman, coffee2) {
            snowman.health += 5
            sip.play();
            healthText.setText('Health: ' + snowman.health + '%');
            coffee2.destroy()

        });

        this.paper = this.physics.add.staticSprite(750,630,"paper");
        this.paper.setScale(3);
        this.paper.allowGravity = true;
		this.paper2 = this.physics.add.staticSprite(100, 160, "paper");
		this.paper2.setScale(3);
		this.paper2.allowGravity = true;
		this.paper3 = this.physics.add.staticSprite(1700, 700, "paper");
		this.paper3.setScale(3);
		this.paper3.allowGravity = true;

        this.physics.add.collider(this.snowman, this.paper, function (snowman, paper) {
            snowman.score += 5
            paper_sound.play();
            scoreText.setText('Score: ' + snowman.score);
            paper.destroy()
        });
		this.physics.add.collider(this.snowman, this.paper2, function (snowman, paper2) {
            snowman.score += 5
            paper_sound.play();
            scoreText.setText('Score: ' + snowman.score);
            paper2.destroy()
        });
		this.physics.add.collider(this.snowman, this.paper3, function (snowman, paper3) {
            snowman.score += 5
            paper_sound.play();
            scoreText.setText('Score: ' + snowman.score);
            paper3.destroy()
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

        this.snowman.anims.play('left', true);
    }
    else if (this.cursors.right.isDown)
    {
        this.snowman.setVelocityX(160);

        this.snowman.anims.play('right', true);
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
	    this.load.image("background2", "assets/citycombined.png");
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
        this.background = this.add.image(3700, 300, "background2");
        //this.background.setScale(3.5);
        scoreText = this.add.text(16, 16, `Score: ${score}`, { fontSize: '40px', fill: '#0000ff'});
        healthText = this.add.text(16, 70, `Health: ${health}%`, { fontSize: '40px', fill: '#0000ff' });
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
		platforms.create(200, 300, 'ground');
		platforms.create(600, 500, 'ground');
		platforms.create(600, 150, 'ground');
		platforms.create(900, 350, 'ground');
		platforms.create(1350, 200, 'ground');
		platforms.create(1750, 400, 'ground');
		platforms.create(1650, 600, 'ground');
		platforms.create(2000, 400, 'ground');
		platforms.create(2500, 700, 'ground');
		platforms.create(2650, 300, 'ground');
				
		
        //player
        this.anims.create({
            key: "stand",
            frameRate: 2,
            frames: this.anims.generateFrameNumbers("snowman", {start: 0, end: 1}),
            repeat: -1
        });

        this.snowman = this.physics.add.sprite(140,500, "snowman");
        this.snowman.setScale(2.5).refreshBody();
        this.snowman.play("stand");
        this.snowman.health = 50;
        this.snowman.score = 0;
        this.snowman.body.setSize(25, 27).setOffset(20, 15);
        //The third and fourth number don't seem to do anything
        

        this.coffee = this.physics.add.staticSprite(600,450,"coffee");
        this.coffee.setScale(3);
        this.coffee.allowGravity = false
		this.coffee2 = this.physics.add.staticSprite(200,250,"coffee");
        this.coffee2.setScale(3);
        this.coffee2.allowGravity = false
		this.coffee3 = this.physics.add.staticSprite(1300,500,"coffee");
        this.coffee3.setScale(3);
        this.coffee3.allowGravity = false
        
        this.portal = this.physics.add.staticSprite(2500,630,"portal");
        this.portal.setScale(3);
        this.portal.allowGravity = false
        
        const abcd = this;
        this.physics.add.collider(this.snowman, this.portal, function (snowman, portal) {           
            abcd.scene.start('SceneB');
        });
		
		        EnemyRoach = (index,game,x,y) =>{
    
            this.roach = this.physics.add.sprite(x,y,'roach');
            this.roach.name = index.toString();
            this.roach.body.immovable = true;
            this.roach.body.collideWorldBounds = true;
            
            this.physics.add.collider(this.snowman,this.roach, function (snowman, roach){
            snowman.health -= 5
            healthText.setText('Health: ' + snowman.health + '%');
            roach_sound.play();
            roach.destroy()
        });
            
            this.anims.create({
            key: "walk",
            frameRate: 2,
            frames: this.anims.generateFrameNumbers("roach", {start: 0, end: 3}),
            repeat: -1
        });
        this.roach.play("walk");
            
            
        this.tweens.add({
            targets: this.roach,
            x: x+100,
            duration: 3000,
            yoyo: true,
            repeat: -1,
            ease: 'Linear',
            delay: 1000
        });

        }
        
        roach1 = EnemyRoach(0,game,400,400);
    
        
        
        
        //rat
        EnemyRat = (index,game,x,y) =>{
    
            this.rat = this.physics.add.sprite(x,y,'rat');
            this.rat.name = index.toString();
            this.rat.body.immovable = true;
            this.rat.body.collideWorldBounds = true;
            this.physics.add.collider(this.snowman,this.rat, function (snowman, rat){
            snowman.health -= 10
            rat_noise.play();
            healthText.setText('Health: ' + snowman.health + '%');
            rat.destroy()
        });
            
            this.anims.create({
            key: "walk1",
            frameRate: 2,
            frames: this.anims.generateFrameNumbers("rat", {start: 0, end: 3}),
            repeat: -1
        });
        this.rat.play("walk1");
            
            
        this.tweens.add({
            targets: this.rat,
            x: x+100,
            duration: 3000,
            yoyo: true,
            repeat: -1,
            ease: 'Linear',
            delay: 1000
        });

        }
        
        rat1 = EnemyRat(0,game,600,600);

        this.snowman.setBounce(0.2);
        this.snowman.setCollideWorldBounds(false);

        this.physics.add.collider(this.snowman, this.coffee, function (snowman, coffee) {
            snowman.health += 5
            sip.play();
            healthText.setText('Health: ' + snowman.health + '%');
            coffee.destroy()

        });
		this.physics.add.collider(this.snowman, this.coffee2, function (snowman, coffee2) {
            snowman.health += 5
            sip.play();
            healthText.setText('Health: ' + snowman.health + '%');
            coffee2.destroy()

        });
		this.physics.add.collider(this.snowman, this.coffee3, function (snowman, coffee3) {
            snowman.health += 5
            sip.play();
            healthText.setText('Health: ' + snowman.health + '%');
            coffee3.destroy()

        });

        this.paper = this.physics.add.staticSprite(750,110,"paper");
        this.paper.setScale(3).refreshBody();
        this.paper.allowGravity = true

        this.physics.add.collider(this.snowman, this.paper, function (snowman, paper) {
            snowman.score += 5
            paper_sound.play();
            scoreText.setText('Score: ' + snowman.score);
            paper.destroy()
        });
        
		this.paper2 = this.physics.add.staticSprite(1700,550,"paper");
        this.paper2.setScale(3).refreshBody();
        this.paper2.allowGravity = true

        this.physics.add.collider(this.snowman, this.paper2, function (snowman, paper2) {
            snowman.score += 5
            paper_sound.play();
            scoreText.setText('Score: ' + snowman.score);
            paper2.destroy()
        });
        

        this.paper3 = this.physics.add.staticSprite(3100,150,"paper");
        this.paper3.setScale(3).refreshBody();
        this.paper3.allowGravity = true

        this.physics.add.collider(this.snowman, this.paper3, function (snowman, paper3) {
            snowman.score += 5
            paper_sound.play();
            scoreText.setText('Score: ' + snowman.score);
            paper3.destroy()
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

        this.snowman.anims.play('left', true);
    }
    else if (this.cursors.right.isDown)
    {
        this.snowman.setVelocityX(160);

        this.snowman.anims.play('right', true);
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
            this.scene.start('narrative_scene');
        }, this);

    },
	update: function updateScene () {
		this.sound.stopAll();
	}

    
});

var narrative_scene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function NarrativeScene ()
    {
        Phaser.Scene.call(this, { key: 'narrative_scene' });
    },
    
    preload: function preloadScene () {
        this.load.image('narrative', 'assets/narrative.png');
        
    },
    create: function createScene () {
        this.background = this.add.image(600, 300, "narrative");
	    this.cursors = this.input.keyboard.createCursorKeys();
		// can skip to game
        this.input.keyboard.once('keydown-ENTER', function () {
            this.scene.start('SceneA');
        }, this);
		// or go to tutorial 
		this.input.keyboard.once('keydown-SPACE', function () {
            this.scene.start('tutorial_scene');
        },
		this);

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
            gravity: { y: 400 },
            debug: true
        }
    },
	resolution: 3,
    //scene: [title_scene, tutorial_scene, SceneA, SceneB, gameOver_scene]
    //scene: [title_scene, narrative_scene, tutorial_scene, SceneA, SceneB, gameOver_scene]
    scene: [SceneA,title_scene, narrative_scene, tutorial_scene,  SceneB, gameOver_scene]
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
var score = 0;
var health = 50;


function initScene() {}