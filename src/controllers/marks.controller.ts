import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {Marks} from '../models';
import {MarksRepository} from '../repositories';

export class MarksController {
  constructor(
    @repository(MarksRepository)
    public marksRepository: MarksRepository,
  ) {}

  @post('/marks')
  @response(200, {
    description: 'Marks model instance',
    content: {'application/json': {schema: getModelSchemaRef(Marks)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Marks, {
            title: 'NewMarks',
            exclude: ['id'],
          }),
        },
      },
    })
    marks: Omit<Marks, 'id'>,
  ): Promise<Marks> {
    return this.marksRepository.create(marks);
  }

  @get('/marks/count')
  @response(200, {
    description: 'Marks model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(Marks) where?: Where<Marks>): Promise<Count> {
    return this.marksRepository.count(where);
  }

  @get('/marks')
  @response(200, {
    description: 'Array of Marks model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Marks, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(Marks) filter?: Filter<Marks>): Promise<Marks[]> {
    // Modify the filter to include related user details
    const modifiedFilter: Filter<Marks> = {
      ...filter,
      include: [{relation: 'user'}], // Include user relation
    };
    return this.marksRepository.find(modifiedFilter);
  }

  @patch('/marks')
  @response(200, {
    description: 'Marks PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Marks, {partial: true}),
        },
      },
    })
    marks: Marks,
    @param.where(Marks) where?: Where<Marks>,
  ): Promise<Count> {
    return this.marksRepository.updateAll(marks, where);
  }

  @get('/marks/{id}')
  @response(200, {
    description: 'Marks model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Marks, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Marks, {exclude: 'where'})
    filter?: FilterExcludingWhere<Marks>,
  ): Promise<Marks> {
    return this.marksRepository.findById(id, filter);
  }

  @patch('/marks/{id}')
  @response(204, {
    description: 'Marks PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Marks, {partial: true}),
        },
      },
    })
    marks: Marks,
  ): Promise<void> {
    await this.marksRepository.updateById(id, marks);
  }

  @put('/marks/{id}')
  @response(204, {
    description: 'Marks PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() marks: Marks,
  ): Promise<void> {
    await this.marksRepository.replaceById(id, marks);
  }

  @del('/marks/{id}')
  @response(204, {
    description: 'Marks DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.marksRepository.deleteById(id);
  }
}
