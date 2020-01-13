import {Get, HeaderParams, JsonController, QueryParam} from 'routing-controllers';
import {HttpController} from './http.controller';
import {HttpClient} from '../decorators/http.decorator';
import {of} from 'rxjs';
import {Repository} from 'typeorm';
import {Station} from '../entity/Station';
import {RepositoryInstance} from '../decorators/repository.decorator';

@JsonController('/locations')
export class LocationsController {

  @HttpClient()
  private readonly _httpController: HttpController;

  @RepositoryInstance(Station)
  private readonly _stationsRepository: Repository<Station>;

  @Get()
  getLocation(@QueryParam('location') location: string, @QueryParam('limit') limit: number = 5): Promise<Station[]> {
    if (!/^[a-zA-Z\s]+$/.test(location)) {
      return of([]).toPromise();
    }
    return this._stationsRepository
      .createQueryBuilder('station')
      .where('station.stationName like :name', {name: `${location}%`})
      .orderBy('station.priority', 'DESC')
      .take(limit)
      .getMany();
  }

  @Get('/default')
  getDefaultLocation(@HeaderParams() headers: any): any {
    return headers;
  }
}
