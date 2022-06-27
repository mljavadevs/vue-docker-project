import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CacheManagerModule } from 'src/cache-manager/cache-manager.module';
import { WebScrapingController } from './web-scraping.controller';
import { WebScrapingService } from './web-scraping.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
    CacheManagerModule,
  ],
  controllers: [WebScrapingController],
  providers: [WebScrapingService],
})
export class WebScrapingModule {}
