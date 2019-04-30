import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router} from '@angular/router';
import {FormBuilder,FormControl,FormGroup,Validators} from '@angular/forms';
import { HttpClientService } from '../../service/httpClientService';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-assess-manage-situation',
  templateUrl: './manage-situation.component.html',
  styleUrls: ['./manage-situation.component.css'],
  providers: [ HttpClientService ]
})
export class ManageSituationComponent implements OnInit {
  constructor(
    private httpClientService:HttpClientService,
    private message:NzMessageService,
    private router:Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  validateForm: FormGroup;
  id="";
  data:any={
    ID:null,
    AddTime:null,
    AddUser:null,
    ModifyTime:null,
    ModifyUser:null,
    DelFlag:null,
    ProjectID:null,
    FireAccepting:null,
    LastFireResult:null,
    FireAcceptingRemark:null,
    IsDanger:null,
    IsSafeLicense:null,
    ProductionSafetyRemark:null,
    IsDangerSafe:null,
    IsSafeCompletion:null,
    HazardousChemicalsRemark:null,
    NoMajorHazard:null,
    NoMajorHazardRecord:null,
    NoMajorHazardNoRecord:null,
    NoMajorHazardRemark:null,
    SafetySystem:null,
    SafetyTrainingManage:null,
    TrainingProgram:null,
    TrainingRecord:null
  }

  NoMajorHazardChange(value){
    if(value==1){
      this.data.NoMajorHazardRecord=0;
      this.data.NoMajorHazardNoRecord=0;
    }
  }

  NoMajorHazardRecordChange(value){
    if(value==1){
      this.data.NoMajorHazard=0;
      this.data.NoMajorHazardNoRecord=0;
    }
  }

  NoMajorHazardNoRecordChange(value){
    if(value==1){
      this.data.NoMajorHazard=0;
      this.data.NoMajorHazardRecord=0;
    }
  }

  save(){
    let _this=this;
    _this.data.userId=1;
    let submitData:any = _this.data;
    _this.httpClientService.post("ecp","riskAssassment.updateCompanySafety",submitData)
      .then(function(data:any){
        _this.message.success("保存成功");
      },function(err){
        _this.message.error(err);
      });
  }

  next(){
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }
    if(this.validateForm.status=="VALID"){
      let _this=this;
      _this.data.userId=1;
      let submitData:any = _this.data;
      _this.httpClientService.post("ecp","riskAssassment.updateCompanySafety",submitData)
        .then(function(data:any){
          _this.router.navigateByUrl("assess/company/acceptor/"+_this.id);
        },function(err){
          _this.message.error(err);
        });
    }
  }

  initData(){
    let _this =this;
    _this.httpClientService.post("ecp","riskAssassment.getCompanySafety",{projectId:_this.id,userId:1})
      .then(function(data:any){
        _this.data=data.companySafety;
      },function(err){
        _this.message.error(err);
      });
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    this.validateForm=this.fb.group({
      FireAccepting:[null,[Validators.required]],
      FireAcceptingRemark:[null,[Validators.required]],
      LastFireResult:[null,[Validators.required]],
      IsDanger:[null,[Validators.required]],
      ProductionSafetyRemark:[null,[Validators.required]],
      IsSafeLicense:[null,[Validators.required]],
      IsDangerSafe:[null,[Validators.required]],
      HazardousChemicalsRemark:[null,[Validators.required]],
      IsSafeCompletion:[null,[Validators.required]],
      NoMajorHazard:[null,[Validators.required]],
      NoMajorHazardRemark:[null,[Validators.required]],
      NoMajorHazardRecord:[null,[Validators.required]],
      NoMajorHazardNoRecord:[null,[Validators.required]],
      SafetySystem:[null,[Validators.required]],
      SafetyTrainingManage:[null,[Validators.required]],
      TrainingProgram:[null,[Validators.required]],
      TrainingRecord:[null,[Validators.required]]
    });
    this.initData();
  }

}
