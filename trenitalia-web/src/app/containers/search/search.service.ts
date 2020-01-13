import {Injectable} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@ng-stack/forms';
import {IPassengersPayload, ISearchPayload} from './interfaces/search-payload.interface';
import {config} from '@shared/config';
import {TTripType} from './enum/trip-type.enum';

@Injectable()
export class SearchService {

  constructor(private readonly fb: FormBuilder) {
  }

  getSearchForm(): FormGroup<ISearchPayload> {
    return this.fb.group<ISearchPayload>({
      from: [''],
      to: [''],
      dateFrom: [config.departureDate],
      passengers: this.fb.group({
        adults: [1],
        children: [0]
      }),
      tripType: [TTripType.OneWay]
    });
  }
}
