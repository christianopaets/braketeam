import {Service} from 'typedi';
import {ILefrecceSearchResult} from '../interfaces/search/results/lefrecce-search-result.interface';
import {SearchResult} from '../entity/search/SearchResult';
import {TDirection} from '../enums/direction.enum';
import {ILefrecceSearchResultTrain} from '../interfaces/search/results/lefrecce-search-result-train.interface';
import {SearchResultChange} from '../entity/search/SearchResultChange';

@Service()
export class SearchResultRepository {

  transform(result: ILefrecceSearchResult): SearchResult;
  transform(results: ILefrecceSearchResult[]): SearchResult[];
  transform(args: ILefrecceSearchResult | ILefrecceSearchResult[]) {
    if (!Array.isArray(args)) {
      return this._transformResult(args);
    }
    return args.map(result => this._transformResult(result));
  }

  protected _transformResult(result: ILefrecceSearchResult): SearchResult {
    const searchResult = new SearchResult();
    searchResult.origin = result.origin;
    searchResult.destination = result.destination;
    searchResult.direction = TDirection.OneWay;
    searchResult.departureTime = result.departuretime;
    searchResult.arrivalTime = result.arrivaltime;
    searchResult.minPrice = result.minprice;
    searchResult.duration = result.duration;
    searchResult.changesNumber = result.changesno;
    searchResult.bookable = result.bookable;
    searchResult.saleable = result.saleable;
    searchResult.onlyCustom = result.onlycustom;
    searchResult.showSeat = result.showSeat;
    searchResult.changes = this._transformChanges(result.trainlist);
    return searchResult;
  }


  protected _transformChanges(changes: ILefrecceSearchResultTrain[]): SearchResultChange[] {
    return changes.map(change => {
      const searchResultChange = new SearchResultChange();
      searchResultChange.priceType = change.pricetype;
      searchResultChange.trainAcronym = change.trainacronym;
      searchResultChange.trainIdentifier = change.trainidentifier;
      searchResultChange.trainType = change.traintype;
      return searchResultChange;
    });
  }
}
