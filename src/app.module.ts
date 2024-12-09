import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService  } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { BffModule } from './bff/bff.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Global import of .env variables
    MongooseModule.forRootAsync({
      imports: [ConfigModule],  // Ensure ConfigModule is imported
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        // Retrieve MONGO_URI from environment
        const uri = configService.get<string>('MONGO_URI');
        
        // Log the URI for debugging purposes
        console.log('📢 MongoDB URI:', uri);

        // Return the MongoDB connection options
        return {
          uri: uri || 'mongodb://localhost:27017/nestdb',  // Fallback if MONGO_URI is not set
          dbName: configService.get<string>('DB_NAME', 'nestdb'), // You can set a default DB_NAME
          autoCreate: true,
        };
      },
    }),
    BffModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
