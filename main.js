var SceneA = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function SceneA ()
    {
        Phaser.Scene.call(this, { key: 'SceneA' });
    },

    preload: function preloadScene() {
        this.load.spritesheet("snowman", "assets/snowman5.png", {frameWidth: 1430, frameHeight: 715});
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
        //this.background.setScale(3.5);
        
		
		rat_noise = this.sound.add("rat_noise", {loop: false});
        roach_sound = this.sound.add("roach_noise", {loop: false});
        sip = this.sound.add("sip", {loop: false});
        paper_sound = this.sound.add("paper", {loop: false});
		//music
		music = this.sound.play('level1');
		
        //platforms
        platforms = this.physics.add.staticGroup();
        platforms.create(200, 670, 'ground').refreshBody();
		platforms.create (200, 200, 'ground');
		platforms.create (500, 400, 'ground');
        platforms.create(900, 670, 'ground');
		platforms.create (900, 300, 'ground');
		platforms.create (1100, 550, 'ground');
        platforms.create (1600, 400, 'ground');
		platforms.create (1700, 750, 'ground');
		platforms.create(2200, 500, 'ground');
        platforms.create (2200, 700, 'ground');
		

        this.snowman = this.physics.add.sprite(140,500, "snowman");
        this.snowman.setScale(.25).refreshBody();
        this.snowman.health = 50;
        this.snowman.score = 0;
        this.snowman.body.setSize(300, 270).setOffset(500, 200);
        

        this.coffee = this.physics.add.staticSprite(550,700,"coffee");
        this.coffee.setScale(3);
        this.coffee.allowGravity = false;
		this.coffee2 = this.physics.add.staticSprite(1900, 600, "coffee");
		this.coffee2.setScale(3);
		this.coffee.allowGravity = false;
        
        //this.portal = this.physics.add.staticSprite(2500,630,"portal");
        this.portal = this.physics.add.staticSprite(140,630,"portal");
        this.portal.setScale(3);
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
            
            health -= 5;
            healthText.setText('Health: ' + health + '%');
            roach_sound.play();
            roach.destroy()
        });

            this.anims.create({
            key: "walk",
            frameRate: 1,
            frames: this.anims.generateFrameNumbers("roach", {start: 0, end: 3}),
            repeat: -1
        });
        this.roach.play("walk");


        this.tweens.add({
            targets: this.roach,
            x: x+400,
            duration: 2000,
            yoyo: true,
            repeat: -1,
            ease: 'Linear',
            delay: 50
        });

        }
        
        EnemyRat = (index,game,x,y) =>{

            this.rat = this.physics.add.sprite(x,y,'rat');
            this.rat.name = index.toString();
            this.rat.body.immovable = false;
            this.rat.body.collideWorldBounds = false;
            this.physics.add.collider(this.rat, platforms);

            this.physics.add.collider(this.snowman,this.rat, function (snowman, rat){
            
            health -= 10;
            healthText.setText('Health: ' + health + '%');
            rat_noise.play();
            rat.destroy()
        });

            this.anims.create({
            key: "walkRat",
            frameRate: 1,
            frames: this.anims.generateFrameNumbers("rat", {start: 0, end: 3}),
            repeat: -1
        });
        this.rat.play("walkRat");


        this.tweens.add({
            targets: this.rat,
            x: x+400,
            duration: 2000,
            yoyo: true,
            repeat: -1,
            ease: 'Linear',
            delay: 50
        });

        }


        roach1 = EnemyRoach(0,game,700,630);
        roach2 = EnemyRoach(0,game,300,370);
        roach3 = EnemyRoach(0,game,1400,320);
        roach4 = EnemyRoach(0,game,2000,400);
        rat1 = EnemyRat(0,game,900,500);
        rat2 = EnemyRat(0,game,700,230);
        rat3 = EnemyRat(0,game,0,100);
        rat4 = EnemyRat(0,game,1500,20);
        rat5 = EnemyRat(0,game,2000,600);
		



        this.snowman.setBounce(0.2);
        this.snowman.setCollideWorldBounds(false);

        this.physics.add.collider(this.snowman, this.coffee, function (snowman, coffee) {
            health += 5
            
            sip.play();
            healthText.setText('Health: ' + health + '%');
            coffee.destroy()

        });
		this.physics.add.collider(this.snowman, this.coffee2, function (snowman, coffee2) {
            health += 5
            
            sip.play();
            healthText.setText('Health: ' + health + '%');
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
            score += 5
            
            paper_sound.play();
            scoreText.setText('Score: ' + score);
            paper.destroy()
        });
		this.physics.add.collider(this.snowman, this.paper2, function (snowman, paper2) {
            score += 5
            
            paper_sound.play();
            scoreText.setText('Score: ' + score);
            paper2.destroy()
        });
		this.physics.add.collider(this.snowman, this.paper3, function (snowman, paper3) {
            score += 5
           
            paper_sound.play();
            scoreText.setText('Score: ' + score);
            paper3.destroy()
        });
        
        this.cursors = this.input.keyboard.createCursorKeys();
        this.physics.add.collider(this.snowman, platforms);
    //camera
        this.cameras.main.setBounds(0,0,this.background.displayWidth,this.background.displayHeight)
        this.cameras.main.startFollow(this.snowman)
        
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('snowman', { start: 1, end: 1 }),
            frameRate: 10,
            repeat: 1
        });
        
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('snowman', { start: 2, end: 2 }),
            frameRate: 10,
            repeat: 1
        });
        
//        healthText2 = this.add.text(16, 120, this.snowman.x, { fontSize: '40px', fill: '#0000ff' });
//        healthText2.setScrollFactor(0)
//        healthText3 = this.add.text(16, 160, this.snowman.y, { fontSize: '40px', fill: '#0000ff' });
//        healthText3.setScrollFactor(0)
        
        scoreText = this.add.text(16, 16, `Score: ${score}`, { fontSize: '40px', fill: '#ff0000', fontWeight: 'bold', strokeThickness: 11});
        healthText = this.add.text(16, 70, `Health: ${health}%`, { fontSize: '40px', fill: '#ff0000', fontWeight: 'bold', strokeThickness: 11});
        
        scoreText.setScrollFactor(0)
        healthText.setScrollFactor(0)
	
},
    update: function updateScene() {
    
    this.input.keyboard.once('keydown-P', function () {
        console.log("Hi ");
        this.scene.pause();
        this.scene.launch('pause1');    
    }, this);    
        
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
        //healthText2.setText(this.snowman.x);
        //For debugging

        this.snowman.anims.play('left', true);
    }
    else if (this.cursors.right.isDown)
    {
        this.snowman.setVelocityX(160);
        //healthText2.setText(this.snowman.x);
        //For debugging

        this.snowman.anims.play('right', true);
    }
    else
    {
        this.snowman.setVelocityX(0);

    }

    if (this.cursors.up.isDown && this.snowman.body.touching.down)
    {
        this.snowman.setVelocityY(-330);
        //healthText3.setText(this.snowman.y+14+50-0.25-23.125);
        //***
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
        this.load.spritesheet("snowman", "assets/snowman5.png", {frameWidth: 1430, frameHeight: 715});
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
        platforms.create(2850, 600, 'ground');
        platforms.create(3000, 450, 'ground');
        
        
				


        this.snowman = this.physics.add.sprite(140,500, "snowman");
        this.snowman.setScale(.25).refreshBody();
        this.snowman.health = 50;
        this.snowman.score = 0;
        this.snowman.body.setSize(300, 270).setOffset(500, 200);

        

        this.coffee = this.physics.add.staticSprite(600,450,"coffee");
        this.coffee.setScale(3);
        this.coffee.allowGravity = false
		this.coffee2 = this.physics.add.staticSprite(200,250,"coffee");
        this.coffee2.setScale(3);
        this.coffee2.allowGravity = false
		this.coffee3 = this.physics.add.staticSprite(1300,500,"coffee");
        this.coffee3.setScale(3);
        this.coffee3.allowGravity = false
        this.coffee4 = this.physics.add.staticSprite(2080,700,"coffee");
        this.coffee4.setScale(3);
        this.coffee4.allowGravity = false
        
        this.portal = this.physics.add.staticSprite(2500,630,"portal");
        this.portal.setScale(3);
        this.portal.allowGravity = false
        
        const abcd = this;
        this.physics.add.collider(this.snowman, this.portal, function (snowman, portal) {           
            abcd.scene.start('SceneC');
        });
		
//        healthText2 = this.add.text(16, 120, this.snowman.x, { fontSize: '40px', fill: '#0000ff' });
//        healthText2.setScrollFactor(0)
//        healthText3 = this.add.text(16, 160, this.snowman.y, { fontSize: '40px', fill: '#0000ff' });
//        healthText3.setScrollFactor(0)
        
        
        EnemyRoach = (index,game,x,y) =>{

            this.roach = this.physics.add.sprite(x,y,'roach');
            this.roach.name = index.toString();
            this.roach.body.immovable = false;
            this.roach.body.collideWorldBounds = false;
            this.physics.add.collider(this.roach, platforms);

            this.physics.add.collider(this.snowman,this.roach, function (snowman, roach){
            
            health -= 5;
            healthText.setText('Health: ' + health + '%');
            roach_sound.play();
            roach.destroy()
        });

            this.anims.create({
            key: "walk",
            frameRate: 1,
            frames: this.anims.generateFrameNumbers("roach", {start: 0, end: 3}),
            repeat: -1
        });
        this.roach.play("walk");


        this.tweens.add({
            targets: this.roach,
            x: x+400,
            duration: 2000,
            yoyo: true,
            repeat: -1,
            ease: 'Linear',
            delay: 50
        });

        }
        
        EnemyRat = (index,game,x,y) =>{

            this.rat = this.physics.add.sprite(x,y,'rat');
            this.rat.name = index.toString();
            this.rat.body.immovable = false;
            this.rat.body.collideWorldBounds = false;
            this.physics.add.collider(this.rat, platforms);

            this.physics.add.collider(this.snowman,this.rat, function (snowman, rat){
            
            health -= 10;
            healthText.setText('Health: ' + health + '%');
            rat_noise.play();
            rat.destroy()
        });

            this.anims.create({
            key: "walkRat",
            frameRate: 1,
            frames: this.anims.generateFrameNumbers("rat", {start: 0, end: 3}),
            repeat: -1
        });
        this.rat.play("walkRat");


        this.tweens.add({
            targets: this.rat,
            x: x+400,
            duration: 2000,
            yoyo: true,
            repeat: -1,
            ease: 'Linear',
            delay: 50
        });

        }


        roach1 = EnemyRoach(0,game,400,400);
        roach2 = EnemyRoach(0,game,400,0);
        roach3 = EnemyRoach(0,game,1600,300);
        roach4 = EnemyRoach(0,game,1800,300);
        roach5 = EnemyRoach(0,game,2650,500);
        roach5 = EnemyRoach(0,game,2450,200);
        rat1 = EnemyRat(0,game,0,200);
        rat2 = EnemyRat(0,game,700,280);
        rat3 = EnemyRat(0,game,1100,100);
        rat4 = EnemyRat(0,game,1350,500);
        rat5 = EnemyRat(0,game,2300,600);
        rat6 = EnemyRat(0,game,2840,400);

        this.snowman.setBounce(0.2);
        this.snowman.setCollideWorldBounds(false);

        this.physics.add.collider(this.snowman, this.coffee, function (snowman, coffee) {
            
            health += 5
            sip.play();
            healthText.setText('Health: ' + health + '%');
            coffee.destroy()

        });
		this.physics.add.collider(this.snowman, this.coffee2, function (snowman, coffee2) {
            
            health += 5
            sip.play();
            healthText.setText('Health: ' + health + '%');
            coffee2.destroy()

        });
		this.physics.add.collider(this.snowman, this.coffee3, function (snowman, coffee3) {
            
            health += 5
            sip.play();
            healthText.setText('Health: ' + health + '%');
            coffee3.destroy()

        });
        this.physics.add.collider(this.snowman, this.coffee4, function (snowman, coffee4) {
            health += 5
            health += 5
            sip.play();
            healthText.setText('Health: ' + health + '%');
            coffee4.destroy()

        });

        this.paper = this.physics.add.staticSprite(750,110,"paper");
        this.paper.setScale(3)
        this.paper.allowGravity = true

        this.physics.add.collider(this.snowman, this.paper, function (snowman, paper) {
            
            score += 5
            paper_sound.play();
            scoreText.setText('Score: ' + score);
            paper.destroy()
        });
        
		this.paper2 = this.physics.add.staticSprite(1700,550,"paper");
        this.paper2.setScale(3)
        this.paper2.allowGravity = true

        this.physics.add.collider(this.snowman, this.paper2, function (snowman, paper2) {
            
            score += 5
            paper_sound.play();
            scoreText.setText('Score: ' + score);
            paper2.destroy()
        });
        

        this.paper3 = this.physics.add.staticSprite(3100,150,"paper");
        this.paper3.setScale(3)
        this.paper3.allowGravity = true

        this.physics.add.collider(this.snowman, this.paper3, function (snowman, paper3) {
            
            score += 5
            paper_sound.play();
            scoreText.setText('Score: ' + score);
            paper3.destroy()
        });        
        
        
        this.cursors = this.input.keyboard.createCursorKeys();
        this.physics.add.collider(this.snowman, platforms);
    //camera
        this.cameras.main.setBounds(0,0,this.background.displayWidth,this.background.displayHeight)
        this.cameras.main.startFollow(this.snowman)
        
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('snowman', { start: 1, end: 1 }),
            frameRate: 10,
            repeat: 1
        });
        
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('snowman', { start: 2, end: 2 }),
            frameRate: 10,
            repeat: 1
        });
        
        scoreText = this.add.text(16, 16, `Score: ${score}`, { fontSize: '40px', fill: '#ff0000', fontWeight: 'bold', strokeThickness: 11});
        healthText = this.add.text(16, 70, `Health: ${health}%`, { fontSize: '40px', fill: '#ff0000', fontWeight: 'bold', strokeThickness: 11});
        
        scoreText.setScrollFactor(0)
        healthText.setScrollFactor(0)
        
        
	
},
    update: function updateScene() {
        
    this.input.keyboard.once('keydown-P', function () {
        console.log("Hi");
        this.scene.pause();
        this.scene.launch('pause2');    
    }, this);     
    
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
        //healthText2.setText(this.snowman.x);


        this.snowman.anims.play('left', true);
    }
    else if (this.cursors.right.isDown)
    {
        this.snowman.setVelocityX(160);
        //healthText2.setText(this.snowman.x);


        this.snowman.anims.play('right', true);
    }
    else
    {
        this.snowman.setVelocityX(0);

    }

    if (this.cursors.up.isDown && this.snowman.body.touching.down)
    {
        this.snowman.setVelocityY(-330);
        //healthText3.setText(this.snowman.y+14+50-0.25-23.125);
        
    }
	
	        
}
});

var SceneC = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function SceneC ()
    {
        Phaser.Scene.call(this, { key: 'SceneC' });
    },
    
    preload: function preloadScene () {
        this.load.image('start', 'assets/level3start.png')
        this.load.image('narrative', 'assets/3narrative.png')
        this.load.image('Q1', 'assets/3.1.png')
        this.load.image('Q2', 'assets/3.2.png')
        this.load.image('Q3', 'assets/3.3.png')
        this.load.image('Q4_easy', 'assets/3.4(easy).png')
        this.load.image('Q4_hard', 'assets/3.4(hard).png')
        this.load.image('Q5_easy', 'assets/3.5(easy).png')
        this.load.image('Q5_hard', 'assets/3.5(hard).png')
        this.load.image('end', 'assets/3end.png')
        this.load.image('lose', 'assets/lose.png')
        this.load.image('win', 'assets/win.png')
    },
    create: function createScene () {
        this.add.image(600,300,'start') 
    },
    
    update: function updateScene () {
        if (current_image == 'start') {
            this.input.keyboard.once('keydown-ENTER', function () {
                this.add.image(600,300,'Q1');
                current_image = 'Q1'
            }, this);
        }

        if (current_image == 'Q1') {
            this.input.keyboard.once('keydown-A', function () {
                this.add.image(600,300,'Q2')
                score += 1
                console.log('correct')
                current_image = 'Q2'
            }, this);
            this.input.keyboard.once('keydown-B', function () {
                current_image = 'Q2'
                this.add.image(600,300,'Q2')
            }, this);
            
        }
        if (current_image == 'Q2') {
            this.input.keyboard.once('keydown-D', function () {
                this.add.image(600,300,'Q3');
                current_image = 'Q3'
            }, this);
            this.input.keyboard.once('keydown-A', function () {
                this.add.image(600,300,'Q3');
                current_image = 'Q3'
            }, this);
            this.input.keyboard.once('keydown-B', function () {
                this.add.image(600,300,'Q3');
                current_image = 'Q3'
                score += 1
                console.log('correct')
            }, this);
            this.input.keyboard.once('keydown-C', function () {
                this.add.image(600,300,'Q3');
                current_image = 'Q3'
            }, this);
        }
        if (current_image == 'Q3' && cor_ans > 100) {
            this.input.keyboard.once('keydown-A', function () {
                this.add.image(600,300,'Q4_hard');
                current_image = 'Q4'
                score += 1
                console.log('correct')
            }, this);
            this.input.keyboard.once('keydown-B', function () {
                this.add.image(600,300,'Q4_hard');
                current_image = 'Q4'
            }, this);
            this.input.keyboard.once('keydown-D', function () {
                this.add.image(600,300,'Q4_hard');
                current_image = 'Q4'
            }, this);
            this.input.keyboard.once('keydown-C', function () {
                this.add.image(600,300,'Q4_hard');
                current_image = 'Q4'
            }, this);
        } else if (current_image == 'Q3') {
            this.input.keyboard.once('keydown-A', function () {
                this.add.image(600,300,'Q4_easy');
                current_image = 'Q4'
                cor_ans += 1
                console.log('correct')
            }, this);
            this.input.keyboard.once('keydown-B', function () {
                this.add.image(600,300,'Q4_easy');
                current_image = 'Q4'
            }, this);
            this.input.keyboard.once('keydown-D', function () {
                this.add.image(600,300,'Q4_easy');
                current_image = 'Q4'
            }, this);
            this.input.keyboard.once('keydown-C', function () {
                this.add.image(600,300,'Q4_easy');
                current_image = 'Q4'
            }, this);
        }
        if (current_image == 'Q4' && cor_ans > 100) {
            this.input.keyboard.once('keydown-D', function () {
                this.add.image(600,300,'Q5_hard');
                current_image = 'Q5'
                cor_ans += 1
                console.log('correct')
            }, this);
            this.input.keyboard.once('keydown-B', function () {
                this.add.image(600,300,'Q5_hard');
                current_image = 'Q5'
            }, this);
            this.input.keyboard.once('keydown-A', function () {
                this.add.image(600,300,'Q5_hard');
                current_image = 'Q5'
            }, this);
            this.input.keyboard.once('keydown-C', function () {
                this.add.image(600,300,'Q5_hard');
                current_image = 'Q5'
            }, this);
        } else if (current_image == 'Q4') {
            this.input.keyboard.once('keydown-A', function () {
                this.add.image(600,300,'Q5_easy');
                current_image = 'Q5'
                cor_ans += 1
                console.log('correct')
            }, this);
            this.input.keyboard.once('keydown-B', function () {
                this.add.image(600,300,'Q5_easy');
                current_image = 'Q5'
            }, this);
            this.input.keyboard.once('keydown-D', function () {
                this.add.image(600,300,'Q5_easy');
                current_image = 'Q5'
            }, this);
            this.input.keyboard.once('keydown-C', function () {
                this.add.image(600,300,'Q5_easy');
                current_image = 'Q5'
            }, this);
        }
        if (current_image == 'Q5' && cor_ans > 100) {
            this.input.keyboard.once('keydown-C', function () {
                this.add.image(600,300,'end');
                current_image = 'end'
                cor_ans += 1
                console.log('correct')
            }, this);
            this.input.keyboard.once('keydown-B', function () {
                this.add.image(600,300,'end');
                current_image = 'end'
            }, this);
            this.input.keyboard.once('keydown-A', function () {
                this.add.image(600,300,'end');
                current_image = 'end'
            }, this);
            this.input.keyboard.once('keydown-D', function () {
                this.add.image(600,300,'end');
                current_image = 'end'
            }, this);
        } else if (current_image == 'Q5') {
            this.input.keyboard.once('keydown-C', function () {
                this.add.image(600,300,'end');
                current_image = 'end'
                cor_ans += 1
                console.log('correct')
            }, this);
            this.input.keyboard.once('keydown-B', function () {
                this.add.image(600,300,'end');
                current_image = 'end'
            }, this);
            this.input.keyboard.once('keydown-D', function () {
                this.add.image(600,300,'end');
                current_image = 'end'
            }, this);
            this.input.keyboard.once('keydown-A', function () {
                this.add.image(600,300,'end');
                current_image = 'end'
            }, this);
        }
        if (current_image == 'end') {
            this.input.keyboard.once('keydown-ENTER', function () {
            this.add.image(600,300,'win');
        }, this);
        }
        
    },
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


var PauseScene1 = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:
    
    function PauseScene1 ()
    {
        Phaser.Scene.call(this, { key: 'pause1' });
    },

    preload: function preloadScene () {
        this.load.image('pause', 'assets/pause.png');
        
    },
    create: function createScene () {
        this.background = this.add.image(600, 300, "pause");
        this.input.keyboard.once('keydown-P', function () {
            this.scene.resume('SceneA');
            this.scene.stop();
        }, this);



    },
	update: function updateScene () {
		this.sound.stopAll();
	}

    
});



var PauseScene2 = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:
    
    function PauseScene2 ()
    {
        Phaser.Scene.call(this, { key: 'pause2' });
    },

    preload: function preloadScene () {
        this.load.image('pause2', 'assets/pause.png');
        
    },
    create: function createScene () {
        this.background = this.add.image(600, 300, "pause2");
        this.input.keyboard.once('keydown-P', function () {
            this.scene.resume('SceneB');
            this.scene.stop();
        }, this);



    },
	update: function updateScene () {
		this.sound.stopAll();
	}

    
});

var CreditsScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:
    
    function CreditsScene ()
    {
        Phaser.Scene.call(this, { key: 'credits' });
    },

    preload: function preloadScene () {
        this.load.image('credits', 'assets/credits.png');
        
    },
	
    create: function createScene () {
        this.background = this.add.image(600, 300, "credits");
	    this.cursors = this.input.keyboard.createCursorKeys();
		// can skip to game
        this.input.keyboard.once('keydown-ENTER', function () {
            this.scene.stop();
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
            gravity: { y: 300 },
            debug: true
        }
    },
	resolution: 3,
    scene: [title_scene, narrative_scene, tutorial_scene, SceneA, SceneB, SceneC, gameOver_scene, PauseScene1, PauseScene2, CreditsScene]

    
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
var current_image = 'start';
var cor_ans = 0;
var score = 0;
var health = 50;


function initScene() {}
