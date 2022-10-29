import { PublicService } from './../../../../services/public.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchValue: any = '';

  moduleType: any;
  searchPlaceholder: any;
  collapse: boolean = true;
  constructor(
    public publicService: PublicService,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
  }

  applySearch(event: Event): void {
    let applyFilter = (event.target as HTMLInputElement).value;
    this.publicService.searchValue.next(applyFilter);
    this.cdr.detectChanges();
  }
  clearSearch(): void {
    this.searchValue = '';
    this.cdr.detectChanges();
  }

}
