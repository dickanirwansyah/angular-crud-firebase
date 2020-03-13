import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../shared/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  constructor(private customerService:CustomerService) { }
  customerArray = [];
  showMessageDelete: boolean;
  searchText: string = "";

  ngOnInit() {
    this.customerService.getCustomers().subscribe(jsonData => {
      console.log(jsonData)
      this.customerArray = jsonData.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          }
      });
    })
  }

  deleteCustomer($key){
    if(confirm('are you sure to delete this record ?')){
      this.customerService.deleteCustomer($key);
      this.showMessageDelete = true;
      //sembunyikan message dalam 3 detik
      setTimeout(() => this.showMessageDelete = false, 3000)
    }
  }

  filterCondition(customer){
    return customer.fullName.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1
  }

}
