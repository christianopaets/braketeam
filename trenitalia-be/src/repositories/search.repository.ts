import {Observable, of} from 'rxjs';
import {catchError, delayWhen, filter, map, switchMap, tap} from 'rxjs/operators';
import {HttpController} from '../controllers/http.controller';
import {ISearchPayload} from '../interfaces/search/search-payload.interface';
import {SearchService} from '../services/search.service';
import {Service} from 'typedi';
import {Repository} from 'typeorm';
import {RepositoryInstance} from '../decorators/repository.decorator';
import {Search} from '../entity/search/Search';
import {fromPromise} from 'rxjs/internal-compatibility';
import {TSearchStatus} from '../enums/search-status.enum';
import {ILefrecceSearchResult} from '../interfaces/search/results/lefrecce-search-result.interface';
import {SearchResultRepository} from './search-result.repository';
import {SearchResult} from '../entity/search/SearchResult';

@Service()
export class SearchRepository {

  @RepositoryInstance(Search)
  searchRepository: Repository<Search>;

  @RepositoryInstance(SearchResult)
  searchResult: Repository<SearchResult>;

  constructor(private readonly httpController: HttpController,
              private readonly searchService: SearchService,
              private readonly searchResultRepository: SearchResultRepository) {
  }

  startSearch(searchParams: ISearchPayload, searchId: string, offset: number = 0): void {
    of(this.searchService.createParams(searchParams, offset))
      .pipe(switchMap((params) => this.httpController.get<ILefrecceSearchResult[]>(`solutions?${params}`)))
      .pipe(map(res => this.searchResultRepository.transform(res)))
      .pipe(delayWhen(res => fromPromise(this.searchResult.save(res))))
      .pipe(delayWhen(res => !this._checkStatus(res, offset) ? this._refreshStatus(searchId, TSearchStatus.Complete) : of()))
      .pipe(map(res => this._checkStatus(res, offset) ? this.startSearch(searchParams, searchId, offset += 5) : null))
      .pipe(catchError(() => this._refreshStatus(searchId, TSearchStatus.Failed)))
      .subscribe();
  }

  protected _checkStatus(data: SearchResult[], offset: number): boolean {
    return data.length === 5 && offset <= 5;
  }

  protected _refreshStatus(searchId: string, status: TSearchStatus): Observable<Search> {
    return fromPromise(this.searchRepository.findOne(searchId, {
      relations: ['status']
    }))
      .pipe(switchMap(value => {
        value.status.status = status;
        return fromPromise(this.searchRepository.save(value));
      }));
  }
}
