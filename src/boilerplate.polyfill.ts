import "source-map-support/register";

import _ from "lodash";
import { Brackets, QueryBuilder, SelectQueryBuilder } from "typeorm";

import { AbstractEntity } from "~/common/abstract.entity";
import { AbstractDto } from "~/common/dto/Abstract.dto";
import { PageMetaDto } from "~/common/dto/PageMeta.dto";
import { PageOptionsDto } from "~/common/dto/PageOptions.dto";

declare global {
  interface Array<T = unknown> {
    toDtos<B extends AbstractDto = AbstractDto>(this: AbstractEntity<B>[]): B[];
  }
}

declare module "typeorm" {
  interface QueryBuilder<Entity> {
    searchByString(q: string, columnNames: string[]): this;
  }

  interface SelectQueryBuilder<Entity> {
    paginate(
      this: SelectQueryBuilder<Entity>,
      o: PageOptionsDto
    ): Promise<[Entity[], PageMetaDto]>;
  }
}

Array.prototype.toDtos = function <B extends AbstractDto>(options?: any): B[] {
  return _(this)
    .map(item => item.toDto(options))
    .compact()
    .value() as B[];
};

QueryBuilder.prototype.searchByString = function (q, columnNames) {
  this.andWhere(
    new Brackets(qb => {
      for (const item of columnNames) {
        qb.orWhere(`${item} ILIKE :q`);
      }
    })
  );

  this.setParameter("q", `%${q}%`);

  return this;
};

SelectQueryBuilder.prototype.paginate = async function <Entity>(
  this: SelectQueryBuilder<Entity>,
  o: PageOptionsDto
): Promise<[Entity[], PageMetaDto]> {
  const [items, itemCount] = await this.skip(o.skip)
    .take(o.take)
    .getManyAndCount();

  const pageMetaDto = new PageMetaDto({
    itemCount,
    pageOptionsDto: o
  });

  return [items, pageMetaDto];
};
