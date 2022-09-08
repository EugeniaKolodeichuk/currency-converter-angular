import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ConverterService } from 'src/app/services/converter.service';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit {
  public currency$: Observable<any> | undefined;
  public products: any;
  public date: string | undefined;

  constructor(
    private converterService: ConverterService,
  ) { }

  ngOnInit(): void {
    
    this.loadProducts()
    console.log('init!')

   /*  console.log(this.converterService)
    console.log('on init works')
    console.log(this.converterService.getAll())
   this.converterService.getAll()
    .pipe(
      tap((value) => console.log('value1', value))
    ); */
  }

  
  private loadProducts() {
    this.converterService.getAll().subscribe(
      products => {
        this.products = products;
        this.date = products.date;
        console.log(products)
      }
    )

   /* return this.converterService.getAll()
      .pipe(
        tap(() => {console.log('yeeah!')})
    ); */
  }
}
