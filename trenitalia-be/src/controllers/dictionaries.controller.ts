import {BadRequestError, Get, JsonController, Param} from 'routing-controllers';
import {Station} from '../entity/Station';
import {getConnection, Repository} from 'typeorm';
import {TApplication} from '../interfaces/dictionaries/application.type';
import {TLanguage} from '../interfaces/dictionaries/language.type';
import webIt from '../dictionaries/translates/web/it.json';
import webEn from '../dictionaries/translates/web/en.json';
import {RepositoryInstance} from '../decorators/repository.decorator';

@JsonController('/dictionaries')
export class DictionariesController {

  @RepositoryInstance(Station)
  private readonly _stationRepository: Repository<Station>;

  private readonly _langs: Map<TApplication, any> = new Map([
    [TApplication.Web, {
      [TLanguage.Italian]: webIt,
      [TLanguage.English]: webEn
    }]
  ]);

  @Get('/locations')
  addLocations() {
    return 200;
    // return fromPromise(axios.get('https://www.trenitalia.com/content/dam/tcom/config/stationList.json', {
    //   timeout: 4000
    // }))
    //   .pipe(map((res: AxiosResponse<DictionaryLocationItem[]>) => res.data))
    //   .pipe(map((res: DictionaryLocationItem[]): Station[] => res.map(value => {
    //     const name = Object.keys(value)[0];
    //     const priority = value[name].isF;
    //     return new Station(name, priority)
    //   })))
    //   .pipe(map(stations => this._stationRepository.save(stations)))
    //   .pipe(catchError(() => {throw new BadRequestError()}))
    //   .pipe(map(() => 200))
    //   .toPromise();
  }

  @Get('/translates/:app/:lang')
  getTranslates(@Param('app') app: TApplication, @Param('lang') lang: TLanguage): any {
    if (!this._checkApp(app) && !this._checkLanguage(lang)) {
      throw new BadRequestError();
    }
    return this._langs.get(app)[lang];
  }

  protected _checkApp(app: TApplication): boolean {
     return app === TApplication.Web;
  }

  protected _checkLanguage(lang: TLanguage): boolean {
    return lang === TLanguage.English || lang === TLanguage.Italian;
  }
}
