import { Component, OnInit } from '@angular/core';
import {RadioOption} from "../shared/radio/radio-option.model";
import {OrderService} from "./order.service";
import {CartItem} from "../restaurant-detail/shopping-cart/cart-item.model";
import {Order, OrderItem} from './order.model';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup} from "@angular/forms";
import 'rxjs/add/operator/do'
@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html',
  styles: []
})
export class OrderComponent implements OnInit {
  orderForm: FormGroup
  delivery = 8
  orderId: string 

  paymentOptions: RadioOption[] = [
    {label: 'Dinheiro', value: 'MON'},
    {label: 'Cartão de Débito', value: 'DEB'},
    {label: 'Cartão Refeição', value: 'REF'}
  ]
  constructor(private orderService: OrderService,
              private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.orderForm = this.formBuilder.group({

    })
  }
  itemsValue(): number{
    return this.orderService.itemsValue()
  }
  cartItems(): CartItem[] {
    return this.orderService.cartItems()
  }

  increaseQty(item: CartItem){
    this.orderService.increaseQty(item)
  }
  decreaseQuty(item: CartItem){
    this.orderService.decreaseQty(item)
  }

  remove(item: CartItem){
    this.orderService.remove(item)
  }
  isOrderCompleted(): boolean {
    console.log('isOrderCompleted OrderComponent')
    return this.orderId !== undefined 
 }
   checkOrder(order: Order){
     order.orderItems = this.cartItems()
                            .map((item: CartItem) => new OrderItem(item.quantity, item.menuItem.id))
     this.orderService.checkOrder(order)
                      .do((orderId: string )=>{
                        this.orderId = orderId
                      })
                      .subscribe((orderId: string) => {
                          this.router.navigate(['/order-sumary'])
                          console.log(`Compra concluída: ${orderId} `)
                          this.orderService.clear()
                      })
     console.log( order )
   }
}
