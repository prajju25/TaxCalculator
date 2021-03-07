import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaxCalculatorComponent } from './modules/tax-calculator/tax-calculator.component';

import { TabViewModule } from 'primeng/tabview';
import {ButtonModule} from 'primeng/button';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {DropdownModule} from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import {InputTextModule} from 'primeng/inputtext';
import { TaxReportComponent } from './modules/tax-report/tax-report.component';
import { UserDetailComponent } from './modules/user-detail/user-detail.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TaxCalculatorComponent,
    TaxReportComponent,
    UserDetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    TabViewModule,
    ButtonModule,
    OverlayPanelModule,
    DropdownModule,
    TagModule,
    InputTextModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
