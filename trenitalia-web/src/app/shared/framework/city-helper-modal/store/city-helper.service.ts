import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IApiStation} from '../interfaces/api/api-station.interface';
import {environment} from '../../../../../environments/environment';
import {IStation} from '../interfaces/station.interface';

@Injectable()
export class CityHelperService {

  constructor(private readonly http: HttpClient) {
  }

  get(name: string): Observable<IApiStation[]> {
    return this.http.get<IApiStation[]>(`${environment.webserviceUrl}/locations?location=${name}&limit=20`);
  }

  transform(stations: IApiStation[]): IStation[] {
    return stations.map(station => {
      return {
        name: station.stationName
      };
    });
  }
}
