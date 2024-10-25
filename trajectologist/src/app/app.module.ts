import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ProfessionModule } from 'src/profession/profession.module';
import { CompetencyModule } from 'src/competency/competency.module';
import { StepModule } from 'src/step/step.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    AuthModule,
    UserModule,
    ProfessionModule,
    CompetencyModule,
    StepModule,
    MulterModule.register({
      storage: diskStorage({
        destination: './src/excel',
        filename: (req, file, cb) => {
          cb(null, `updateData.xlsx`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(xlsx)$/i)) {
          return cb(new Error('Only XLSX files are allowed!'), false);
        }
        cb(null, true);
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
