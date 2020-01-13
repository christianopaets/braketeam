import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./containers/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: ':id',
    loadChildren: () => import('./containers/search/containers/results/results.module').then( m => m.ResultsPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
