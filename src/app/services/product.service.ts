import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  globalRoute = 'http://localhost:8080/product/'

  constructor(private http: HttpClient) { }

  // GET PRODUCT
  getProducts() {
    return this.http.get<Product[]>(this.globalRoute + 'show')
  }

  // UPDATE PRODUCT
  updateProduct(product: Product){
    return this.http.post<Product>(this.globalRoute + 'update', product, {
      observe: 'response'
    })
  }

  // DELETE PRODUCT
  deleteProduct(id: number){
    return this.http.post<Boolean>(this.globalRoute + id, {
      observe: 'response'
    })
  }

  // CREATE PRODUCT
  saveProduct(product: Product){
    return this.http.post<Product>(this.globalRoute + 'save', product, {
      observe: 'response'
    })
  }
}
