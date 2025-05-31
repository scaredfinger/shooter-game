// Core game engine class
import { SpriteManager } from '../graphics/SpriteManager.js';
import { Player } from '../entities/Player.js';

export class Game {
    constructor(canvas, inputManager) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.inputManager = inputManager;
        
        // Game state
        this.isRunning = false;
        this.lastTime = 0;
        this.deltaTime = 0;
        
        // Game stats
        this.stats = {
            fps: 0,
            frameCount: 0,
            lastFpsUpdate: 0,
            enemies: 0,
            score: 0
        };
        
        // Game systems
        this.spriteManager = new SpriteManager();
        this.player = null;
        
        // Game entities (will be populated as we add systems)
        this.entities = [];
        
        // Debug options
        this.showDebug = false;
        
        // Bind the game loop to maintain 'this' context
        this.gameLoop = this.gameLoop.bind(this);
    }
    
    async initialize() {
        console.log('Initializing game systems...');
        
        // Setup canvas
        this.setupCanvas();
        
        // Initialize sprite manager
        await this.initializeSpriteManager();
        
        // Initialize player
        this.initializePlayer();
        
        // Initialize input handling
        this.inputManager.initialize();
        
        console.log('Game initialization complete');
    }
    
    async initializeSpriteManager() {
        console.log('Initializing sprite manager...');
        
        // Initialize with placeholder sprites for now
        await this.spriteManager.initialize();
        
        console.log('Sprite manager initialized with', this.spriteManager.getAvailableSprites().length, 'sprites');
    }
    
    initializePlayer() {
        console.log('Initializing player...');
        
        // Create player at center of canvas
        const playerX = this.canvas.width / 2;
        const playerY = this.canvas.height / 2;
        
        this.player = new Player(playerX, playerY, {
            name: 'Player',
            speed: 150,
            health: 100
        });
        
        // Initialize player with input manager and canvas bounds
        this.player.initialize(this.inputManager, this.canvas.width, this.canvas.height);
        
        // Set player sprite (using placeholder for now)
        const playerSprite = this.spriteManager.getSprite('player_male');
        if (playerSprite) {
            this.player.setSprite(playerSprite);
        }
        
        // Enable debug rendering initially
        this.player.showDebug = true;
        
        // Add player to entities list
        this.entities.push(this.player);
        
        console.log('Player initialized');
    }
    
    setupCanvas() {
        // Ensure canvas has focus for input
        this.canvas.tabIndex = 1;
        this.canvas.focus();
        
        // Set up canvas styling for crisp pixel art
        this.ctx.imageSmoothingEnabled = false;
        
        console.log(`Canvas initialized: ${this.canvas.width}x${this.canvas.height}`);
    }
    
    start() {
        if (this.isRunning) {
            console.warn('Game is already running');
            return;
        }
        
        console.log('Starting game loop...');
        this.isRunning = true;
        this.lastTime = performance.now();
        this.gameLoop();
    }
    
    stop() {
        console.log('Stopping game...');
        this.isRunning = false;
    }
    
    gameLoop(currentTime) {
        if (!this.isRunning) return;
        
        // Calculate delta time
        this.deltaTime = (currentTime - this.lastTime) / 1000;
        this.lastTime = currentTime;
        
        // Cap delta time to prevent large jumps
        this.deltaTime = Math.min(this.deltaTime, 1/30); // Max 30 FPS minimum
        
        // Update FPS counter
        this.updateFPS();
        
        // Update game state
        this.update(this.deltaTime);
        
        // Render game
        this.render();
        
        // Continue the loop
        requestAnimationFrame(this.gameLoop);
    }
    
    update(deltaTime) {
        // Update input state
        this.inputManager.update();
        
        // Update all entities
        this.entities.forEach(entity => {
            if (entity.active) {
                entity.update(deltaTime);
            }
        });
        
        // Remove inactive entities
        this.entities = this.entities.filter(entity => entity.active);
        
        // Update game stats
        this.updateGameStats();
        
        // Handle debug input
        this.handleDebugInput();
    }
    
    updateGameStats() {
        // Update stats from player
        if (this.player) {
            this.stats.score = this.player.score;
        }
        
        // Count active entities by type
        this.stats.enemies = this.entities.filter(entity => 
            entity.characterType === 'enemy'
        ).length;
    }
    
    handleDebugInput() {
        // Toggle debug mode with 'D' key (for testing)
        // We'll implement a proper debug key handler later
    }
    
    render() {
        // Clear canvas
        this.ctx.fillStyle = '#001122';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Render all entities
        this.entities.forEach(entity => {
            if (entity.visible) {
                entity.render(this.ctx);
            }
        });
        
        // Render UI
        this.renderUI();
        
        // Render debug info if enabled
        if (this.showDebug) {
            this.renderDebugInfo();
        }
    }
    
    renderUI() {
        // Render game UI elements
        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = '14px monospace';
        
        // Player health bar (top-left)
        if (this.player) {
            this.renderPlayerHealthBar();
        }
        
        // Instructions (bottom of screen)
        this.renderInstructions();
    }
    
    renderPlayerHealthBar() {
        const barWidth = 200;
        const barHeight = 20;
        const x = 10;
        const y = 10;
        
        // Background
        this.ctx.fillStyle = '#333333';
        this.ctx.fillRect(x, y, barWidth, barHeight);
        
        // Health
        this.ctx.fillStyle = '#ff0000';
        const healthRatio = this.player.health / this.player.maxHealth;
        this.ctx.fillRect(x, y, barWidth * healthRatio, barHeight);
        
        // Border
        this.ctx.strokeStyle = '#ffffff';
        this.ctx.lineWidth = 1;
        this.ctx.strokeRect(x, y, barWidth, barHeight);
        
        // Text
        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = '12px monospace';
        this.ctx.fillText(`Health: ${this.player.health}/${this.player.maxHealth}`, x, y + barHeight + 15);
    }
    
    renderInstructions() {
        const instructions = [
            'WASD - Move',
            'Mouse - Aim (coming soon)',
            'Left Click - Shoot (coming soon)'
        ];
        
        this.ctx.fillStyle = '#cccccc';
        this.ctx.font = '12px monospace';
        
        instructions.forEach((instruction, index) => {
            this.ctx.fillText(
                instruction,
                10,
                this.canvas.height - (instructions.length - index) * 16
            );
        });
    }
    
    renderDebugInfo() {
        this.ctx.fillStyle = '#00ff00';
        this.ctx.font = '12px monospace';
        
        const debugInfo = [
            `FPS: ${this.stats.fps}`,
            `Delta: ${this.deltaTime.toFixed(3)}s`,
            `Entities: ${this.entities.length}`,
            `Player: ${this.player ? this.player.x.toFixed(1) + ',' + this.player.y.toFixed(1) : 'None'}`,
            `Direction: ${this.player ? this.player.direction : 'N/A'}`,
            `Moving: ${this.player ? this.player.isMoving : 'N/A'}`
        ];
        
        const startY = 100;
        debugInfo.forEach((info, index) => {
            this.ctx.fillText(info, this.canvas.width - 200, startY + index * 16);
        });
    }
    
    updateFPS() {
        this.stats.frameCount++;
        const now = performance.now();
        
        if (now - this.stats.lastFpsUpdate >= 1000) {
            this.stats.fps = this.stats.frameCount;
            this.stats.frameCount = 0;
            this.stats.lastFpsUpdate = now;
        }
    }
    
    getStats() {
        return {
            fps: this.stats.fps,
            enemies: this.stats.enemies,
            score: this.stats.score
        };
    }
    
    // Debug methods
    toggleDebug() {
        this.showDebug = !this.showDebug;
        if (this.player) {
            this.player.showDebug = this.showDebug;
        }
        console.log('Debug mode:', this.showDebug ? 'ON' : 'OFF');
    }
    
    // Player methods for external access
    getPlayer() {
        return this.player;
    }
    
    spawnPlayer(x = null, y = null) {
        if (this.player) {
            const spawnX = x !== null ? x : this.canvas.width / 2;
            const spawnY = y !== null ? y : this.canvas.height / 2;
            this.player.spawn(spawnX, spawnY);
        }
    }
}