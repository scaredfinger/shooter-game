// Core game engine class
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
        
        // Game entities (will be populated as we add systems)
        this.entities = [];
        
        // Bind the game loop to maintain 'this' context
        this.gameLoop = this.gameLoop.bind(this);
    }
    
    async initialize() {
        console.log('Initializing game systems...');
        
        // Setup canvas
        this.setupCanvas();
        
        // Initialize input handling
        this.inputManager.initialize();
        
        console.log('Game initialization complete');
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
        
        // TODO: Update entities
        // TODO: Handle collisions
        // TODO: Update game logic
    }
    
    render() {
        // Clear canvas
        this.ctx.fillStyle = '#001122';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // TODO: Render entities
        // TODO: Render UI elements
        
        // Render debug info for now
        this.renderDebugInfo();
    }
    
    renderDebugInfo() {
        this.ctx.fillStyle = '#00ff00';
        this.ctx.font = '16px monospace';
        this.ctx.fillText(`FPS: ${this.stats.fps}`, 10, 25);
        this.ctx.fillText(`Delta: ${this.deltaTime.toFixed(3)}s`, 10, 45);
        this.ctx.fillText('Game Running - Press WASD to move (coming soon)', 10, 70);
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
}