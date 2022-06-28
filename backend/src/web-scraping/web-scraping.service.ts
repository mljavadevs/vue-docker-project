import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { load } from 'cheerio';
import { CacheManagerService } from 'src/cache-manager/cache-manager.service';
import { ONE_DAY_SECONDS } from 'src/constant/time.constant';
import { SetPageResponse } from 'src/pagination-service/set-responce.pagination-service';
import { WebScrapingSearchParamsDto } from './dto/search-params.dto';

@Injectable()
export class WebScrapingService {
  private readonly logger = new Logger(WebScrapingService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly cacheManagerService: CacheManagerService,
  ) {}

  /**
   *
   * @returns {Promise<string[]>}
   */
  async symptomsSearch(searchParams: WebScrapingSearchParamsDto) {
    this.logger.log('symptomsSearch called');

    this.logger.log('params: ');
    console.table(searchParams);

    // get the cache
    try {
      this.logger.log('get the cache');
      const scrapingCache = await this.cacheManagerService.get(
        'nhsinform-scraping-cache',
      );
      if (scrapingCache) {
        this.logger.log('cache found');

        // get the data thru the search
        const searchResults: string[] = this.findData(
          searchParams.search,
          scrapingCache,
        );
        this.logger.log('search results: from cache');
        return SetPageResponse.set<string>(searchResults, searchParams);
      }
      this.logger.log('cache not found');

      // get the data from the API
      this.logger.log('get the scraping data');
      const scrapingData: string[] = await this.getScrapingData();

      // set the cache
      this.logger.log('set the cache');
      await this.cacheManagerService.set(
        'nhsinform-scraping-cache',
        scrapingData,
        ONE_DAY_SECONDS,
      );

      // get the data thru the search
      const searchResults: string[] = this.findData(
        searchParams.search,
        scrapingData,
      );
      this.logger.log('search results: from API');
      return SetPageResponse.set<string>(searchResults, searchParams);
    } catch (e) {
      this.logger.error(e);
      return SetPageResponse.set<string>([], searchParams);
    }
  }

  private async getScrapingData() {
    this.logger.log('getScrapingData called');
    const symptomsList: string[] = [];

    const APIResponse = await this.httpService.axiosRef.get(
      'https://nhsinform.scot/symptoms-and-self-help/a-to-z',
    );
    this.logger.log('API response received');

    // convert the response to cheerio
    const $ = load(APIResponse.data);

    // find specific elements from cheerio
    const statsTable = $('a.nhs-uk__az-link');


    // get symptoms from the statsTable
    for (let index = 0; index < statsTable.length; index++) {
      const element = $(statsTable[index]).text().trim();
      symptomsList.push(element);
    }

    // get unique data
    const s = new Set<string>();
    symptomsList.forEach((x) => s.add(x));
    symptomsList.splice(0);
    s.forEach((value) => symptomsList.push(value));

    return symptomsList;
  }

  private findData(s: string, data: string[]) {
    this.logger.log('findData called');
    return data.filter((d) => d.toLowerCase().includes(s.toLowerCase()));
  }
}
