import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RadioOption} from '../../shared/radio/radio-option.model';
import {OrderService} from '../order.service';
import {Router} from '@angular/router';
import {CartItem} from '../../restaurant-detail/shopping-cart/cart-item.model';
import {Order, OrderItem} from '../order.model';
import 'rxjs/add/operator/do'
@Component({
  selector: 'mt-order-form-group',
  templateUrl: './order-form-group.component.html',
  styles: []
})
export class OrderFormGroupComponent implements OnInit {
  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  numberPattern = /^[0-9]*$/
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
      name: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      email: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      emailConfirmation: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      address: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      number: this.formBuilder.control('', [Validators.required, Validators.pattern(this.numberPattern)]),
      optionalAddress: this.formBuilder.control(''),
      paymentOption: this.formBuilder.control('', [Validators.required])
    }, {validator: OrderFormGroupComponent.equalsTo })
  }
  static equalsTo(group: AbstractControl): { [key: string]: boolean }{
     const email = group.get('email')
     const emailConfirmation = group.get('emailConfirmation')
     if ( !email || !emailConfirmation ){
       return undefined
     }
     if ( email.value !== emailConfirmation.value ){
       return {emailsNotMatch: true}
     }
     return undefined
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
    console.log('isOrderCompleted - OrderFormGroupComponent')
     return this.orderId !== undefined
  }

  checkOrder(order: Order){
    order.orderItems = this.cartItems()
      .map((item: CartItem) => new OrderItem(item.quantity, item.menuItem.id))

    this.orderService.checkOrder(order)
      .do((orderId: string) => {
        this.orderId = orderId
      })
      .subscribe((orderId: string) => {
        this.router.navigate(['/order-sumary'])
        console.log(`Compra concluída: ${orderId} `)
        this.orderService.clear()
      })

  }

}
