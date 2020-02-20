import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../../service/http-client.service';
import { Category } from '../../model/category.model';
import { Department } from '../../model/deaprtment.model';
import { Item } from '../../model/item.model';

@Component({
  selector: 'app-view-report',
  templateUrl: './view-report.component.html',
  styleUrls: ['./view-report.component.scss']
})
export class ViewReportComponent implements OnInit {
  private items: Item[];
  private categories: Category[];
  private departments: Department[];
  constructor(private service: HttpClientService) { }

  ngOnInit() {
    this.items = [];
    this.categories = [];
    this.departments = [];
    this.service.getReportInfo().subscribe(response => {
      let temp = response.body["ITEM"]
      let temp2 = response.body["CATEGORY"]
      let temp3 = response.body["DEPARTMENT"]

      for (var i in temp){
        let item = new Item();
    //    console.log(temp[i])
        item.id = temp[i]["id"];
        item.condition = temp[i]["condition"];
        item.quantity = temp[i]["quantity"];
        item.price = temp[i]["price"];
        item.description = temp[i]["description"];

        this.items.push(item);
      }
      for (var c in temp2){
        let category = new Category();
        category.name = temp2[c]["name"];
        category.id = temp2[c]["id"];
        category.hasSub = temp2[c]["sub"];
        category.uniqueTag = temp2[c]["tag"];
        category.description = temp2[c]["description"];

        this.categories.push(category);
      }

   //   console.log(temp3)
      for (var d in temp3){
        let department = new Department();
        department.name = temp3[d]["name"];
        department.POSDepartmentCode = temp3[d]["POSCode"];
        department.id = temp3[d]["id"];
        department.uniqueTag = temp3[d]["tag"];
        department.description = temp3[d]["description"];

        this.departments.push(department);
      }

    })
  } 

}
