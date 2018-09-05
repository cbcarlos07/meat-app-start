import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { OrderFormGroupComponent } from "./order-form-group/order-form-group.component";

export class LeaveOrderGuard implements CanDeactivate<OrderFormGroupComponent>{

    canDeactivate(orderComponent: OrderFormGroupComponent, 
                  activatedRouteSnapshot: ActivatedRouteSnapshot,
                  routerState: RouterStateSnapshot): boolean {
        if( !orderComponent.isOrderCompleted() ){        
            return window.confirm('Deseja realmente desistir da compra? ')    
        }else{
            return true
        }                

    }

}