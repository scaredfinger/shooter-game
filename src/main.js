// Main game entry point
import { Game } from './core/Game.js';
import { InputManager } from './core/InputManager.js';

// Game initialization
document.addEventListener('DOMContentLoaded', async () => {
    const canvas = document.getElementById('gameCanvas');
    const statusElement = document.getElementById('gameStatus');
    const statsElement = document.getElementById('gameStats');
    
    if (!canvas) {
        console.error('Canvas element not found!');
        return;
    }
    
    try {
        statusElement.textContent = 'Initializing game...';
        statusElement.className = 'loading';
        
        // Initialize input manager
        const inputManager = new InputManager(canvas);
        
        // Initialize game
        const game = new Game(canvas, inputManager);
        
        // Setup UI updates
        setupUI(game, statusElement, statsElement);
        
        // Start the game
        await game.initialize();
        game.start();
        
        statusElement.textContent = 'Game Running';
        statusElement.className = '';
        
        console.log('Game started successfully!');
        
    } catch (error) {
        console.error('Failed to initialize game:', error);
        statusElement.textContent = `Error: ${error.message}`;
        statusElement.className = 'error';
    }
});

function setupUI(game, statusElement, statsElement) {
    // Update game stats display
    setInterval(() => {
        const stats = game.getStats();
        statsElement.textContent = `FPS: ${stats.fps} | Enemies: ${stats.enemies} | Score: ${stats.score}`;
    }, 100);
}