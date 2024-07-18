import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: true}})
export class Marks extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  userid: number;

  @property({
    type: 'number',
    required: true,
  })
  sub1: number;

  @property({
    type: 'number',
    required: true,
  })
  sub2: number;

  @property({
    type: 'number',
    required: true,
  })
  total: number;

  constructor(data?: Partial<Marks>) {
    super(data);
  }
}

export interface MarksRelations {
  // Define navigational properties here if needed
}

export type MarksWithRelations = Marks & MarksRelations;
