export const schema = `
  type Query {
    hello: String
    rollTheDice(rolls: Int = 1, min: Int = 1, max: Int = 6): [Int!]!
    player(id: ID!): Player
    players: [Player!]!
    game(id: ID!): Game
  }

  type Player {
    id: ID!
    name: String!
    level: Int!
    stats: PlayerStats!
    games: [Game!]!
  }

  type PlayerStats {
    health: Int!
    mana: Int!
    strength: Int!
    dexterity: Int!
    rollAbilityCheck(skill: String!): Int!
  }

  type Game {
    id: ID!
    name: String!
    players: [Player!]!
    currentRound: Int!
    rollInitiative: [InitiativeRoll!]!
  }

  type InitiativeRoll {
    player: Player!
    roll: Int!
  }
`;
