import {ShoppingCartService} from '../restaurant-detail/shopping-cart/shopping-cart.service';
import {Injectable} from '@angular/core';
import {CartItem} from '../restaurant-detail/shopping-cart/cart-item.model';
import {Order} from './order.model';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map'

import {MEAT_API} from '../app.api';
import {HttpClient} from "@angular/common/http";


@Injectable()
export class OrderService {
  constructor(private cartService: ShoppingCartService,
              private http: HttpClient) {}
  cartItems(): CartItem[] {
    return this.cartService.items
  }

  itemsValue(): number {
    return this.cartService.total()
  }

  increaseQty(item: CartItem) {
    this.cartService.increaseQty(item)
  }
  decreaseQty(item: CartItem ) {
    this.cartService.decreaseQty(item)
  }
  remove(item: CartItem) {
    this.cartService.removeItem(item)
  }
  clear(){
    this.cartService.clear()
  }
  checkOrder(order: Order): Observable<string> {

    return this.http.post<Order>(`${MEAT_API}/orders`, order)
                      .map(order => order.id)
  }
}
