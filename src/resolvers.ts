import { rollTheDice } from './rolldice.js';
import {
  resolvePlayer,
  resolvePlayers,
  resolveGame,
} from './features/games/resolver-factory.js';

export const createRootResolver = () => ({
  hello: () => 'Hello Hono GraphQL!',
  rollTheDice: rollTheDice,
  player: resolvePlayer,
  players: resolvePlayers,
  game: resolveGame,
});
