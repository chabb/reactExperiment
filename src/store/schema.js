import {schema} from 'normalizr';

const circle = new schema.Entity('circles');
const square = new schema.Entity('squares');
const line = new schema.Entity('lines');

export const responseSchema = new schema.Object(
  {
    circles: new schema.Array(circle),
    squares: new schema.Array(square),
    lines: new schema.Array(line)
  }
);
