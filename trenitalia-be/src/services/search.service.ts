import {ISearchPayload} from '../interfaces/search/search-payload.interface';
import {ILefrecceSearchParams} from '../interfaces/search/lefrecce-search-params.interface';
import moment from 'moment';
import {Service} from 'typedi';

@Service()
export class SearchService {

  createParamsObject(params: ISearchPayload): Partial<ILefrecceSearchParams> {
    return {
      origin: params.from,
      destination: params.to,
      adate: moment(params.date, 'YYYY-MM-DDTHH:mmZ').format('DD/MM/YYYY'),
      atime: moment(params.date, 'YYYY-MM-DDTHH:mmZ').format('HH'),
      adultno: `${params.passengers.adults}`,
      childno: `${params.passengers.children}`,
      arflag: 'A',
      direction: 'A'
    };
  }

  createParams(params: ISearchPayload, offset: number = null): string {
    const urlParams = new URLSearchParams(this.createParamsObject(params));
    if (offset) {
      urlParams.append('offset', `${offset}`);
    }
    return urlParams.toString();
  }
}
