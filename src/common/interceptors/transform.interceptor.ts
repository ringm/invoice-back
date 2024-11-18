import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor {
  constructor(private readonly targetClass: new () => T) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => ({
        message: data.message,
        data: plainToInstance(this.targetClass, data.data, {
          excludeExtraneousValues: true,
        }),
      })),
    );
  }
}
