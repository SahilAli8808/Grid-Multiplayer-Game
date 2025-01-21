import express from "express";
import { WebSocketServer } from "ws";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors());
const server = app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

const wss = new WebSocketServer({ server });

let gridState = Array(10)
  .fill(null)
  .map(() => Array(10).fill(""));
let playersOnline = 0;

wss.on("connection", (ws) => {
  playersOnline++;
  ws.send(JSON.stringify({ type: "INIT", grid: gridState, playersOnline }));

  ws.on("message", (data) => {
    const message = JSON.parse(data.toString());
    if (message.type === "UPDATE_BLOCK") {
      const { row, col, char } = message;
      gridState[row][col] = char;

      wss.clients.forEach((client) => {
        if (client.readyState === ws.OPEN) {
          client.send(
            JSON.stringify({ type: "UPDATE_GRID", grid: gridState })
          );
        }
      });
    }
  });

  ws.on("close", () => {
    playersOnline--;
    wss.clients.forEach((client) => {
      if (client.readyState === ws.OPEN) {
        client.send(JSON.stringify({ type: "PLAYER_COUNT", playersOnline }));
      }
    });
  });
});
