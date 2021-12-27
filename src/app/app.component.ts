import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'finance-app';
  products:any[]=[];
  closeResult = '';
  formG!: FormGroup;

  constructor(private modalService: NgbModal) {}

  ngOnInit(){
    this.formG=new FormGroup({
      product:new FormControl(''),
      price:new FormControl(0),
      quantity:new FormControl(0),
    });
  }
  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  save(){
    this.products.push({
      product:this.formG.get('product')?.value,
      price:this.formG.get('price')?.value,
      quantity:this.formG.get('quantity')?.value,
      priceQuantity:this.formG.get('price')?.value*this.formG.get('quantity')?.value,
      prixTVA:(this.formG.get('price')?.value*this.formG.get('quantity')?.value)+(0.2*this.formG.get('price')?.value*this.formG.get('quantity')?.value)
    })
    this.clearAllFieldsFormForm()
    this.modalService.dismissAll();
  }
  total(){
    return this.products.length==0?0:this.products.map(v=>v.priceQuantity).reduce((a,b)=>a+b)
  }
  totalTVA(){
    return this.products.length==0?0:this.products.map(v=>v.prixTVA).reduce((a,b)=>a+b)
  }
  delete(i:number){
    this.clearAllFieldsFormForm()
    this.products.splice(i,1)
  }
  clearAllFieldsFormForm(){
    this.formG.get('product')?.setValue('');
    this.formG.get('price')?.setValue(0);
    this.formG.get('quantity')?.setValue(0);
  }
}
