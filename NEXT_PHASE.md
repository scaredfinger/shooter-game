# Next Phase Instructions: Player Entity & Character Sprites

## Phase Overview
Implement basic Player entity with movement and establish the sprite system foundation with placeholder graphics for characters.

## Character Sprite Requirements

### Player Characters (Civilian Style)
**Male Character:**
- Top-down view sprite (32x32 or 48x48 pixels)
- Plain clothes (t-shirt/casual shirt, jeans/pants)
- Neutral colors (blues, grays, browns)
- Multiple directions: North, South, East, West (minimum)
- Optional: NE, NW, SE, SW for 8-directional movement
- Idle and walking animation frames (2-3 frames per direction)

**Female Character:**
- Same specifications as male
- Distinct silhouette/clothing (blouse/top, pants/skirt)
- Different color palette to distinguish from male
- Same directional and animation requirements

### Enemy Characters (Military Style)
**Basic Soldier:**
- Military uniform (camouflage or solid military colors)
- Helmet or military cap
- Slightly larger than civilian sprites (to show authority/threat)
- Same directional requirements
- Armed appearance (weapon visible)

**Heavy Soldier/Officer:**
- Bulkier appearance (armor vest, gear)
- Different color scheme (darker, more intimidating)
- Larger sprite size
- Same directional system

## Technical Implementation Plan

### 1. Sprite System Architecture
```
/src/graphics/
├── SpriteManager.js    # Sprite loading and management
├── Sprite.js           # Individual sprite class
└── AnimationSystem.js  # Animation frame management

/src/assets/
├── sprites/
│   ├── characters/
│   │   ├── player_male.png
│   │   ├── player_female.png
│   │   ├── enemy_soldier.png
│   │   └── enemy_heavy.png
│   └── manifest.json   # Sprite definitions and metadata
```

### 2. Player Entity Implementation
```
/src/entities/
├── Entity.js          # Base entity class
├── Player.js          # Player-specific logic
└── Character.js       # Shared character behavior
```

### 3. Configuration System
```
/src/config/
├── characters.json    # Character definitions
└── sprites.json       # Sprite sheet configurations
```

## Development Steps (Small Increments)

### Step 1: Sprite System Foundation
- Create placeholder sprites (colored rectangles with direction indicators)
- Implement basic SpriteManager for loading images
- Create Sprite class for individual sprite handling

### Step 2: Base Entity System
- Create Entity base class (position, size, basic properties)
- Implement basic collision boundaries
- Add render method integration

### Step 3: Player Entity
- Create Player class extending Entity
- Implement WASD movement with InputManager integration
- Add basic sprite rendering (single direction first)

### Step 4: Directional Movement
- Add directional sprite support
- Implement facing direction based on movement
- Test 4-directional movement (N, S, E, W)

### Step 5: Animation System
- Create basic animation frame cycling
- Implement walking animation when moving
- Add idle state when stationary

## Sprite Creation Guidelines

### For Initial Development (Placeholder Graphics)
- Use simple colored rectangles with clear directional indicators
- Male: Blue rectangle with white arrow showing direction
- Female: Pink rectangle with white arrow showing direction
- Enemy: Red rectangle with white arrow showing direction
- Heavy Enemy: Dark red rectangle with white arrow showing direction

### Size Specifications
- Standard character: 32x32 pixels
- Heavy character: 48x48 pixels
- Canvas scale: 1:1 (no scaling initially)

### Sprite Sheet Layout
```
Direction Order: N, NE, E, SE, S, SW, W, NW
Animation Frames: Idle, Walk1, Walk2 (3 frames per direction)
Layout: Horizontal strips, one row per direction
```

## JSON Configuration Structure

### characters.json Example
```json
{
  "player_male": {
    "name": "Male Civilian",
    "sprite": "player_male.png",
    "size": { "width": 32, "height": 32 },
    "speed": 150,
    "health": 100,
    "type": "player"
  },
  "player_female": {
    "name": "Female Civilian", 
    "sprite": "player_female.png",
    "size": { "width": 32, "height": 32 },
    "speed": 150,
    "health": 100,
    "type": "player"
  }
}
```

### sprites.json Example
```json
{
  "player_male.png": {
    "frameWidth": 32,
    "frameHeight": 32,
    "directions": 4,
    "animations": {
      "idle": { "frames": 1, "fps": 1 },
      "walk": { "frames": 2, "fps": 8 }
    }
  }
}
```

## Testing Criteria

### Step 1 Success: Sprite System
- Placeholder sprites load without errors
- SpriteManager can load and cache multiple sprites
- Basic sprite rendering works on canvas

### Step 2 Success: Entity Foundation
- Entity can be positioned on canvas
- Basic collision boundaries are visible (debug mode)
- Entity integrates with game loop update/render cycle

### Step 3 Success: Player Movement
- Player responds to WASD keys
- Movement is smooth and consistent
- Player stays within canvas boundaries
- Movement speed feels appropriate (not too fast/slow)

### Step 4 Success: Directional System
- Player sprite changes based on movement direction
- Direction changes are immediate and clear
- All 4 directions work correctly

### Step 5 Success: Animation
- Walking animation plays during movement
- Animation stops when player stops moving
- Animation frame timing feels natural

## Code Quality Requirements

### Entity System Patterns
- Use composition over inheritance where possible
- Implement clean separation between logic and rendering
- Add proper error handling for sprite loading
- Include debug rendering options

### Performance Considerations
- Sprite caching to avoid repeated loading
- Efficient animation frame calculation
- Minimal garbage collection during gameplay

### Extensibility
- Easy to add new character types
- Simple sprite swapping mechanism
- Configurable movement speeds and properties
- Plugin-ready for different control schemes

## Assets Creation Priority

1. **Immediate**: Colored rectangle placeholders with directional arrows
2. **Next Phase**: Simple pixel art sprites (can be basic)
3. **Future**: Detailed character sprites with proper art

This approach ensures we can test all systems with placeholders before investing time in detailed artwork.

---

**Ready for implementation when you give the go-ahead!**