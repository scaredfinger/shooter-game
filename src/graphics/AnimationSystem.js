// Animation system for handling sprite animations
export class AnimationSystem {
    constructor() {
        this.animations = new Map();
    }
    
    /**
     * Register an animation definition
     * @param {string} name - Animation name
     * @param {Object} definition - Animation definition
     */
    registerAnimation(name, definition) {
        this.animations.set(name, {
            frames: definition.frames || 1,
            fps: definition.fps || 1,
            loop: definition.loop !== false, // Default to true
            ...definition
        });
    }
    
    /**
     * Get animation definition
     * @param {string} name - Animation name
     * @returns {Object|null}
     */
    getAnimation(name) {
        return this.animations.get(name) || null;
    }
    
    /**
     * Create animation state for an entity
     * @param {string} animationName - Initial animation
     * @returns {Object} Animation state object
     */
    createAnimationState(animationName = 'idle') {
        return {
            currentAnimation: animationName,
            currentFrame: 0,
            animationTime: 0,
            isPlaying: true
        };
    }
    
    /**
     * Update animation state
     * @param {Object} state - Animation state object
     * @param {number} deltaTime - Time elapsed since last update
     * @param {Object} animations - Available animations for this sprite
     */
    updateAnimation(state, deltaTime, animations) {
        if (!state.isPlaying) return;
        
        const animation = animations[state.currentAnimation];
        if (!animation || animation.frames <= 1) return;
        
        state.animationTime += deltaTime;
        const frameTime = 1 / animation.fps;
        
        if (state.animationTime >= frameTime) {
            if (animation.loop) {
                state.currentFrame = (state.currentFrame + 1) % animation.frames;
            } else {
                state.currentFrame = Math.min(state.currentFrame + 1, animation.frames - 1);
                if (state.currentFrame >= animation.frames - 1) {
                    state.isPlaying = false;
                }
            }
            state.animationTime = 0;
        }
    }
    
    /**
     * Change animation
     * @param {Object} state - Animation state object
     * @param {string} newAnimation - New animation name
     * @param {boolean} forceRestart - Force restart if same animation
     */
    setAnimation(state, newAnimation, forceRestart = false) {
        if (state.currentAnimation !== newAnimation || forceRestart) {
            state.currentAnimation = newAnimation;
            state.currentFrame = 0;
            state.animationTime = 0;
            state.isPlaying = true;
        }
    }
}