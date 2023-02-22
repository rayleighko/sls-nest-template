export const FamilyRelation = {
  tuple: [
    "grandfather",
    "grandmother",
    "father",
    "mother",
    "son",
    "daughter"
  ] as const,
  enum: {
    grandfather: "grandfather",
    grandmother: "grandmother",
    father: "father",
    mother: "mother",
    son: "son",
    daughter: "daughter"
  } as const
};
