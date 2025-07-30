# Memory Card Matching Game

This project was created using `Arkain Snap`.

## Environment and Technology Stack

| Environment Component | Version       |
|-----------------------|---------------|
| Operating System      | Ubuntu 22.04  |
| Node.js               | 20.18.3       |
| npm                   | 10.8.2        |
| Framework             | React         |
| Bundler               | Vite          |
| Styling               | Vanilla CSS   |

## How This Project Was Created

- Initialized the project with a React and Vite setup.
- Created the main HTML template as the entry point.
- Configured Vite for development and build processes.
- Developed React components for the game logic, UI, and animations.
- Implemented utility functions for card generation and game mechanics.
- Styled the application using CSS for layout, animations, and responsiveness.
- Installed all necessary dependencies.
- Started the development server to run the application locally.

## How to Run the Project

1. Clone the repository and navigate to the project directory.
2. Install dependencies by running:
   bash
   npm install
   ```
3. Start the development server with:
   ```bash
   npm run dev
   ```
4. Open the provided local URL in your browser to play the game.

### Potential Errors and Solutions

- **Error:** `npm: command not found`  
  **Solution:** Ensure Node.js and npm are installed and added to your system PATH.

- **Error:** Port already in use when running `npm run dev`  
  **Solution:** Either stop the process using the port or configure Vite to use a different port in `vite.config.js`.

- **Error:** Missing dependencies or failed install  
  **Solution:** Delete `node_modules` and `package-lock.json` then run `npm install` again.

## Navigation Instruction (Translated)

From the top menu, navigate to  
`Container -> Execution URL and Port -> Registered URL and Port -> Click the shortcut button on the selected row.`

## Directory Structure

```
.
├── index.html
├── package.json
├── vite.config.js
├── src
│   ├── App.css
│   ├── App.jsx
│   ├── main.jsx
│   ├── components
│   │   ├── Card.css
│   │   ├── Card.jsx
│   │   ├── Game.jsx
│   │   ├── GameBoard.css
│   │   ├── GameBoard.jsx
│   │   └── ScoreBoard.jsx
│   └── utils
│       └── gameUtils.js
```
```