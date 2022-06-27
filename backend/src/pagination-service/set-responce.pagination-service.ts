import { PageMetaDto } from './dto/page-meta.dto';
import { PageOptionsDto } from './dto/page-options.dto';
import { PageDto } from './dto/page.dto';

export class SetPageResponse {
  static set<T>(rawData: T[], meta: PageOptionsDto) {
    const rawDataLength = rawData.length;
    const data: T[] = [];
    for (
      let index = meta.page * meta.size - meta.size;
      index < Math.min(meta.page * meta.size, rawDataLength);
      index++
    ) {
      data.push(rawData[index]);
    }

    const pageMetaDto = new PageMetaDto({
      itemCount: rawDataLength,
      pageOptionsDto: meta,
    });

    return new PageDto<T>(data, pageMetaDto);
  }
}
