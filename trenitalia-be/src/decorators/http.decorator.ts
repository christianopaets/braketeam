import {HttpController} from '../controllers/http.controller';

export function HttpClient() {
  return function(target: Object, propertyName: string) {
    const val = new HttpController();
    Object.defineProperty(target, propertyName, {
      get: function() {
        return val;
      }
    });
  };
}
