import {NgModule} from "@angular/core";
import {InputComponent} from "./input/input.component";
import {RadioComponent} from "./radio/radio.component";
import {RatingComponent} from "./rating/rating.component";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputFormControlComponent} from "./input-form-control/input-form-control.component";

@NgModule({
  declarations: [InputComponent, RadioComponent, RatingComponent, InputFormControlComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [  InputComponent, RadioComponent, RatingComponent, InputFormControlComponent,
              CommonModule, FormsModule, ReactiveFormsModule
            ],
})

export class SharedModule {

}
