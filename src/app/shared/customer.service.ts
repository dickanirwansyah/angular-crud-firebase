import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private firebase:AngularFireDatabase) { }

  customerList: AngularFireList<any>;

  public form = new FormGroup({
    $key: new FormControl(null),
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    mobile: new FormControl('', [Validators.required, Validators.minLength(8)]),
    location: new FormControl('',Validators.required)
  });

  getCustomers(){
    this.customerList = this.firebase.list('customers');
    return this.customerList.snapshotChanges()
  }

  insertCustomer(customer){
    this.customerList.push({
      fullName: customer.fullName,
      email: customer.email,
      mobile: customer.mobile,
      location: customer.location
    })
  }
  
  public populateForm(customer){
    this.form.setValue(customer);
  }

  updateCustomer(customer){
    this.customerList.update(customer.$key, {
      fullName: customer.fullName,
      email: customer.email,
      mobile: customer.mobile,
      location: customer.location
    })
  }

  public deleteCustomer($key){
    this.customerList.remove($key)
  }
}
