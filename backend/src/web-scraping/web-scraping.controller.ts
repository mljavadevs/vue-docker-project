import { Controller, Get, Logger, Query } from '@nestjs/common';
import { WebScrapingSearchParamsDto } from './dto/search-params.dto';
import { WebScrapingService } from './web-scraping.service';

@Controller()
export class WebScrapingController {
  private readonly logger = new Logger(WebScrapingController.name);

  constructor(private readonly webScrapingService: WebScrapingService) {}

  @Get('symptoms-search')
  async symptomsSearch(@Query() searchParams: WebScrapingSearchParamsDto) {
    this.logger.log('API call: symptoms-search');
    return await this.webScrapingService.symptomsSearch(searchParams);
  }
}
