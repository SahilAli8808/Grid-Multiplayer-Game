import { Request, Response } from 'express';
import { GameService } from '../services/gameService.js'

export const getGridState = (req: Request, res: Response) => {
  const gridState = GameService.getGridState();
  res.json(gridState);
};

export const updateBlock = (req: Request, res: Response) => {
  const { row, col, char } = req.body;
  const updatedGrid = GameService.updateBlock(row, col, char);
  res.json(updatedGrid);
};
