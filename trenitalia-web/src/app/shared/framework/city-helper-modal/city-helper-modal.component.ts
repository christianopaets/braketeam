import {AfterViewInit, Component, Input, OnInit, ViewChild, ViewChildren} from '@angular/core';
import {IonSearchbar, ModalController} from '@ionic/angular';
import {debounceTime, filter} from 'rxjs/operators';
import {CityHelperStore} from './store/store/city-helper.store';
import {Observable} from 'rxjs';
import {IStation} from './interfaces/station.interface';
import {FormControl} from '@ng-stack/forms';

@Component({
  selector: 'ti-city-helper-modal',
  templateUrl: './city-helper-modal.component.html',
  styleUrls: ['./city-helper-modal.component.scss'],
})
export class CityHelperModalComponent implements OnInit, AfterViewInit {

  @Input()
  destination: FormControl<string>;

  @ViewChild('searchBar', {static: false})
  searchBar: IonSearchbar;

  searchText: FormControl<string> = new FormControl<string>('');

  readonly stations$: Observable<IStation[]> = this.cityHelperStore.select$('data');

  readonly loading$: Observable<boolean> = this.cityHelperStore.select$('loading')
    .pipe(debounceTime(300));

  constructor(private readonly modalCtrl: ModalController,
              private readonly cityHelperStore: CityHelperStore) {
  }

  ngOnInit(): void {
    this._subscribeToStreams();
    if (this.destination.value) {
      this.cityHelperStore.dispatch(new this.cityHelperStore.actions.Load(this.destination.value.split(' ')[0]));
    }
  }

  ngAfterViewInit(): void {
    this.searchBar.setFocus();
  }

  select(station: IStation): void {
    this.destination.patchValue(station.name);
    this.close();
  }

  close(): void {
    this.modalCtrl.dismiss();
  }

  private _subscribeToStreams(): void {
    this.searchText.valueChanges
      .pipe(debounceTime(200))
      .subscribe(val => this.cityHelperStore.dispatch(new this.cityHelperStore.actions.Load(val)));
  }

}
