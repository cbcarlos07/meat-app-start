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
import {NotificationService} from "./messages/notification.service";
import {LoginService} from '../security/login/login.service';
import {LoggedInGuard} from "../security/loggedIn.guard";
import { LeaveOrderGuard } from "../order/leave-order.guard";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "../security/auth.interceptor";

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
        providers: [ShoppingCartService,
                    RestaurantsService,
                    OrderService,
                    NotificationService,
                    LoginService,
                    LoggedInGuard,
                    LeaveOrderGuard,
                    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}]
      }
    }
}
