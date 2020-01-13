import 'reflect-metadata';
import {createExpressServer, RoutingControllersOptions, useContainer} from 'routing-controllers';
import {fromPromise} from 'rxjs/internal-compatibility';
import {createConnection} from 'typeorm';
import {map} from 'rxjs/operators';
import {Container} from 'typedi';

useContainer(Container);

const expressConfig: RoutingControllersOptions = {
  controllers: [__dirname + '/controllers/*.js'],
  cors: {
    origin: '*'
  },
  validation: {
    forbidUnknownValues: true,
    validationError: {
      target: false,
      value: false
    }
  }
};

fromPromise(createConnection())
  .pipe(map(() => createExpressServer(expressConfig)))
  .subscribe(expressApp => expressApp.listen(3000));
