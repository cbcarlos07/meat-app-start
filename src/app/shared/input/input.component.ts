import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'mt-input-container',
  templateUrl: './input.component.html',
  styles: []
})
export class InputComponent implements OnInit {
  @Input() label: string
  @Input() errorMessage: string
  input: any


  constructor() { }

  ngOnInit() {
  }

}
