import { rollTheDice } from './rolldice.js';
import {
  resolvePlayer,
  resolvePlayers,
  resolveGame,
} from './features/games/resolver-factory.js';

export const createRootResolver = () => ({
  hello: () => 'Hello Hono GraphQL!',
  rollTheDice: async ({
    rolls = 1,
    min = 1,
    max = 6,
  }: {
    rolls?: number;
    min?: number;
    max?: number;
  }) => {
    return await rollTheDice(rolls, min, max);
  },
  player: resolvePlayer,
  players: resolvePlayers,
  game: resolveGame,
});
