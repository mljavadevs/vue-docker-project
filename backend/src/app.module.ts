import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CacheManagerModule } from './cache-manager/cache-manager.module';
import { WebScrapingModule } from './web-scraping/web-scraping.module';

@Module({
  imports: [CacheManagerModule,WebScrapingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
