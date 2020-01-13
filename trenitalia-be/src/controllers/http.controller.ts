import {Observable} from 'rxjs';
import axios, {AxiosResponse} from 'axios';
import {fromPromise} from 'rxjs/internal-compatibility';
import {map} from 'rxjs/operators';

export class HttpController {

  private readonly _axios = axios.create({
    baseURL: 'https://www.lefrecce.it/msite/api'
  });

  get<T = any>(url: string): Observable<T> {
    return fromPromise(this._axios.get(url))
      .pipe(map((res: AxiosResponse<T>) => res.data));
  }
}
