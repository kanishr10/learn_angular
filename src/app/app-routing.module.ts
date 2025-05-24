import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OutputComponent } from './output/output.component';
import { BrandComponent } from './brand/brand.component';
import { BrandListComponent } from './brand-list/brand-list.component';
import { OrderListComponent } from './order-list/order-list.component';
import { ProductListComponent } from './product-list/product-list.component';
import { OrderComponent } from './order/order.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  {path:"",component:OutputComponent},
  {path:"brand-form",component:BrandListComponent},
  {path:"order-list",component:OrderListComponent},
  {path:"product-list",component:ProductListComponent},
  {path:"brand",component:BrandComponent},
  {path:"order",component:OrderComponent},
  {path:"product",component:ProductComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
