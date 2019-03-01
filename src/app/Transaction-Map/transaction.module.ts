import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NguiMapModule} from '@ngui/map';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
//import { TabsModule } from 'ngx-bootstrap/tabs';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { SharedModule } from '../shared/shared.module';

import { ServicesComponent } from '../Transaction-Map/services/services.component';
import { NotificationComponent } from '../Transaction-Map/notification/notification.component';
import { DataRoomComponent } from './data-room/data-room.component';
import { MapComponent } from '../Transaction-Map/map/map.component';
import { TransactionRoutingModule } from '../Transaction-Map/transaction-routing.module';
@NgModule({
    imports: [
    
      NgbModule,     
      SharedModule,     
      HttpClientModule,
      HttpModule,     
    //  TabsModule,
      BsDropdownModule,
      PdfViewerModule,
      TransactionRoutingModule,
      NguiMapModule.forRoot(
        {apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyC56o9EoYPsP-K2SVVx6n4oC0ZfaM_Ay-0&libraries=visualization,places,drawing',
   
         }),      
    ],
    declarations: [       
        ServicesComponent,        
        NotificationComponent,
        DataRoomComponent,
        MapComponent
    ],
    exports: [ ],
    providers: [
        // ListService,
        // NodeService,
        // HomeNodeService,       
        // EquipmentService,
        // SellerService,        
      ],
  })
  export class TransactionModule { }