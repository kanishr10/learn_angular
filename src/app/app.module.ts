import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from 'src/auth/auth.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { OutputComponent } from './components/output/output.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatGridListModule} from '@angular/material/grid-list';
import {HomeComponent } from './components/home/home.component';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {BrandFormComponent } from './brand/brand-form/brand-form.component';
import {BrandListComponent } from './brand/brand-list/brand-list.component';
import {ProductFormComponent } from './product/product-form/product-form.component';
import {ProductListComponent } from './product/product-list/product-list.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {FormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { FormComponent } from './training/sharing/form/form.component';
import { ListComponent } from './training/sharing/list/list.component';
import { OnchangeComponent } from './training/hooks/onchange/onchange.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatDialogModule } from '@angular/material/dialog';
import { ViewChildComponent } from './view-child/view-child.component';
import { HeaderTabComponent } from './header-tab/header-tab.component';
import {MatTreeModule} from '@angular/material/tree';
import { NgxBootstrapIconsModule , allIcons } from 'ngx-bootstrap-icons';
import { BagTransferComponent } from './bag-transfer/bag-transfer.component';
import { AddBagTransferComponent } from './add-bag-transfer/add-bag-transfer.component';
import { PopupBagTransferComponent } from './popup-bag-transfer/popup-bag-transfer.component';
import { SharedModule } from './shared.module';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeaderComponent,
    OutputComponent,
    HomeComponent,
    BrandFormComponent,
    BrandListComponent,
    ProductFormComponent,
    ProductListComponent,
    FormComponent,
    ListComponent,
    OnchangeComponent,
    ViewChildComponent,
    HeaderTabComponent,
    BagTransferComponent,
    AddBagTransferComponent,
    PopupBagTransferComponent,
  ],
  imports: [
    SharedModule,
    BrowserModule, HttpClientModule,MatTreeModule,
    AppRoutingModule,FormsModule,MatDialogModule,
    AuthModule, MatInputModule, MatTableModule,
    NgbModule,MatSelectModule,NgxMatSelectSearchModule,
    BrowserAnimationsModule,ReactiveFormsModule,NgxBootstrapIconsModule.pick(allIcons),
    MatSlideToggleModule,MatFormFieldModule, MatSortModule, MatPaginatorModule,
    MatGridListModule,MatListModule,MatButtonModule,
    MatToolbarModule, MatButtonModule, MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

export interface BreadcrumbList {
  name: string;
  routerLink: string;
}
