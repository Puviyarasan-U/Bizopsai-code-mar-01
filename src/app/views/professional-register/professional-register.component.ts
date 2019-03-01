import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  FileUploader,
  FileSelectDirective
} from "ng2-file-upload/ng2-file-upload";

import { NodeService } from "../../services/Nodeservice";
import { HomeNodeService } from "../../services/HomeNodeService";

const URL = "http://localhost:3010/api/profile/upload";
const pdfURL = "http://localhost:3010/api/profile/pdfupload";

@Component({
  selector: "app-professional-register",
  templateUrl: "./professional-register.component.html",
  styleUrls: ["./professional-register.component.scss"]
})
export class ProfessionalRegisterComponent implements OnInit {
  public profileImgUploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: "profileImage"
  });
  public pdfUploader: FileUploader = new FileUploader({
    url: pdfURL,
    itemAlias: "pdfFile"
  });

  professionalRegisterData: FormGroup;
  submitted = false;
  showPreview = false;
  isUpload = false;
  Data: any = [];
  profileData: any;
  pdfFiles: any = [];
  pdfPage: any = [];
  showPdf: boolean = false;
  page: number = 1;
  pdfSrc: string;
  category: string;
  //subCategory: string;
  prof_Category:any;
  subCategoryList: any = [];
  primaryImage: any = [];
  user_name: any;
  user_id: any;

  isProf = false;
  profCategory: string;
  specialtyList = [
    { value: 1, label: "Architect" },
    { value: 2, label: "Landscaper" }
  ];

  categoryList = [
    "Accounting & Finance",
    "Construction",
    "Human Resources",
    "Information Technology",
    "Legal",
    "Logistics & Transportation",
    "Marketing, Advertising & Promotions",
    "Real Estate",
    "Telecommunications & Cable",
    "Others"
  ];

  baseCategory = [
    { id: 1, value: "Accounting & Finance" },
    { id: 2, value: "Construction" },
    { id: 3, value: "Human Resources" },
    { id: 4, value: "Information Technology" },
    { id: 5, value: "Legal" },
    { id: 6, value: "Logistics & Transportation" },
    { id: 7, value: "Marketing, Advertising & Promotions" },
    { id: 8, value: "Real Estate" },
    { id: 9, value: "Telecommunications & Cable" },
    { id: 10, value: "Other" }
  ];

  subCategory = [
    { id: 2, value: "Architect" },
    { id: 2, value: "Landscape" },
    { id: 2, value: "Surveyor" },
    { id: 2, value: "Contractor" },
    { id: 2, value: "Engineer" },
    { id: 4, value: "Cybersecurity" },
    { id: 4, value: "Software development" },
    { id: 4, value: "IT Support" },
    { id: 4, value: "Systems analyst" }
  ];

  constructor(
    private fb: FormBuilder,
    private user: NodeService,
    private route: ActivatedRoute,
    public router: Router,
    private home: HomeNodeService
  ) {}

  ngOnInit() {
    if (sessionStorage.length) {
      if (sessionStorage.getItem("Bizops_User")) {
        let userdata = JSON.parse(sessionStorage.getItem("Bizops_User"));
        this.user_name = userdata.USER_FIRSTNAME;
        this.user_id = userdata.ID;
        // this.isUser = true;
      }
    }

    this.route.queryParams
      .filter(params => params.Type)
      .subscribe(params => {
        this.profCategory = params.Type;
        this.isProf = true;
      });

    this.professionalRegisterData = this.fb.group({
      UserId: [""],
      FirstName: ["", Validators.required],
      LastName: ["", Validators.required],
      UserName: ["", Validators.required],
      Email: ["", [Validators.required, Validators.email]],
      ZipCode: ["", Validators.required],
      State: ["", Validators.required],
      City: ["", Validators.required],
      Address: ["", Validators.required],
      About: ["", Validators.required],
      Category: ["", Validators.required],
      SubCategory: [""]
    });

    this.profileImgUploader.onAfterAddingFile = file => {
      if (file) {
        const reader = new FileReader();
        const imageFile: any = file.file.rawFile;
        let list = {};
        reader.onload = () => {
          list = {
            filename: imageFile.name,
            filetype: imageFile.type,
            value: (reader.result as string).split(",")[1]
          };
          this.primaryImage.push(list);
        };
        reader.readAsDataURL(imageFile);
        this.isUpload = true;
      }
    };

    this.pdfUploader.onAfterAddingFile = file => {
      if (file) {
        let img: any = document.querySelector("#pdfFile");

        if (typeof FileReader !== "undefined") {
          let reader = new FileReader();
          let list = {};
          reader.onload = (e: any) => {
            this.pdfSrc = e.target.result;
            this.showPdf = true;
            list = {
              filename: img.name,
              filetype: img.type
              // value : reader.result.split(',')[1]
            };
            this.pdfFiles.push(list);
          };
          reader.readAsArrayBuffer(img.files[0]);
        }
      }
    };
  }

  get f() {
    return this.professionalRegisterData.controls;
  }

  changeCategory($event) {
    this.subCategoryList = this.subCategory.filter(item => {
      return item.id == $event.id;
    });
  }

  register() {
    this.submitted = true;
    if (!this.isProf) {
      this.professionalRegisterData.patchValue({
        UserId: this.user_id
      });
    } else {
      this.professionalRegisterData.patchValue({
        UserId: this.user_id,
        Category: "Priciple Agent"
      });
    }
    if (this.professionalRegisterData.invalid) {
      return;
    } else {
      this.user
        .createProfessional(this.professionalRegisterData.value)
        .subscribe(
          data => {
            //   this.blockUI.stop();
            this.Data = data;
            const rows = this.Data;
            if (rows > 0) {
              this.profileImgUploader.setOptions({
                additionalParameter: {
                  UserName: this.professionalRegisterData.value.UserName
                }
              });
              this.profileImgUploader.uploadAll();
              this.profileImgUploader.onCompleteItem = (
                item: any,
                response: any,
                status: any,
                headers: any
              ) => {
                this.pdfUploader.setOptions({
                  additionalParameter: {
                    UserName: this.professionalRegisterData.value.UserName
                  }
                });
                this.pdfUploader.uploadAll();
                this.pdfUploader.onCompleteItem = (
                  item: any,
                  response: any,
                  status: any,
                  headers: any
                ) => {
                  alert("Created Successfully !!!");
                  this.router.navigate(["/operate/hire"]);
                  this.professionalRegisterData.reset();
                };
              };
            }
          },
          error => {
            alert("Server Error");
            console.log(error);
          }
        );
    }
  }

  preview() {
    if (this.professionalRegisterData.invalid) {
      alert("fill all the fields !!!");
    } else {
      this.showPreview = !this.showPreview;
      this.profileData = this.professionalRegisterData.value;
    }
  }
  clearPDF() {
    this.pdfSrc = "";
    this.showPdf = false;
  }

  clearPrimaryImage() {
    this.primaryImage = [];
  }
}
