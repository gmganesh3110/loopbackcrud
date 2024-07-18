import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Marks, MarksRelations} from '../models';

export class MarksRepository extends DefaultCrudRepository<
  Marks,
  typeof Marks.prototype.id,
  MarksRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Marks, dataSource);
  }
}
