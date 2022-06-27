import { Optional } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDefined } from 'class-validator';
import { PageOptionsDto } from 'src/pagination-service/dto/page-options.dto';

export class WebScrapingSearchParamsDto extends PageOptionsDto {
  constructor() {
    super();
  }
  @Optional()
  @IsDefined()
  @ApiPropertyOptional()
  search: string;
}
