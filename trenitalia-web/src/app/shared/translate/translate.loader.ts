import {HttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {environment} from '../../../environments/environment';

export function translateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, `${environment.webserviceUrl}/dictionaries/translates/web/`, '');
}
