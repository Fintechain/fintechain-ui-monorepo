// src/middlewares/AuthMiddleware.ts
import { Middleware, Context, Next } from "@tsed/common";
import { Unauthorized } from "@tsed/exceptions";
import jwt from "jsonwebtoken";

@Middleware()
export class AuthMiddleware {
    async use(@Context() ctx: Context, @Next() next: Next) {
        const token = ctx.request.headers["authorization"]?.split(" ")[1];
        
        if (!token) {
            throw new Unauthorized("Missing authentication token");
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET!);
            ctx.request.user = decoded;
            return next();
        } catch (error) {
            throw new Unauthorized("Invalid authentication token");
        }
    }
}