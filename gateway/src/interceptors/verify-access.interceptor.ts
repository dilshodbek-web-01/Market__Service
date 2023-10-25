import { BadRequestException, CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";

export class VerifyAccessInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        const request = context.switchToHttp().getRequest()

        const accessToken = request.headers["authorization"].replace('Bearer ', '')

        if(!accessToken) {
            throw new BadRequestException('Provide access token')
        }

        request.body.userId = 1

        return next.handle()
    }
}