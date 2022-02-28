var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
var background;

function preload ()
{
	//load in images
	this.load.image('cockroach', 'assets/Cockroach.png');
	this.load.image('coffee', 'assets/coffee.png');
	this.load.image('paper', 'assets/Paper.png');
	this.load.image('bkg1', 'assets/pixilart-drawing.png');
	this.load.image('bkg2', 'assets/pixil-frame-0.png');
	this.load.image('bkg3', 'assets/pixil-frame-0 (1).png');
	this.load.image('rat', 'assets/Cockroach.png');
}

function create ()
{
	background = this.add.image(400, 300, 'bkg1');
	background.setScale(2);
}

function update ()
{
}