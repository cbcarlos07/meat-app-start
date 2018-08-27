import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {RadioOption} from "../../shared/radio/radio-option.model";
import {OrderService} from "../order.service";
import {Router} from "@angular/router";
import {CartItem} from "../../restaurant-detail/shopping-cart/cart-item.model";
import {Order, OrderItem} from "../order.model";

@Component({
  selector: 'mt-order-form-group',
  templateUrl: './order-form-group.component.html',
  styles: []
})
export class OrderFormGroupComponent implements OnInit {
  orderForm: FormGroup
  delivery = 8

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
      name: this.formBuilder.control(''),
      email: this.formBuilder.control(''),
      emailConfirmation: this.formBuilder.control(''),
      address: this.formBuilder.control(''),
      number: this.formBuilder.control(''),
      optionalAddress: this.formBuilder.control(''),
      paymentOption: this.formBuilder.control('')
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
  checkOrder(order: Order){
    order.orderItems = this.cartItems()
      .map((item: CartItem) => new OrderItem(item.quantity, item.menuItem.id))
    this.orderService.checkOrder(order)
      .subscribe((orderId: string) => {
        this.router.navigate(['/order-sumary'])
        console.log(`Compra concluída: ${orderId} `)
        this.orderService.clear()
      })
    console.log( order )
  }

}
