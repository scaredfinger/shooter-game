// Base entity class for all game objects
export class Entity {
    constructor(x = 0, y = 0, config = {}) {
        // Position
        this.x = x;
        this.y = y;
        this.prevX = x;
        this.prevY = y;
        
        // Velocity
        this.velocityX = 0;
        this.velocityY = 0;
        
        // Size and collision
        this.width = config.width || 32;
        this.height = config.height || 32;
        this.radius = config.radius || Math.min(this.width, this.height) / 2;
        
        // Visual properties
        this.direction = 2; // 0=North, 1=East, 2=South, 3=West
        this.sprite = null;
        this.visible = true;
        
        // State
        this.active = true;
        this.health = config.health || 100;
        this.maxHealth = this.health;
        
        // Debug
        this.showDebug = false;
    }
    
    /**
     * Update entity logic
     * @param {number} deltaTime - Time elapsed since last update
     */
    update(deltaTime) {
        // Store previous position for collision rollback
        this.prevX = this.x;
        this.prevY = this.y;
        
        // Apply velocity
        this.x += this.velocityX * deltaTime;
        this.y += this.velocityY * deltaTime;
        
        // Update sprite animation if present
        if (this.sprite) {
            this.sprite.update(deltaTime);
        }
    }
    
    /**
     * Render entity
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     */
    render(ctx) {
        if (!this.visible) return;
        
        // Render sprite if available
        if (this.sprite) {
            this.sprite.render(ctx, this.x, this.y, this.direction);
        } else {
            this.renderDefault(ctx);
        }
        
        // Render debug info if enabled
        if (this.showDebug) {
            this.renderDebug(ctx);
        }
    }
    
    /**
     * Default rendering when no sprite is available
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     */
    renderDefault(ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(
            this.x - this.width / 2,
            this.y - this.height / 2,
            this.width,
            this.height
        );
    }
    
    /**
     * Render debug information
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     */
    renderDebug(ctx) {
        // Render collision bounds
        ctx.strokeStyle = '#ff0000';
        ctx.lineWidth = 1;
        ctx.strokeRect(
            this.x - this.width / 2,
            this.y - this.height / 2,
            this.width,
            this.height
        );
        
        // Render center point
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(this.x - 1, this.y - 1, 2, 2);
        
        // Render health bar if not at full health
        if (this.health < this.maxHealth) {
            this.renderHealthBar(ctx);
        }
    }
    
    /**
     * Render health bar above entity
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     */
    renderHealthBar(ctx) {
        const barWidth = this.width;
        const barHeight = 4;
        const barY = this.y - this.height / 2 - 8;
        
        // Background
        ctx.fillStyle = '#333333';
        ctx.fillRect(
            this.x - barWidth / 2,
            barY,
            barWidth,
            barHeight
        );
        
        // Health
        ctx.fillStyle = '#ff0000';
        const healthRatio = this.health / this.maxHealth;
        ctx.fillRect(
            this.x - barWidth / 2,
            barY,
            barWidth * healthRatio,
            barHeight
        );
    }
    
    /**
     * Set sprite for this entity
     * @param {Sprite} sprite - Sprite object
     */
    setSprite(sprite) {
        this.sprite = sprite;
        if (sprite) {
            const dimensions = sprite.getDimensions();
            this.width = dimensions.width;
            this.height = dimensions.height;
            this.radius = Math.min(this.width, this.height) / 2;
        }
    }
    
    /**
     * Get bounding box for collision detection
     * @returns {{x: number, y: number, width: number, height: number}}
     */
    getBounds() {
        return {
            x: this.x - this.width / 2,
            y: this.y - this.height / 2,
            width: this.width,
            height: this.height
        };
    }
    
    /**
     * Check collision with another entity
     * @param {Entity} other - Other entity
     * @returns {boolean}
     */
    collidesWith(other) {
        const bounds1 = this.getBounds();
        const bounds2 = other.getBounds();
        
        return bounds1.x < bounds2.x + bounds2.width &&
               bounds1.x + bounds1.width > bounds2.x &&
               bounds1.y < bounds2.y + bounds2.height &&
               bounds1.y + bounds1.height > bounds2.y;
    }
    
    /**
     * Calculate distance to another entity
     * @param {Entity} other - Other entity
     * @returns {number}
     */
    distanceTo(other) {
        const dx = this.x - other.x;
        const dy = this.y - other.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
    
    /**
     * Calculate angle to another entity
     * @param {Entity} other - Other entity
     * @returns {number} Angle in radians
     */
    angleTo(other) {
        return Math.atan2(other.y - this.y, other.x - this.x);
    }
    
    /**
     * Move to a specific position
     * @param {number} x - Target X
     * @param {number} y - Target Y
     */
    moveTo(x, y) {
        this.x = x;
        this.y = y;
    }
    
    /**
     * Apply damage to entity
     * @param {number} amount - Damage amount
     */
    takeDamage(amount) {
        this.health = Math.max(0, this.health - amount);
        return this.health <= 0;
    }
    
    /**
     * Heal entity
     * @param {number} amount - Heal amount
     */
    heal(amount) {
        this.health = Math.min(this.maxHealth, this.health + amount);
    }
    
    /**
     * Check if entity is alive
     * @returns {boolean}
     */
    isAlive() {
        return this.health > 0;
    }
    
    /**
     * Destroy entity
     */
    destroy() {
        this.active = false;
        this.visible = false;
    }
}