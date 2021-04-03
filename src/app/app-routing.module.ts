import { NgModule, ɵgetLocaleCurrencyCode } from '@angular/core';
import { Routes, RouterModule, PreloadingStrategy, PreloadAllModules } from '@angular/router';
import { AuthorizeGuard } from './guard/authorize.guard';

const routes: Routes = [{
  path: '',
  redirectTo: '/user',
  pathMatch: 'full'
},{
  path: 'user',
  loadChildren: () => import('./modules/user-detail/user-detail.module').then(m => m.UserDetailModule)
},{
  path: 'taxcalculator',
  loadChildren: () => import('./modules/tax-calculator/tax-calculator.module').then(m => m.TaxCalculatorModule),
  canActivate: [AuthorizeGuard]
},{
  path: 'taxreport',
  loadChildren: () => import('./modules/tax-report/tax-report.module').then(m => m.TaxReportModule),
  canActivate: [AuthorizeGuard]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes,{preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
