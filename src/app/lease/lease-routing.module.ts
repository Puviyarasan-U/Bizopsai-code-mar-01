import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LeaseComponent } from "./lease/lease.component";
import { LeaseDetailComponent } from "./lease-detail/lease-detail.component";

const routes: Routes = [
        {
          path: "",
          component: LeaseComponent,
          data: {
            title: "Lease"
          }
        },
        {
          path: "lease-detail",
          component: LeaseDetailComponent,
          data: {
            title: "Lease Detail"
          }
        }
      ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaseRoutingModule {}
