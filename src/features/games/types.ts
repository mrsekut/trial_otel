export type PlayerStats = {
  health: number;
  mana: number;
  strength: number;
  dexterity: number;
  rollAbilityCheck: (args: { skill: string }) => Promise<number>;
};

export type PlayerResolver = {
  id: string;
  name: string;
  level: number;
  stats: () => PlayerStats;
  games: () => GameResolver[];
};

export type GameResolver = {
  id: string;
  name: string;
  currentRound: number;
  players: () => PlayerResolver[];
  rollInitiative: () => Promise<InitiativeRoll[]>;
};

export type InitiativeRoll = {
  player: PlayerResolver;
  roll: number;
};
