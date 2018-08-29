import {NgModule} from "@angular/core";
import {OrderComponent} from "./order.component";
import {OrderItemsComponent} from "./order-items/order-items.component";
import {DeliveryCostsComponent} from "./delivery-costs/delivery-costs.component";
import {SharedModule} from "../shared/shared.module";
import {RouterModule, Routes} from "@angular/router";
import {OrderFormGroupComponent} from "./order-form-group/order-form-group.component";

const ROUTES: Routes = [
  {path: '', component: OrderFormGroupComponent}
]

@NgModule({
  declarations: [OrderComponent, OrderItemsComponent, DeliveryCostsComponent, OrderFormGroupComponent],
  imports: [SharedModule, RouterModule.forChild(ROUTES)]
})
export class OrderModule {
  
}