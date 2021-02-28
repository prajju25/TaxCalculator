import { NgModule, ɵgetLocaleCurrencyCode } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
  path: '',
  redirectTo: '/taxCalculator',
  pathMatch: 'full'
},{
  path: 'taxCalculator',
  loadChildren: () => import('./modules/tax-calculator/tax-calculator.module').then(m => m.TaxCalculatorModule)
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
