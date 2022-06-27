import { CacheModule, Module } from '@nestjs/common';
import { CacheManagerService } from './cache-manager.service';

@Module({
  imports: [
    // for cache service
    CacheModule.register(),
  ],
  controllers: [],
  providers: [CacheManagerService],
  exports: [CacheManagerService],
})
export class CacheManagerModule {}
