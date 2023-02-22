export const Method = {
  tuple: ["GET", "POST", "PUT", "DELETE"] as const,
  enum: {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE"
  } as const
};
