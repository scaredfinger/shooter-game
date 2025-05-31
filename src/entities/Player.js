// Player entity with input handling and game-specific behavior
import { Character } from './Character.js';

export class Player extends Character {
    constructor(x, y, config = {}) {
        super(x, y, {
            speed: 150,
            health: 100,
            type: 'player',
            name: 'Player',
            ...config
        });
        
        // Player-specific properties
        this.inputManager = null;
        this.canvasWidth = 800;
        this.canvasHeight = 600;
        
        // Combat properties (for future implementation)
        this.weapon = null;
        this.ammunition = 0;
        this.score = 0;
    }
    
    /**
     * Initialize player with input manager and canvas bounds
     * @param {InputManager} inputManager - Input manager instance
     * @param {number} canvasWidth - Canvas width
     * @param {number} canvasHeight - Canvas height
     */
    initialize(inputManager, canvasWidth, canvasHeight) {
        this.inputManager = inputManager;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        
        console.log('Player initialized at', this.x, this.y);
    }
    
    /**
     * Update player logic including input handling
     * @param {number} deltaTime - Time elapsed since last update
     */
    update(deltaTime) {
        // Handle input if available
        if (this.inputManager) {
            this.handleInput();
        }
        
        // Call parent update
        super.update(deltaTime);
        
        // Constrain to canvas bounds
        this.constrainToBounds(this.canvasWidth, this.canvasHeight);
    }
    
    /**
     * Handle player input
     */
    handleInput() {
        let deltaX = 0;
        let deltaY = 0;
        
        // Movement input
        if (this.inputManager.isMovingUp()) {
            deltaY -= 1;
        }
        if (this.inputManager.isMovingDown()) {
            deltaY += 1;
        }
        if (this.inputManager.isMovingLeft()) {
            deltaX -= 1;
        }
        if (this.inputManager.isMovingRight()) {
            deltaX += 1;
        }
        
        // Apply movement
        this.move(deltaX, deltaY);
        
        // TODO: Handle shooting input
        // if (this.inputManager.isShooting()) {
        //     this.shoot();
        // }
    }
    
    /**
     * Render player with additional UI elements
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     */
    render(ctx) {
        // Call parent render
        super.render(ctx);
        
        // Render player-specific UI elements
        this.renderPlayerUI(ctx);
    }
    
    /**
     * Render player-specific UI elements
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     */
    renderPlayerUI(ctx) {
        // Render movement indicator
        if (this.isMoving) {
            ctx.strokeStyle = '#00ff00';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius + 5, 0, Math.PI * 2);
            ctx.stroke();
        }
        
        // Render direction indicator (small arrow)
        this.renderDirectionIndicator(ctx);
    }
    
    /**
     * Render direction indicator
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     */
    renderDirectionIndicator(ctx) {
        const arrowLength = 15;
        const arrowX = this.x;
        const arrowY = this.y - this.height / 2 - 10;
        
        ctx.fillStyle = '#ffffff';
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 1;
        
        // Arrow direction based on current direction
        const directions = [
            { x: 0, y: -1 }, // North
            { x: 1, y: 0 },  // East
            { x: 0, y: 1 },  // South
            { x: -1, y: 0 }  // West
        ];
        
        const dir = directions[this.direction];
        const endX = arrowX + dir.x * arrowLength;
        const endY = arrowY + dir.y * arrowLength;
        
        // Draw arrow line
        ctx.beginPath();
        ctx.moveTo(arrowX, arrowY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        
        // Draw arrow head
        ctx.beginPath();
        ctx.moveTo(endX, endY);
        ctx.lineTo(endX - dir.x * 5 + dir.y * 3, endY - dir.y * 5 - dir.x * 3);
        ctx.lineTo(endX - dir.x * 5 - dir.y * 3, endY - dir.y * 5 + dir.x * 3);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }
    
    /**
     * Get player statistics
     * @returns {Object}
     */
    getStats() {
        return {
            ...this.getInfo(),
            score: this.score,
            ammunition: this.ammunition
        };
    }
    
    /**
     * Add score to player
     * @param {number} points - Points to add
     */
    addScore(points) {
        this.score += points;
    }
    
    /**
     * Reset player to initial state
     */
    reset() {
        this.health = this.maxHealth;
        this.score = 0;
        this.ammunition = 0;
        this.velocityX = 0;
        this.velocityY = 0;
        this.active = true;
        this.visible = true;
    }
    
    /**
     * Set player spawn position
     * @param {number} x - X position
     * @param {number} y - Y position
     */
    spawn(x, y) {
        this.moveTo(x, y);
        this.reset();
        console.log('Player spawned at', x, y);
    }
}