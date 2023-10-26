import { Component } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent {
  products : Array<Product>
  formProduct: FormGroup
  display: boolean

  constructor(private fb: FormBuilder,
              private pService: ProductService){

    this.products = new Array<Product>()
    this.display = false
    this.formProduct = fb.group({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
    })
  }

  // GUARDAR UN PRODUCTO EN LA BASE DE DATOS.
  saveProduct() {
    if(this.formProduct.valid) {
      let product = new Product()
      product.name = this.formProduct.get('name')?.value
      product.description = this.formProduct.get('description')?.value
      product.amount = this.formProduct.get('amount')?.value
      product.price = this.formProduct.get('price')?.value
      product.image = this.formProduct.get('image')?.value

      this.pService.saveProduct(product).subscribe(res => {
        this.getProducts()
        this.formProduct.reset()
      })
    }
  }

  // OBTENER PRODUCTOS DESDE LA BASE DE DATOS.
  getProducts(){
    this.pService.getProducts().subscribe(res =>{
      this.products = res
    })
  }

  // ACTUALIZA LOS DATOS DE UN PRODUCTO.
  updateProduct(){
    if(this.formProduct.valid) {
      let product = new Product()
      product.name = this.formProduct.get('name')?.value
      product.description = this.formProduct.get('description')?.value
      product.amount = this.formProduct.get('amount')?.value
      product.price = this.formProduct.get('price')?.value
      product.image = this.formProduct.get('image')?.value

      this.pService.updateProduct(product).subscribe(res => {
        this.getProducts()
        this.formProduct.reset()
        this.display = !this.display
      })
    }
  }

  // BORRAR UN PRODUCTO DE LA BASE DE DATOS.
  deleteProduct(id: number) {
    this.pService.deleteProduct(id).subscribe(res => {
      this.getProducts()
    })
  }

  // ACTIVA EL DIALOGO
  activator(product: Product){
    this.formProduct.get('name')?.setValue(product.name)
    this.formProduct.get('description')?.setValue(product.description)
    this.formProduct.get('amount')?.setValue(product.amount)
    this.formProduct.get('image')?.setValue(product.image)
    this.display = !this.display
  }
}