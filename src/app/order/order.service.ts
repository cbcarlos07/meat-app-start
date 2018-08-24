import {ShoppingCartService} from "../restaurant-detail/shopping-cart/shopping-cart.service";
import {Injectable} from "@angular/core";
import {CartItem} from "../restaurant-detail/shopping-cart/cart-item.model";
@Injectable()
export class OrderService {
  constructor(private cartService: ShoppingCartService){}
  cartItems(): CartItem[]{
    return this.cartService.items
  }

  itemsValue(): number{
    return this.cartService.total()
  }

  increaseQty(item: CartItem){
    this.cartService.increaseQty(item)
  }
  decreaseQty(item: CartItem ){
    this.cartService.decreaseQty(item)
  }
  remove(item: CartItem){
    this.cartService.removeItem(item)
  }
}
