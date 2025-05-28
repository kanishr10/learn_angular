import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandFormComponent } from './brand/brand-form/brand-form.component';
import { BrandListComponent } from './brand/brand-list/brand-list.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductFormComponent } from './product/product-form/product-form.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"brand/add",component:BrandListComponent},
  {path: 'brand/:id', component: BrandListComponent}, 
  {path: 'product/:id', component: ProductListComponent},
  {path:"product/add",component:ProductListComponent},
  {path:"brand",component:BrandFormComponent},
  {path:"product",component:ProductFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
