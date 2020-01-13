/*
 * Copyright ©  2018 - 2050 Wenor Holdings Limited.
 *
 * All rights reserved.
 *
 * Email: super@wenortech.com
 *
 * Licensed under the proprietary license.
 *
 * The source code contained herein is, and remains the property of Wenor Holdings Limited.
 *
 * Dissemination, reproduction or other use of this code is strictly forbidden unless prior written permission
 * is obtained from Wenor Holdings Limited.
 *
 * This software is provided by the author “as is” and any express or implied warranties, including,
 * but not limited to, the implied warranties of MERCHANTABILITY and FITNESS FOR A PARTICULAR PURPOSE are disclaimed.
 * In no event shall the author be liable for any direct, indirect, incidental, special, exemplary,
 * or consequential damages (including, but not limited to, procurement of substitute goods or services,
 * loss of use, data, or profits, or business interruption) however caused and on any theory of liability,
 * whether in contract, strict liability, or tort (including negligence or otherwise)
 * arising in any way out of the use of this software, even if advised of the possibility of such damage.
 *
 * You should have received a copy of the Wenor Holdings Limited licence along with this program,
 * if not, write to the super@wenortech.com.
 *
 */

import {Injectable, NgZone} from '@angular/core';
import { Action, Store } from '@ngrx/store';
import {get} from 'lodash-es';
import {IStore} from './store.interface';
import {Observable} from 'rxjs';
import { distinctUntilChanged, filter, map, take, tap } from 'rxjs/operators';

@Injectable()
export abstract class BaseStore<B> implements IStore<B> {

  abstract actions;

  protected constructor (protected readonly store: Store<B>,
                         protected readonly zone: NgZone) {}

  abstract selectRoot$(): Observable<B>;

  select$<T extends keyof B>(arg1: T): Observable<B[T]>;
  select$<T extends keyof B, K extends keyof B[T]>(arg1: T, arg2: K): Observable<B[T][K]>;
  select$<T extends keyof B, K extends keyof B[T], Z extends keyof B[T][K]>(arg1: T, arg2: K, arg3: Z): Observable<B[T][K][Z]>;
  select$(...args: string[]) {
    return this.selectRoot$()
      .pipe(filter(Boolean))
      .pipe(map(value => get(value, args)))
      .pipe(distinctUntilChanged())
      .pipe(tap(() => this.zone.run(() => {})));
  }

  selectRoot(): B {
    let state: B;

    this.selectRoot$()
      .pipe(take(1))
      .subscribe(res => state = res);

    return state;
  }

  select<T extends keyof B>(arg1: T): B[T];
  select<T extends keyof B, K extends keyof B[T]>(arg1: T, arg2: K): B[T][K];
  select<T extends keyof B, K extends keyof B[T], Z extends keyof B[T][K]>(arg1: T, arg2: K, arg3: Z): B[T][K][Z];
  select(...args: string[]) {
    let state;

    this.selectRoot$()
      .pipe(map(value => get(value, args)))
      .pipe(take(1))
      .subscribe(res => state = res);

    return state;
  }

  dispatch(action: Action): void {
    this.zone.run(() => {
      this.store.dispatch(action);
    });
  }
}
