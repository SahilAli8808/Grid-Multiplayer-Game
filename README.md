# Real-Time Grid Game

A web application where players can collaboratively update a 10x10 grid with Unicode characters. Each player can interact with the same shared grid, with restrictions to ensure fairness and a live player count.

## Features

- **Real-Time Grid Updates**: All players share the same grid, updated live using Socket.IO.
- **Online Player Count**: Displays the number of players currently connected.
- **Timed Restriction**: After submitting a character, players are restricted from updating for 1 minute.
- **Unicode Support**: Players can input any valid Unicode character.

## Technologies Used
- React.js, TailwindCSS, Socket.IO
- Node.js ( Express.js + TypeScript)

## Installation and Setup

### Backend
1. Clone the repository.
2. Navigate to the backend directory.
3. Install dependencies:
   ```bash
   npm install 
   ```
4. Start the server:
   ```bash
   node server.ts
   ```
### Frontend
1. Navigate to the frontend directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm run dev
   ```
