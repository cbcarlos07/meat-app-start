import { Component, OnInit } from '@angular/core';
import {RestaurantsService} from "../restaurants/restaurant/restaurants.service";
import {Restaurant} from "../restaurants/restaurant/restaurant.model";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'mt-restaurant-detail',
  templateUrl: './restaurant-detail.component.html'
})
export class RestaurantDetailComponent implements OnInit {

  restaurant: Restaurant
  constructor( private restaurantService: RestaurantsService,
               private route: ActivatedRoute) { }

  ngOnInit() {
    /*
    o id do params é o parametro definido na roda do arquivo app.routes.ts
     {path: 'restaurants/:id', component: RestaurantDetailComponent},
     */
    this.restaurantService.restaurantById(this.route.snapshot.params['id'])
        .subscribe(restaurant => this.restaurant = restaurant)
  }

}
