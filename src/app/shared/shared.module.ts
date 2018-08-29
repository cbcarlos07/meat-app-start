import {ModuleWithProviders, NgModule} from "@angular/core";
import {InputComponent} from "./input/input.component";
import {RadioComponent} from "./radio/radio.component";
import {RatingComponent} from "./rating/rating.component";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputFormControlComponent} from "./input-form-control/input-form-control.component";
import {ShoppingCartService} from "../restaurant-detail/shopping-cart/shopping-cart.service";
import {RestaurantsService} from "../restaurants/restaurant/restaurants.service";
import {OrderService} from "../order/order.service";
import { SnackbarComponent } from './messages/snackbar/snackbar.component';

@NgModule({
  declarations: [InputComponent, RadioComponent, RatingComponent, InputFormControlComponent, SnackbarComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [  InputComponent, RadioComponent, RatingComponent, InputFormControlComponent, SnackbarComponent,
              CommonModule, FormsModule, ReactiveFormsModule
            ],
})

export class SharedModule {
    static forRoot(): ModuleWithProviders{
      return {
        ngModule: SharedModule,
        providers: [ShoppingCartService, RestaurantsService, OrderService]
      }
    }
}
