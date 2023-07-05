import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'purchase-order',
  },
  {
    path: 'purchase-order',
    loadChildren: () =>
      import('./pages/purchase-order/purchase-order.module').then((m) => m.PurchaseOrderModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
