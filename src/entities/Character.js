// Shared character behavior for both players and enemies
import { Entity } from './Entity.js';

export class Character extends Entity {
    constructor(x, y, config = {}) {
        super(x, y, config);
        
        // Movement properties
        this.speed = config.speed || 100;
        this.isMoving = false;
        
        // Animation state
        this.animationState = {
            currentAnimation: 'idle',
            currentFrame: 0,
            animationTime: 0,
            isPlaying: true
        };
        
        // Character type
        this.characterType = config.type || 'character';
        this.characterName = config.name || 'Character';
    }
    
    /**
     * Update character logic
     * @param {number} deltaTime - Time elapsed since last update
     */
    update(deltaTime) {
        super.update(deltaTime);
        
        // Update movement state
        this.isMoving = this.velocityX !== 0 || this.velocityY !== 0;
        
        // Update animation based on movement
        this.updateAnimation(deltaTime);
        
        // Update direction based on movement
        this.updateDirection();
    }
    
    /**
     * Update animation based on current state
     * @param {number} deltaTime - Time elapsed since last update
     */
    updateAnimation(deltaTime) {
        // Set animation based on movement state
        const targetAnimation = this.isMoving ? 'walk' : 'idle';
        
        if (this.animationState.currentAnimation !== targetAnimation) {
            this.setAnimation(targetAnimation);
        }
        
        // Update sprite animation if present
        if (this.sprite) {
            this.sprite.setAnimation(targetAnimation);
        }
    }
    
    /**
     * Update facing direction based on movement
     */
    updateDirection() {
        if (!this.isMoving) return;
        
        const absVelX = Math.abs(this.velocityX);
        const absVelY = Math.abs(this.velocityY);
        
        // Determine primary direction based on strongest velocity component
        if (absVelX > absVelY) {
            // Moving more horizontally
            this.direction = this.velocityX > 0 ? 1 : 3; // East : West
        } else {
            // Moving more vertically
            this.direction = this.velocityY > 0 ? 2 : 0; // South : North
        }
    }
    
    /**
     * Set animation state
     * @param {string} animationName - Animation to play
     */
    setAnimation(animationName) {
        if (this.animationState.currentAnimation !== animationName) {
            this.animationState.currentAnimation = animationName;
            this.animationState.currentFrame = 0;
            this.animationState.animationTime = 0;
            this.animationState.isPlaying = true;
        }
    }
    
    /**
     * Move character in a direction
     * @param {number} deltaX - X movement component (-1 to 1)
     * @param {number} deltaY - Y movement component (-1 to 1)
     */
    move(deltaX, deltaY) {
        // Normalize diagonal movement
        const magnitude = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        if (magnitude > 0) {
            deltaX /= magnitude;
            deltaY /= magnitude;
        }
        
        this.velocityX = deltaX * this.speed;
        this.velocityY = deltaY * this.speed;
    }
    
    /**
     * Stop character movement
     */
    stopMovement() {
        this.velocityX = 0;
        this.velocityY = 0;
    }
    
    /**
     * Check if character is within screen bounds
     * @param {number} canvasWidth - Canvas width
     * @param {number} canvasHeight - Canvas height
     * @returns {boolean}
     */
    isInBounds(canvasWidth, canvasHeight) {
        const halfWidth = this.width / 2;
        const halfHeight = this.height / 2;
        
        return this.x >= halfWidth &&
               this.x <= canvasWidth - halfWidth &&
               this.y >= halfHeight &&
               this.y <= canvasHeight - halfHeight;
    }
    
    /**
     * Constrain character to screen bounds
     * @param {number} canvasWidth - Canvas width
     * @param {number} canvasHeight - Canvas height
     */
    constrainToBounds(canvasWidth, canvasHeight) {
        const halfWidth = this.width / 2;
        const halfHeight = this.height / 2;
        
        this.x = Math.max(halfWidth, Math.min(canvasWidth - halfWidth, this.x));
        this.y = Math.max(halfHeight, Math.min(canvasHeight - halfHeight, this.y));
    }
    
    /**
     * Get character information
     * @returns {Object}
     */
    getInfo() {
        return {
            name: this.characterName,
            type: this.characterType,
            health: this.health,
            maxHealth: this.maxHealth,
            speed: this.speed,
            position: { x: this.x, y: this.y },
            direction: this.direction,
            isMoving: this.isMoving
        };
    }
}