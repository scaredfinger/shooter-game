// Input management system for keyboard and mouse
export class InputManager {
    constructor(canvas) {
        this.canvas = canvas;
        
        // Input state tracking
        this.keys = {};
        this.mouse = {
            x: 0,
            y: 0,
            buttons: {},
            worldX: 0, // Mouse position in world coordinates
            worldY: 0
        };
        
        // Input event bindings
        this.keyDownHandler = this.keyDownHandler.bind(this);
        this.keyUpHandler = this.keyUpHandler.bind(this);
        this.mouseDownHandler = this.mouseDownHandler.bind(this);
        this.mouseUpHandler = this.mouseUpHandler.bind(this);
        this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
        this.contextMenuHandler = this.contextMenuHandler.bind(this);
    }
    
    initialize() {
        console.log('Initializing input manager...');
        
        // Keyboard events
        document.addEventListener('keydown', this.keyDownHandler);
        document.addEventListener('keyup', this.keyUpHandler);
        
        // Mouse events
        this.canvas.addEventListener('mousedown', this.mouseDownHandler);
        this.canvas.addEventListener('mouseup', this.mouseUpHandler);
        this.canvas.addEventListener('mousemove', this.mouseMoveHandler);
        this.canvas.addEventListener('contextmenu', this.contextMenuHandler);
        
        console.log('Input manager initialized');
    }
    
    destroy() {
        // Remove event listeners
        document.removeEventListener('keydown', this.keyDownHandler);
        document.removeEventListener('keyup', this.keyUpHandler);
        this.canvas.removeEventListener('mousedown', this.mouseDownHandler);
        this.canvas.removeEventListener('mouseup', this.mouseUpHandler);
        this.canvas.removeEventListener('mousemove', this.mouseMoveHandler);
        this.canvas.removeEventListener('contextmenu', this.contextMenuHandler);
    }
    
    keyDownHandler(event) {
        this.keys[event.code] = true;
        
        // Prevent default behavior for game keys
        if (this.isGameKey(event.code)) {
            event.preventDefault();
        }
    }
    
    keyUpHandler(event) {
        this.keys[event.code] = false;
        
        if (this.isGameKey(event.code)) {
            event.preventDefault();
        }
    }
    
    mouseDownHandler(event) {
        this.mouse.buttons[event.button] = true;
        this.updateMousePosition(event);
        event.preventDefault();
    }
    
    mouseUpHandler(event) {
        this.mouse.buttons[event.button] = false;
        this.updateMousePosition(event);
        event.preventDefault();
    }
    
    mouseMoveHandler(event) {
        this.updateMousePosition(event);
    }
    
    contextMenuHandler(event) {
        // Prevent right-click context menu
        event.preventDefault();
    }
    
    updateMousePosition(event) {
        const rect = this.canvas.getBoundingClientRect();
        this.mouse.x = event.clientX - rect.left;
        this.mouse.y = event.clientY - rect.top;
        
        // Convert to world coordinates (same as canvas for now)
        this.mouse.worldX = this.mouse.x;
        this.mouse.worldY = this.mouse.y;
    }
    
    isGameKey(keyCode) {
        // Define which keys should preventDefault
        const gameKeys = [
            'KeyW', 'KeyA', 'KeyS', 'KeyD', // Movement
            'Space', // Action
            'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight' // Alternative movement
        ];
        return gameKeys.includes(keyCode);
    }
    
    update() {
        // This can be used for input processing that needs to happen each frame
        // For now, we'll keep it simple
    }
    
    // Utility methods for checking input state
    isKeyPressed(keyCode) {
        return !!this.keys[keyCode];
    }
    
    isMouseButtonPressed(button) {
        return !!this.mouse.buttons[button];
    }
    
    getMousePosition() {
        return { x: this.mouse.x, y: this.mouse.y };
    }
    
    getMouseWorldPosition() {
        return { x: this.mouse.worldX, y: this.mouse.worldY };
    }
    
    // Common input checks
    isMovingUp() {
        return this.isKeyPressed('KeyW') || this.isKeyPressed('ArrowUp');
    }
    
    isMovingDown() {
        return this.isKeyPressed('KeyS') || this.isKeyPressed('ArrowDown');
    }
    
    isMovingLeft() {
        return this.isKeyPressed('KeyA') || this.isKeyPressed('ArrowLeft');
    }
    
    isMovingRight() {
        return this.isKeyPressed('KeyD') || this.isKeyPressed('ArrowRight');
    }
    
    isShooting() {
        return this.isMouseButtonPressed(0); // Left mouse button
    }
    
    isSecondaryAction() {
        return this.isMouseButtonPressed(2) || this.isKeyPressed('Space'); // Right mouse or space
    }
}