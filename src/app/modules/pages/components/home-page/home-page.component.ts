import { PublicService } from './../../../../services/public.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  isLoading: boolean = false;

  sortList: any = [
    { id: 1, name: 'Price' },
    { id: 2, name: 'Cost' },
    { id: 3, name: 'Amount' },
    { id: 4, name: 'Sale' },
  ];

  productsList: any = [
    {
      id: 1,
      image: 'assets/image/products/pro1.svg',
      title: 'Vintage Typewriter to post awesome stories about UI design and webdev.',
      price: '$49.25',
      price_range: '100 → 300',
      category: 'Electronics',
      desc: 'Eligible for Shipping To Mars or somewhere else',
      rate: 4.99,
      isWatched: false
    },
    {
      id: 2,
      image: 'assets/image/products/pro2.svg',
      title: 'Vintage Typewriter to post awesome stories about UI design and webdev.',
      price: '$1.25',
      price_range: '50 → 100',
      category: 'Top Rated',
      desc: 'Eligible for Shipping To Mars or somewhere else',
      rate: 2.99,
      isWatched: false
    },
    {
      id: 5,
      image: 'assets/image/products/pro5.svg',
      title: 'Vintage Typewriter to post awesome stories about UI design and webdev.',
      price: '$49.25',
      price_range: '400 → 500',
      category: 'Business and Industrial',
      desc: 'Eligible for Shipping To Mars or somewhere else',
      rate: 4.99,
      isWatched: false
    },
    {
      id: 6,
      image: 'assets/image/products/pro6.svg',
      title: 'Vintage Typewriter to post awesome stories about UI design and webdev.',
      price: '$1.25',
      price_range: '50 → 100',
      category: 'Business and Industrial',
      desc: 'Eligible for Shipping To Mars or somewhere else',
      rate: 2.99,
      isWatched: false
    },
    {
      id: 7,
      image: 'assets/image/products/pro7.svg',
      title: 'Vintage Typewriter to post awesome stories about UI design and webdev.',
      price: '$1.25',
      price_range: '50 → 100',
      category: 'Business and Industrial',
      desc: 'Eligible for Shipping To Mars or somewhere else',
      rate: 2.99,
      isWatched: false
    },
    {
      id: 8,
      image: 'assets/image/products/pro8.svg',
      title: 'Vintage Typewriter to post awesome stories about UI design and webdev.',
      price: '$1.25',
      price_range: '800 → 900',
      category: 'Most Liked',
      desc: 'Eligible for Shipping To Mars or somewhere else',
      rate: 2.99,
      isWatched: false
    },
    {
      id: 9,
      image: 'assets/image/products/pro4.svg',
      title: 'Vintage Typewriter to post awesome stories about UI design and webdev.',
      price: '$1.25',
      price_range: '700 → 800',
      category: 'Most Rated',
      desc: 'Eligible for Shipping To Mars or somewhere else',
      rate: 2.99,
      isWatched: false
    },
    {
      id: 10,
      image: 'assets/image/products/pro5.svg',
      title: 'Vintage Typewriter to post awesome stories about UI design and webdev.',
      price: '$49.25',
      price_range: '500 → 600',
      category: 'Cell Phones & Smartphones',
      desc: 'Eligible for Shipping To Mars or somewhere else',
      rate: 4.99,
      isWatched: false
    }
  ];

  filteredItems: any = [];
  categoriesItem: any = [];
  pricesItems: any = [];

  constructor(
    public publicService: PublicService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.filteredItems = this.productsList;
    this.getAvaliableCtegories();
    this.getAvaliablePricesRange();
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);

    //Apply filter function on list
    this.publicService.searchValue.subscribe((res: any) => {
      const filterValue = res.toLowerCase();
      let arr: any = [];
      this.filteredItems.forEach((element: any) => {
        if (element?.title?.toLowerCase().includes(filterValue)) {
          arr.push(element);
        }
      });
    });
  }

  //Get avaliable ctegories from products list
  getAvaliableCtegories(): void {
    let allCategories: any = [];
    for (let index = 0; index < this.filteredItems?.length; index++) {
      const category = this.filteredItems[index]['category'];
      allCategories.push(category);
    }
    let uniqueCategories = this.removeDuplicate(allCategories);
    uniqueCategories?.forEach((cat: any, index: any) => {
      this.categoriesItem?.push(
        {
          id: index + 1,
          name: cat,
          checked: false
        }
      );
    });
  }

  //Get avaliable prices range from products list
  getAvaliablePricesRange(): void {
    let allPrices: any = [];
    for (let index = 0; index < this.filteredItems?.length; index++) {
      const categoty = this.filteredItems[index]['price_range'];
      allPrices.push(categoty);
    }
    let uniquePrices = this.removeDuplicate(allPrices);
    uniquePrices?.forEach((price: any, index: any) => {
      this.pricesItems?.push(
        {
          id: index + 1,
          name: price,
          checked: false
        }
      );
    });
  }

  //Filter Products according checked element
  filterProducts(): void {
    let checkedCategories: any = [];
    this.categoriesItem?.forEach((element: any) => {
      if (element['checked'] == true) {
        checkedCategories?.push(element['name']);
      }
    });
    let checkedPrices: any = [];
    this.pricesItems?.forEach((element: any) => {
      if (element['checked'] == true) {
        checkedPrices?.push(element['name']);
      }
    });

    if (checkedCategories?.length > 0 || checkedPrices?.length > 0) {
      this.filteredItems = [];
    } else {
      this.filteredItems = this.productsList;
    }

    checkedCategories?.forEach((cat: any) => {
      this.productsList?.forEach((el: any) => {
        if (cat == el['category']) {
          this.filteredItems?.push(el);
        }
      });
    });

    checkedPrices?.forEach((cat: any) => {
      this.productsList?.forEach((el: any) => {
        if (cat == el['price_range']) {
          this.filteredItems?.push(el);
        }
      });
    });

    this.filteredItems = this.getUniqueListBy(this.filteredItems, 'id')
    this.cdr.detectChanges();
  }

  setProductInfo(data: any): any {
    this.publicService.productInfo.next(data);
  }


  //Helper Functions 'remove duplications for array value'
  removeDuplicate = <T, _>(arr: T[]): T[] => arr.filter((i) => arr.indexOf(i) === arr.lastIndexOf(i));

  getUniqueListBy(arr: any, key: any) {
    return [...new Map(arr.map((item: any) => [item[key], item])).values()]
  }


}
