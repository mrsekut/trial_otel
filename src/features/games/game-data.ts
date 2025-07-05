type Player = {
  id: string;
  name: string;
  level: number;
  health: number;
  mana: number;
  strength: number;
  dexterity: number;
};

type Game = {
  id: string;
  name: string;
  playerIds: string[];
  currentRound: number;
};

const players: Map<string, Player> = new Map([
  [
    '1',
    {
      id: '1',
      name: 'Aragorn',
      level: 10,
      health: 100,
      mana: 50,
      strength: 18,
      dexterity: 14,
    },
  ],
  [
    '2',
    {
      id: '2',
      name: 'Gandalf',
      level: 20,
      health: 80,
      mana: 200,
      strength: 10,
      dexterity: 12,
    },
  ],
  [
    '3',
    {
      id: '3',
      name: 'Legolas',
      level: 15,
      health: 90,
      mana: 100,
      strength: 14,
      dexterity: 20,
    },
  ],
]);

const games: Map<string, Game> = new Map([
  [
    '1',
    {
      id: '1',
      name: 'The Fellowship Quest',
      playerIds: ['1', '2', '3'],
      currentRound: 5,
    },
  ],
  [
    '2',
    {
      id: '2',
      name: "Battle of Helm's Deep",
      playerIds: ['1', '3'],
      currentRound: 3,
    },
  ],
]);

export function getPlayer(id: string): Player | undefined {
  return players.get(id);
}

export function getAllPlayers(): Player[] {
  return Array.from(players.values());
}

export function getGame(id: string): Game | undefined {
  return games.get(id);
}

export function getPlayersForGame(gameId: string): Player[] {
  const game = games.get(gameId);
  if (!game) return [];
  return game.playerIds
    .map(id => players.get(id))
    .filter((p): p is Player => p !== undefined);
}

export function getGamesForPlayer(playerId: string): Game[] {
  return Array.from(games.values()).filter(game =>
    game.playerIds.includes(playerId),
  );
}
