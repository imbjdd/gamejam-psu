import { EventBus } from '../EventBus';
import { Scene, GameObjects } from 'phaser';

export class GameOver extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: GameObjects.Image;
    gameOverText: GameObjects.Text;
    restartButton: GameObjects.Text;
    torch: GameObjects.Sprite;
    torch2: GameObjects.Sprite;

    constructor ()
    {
        super('GameOver');
    }

    preload ()
    {
        this.load.spritesheet('torch', 'assets/Torch.png', {
            frameWidth: 32,
            frameHeight: 32
        });
    }

    create ()
    {
        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0xff0000);

        this.background = this.add.image(centerX, centerY, 'background');
        const scaleX = width / this.background.width;
        const scaleY = height / this.background.height;
        const scale = Math.max(scaleX, scaleY);
        this.background.setScale(scale).setScrollFactor(0);
        this.background.setAlpha(0.5);

        // Création de l'animation de la torche
        this.anims.create({
            key: 'torch_burn',
            frames: this.anims.generateFrameNumbers('torch', { start: 0, end: 7 }),
            frameRate: 9,
            repeat: -1
        });

        // Ajout des torches
        this.torch = this.add.sprite(centerX - 600, centerY, 'torch');
        this.torch.setScale(10);
        this.torch.play('torch_burn');

        this.torch2 = this.add.sprite(centerX + 600, centerY, 'torch');
        this.torch2.setScale(10);
        this.torch2.play('torch_burn');

        this.gameOverText = this.add.text(centerX, centerY - 50, 'Game Over', {
            fontFamily: 'Arial Black',
            fontSize: 64,
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(100);

        // Add restart button with improved styling
        this.restartButton = this.add.text(centerX, centerY + 50, 'Recommencer', {
            fontFamily: 'Arial Black',
            fontSize: 40,
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 6,
            align: 'center'
        }).setOrigin(0.5).setDepth(100);

        // Make the button interactive with hover effect
        this.restartButton.setInteractive({ useHandCursor: true });
        this.restartButton.on('pointerover', () => this.restartButton.setScale(1.1));
        this.restartButton.on('pointerout', () => this.restartButton.setScale(1));
        this.restartButton.on('pointerdown', () => this.changeScene());
        
        EventBus.emit('current-scene-ready', this);
    }

    changeScene ()
    {
        window.location.reload();
    }
}
