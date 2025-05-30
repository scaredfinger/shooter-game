# Shooter Game

A browser-based top-down shooter game with configurable maps and character skins.

## Development Setup

This project is designed to run in a VS Code devcontainer for consistent development environment.

### Prerequisites
- VS Code with Dev Containers extension
- Docker

### Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/scaredfinger/shooter-game.git
   cd shooter-game
   ```

2. Open in VS Code:
   ```bash
   code .
   ```

3. When prompted, click "Reopen in Container" or use the Command Palette:
   - Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
   - Type "Dev Containers: Reopen in Container"
   - Press Enter

4. Once the container is built and running, start the development server:
   ```bash
   npm start
   ```

5. Open your browser to `http://localhost:3000` to see the game

### Development Commands

- `npm start` - Start the development server
- `npm run dev` - Start with live reload (watches src folder)
- `npm test` - Run tests (not yet implemented)
- `npm run build` - Build for production (not yet implemented)

## Game Features

### Current Status: Foundation Phase
- ✅ Basic game loop with FPS counter
- ✅ Canvas setup and rendering
- ✅ Input management (keyboard and mouse)
- ✅ Devcontainer configuration
- 🔄 Player entity system (in progress)

### Planned Features

#### Core Gameplay
- **Movement**: WASD keyboard controls
- **Shooting**: Mouse aim and shoot with infinite primary ammo
- **Weapons**: Upgradeable primary weapons, limited secondary weapons
- **Enemies**: Human and mechanical enemies with different AI patterns
- **Maps**: Configurable level layouts

#### Configurability
- **Character Skins**: JSON-based player and enemy appearance customization
- **Maps**: JSON-defined level layouts with tile-based or object placement
- **Weapons**: Configurable upgrade paths and weapon properties
- **Enemy Spawning**: Flexible spawn system configuration

## Project Structure

```
/
├── .devcontainer/          # VS Code devcontainer configuration
├── src/                    # Game source code
│   ├── core/              # Game engine core systems
│   │   ├── Game.js        # Main game loop and state management
│   │   └── InputManager.js # Keyboard and mouse input handling
│   ├── entities/          # Game entities (player, enemies, projectiles)
│   ├── graphics/          # Sprite management and rendering
│   ├── config/            # Configuration system and JSON loaders
│   ├── maps/              # Level definitions
│   └── assets/            # Images, sounds, and other media
├── index.html             # Main game HTML file
├── package.json           # Node.js project configuration
└── ai-analysis.md         # Comprehensive project documentation for AI
```

## Controls

### Current (Foundation)
- Game runs automatically when loaded
- Debug information displayed on screen

### Planned
- **WASD** or **Arrow Keys**: Player movement
- **Mouse**: Aim and shoot (left click)
- **Right Click** or **Space**: Secondary weapon/action

## Technical Details

- **Rendering**: Canvas 2D API (with WebGL migration path)
- **Input**: Event-driven keyboard and mouse handling
- **Game Loop**: RequestAnimationFrame-based loop with delta time
- **Module System**: ES6 modules for clean code organization
- **Development**: Live server with hot reload

## Development Notes

This project follows a methodical development approach with small, testable increments. Each phase should result in a runnable game state within minutes of changes.

### Next Development Steps
1. Create basic Player entity with movement
2. Add simple shooting mechanics
3. Implement basic enemy spawning
4. Add collision detection
5. Build configuration system for maps

## Contributing

This is a personal project, but the code is organized for easy understanding and extension. See `ai-analysis.md` for detailed architectural decisions and development methodology.

## License

MIT License - See LICENSE file for details