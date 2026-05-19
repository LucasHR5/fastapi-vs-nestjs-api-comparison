import { Module } from '@nestjs/common';
import { TaskModule } from './modules/task/task.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [PrismaModule, UserModule, TaskModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
