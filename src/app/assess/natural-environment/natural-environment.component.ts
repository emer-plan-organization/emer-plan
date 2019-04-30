import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router} from '@angular/router';
import {FormBuilder,FormControl,FormGroup,Validators} from '@angular/forms';
import { HttpClientService } from '../../service/httpClientService';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-assess-natural-environment',
  templateUrl: './natural-environment.component.html',
  styleUrls: ['./natural-environment.component.css'],
  providers: [ HttpClientService ]
})
export class NaturalEnvironmentComponent implements OnInit {
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
    TopographicFeatures:null,
    MeanTemperature:null,
    MaximumTemperature:null,
    MinimumTemperature:null,
    MeanWindSpeed:null,
    MaximumWindSpeed:null,
    AverageAtmosphericPressure:null,
    AveragePrecipitation:null,
    LongestDurationPrecipitation:null,
    MaximumPrecipitation:null,
    AverageThunderstormDays:null,
    PrevailingWindDirection:null,
    WinterDominantWindDirection:null,
    SummerPrevailingWindDirection:null,
    NaturalDisaster:null
  };
  resourceList:Array<any>=[];

  //数字验证，带小数
  numValidator = (control: FormControl): { [ s: string ]: boolean } => {
    if (control.value && control.value.toString()!="" && !/^(-)?[1-9][0-9]{0,}(\.[0-9]{1,})?$/.test(control.value)) {
      return { confirm: true, error: true };
    }
  };

  save(){
    let _this=this;
    _this.data.userId=1;
    let submitData:any = _this.data;
    /*let imgList = [];
    imgList = imgList.concat(_this.resourceList.imgList1, _this.resourceList.imgList2);*/
    submitData.resourceList = _this.resourceList;
    _this.httpClientService.post("ecp","riskAssassment.updateNaturalInfo",submitData)
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
      /*let imgList = [];
      imgList = imgList.concat(_this.resourceList.imgList1, _this.resourceList.imgList2);*/
      submitData.resourceList = _this.resourceList;
      _this.httpClientService.post("ecp","riskAssassment.updateNaturalInfo",submitData)
        .then(function(data:any){
          _this.router.navigateByUrl("assess/company/quality/"+_this.id);
        },function(err){
          _this.message.error(err);
        });
    }
  }

  initData(){
    let _this =this;
    _this.httpClientService.post("ecp","riskAssassment.getNaturalInfo",{projectId:_this.id,userId:1})
      .then(function(data:any){
        _this.data=data.naturalInfo;
        _this.resourceList=data.resourceList;

      },function(err){
        _this.message.error(err);
      });
  }

  constructor(
    private httpClientService:HttpClientService,
    private message:NzMessageService,
    private router:Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    this.validateForm=this.fb.group({
      TopographicFeatures:[null,[Validators.required]],
      MeanTemperature:[null,[Validators.required,this.numValidator,this.numValidator]],
      MaximumTemperature:[null,[Validators.required,this.numValidator]],
      MinimumTemperature:[null,[Validators.required,this.numValidator]],
      MeanWindSpeed:[null,[Validators.required,this.numValidator]],
      MaximumWindSpeed:[null,[Validators.required,this.numValidator]],
      AverageAtmosphericPressure:[null,[Validators.required,this.numValidator]],
      AveragePrecipitation:[null,[Validators.required,this.numValidator]],
      LongestDurationPrecipitation:[null,[Validators.required,this.numValidator]],
      MaximumPrecipitation:[null,[Validators.required,this.numValidator]],
      AverageThunderstormDays:[null,[Validators.required,this.numValidator]],
      PrevailingWindDirection:[null,[Validators.required]],
      WinterDominantWindDirection:[null,[Validators.required]],
      SummerPrevailingWindDirection:[null,[Validators.required]],
      NaturalDisaster:[null,[Validators.required]]
    });
    this.initData();
  }

}
