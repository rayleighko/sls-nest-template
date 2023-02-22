import requestContext from "request-context";

export const contextMiddleware: typeof Function =
  requestContext.middleware("request");
