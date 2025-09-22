import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { FeatureModule } from './modules/feature/feature.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    FeatureModule,
    DatabaseModule,
  ],
})
export class AppModule {}