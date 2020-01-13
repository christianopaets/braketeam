import {BadRequestError, Body, Get, JsonController, Param, Post, Res} from 'routing-controllers';
import {ISearchPayload} from '../interfaces/search/search-payload.interface';
import {SearchRepository} from '../repositories/search.repository';
import {SearchParams} from '../entity/search/SearchParams';
import {TSearchStatus} from '../enums/search-status.enum';
import {Search} from '../entity/search/Search';
import {RepositoryInstance} from '../decorators/repository.decorator';
import {Repository} from 'typeorm';
import {ISearchResponse} from '../interfaces/search/search-response.interface';
import {fromPromise} from 'rxjs/internal-compatibility';
import {map, tap} from 'rxjs/operators';
import {SearchStatus} from '../entity/search/SearchSatus';
import {Response} from 'express';

@JsonController('/search')
export class SearchController {

  @RepositoryInstance(SearchStatus)
  searchStatusRepository: Repository<SearchStatus>;

  @RepositoryInstance(SearchParams)
  searchParamsRepository: Repository<SearchParams>;

  @RepositoryInstance(Search)
  searchRepository: Repository<Search>;

  constructor(private readonly searchRepositoryService: SearchRepository) {
  }

  @Post('')
  startSearch(@Body({validate: true}) searchParams: ISearchPayload): Promise<ISearchResponse> {
    const search = new Search();
    search.params = new SearchParams(searchParams);
    search.status = new SearchStatus(TSearchStatus.Pending);

    return fromPromise(this.searchRepository.save(search))
      .pipe(tap(value => this.searchRepositoryService.startSearch(searchParams, value.id)))
      .pipe(map((value): ISearchResponse => {
        return {
          searchId: value.id
        };
      }))
      .toPromise();
  }

  @Get('/:id/status')
  getSearchStatus(@Param('id') id: string, @Res() res: Response): Promise<Response> {
    return fromPromise(this.searchRepository.findOne({id}, {
      relations: ['status']
    }))
      .pipe(map(search => {
        switch (search.status.status) {
          case TSearchStatus.Complete: return res.status(200).send();
          case TSearchStatus.Pending: return res.status(202).send();
          case TSearchStatus.Failed: throw new BadRequestError();
        }
      }))
      .toPromise();
  }
}
