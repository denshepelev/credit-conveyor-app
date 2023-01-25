import { Position } from '../types/position.enum.js';

export interface Employment {
  status: string;
  employerINN: string;
  salary: number;
  position: Position;
  workExperienceTotal: number;
  workExperienceCurrent: number;
}
