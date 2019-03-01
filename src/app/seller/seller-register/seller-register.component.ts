import { Component, OnInit, ElementRef, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileUploader, FileSelectDirective, FileItem } from 'ng2-file-upload/ng2-file-upload';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { validateConfig } from '@angular/router/src/config';

import { NodeService } from '../../services/Nodeservice';
import { EquipmentService } from '../../services/equipment.service';
import { HomeNodeService } from '../../services/HomeNodeService';
import { SellerService } from '../../services/seller.service';
import { ProcessService } from '../../services/process.service';

// const URL = 'http://157.56.179.20:3010/api/upload/';
// const SECURL = 'http://157.56.179.20:3010/api/upload/multi';
const URL = 'http://localhost:3010/api/upload';
const SECURL = 'http://localhost:3010/api/upload/multi';
const licenseURL = 'http://localhost:3010/api/upload/license';
const socialSecurityURL = 'http://localhost:3010/api/upload/social';
const premiseURL = 'http://localhost:3010/api/upload/prelease';
const bankReportURL = 'http://localhost:3010/api/upload/bankRep';
const licenseFinURL = 'http://localhost:3010/api/upload/licenseRep';
const certificatesURL = 'http://localhost:3010/api/upload/certificateRep';
const reportsURL = 'http://localhost:3010/api/upload/reportsRep';
const financialStatementsURL = 'http://localhost:3010/api/upload/finsRep';
const InsuranceURL = 'http://localhost:3010/api/upload/insuranceRep';
const ndaURL = 'http://localhost:3010/api/upload/ndaData';
@Component({
  selector: 'app-seller-register',
  templateUrl: './seller-register.component.html',
  styleUrls: ['./seller-register.component.scss']
})
export class SellerRegisterComponent implements OnInit {

  public processModal;
  @ViewChild("closeProcess") closeProcess: ElementRef;
  @ViewChild("showProcess") showProcess: ElementRef;

  isList = true;

  CheckList: any = [];
  line: string;
  isChecklist=false;
  maxListId :any;

  order_num:number;
  

  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('tab') public tabs: NgbTabset;
  @ViewChild('closeLogin') closeLogin: ElementRef;
  user_name: any;
  licensePDF: any = [];
  maxFileSize = 1048576;
  showPdf: boolean = false;
  page: number = 1;
  pdfSrc: string;
  currentUser: any;
  ImageRegisterData: FormGroup;
  businessRegisterData: FormGroup;
  AdditionalInformation: FormGroup;
  BuildingInformation: FormGroup;
  PremisesRegisterData: FormGroup;
  financeRegisterData: FormGroup;
  EquipmentRegisterData: FormGroup;
  agentInformationData: FormGroup;

  user_id:any;
  isProf:any;
  getEquip: any = [];
  deleteEquipment: any = [];
  tabsInitialized = false;
  place: any;
  center: any;
  position: any;
  address: any;
  isUpload = false;
  submitted = false;
  submit = false;
  state_default = true;
  isValid = false;
  Data: any;
  Comp_id = [];
  CompanyID = '';
  currentState: string;
  // currentState:string;
  minList = [50000, 75000, 100000, 200000, 250000, 500000, 750000, 1000000, 2000000, 3000000, 4000000, 5000000];
  maxList = [50000, 75000, 100000, 200000, 250000, 500000, 750000, 1000000, 2000000, 3000000, 4000000, 5000000];
  public myModal;
  currentCounty: string;
  currentPrice: string;
  currentRevenue: string;
  currentCashflow: string;
  subbuilding_types: any = [];
  currentAnnualRevenue: string;
  curCashflow: string;
  curCmpType: string;
  curCmpStatus: string;
  curEmpCount: string;
  stateList: any = [];
  countyList: any = [];
  citiesList: any = [];
  building_types: any = [];
  building_subtypes: any = [];
  SubcatList: any = [];
  safeURL: any;
  curCategory: string;
  curExpense: string;
  curEquipment: string;
  currentBuildingSubType: string;
  currentBuildingType: string;
  curSubCategory: string;
  imageList: any = [];
  primaryImage: any = [];
  SecondaryImageData: any = [];
  licenseData: any = [];
  licenseReportData: any = [];
  socialSecurityData: any = [];
  Title: any;
  Data1: any;
  Equipment_Details: any = [];
  subcategoryList: any;
  subChildList: any;
  currentChild: string;
  baseCategoryList: any = [];
  childCategoryList: any = [];
  subchildCategoryList: any = [];
  list = [];
  getlist = [];
  curSellType: string;
  premiseImage: any = [];
  equipID = 0;
  equipmentId = 0;
  editEquipment_Details: any = [];
  EquipName: string;
  Equip_Nos: string;
  bankRepData: any = [];
  certificateData: any = [];
  reportsData: any = [];
  finStatementData: any = [];
  InsuranceData: any = [];
  ndaReport: any = [];
  companyStatus = ['Running', 'Dormant'];
  employeesCount = ['1-10', '11-25', '26-50', '51-100', '101-200', '200+'];
  priceList = [100000, 200000, 250000, 500000, 750000, 1000000, 2000000, 3000000, 4000000, 5000000];
  companyTypeList = ['Sole Proprietorship', 'Partnership', 'Private Limited', 'Public Limited', 'Trust', 'Co-Operative'];
  sellTypeList = [{ name: 'Sell', value: 0 }, { name: 'Lease', value: 1 }];

  processMstr:any;
  seller_processList:any=[];
  selectAction = 'List Business';

  // public uploader: FileUploader = new FileUploader({url: SECURL, itemAlias: 'SecondaryImage'});
  public licenseUploader: FileUploader = new FileUploader({ url: licenseURL, itemAlias: 'license' });
  public socialSecurityUploader: FileUploader = new FileUploader({ url: socialSecurityURL, itemAlias: 'socialSecurity' });
  public primaryImageUploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'PrimaryImage' });
  public SecondaryImageUploader: FileUploader = new FileUploader({ url: SECURL, itemAlias: 'SecondaryImage' });
  public premiseUploader: FileUploader = new FileUploader({ url: premiseURL, itemAlias: 'preLeaseImage' });
  public bankReportUploader: FileUploader = new FileUploader({ url: bankReportURL, itemAlias: 'bankPDF' });
  public licenseReportUploader: FileUploader = new FileUploader({ url: licenseFinURL, itemAlias: 'licenseRep' });
  public certificateUploader: FileUploader = new FileUploader({ url: certificatesURL, itemAlias: 'certificateRep' });
  public reportsUploader: FileUploader = new FileUploader({ url: reportsURL, itemAlias: 'reports' });
  public finStatementsUploader: FileUploader = new FileUploader({ url: financialStatementsURL, itemAlias: 'finState' });
  public insuranceUploader: FileUploader = new FileUploader({ url: InsuranceURL, itemAlias: 'insurance' });
  public NDAUploader: FileUploader = new FileUploader({ url: ndaURL, itemAlias: 'ndaImage' });


    
  constructor(private fb: FormBuilder, private user: NodeService,
    private process: ProcessService,private _sanitizer: DomSanitizer,
     private router: Router,public home: HomeNodeService,
      public equip: EquipmentService,public sell: SellerService) {

    this.businessRegisterData = this.fb.group({
      userId: [''],
      CompanyId: [''],
      Name: [''],
      agentName: [''],
      agentEmail: [''],
      homeAddress: [''],
      agentContact: [''],
      emailAddress: [''],
      faxNumber: [''],
      cellPhone: [''],
      homePhone: [''],
      secName: [''],
      secNum: [''],
      bestTelePhone: [''],
      dob: [''],
      birthPlace: [''],
      homeTelePhone: [''],
      Title: ['', Validators.required],
      State: ['', Validators.required],
      County: ['', Validators.required],
      Price: ['', Validators.required],
      Revenue: ['', Validators.required],
      CashFlow: ['', Validators.required],
      Description: ['', Validators.required],
      Category: ['', Validators.required],
      SubCategory: ['', Validators.required],
      SubChildCategory: ['',],
      CmpType: ['', Validators.required],
      SellType: ['', Validators.required],
      // CmpStatus:['',Validators.required],
      EmpCount: ['', Validators.required],
      YoutubeUrl: ['', [Validators.required, Validators.minLength(25)]],
      Latitude: [''],
      Longitude: [''],
      Address: [''],
      ZipCode: ['', Validators.required],
      BuildingType: ['',],
      BuildingSubTypes: ['',],
      BuildingSize: ['',],
      builtYear: [''],
      restRoom: [''],
      buildingZone: [''],
      buildingPark: [''],
      totalAreaSize: ['',],
      rentDetail: ['',],
      industryDetail: ['',],
      zoningDetail: ['',],
      annual_revenue: ['',],
      cflow: ['',],
      Expense: [''],
      accountant: ['',],
      attorney: ['',],
      bussinessBrokerDetails: ['',],
      saleAmount: [''],
      whySell: [''],
      desiredTime: [''],
      fees: [''],
      escrow: [''],
      legal: [''],
      accounting: [''],
      valuation: [''] 
    });
    this.EquipmentRegisterData = this.fb.group({
      equipmentName: [''],
      equipmentCount: [''],
    });

  }

  ngOnInit() {

    if(sessionStorage.length){
      if(sessionStorage.getItem('Bizops_User')){      
        this.currentUser = JSON.parse(sessionStorage.getItem('Bizops_User'));
        this.user_name = this.currentUser.USER_FIRSTNAME;       
        this.user_id = this.currentUser.ID;
       // this.isUser = true;       
      }        
    }
    this.home.getProductList().subscribe(
      data => {      
        this.list = data;
        this.home.getBaseCategory().subscribe(
          // tslint:disable-next-line:no-shadowed-variable
          data => {
            this.baseCategoryList = data;
            this.home.getChildCategory().subscribe(
              // tslint:disable-next-line:no-shadowed-variable
              data => {
                this.childCategoryList = data;
                this.home.getSubchildCategory().subscribe(
                  // tslint:disable-next-line:no-shadowed-variable
                  data => {
                    this.subchildCategoryList = data;
                    this.home.getStateList().subscribe(
                      // tslint:disable-next-line:no-shadowed-variable
                      data => {
                        this.stateList = data;
                        this.home.getCountyList().subscribe(
                          // tslint:disable-next-line:no-shadowed-variable
                          data => {
                            this.countyList = data;
                            this.home.getBuildingTypes().subscribe(
                              // tslint:disable-next-line:no-shadowed-variable
                              data => {
                                this.building_types = data;
                                console.log(this.building_types);
                                this.home.getBuildingSubTypes().subscribe(
                                  // tslint:disable-next-line:no-shadowed-variable
                                  data => {
                                    this.building_subtypes = data;
                                    this.home.getProcessMstr().subscribe(
                                      // tslint:disable-next-line:no-shadowed-variable
                                      processData => {
                                        this.processMstr = processData;

                                    this.home.getProfessional(this.user_id).subscribe(
                                      data =>{
                                      var res = data;
                                      if (res.length > 0) {
                                           if (res[0].status) {  }  
                                           else {
                                             var Mstr_Data = res;
                                             if(Mstr_Data[0].USER_ID == this.user_id){
                                               this.isProf = true;
                                             }                
                                           }      
                                  
                                        }
                                        else { alert('No Data'); }  
                                   });
                                  });
                                });
                              });
                          });
                      });
                  });
              });
          });
      },
      error => {
        alert('Server Error');
      });

  
    
    this.primaryImageUploader.onAfterAddingFile = (file) => {
      if (file) {
        console.log(file);

        const reader = new FileReader();
        const imageFile: any = file.file.rawFile;
        let list = {};
        reader.onload = () => {
          list = {
            filename: imageFile.name,
            filetype: imageFile.type,
            value: (reader.result as string).split(',')[1]
          };
          this.primaryImage.push(list);
        };
        if (imageFile.size < this.maxFileSize) {
          reader.readAsDataURL(imageFile);
          this.isUpload = true;
        } else {
          alert("File size must be less that 1mb and more that 1kb!");
        }
      }
    };

    this.SecondaryImageUploader.onAfterAddingFile = (file) => {
      if (file) {
        const reader = new FileReader();
        const imageFile: any = file.file.rawFile;
        let list = {};
        reader.onload = () => {
          list = {
            filename: imageFile.name,
            filetype: imageFile.type,
           value : (reader.result as string).split(',')[1]
          };
          this.SecondaryImageData.push(list);
        };
        if (imageFile.size < this.maxFileSize) {
          reader.readAsDataURL(imageFile);
          this.isUpload = true;
        } else {
          alert("File size must be less that 1mb and more that 1kb!");
        }
      }
    };    
  }  

  beforeChange(event: NgbTabChangeEvent) {
    if (event.nextId === 'tab-preventchange2') {
      event.preventDefault();
    }
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    this.tabsInitialized = true;
  }

  changeState($event) {
    // tslint:disable-next-line:max-line-length
    if ($event === undefined) { this.citiesList = []; } 
    else { this.citiesList = this.countyList.filter((item) => item.state_code === $event.state_code); }
  }

  changeCategory($event) {
    this.subcategoryList = [];
    this.subChildList = [];
    // tslint:disable-next-line:max-line-length
    if ($event === undefined) { this.subcategoryList = []; this.subChildList = []; } 
    else { this.subcategoryList = this.childCategoryList.filter((item) => item.cid === $event.cid); }
  }

  changesubCategory($event) {
    this.subChildList = [];   
    if ($event === undefined) { this.subChildList = []; } else { this.subChildList = this.subchildCategoryList.filter((item) => item.subid === $event.subcid); }
  }

  changeBuildingType($event) {
    this.subbuilding_types = [];
    if ($event === undefined) { this.subbuilding_types = []; }
    this.subbuilding_types = this.building_subtypes.filter((item) => item.TYPE_ID === $event.TYPE_ID);
  }
  

  clearFile() {   
    this.SecondaryImageData = [];
  }

  clearPrimaryImage() {  
    this.primaryImage = [];
  }
  clearSocialFile() {
    this.socialSecurityData = [];
  }
  clearLicense() {
    this.licenseData = [];
  }
  placeChanged(place) {
    this.place = place;
    this.center = place.geometry.location;
    this.address = place.formatted_address;
    const lng = place.geometry.location.lng();
    const lat = place.geometry.location.lat();
    this.position = [lat, lng];
  }

  addLine(){
    this.isList = true;
    this.showProcess.nativeElement.click();
  }

  addProcess() {
    this.isChecklist = true;  
    if(this.CheckList.length == 0){
      this.order_num = 1
    }
    else{
      this.order_num = this.order_num + 1;
    }

    var instruction={
      Order_num : this.order_num,
      Instruction : this.line,
    }

    this.CheckList.push(instruction);
    this.line = "";
    //this.isList = false;
    this.closeProcess.nativeElement.click();
  }

  processAction(value){
    console.log(value);
    this.selectAction = value;

  }

  selectProcess(value){
    if(this.seller_processList.length == 0){
      this.order_num = 1
    }
    else{
      this.order_num = this.order_num + 1;
    }   
   // var process = this.processMstr.filter((item) => item.PROCESS_ID == value);
   var process = this.processMstr.filter((item) => item.STEP_NAME == value);

    if(process[0].STEP_NAME=='List Business'){
         process[0].STEP_NAME = 'Search Business'      
    }

    var _obj={
      Order_num : this.order_num,
      Instruction : process[0].STEP_NAME,
    }

    this.seller_processList.push(_obj);
    console.log(this.seller_processList);
  }

  clearChecklist(){
    this.CheckList = [];
  }

  get f() { return this.businessRegisterData.controls; }
  get add() { return this.EquipmentRegisterData.controls; }
 
  businessRegister() {
    this.submitted = true;
    if (this.businessRegisterData.invalid) {
      if ((this.f.Title.errors) || (this.f.YoutubeUrl.errors)) {
        this.tabs.select('tab-business');
      } else if ((this.f.Name.errors) || (this.f.emailAddress.errors)) {
        this.tabs.select('tab-personal');
      } else if ((this.f.annual_revenue.errors) || (this.f.cflow.errors) || (this.f.Expense.errors)) {
        this.tabs.select('tab-finance');
      } else if ((this.f.BuildingSize.errors) || (this.f.BuildingType.errors) || (this.f.BuildingSubTypes.errors)) {
        this.tabs.select('tab-building');      
      } else if ((this.f.totalAreaSize.errors) || (this.f.rentDetail.errors) || (this.f.industryDetail.errors) || (this.f.zoningDetail.errors)) {
        this.tabs.select('tab-premises');
      } else if ((this.f.accountant.errors) || (this.f.attorney.errors) || (this.f.bussinessBrokerDetails.errors)) {
        this.tabs.select('tab-agent');
      }
      return;
    } else {
      this.businessRegisterData.patchValue({
        userId: this.currentUser.ID,
        CompanyId: 0,
        Latitude: this.position[0],
        Longitude: this.position[1],
        Address: this.address,
      });
      this.sell.createBiz(this.businessRegisterData.value).subscribe(
        data => {
          var res = data;
          this.CompanyID = res;
          const details = {
            com_id: this.CompanyID,
            values: this.Equipment_Details
          };
          this.equip.createEquip(details).subscribe(
            // tslint:disable-next-line:no-shadowed-variable
            data => {
              this.Data = data;
              var processList = {
                companyId : this.CompanyID,
                UserId : this.user_id,               
                list : this.seller_processList
              }
              this.process.createBusinessProcess(processList).subscribe(
                data=>{
                  var res = data;
                  if(res>0){                            
                this.licenseUploader.setOptions({ additionalParameter: { Company_ID: this.CompanyID, USERNAME: this.user_name } });
                this.licenseUploader.uploadAll();
                this.licenseUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
                  if (response === 'Uploaded Sucessfully') {                    
                    this.socialSecurityUploader.setOptions({ additionalParameter: { Company_ID: this.CompanyID, USERNAME: this.user_name } });
                    this.socialSecurityUploader.uploadAll();
                  }                  
                  this.socialSecurityUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
                    if (response === 'Uploaded Sucessfully') {
                      this.primaryImageUploader.setOptions({ additionalParameter: { Company_ID: this.CompanyID } });
                      this.primaryImageUploader.uploadAll();
                    }                 
                    this.primaryImageUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
                      if (response === 'Uploaded Sucessfully') {
                        this.SecondaryImageUploader.setOptions({ additionalParameter: { Company_ID: this.CompanyID } });
                        this.SecondaryImageUploader.uploadAll();
                      }
                      this.SecondaryImageUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
                        if (response === 'Uploaded Sucessfully') {
                          this.licenseReportUploader.setOptions({ additionalParameter: { Company_ID: this.CompanyID, USERNAME: this.user_name } });
                          this.licenseReportUploader.uploadAll();
                        }
                        // this.licenseReportUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
                        //   if (response === 'Uploaded Sucessfully') {
                        //     this.premiseUploader.setOptions({ additionalParameter: { Company_ID: this.CompanyID, USERNAME: this.user_name } });
                        //     this.premiseUploader.uploadAll();
                        //   }
                        //   this.premiseUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
                        //     if (response === 'Uploaded Sucessfully') {
                        //       this.bankReportUploader.setOptions({ additionalParameter: { Company_ID: this.CompanyID, USERNAME: this.user_name } });
                        //       this.bankReportUploader.uploadAll();
                        //     }
                        //     this.bankReportUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
                        //       if (response === 'Uploaded Sucessfully') {
                        //         this.certificateUploader.setOptions({ additionalParameter: { Company_ID: this.CompanyID, USERNAME: this.user_name } });
                        //         this.certificateUploader.uploadAll();
                        //       }
                        //       this.certificateUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
                        //         if (response === 'Uploaded Sucessfully') {
                        //           this.reportsUploader.setOptions({ additionalParameter: { Company_ID: this.CompanyID, USERNAME: this.user_name } });
                        //           this.reportsUploader.uploadAll();
                        //         }
                        //         this.reportsUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
                        //           if (response === 'Uploaded Sucessfully') {
                        //             this.finStatementsUploader.setOptions({ additionalParameter: { Company_ID: this.CompanyID, USERNAME: this.user_name } });
                        //             this.finStatementsUploader.uploadAll();
                        //           }
                        //           this.finStatementsUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
                        //             if (response === 'Uploaded Sucessfully') {
                        //               this.insuranceUploader.setOptions({ additionalParameter: { Company_ID: this.CompanyID, USERNAME: this.user_name } });
                        //               this.insuranceUploader.uploadAll();
                        //             }
                        //             this.insuranceUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
                        //               if (response === 'Uploaded Sucessfully') {
                        //                 this.NDAUploader.setOptions({ additionalParameter: { Company_ID: this.CompanyID, USERNAME: this.user_name } });
                        //                 this.NDAUploader.uploadAll();
                        //               }
                        //               this.NDAUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
                        //                 if (response === 'Uploaded Sucessfully') {
                        //                   alert('Created Successfully !!!');
                        //                   this.businessRegisterData.reset();
                        //                   this.router.navigate(['/addedlist']);
                        //                   this.clearFile();
                        //                 }
                        //               };
                        //             };
                        //           };
                        //         };
                        //       };
                        //     };
                        //   };
                        // };
                      };
                    };
                  };
                };             
            }
          });
            },
            error => {
              alert('Server Error');
              console.log(error);
            });
        },
        error => {
          alert('Server Error');
          console.log(error);
        });
    }
  }
  EquipRegister() {
    this.submit = true;
    if ((this.EquipmentRegisterData.value.equipmentName == null) || (this.EquipmentRegisterData.value.equipmentCount == null)) {
      alert('Invalid Fields');
    } else {
      if (this.editEquipment_Details.length !== 0) {
        for (let i = 0; i <= this.Equipment_Details.length; i++) {
          if (this.Equipment_Details[i].id === this.editEquipment_Details[0].id) {
            this.Equipment_Details[i].name = this.EquipmentRegisterData.value.equipmentName;
            this.Equipment_Details[i].value = this.EquipmentRegisterData.value.equipmentCount;
            this.editEquipment_Details = [];
            this.EquipmentRegisterData.reset();
            { this.closeLogin.nativeElement.click(); }
          }
        }
      } else {
        const Details = this.EquipmentRegisterData.value;
        const equipmentList = {
          id: this.equipID,
          name: Details.equipmentName,
          value: Details.equipmentCount,
        };
        this.Equipment_Details.push(equipmentList);
        alert('Successfully Created');
        this.equipID = this.equipID + 1;
        this.EquipmentRegisterData.reset();
        { this.closeLogin.nativeElement.click(); }
      }
    }
  }
  deleteEquip(val) {
    this.Equipment_Details = this.Equipment_Details.filter((item) => {
      return item.id !== val;
    });
  }
  editEquip(val) {
    this.editEquipment_Details = this.Equipment_Details.filter((item) => {
      return item.id === val;
    });
    this.EquipName = this.editEquipment_Details[0].name;
    this.Equip_Nos = this.editEquipment_Details[0].value;
  }
  changeEquipment(value) {
    this.curEquipment = value;
  }
  clearInsuranceFile() {
    this.InsuranceData = [];
  }
  clearFinStateFile() {
    this.finStatementData = [];
  }
  clearReportFile() {
    this.reportsData = [];
  }
  clearCertificateFile() {
    this.certificateData = [];
  }
  clearLicenseReport() {
    this.licenseReportData = [];
  }
  clearbankReportFile() {
    this.bankRepData = [];
  }
}