import { PublicService } from './../../../../../services/public.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  productDetails: any;
  counter: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private publicService: PublicService,
  ) { }

  ngOnInit(): void {
    this.publicService.productInfo.subscribe((res: any) => {
      if (res) {
        this.productDetails = res;
      }
    });
  }

  count(type: any): void {
    if (type == 'up') {
      this.counter += 1;
    }
    if (type == 'down') {
      this.counter >= 1 ? this.counter -= 1 : '';
    }
  }

}
