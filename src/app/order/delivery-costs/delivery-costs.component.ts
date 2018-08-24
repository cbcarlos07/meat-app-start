import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'mt-delivery-costs',
  templateUrl: './delivery-costs.component.html',
  styles: []
})
export class DeliveryCostsComponent implements OnInit {
 @Input() delivery: number
 @Input() itemsValue: number
  constructor() { }

  ngOnInit() {
  }

  total(): number{
    return this.delivery + this.itemsValue
  }

}
