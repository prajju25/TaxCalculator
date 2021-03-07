import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaxReportComponent } from './tax-report.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: '',
  component: TaxReportComponent
}];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TaxReportModule { }
