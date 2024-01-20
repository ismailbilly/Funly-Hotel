import jwt from "jsonwebtoken";
export function signJwt(object:Object, secret: string, options?: jwt.SignOptions | undefined) {
    return jwt.sign(object, secret, { ...(options && options) }
    );
}


export function verifyJwt(token: string, secret: string) {


  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (e: any) {
    console.error(e);
    return {
      valid: false,
      expired: e.message === "jwt expired",
      decoded: null,
    };
  }
}