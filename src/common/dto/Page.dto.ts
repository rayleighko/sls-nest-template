import { AbstractDto } from "./Abstract.dto";
import { PageMetaDto } from "./PageMeta.dto";

export class PageDto<T extends AbstractDto = AbstractDto> {
  readonly data: T[];
  readonly meta: PageMetaDto;

  constructor(data: T[], meta: PageMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}
