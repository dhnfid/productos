import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  products: Product[] = [];

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {

    this.http.get<Product[]>('/api/products')
      .subscribe(products => {

        console.log('PRODUCTOS RECIBIDOS:', products.length);

        this.products = products;

        this.cdr.detectChanges();

        console.log('ARRAY DEL COMPONENTE:', this.products.length);
        console.log('PRIMER PRODUCTO:', this.products[0]?.name);

      });
  }

  mostrar(): void {
    console.log('BOTÓN:', this.products.length);
  }
}









// import { Component, signal } from '@angular/core';
// import { RouterOutlet } from '@angular/router';

// @Component({
//   selector: 'app-root',
//   imports: [RouterOutlet],
//   templateUrl: './app.html',
//   styleUrl: './app.css'
// })
// export class App {
//   protected readonly title = signal('frontend');
// }
