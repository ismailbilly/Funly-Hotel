//extend express Request by adding a new property userId
declare namespace Express {
    interface Request {
        userId: string;
    }
}