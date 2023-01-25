import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { ShoppingListComponent } from "./shopping-list.component";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";

const routes : Routes=[
    {path:'',component:ShoppingListComponent}
]
@NgModule({
    declarations:[
        ShoppingListComponent,
        ShoppingEditComponent,
    ],
    imports:[
        SharedModule,
        FormsModule,
        RouterModule,
        RouterModule.forChild(routes)
    ]
})
export class ShoppingListRoutingModule{

}