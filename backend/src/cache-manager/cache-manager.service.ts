import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';
@Injectable()
export class CacheManagerService {
  private readonly logger = new Logger(CacheManagerService.name);

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  /**
   *
   * @param key key of the cache
   * @returns void
   */
  async get(key: string): Promise<any> {
    this.logger.log(`Getting cache ${key}`);
    return this.cacheManager.get(key);
  }

  /**
   *
   * @param key key of the cache
   * @param value value of the cache
   * @param ttl time to live of the cache in seconds (default: 6000)
   * @returns void
   */
  async set(key: string, value: any, ttl: number = 6000): Promise<void> {
    this.logger.verbose(`Setting cache ${key} with ttl ${ttl}`);
    return this.cacheManager.set(key, value, { ttl: ttl });
  }
}
