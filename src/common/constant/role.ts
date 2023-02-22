export const Role = {
  tuple: [
    "USER",
    "ADMIN",
    "ADMIN1",
    "ADMIN2",
    "ADMIN3",
    "ADMIN4",
    "ADMIN5",
    "ROOT"
  ] as const,
  enum: {
    USER: "USER",
    ADMIN: "ADMIN",
    ADMIN1: "ADMIN1",
    ADMIN2: "ADMIN2",
    ADMIN3: "ADMIN3",
    ADMIN4: "ADMIN4",
    ADMIN5: "ADMIN5",
    ROOT: "ROOT"
  } as const
};
