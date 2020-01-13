import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {SearchPage} from './search.page';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: SearchPage,
      },
      {
        path: ':id',
        loadChildren: () => import('./containers/results/results.module').then(m => m.ResultsPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchPageRoutingModule {
}
