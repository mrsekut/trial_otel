export const schema = `
  type Query {
    hello: String
    rollTheDice(rolls: Int = 1, min: Int = 1, max: Int = 6): [Int!]!
  }
`;