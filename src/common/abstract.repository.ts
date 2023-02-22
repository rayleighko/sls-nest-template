import {
  DeepPartial,
  DeleteResult,
  FindManyOptions,
  FindOptionsWhere,
  Repository,
  SelectQueryBuilder,
  UpdateResult
} from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

import { convertDateToUTC } from "~/utils/date";

import { AbstractEntity } from "./abstract.entity";
import { AbstractDto } from "./dto/Abstract.dto";
import { PageDto } from "./dto/Page.dto";
import { PageOptionsDto } from "./dto/PageOptions.dto";

export abstract class AbstractRepository<
  T extends AbstractEntity = AbstractEntity,
  U extends AbstractDto = AbstractDto
> extends Repository<T> {
  async createOne(e: DeepPartial<T>): Promise<T> {
    const created = this.create(e);
    const saved = await this.save(created);

    return saved;
  }
  async paginateAll<Options extends PageOptionsDto>(
    tbl: string,
    o: Options
  ): Promise<PageDto<U>> {
    const queryBuilder = this.createQueryBuilder(tbl).skip(o.skip).take(o.take);

    // ... common conditions

    return this.paginate(queryBuilder, o);
  }
  async findAll(o: FindManyOptions<T>): Promise<T[]> {
    return this.find(o);
  }
  async paginate<Options extends PageOptionsDto>(
    queryBuilder: SelectQueryBuilder<T>,
    o: Options
  ): Promise<PageDto<U>> {
    const [list, pageMetaDto] = await queryBuilder.paginate(o);

    return new PageDto<U>(<U[]>list.toDtos(), pageMetaDto);
  }
  async updateOne(
    where: FindOptionsWhere<T>,
    news: QueryDeepPartialEntity<T>
  ): Promise<UpdateResult> {
    const finded = await this.findOne({ where });

    return this.update(finded.id, {
      ...news,
      updatedAt: convertDateToUTC(new Date())
    });
  }
  deleteOne(o: FindOptionsWhere<T>): Promise<DeleteResult> {
    return this.delete(o);
  }
}
