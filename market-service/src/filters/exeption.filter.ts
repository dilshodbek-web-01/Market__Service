import { Catch, HttpException, Injectable } from "@nestjs/common";

@Injectable()
@Catch()
export class ExceptionFilter {
    catch(error: Error) {
        const httpExeption = new HttpException(error.message, 500);
        return httpExeption;
    }
}