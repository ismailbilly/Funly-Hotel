const rateLimit = require("express-rate-limit");
const MESSAGE = "Too many requests, please try again later.";

const createLimiter = (windowMs:number, max:number, message:string) => {
  return rateLimit({
    windowMs, //The time window for which the rate limit applies
    max, //The maximum number of requests allowed within the defined time window.
    message: { message: message },
  });
};
export const signUpSignInLimiter = createLimiter(10 * 60 * 1000, 100, MESSAGE);

//social Echo