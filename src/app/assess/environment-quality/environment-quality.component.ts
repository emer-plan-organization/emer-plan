import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router} from '@angular/router';
import {FormBuilder,FormControl,FormGroup,Validators} from '@angular/forms';
import { HttpClientService } from '../../service/httpClientService';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-assess-environment-quality',
  templateUrl: './environment-quality.component.html',
  styleUrls: ['./environment-quality.component.css'],
  providers: [ HttpClientService ]
})
export class EnvironmentQualityComponent implements OnInit {
  validateForm: FormGroup;

  id="";

  data:any={
    ID:null,
    FunctionDivision:null,
    SurfaceWaterQuality:null,
    GroundwaterQuality:null,
    AtmosphereQuality:null,
    SoilQuality:null
  };

  save(){
    let _this=this;
    _this.data.userId=1;
    let submitData:any = _this.data;
    _this.httpClientService.post("ecp","riskAssassment.updateDivisionQuality",submitData)
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
      _this.httpClientService.post("ecp","riskAssassment.updateDivisionQuality",submitData)
        .then(function(data:any){
          _this.router.navigateByUrl("assess/company/product/"+_this.id);
        },function(err){
          _this.message.error(err);
        });
    }
  }

  initData(){
    let _this =this;
    _this.httpClientService.post("ecp","riskAssassment.getDivisionQuality",{projectId:_this.id,userId:1})
      .then(function(data:any){
        _this.data=data.division;
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
      FunctionDivision:[null,[Validators.required]],
      SurfaceWaterQuality:[null,[Validators.required]],
      GroundwaterQuality:[null,[Validators.required]],
      AtmosphereQuality:[null,[Validators.required]],
      SoilQuality:[null,[Validators.required]]
    });
    this.initData();
  }

}
