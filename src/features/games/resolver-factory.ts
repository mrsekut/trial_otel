import { trace } from '@opentelemetry/api';
import { rollTheDice } from '../../rolldice.js';
import {
  getPlayer,
  getAllPlayers,
  getGame,
  getPlayersForGame,
  getGamesForPlayer,
} from './game-data.js';
import type {
  PlayerResolver,
  GameResolver,
  PlayerStats,
  InitiativeRoll,
} from './types.js';

const tracer = trace.getTracer('graphql-resolvers');

export function resolvePlayer({ id }: { id: string }) {
  return tracer.startActiveSpan('resolver:player', span => {
    span.setAttribute('player.id', id);
    const player = getPlayer(id);
    if (!player) {
      span.setStatus({ code: 2, message: 'Player not found' });
    }
    span.end();
    return createPlayerResolver(player);
  });
}

export function resolvePlayers() {
  return tracer.startActiveSpan('resolver:players', span => {
    const players = getAllPlayers();
    span.setAttribute('players.count', players.length);
    span.end();
    return players
      .map(p => createPlayerResolver(p))
      .filter((p): p is PlayerResolver => p !== null);
  });
}

export function resolveGame({ id }: { id: string }) {
  return tracer.startActiveSpan('resolver:game', span => {
    span.setAttribute('game.id', id);
    const game = getGame(id);
    if (!game) {
      span.setStatus({ code: 2, message: 'Game not found' });
    }
    span.end();
    return createGameResolver(game);
  });
}

function createPlayerStats(
  player: ReturnType<typeof getPlayer>,
): () => PlayerStats {
  if (!player) throw new Error('Player not found');

  return () =>
    tracer.startActiveSpan('resolver:playerStats', statsSpan => {
      statsSpan.setAttribute('player.id', player.id);
      const stats: PlayerStats = {
        health: player.health,
        mana: player.mana,
        strength: player.strength,
        dexterity: player.dexterity,
        rollAbilityCheck: ({ skill }: { skill: string }) => {
          return tracer.startActiveSpan(
            'resolver:rollAbilityCheck',
            async rollSpan => {
              rollSpan.setAttribute('skill', skill);
              rollSpan.setAttribute('player.name', player.name);
              const modifier =
                skill === 'strength' ? player.strength : player.dexterity;
              const roll = await rollTheDice(1, 1, 20);
              const diceResult = roll[0] ?? 0;
              const result = diceResult + Math.floor((modifier - 10) / 2);
              rollSpan.setAttribute('dice.result', diceResult);
              rollSpan.setAttribute('modifier', modifier);
              rollSpan.setAttribute('total', result);
              rollSpan.end();
              return result;
            },
          );
        },
      };
      statsSpan.end();
      return stats;
    });
}

function createPlayerResolver(
  player: ReturnType<typeof getPlayer>,
): PlayerResolver | null {
  if (!player) return null;

  return {
    ...player,
    stats: createPlayerStats(player),
    games: () =>
      tracer.startActiveSpan('resolver:playerGames', gamesSpan => {
        gamesSpan.setAttribute('player.id', player.id);
        const games = getGamesForPlayer(player.id);
        gamesSpan.setAttribute('games.count', games.length);
        gamesSpan.end();
        return games
          .map(g => createGameResolver(g))
          .filter((g): g is GameResolver => g !== null);
      }),
  };
}

function createGameResolver(
  game: ReturnType<typeof getGame>,
): GameResolver | null {
  if (!game) return null;

  return {
    ...game,
    players: () =>
      tracer.startActiveSpan('resolver:gamePlayers', span => {
        span.setAttribute('game.id', game.id);
        const players = getPlayersForGame(game.id);
        span.setAttribute('players.count', players.length);
        span.end();
        return players
          .map(p => createPlayerResolver(p))
          .filter((p): p is PlayerResolver => p !== null);
      }),
    rollInitiative: () =>
      tracer.startActiveSpan('resolver:rollInitiative', async span => {
        span.setAttribute('game.id', game.id);
        const players = getPlayersForGame(game.id);

        const initiatives: InitiativeRoll[] = await Promise.all(
          players.map(async player => {
            const roll = await rollTheDice(1, 1, 20);
            const initiative =
              (roll[0] ?? 0) + Math.floor((player.dexterity - 10) / 2);

            return {
              player: createPlayerResolver(player)!,
              roll: initiative,
            };
          }),
        );

        span.setAttribute('initiatives.count', initiatives.length);
        span.end();
        return initiatives.sort((a, b) => b.roll - a.roll);
      }),
  };
}
