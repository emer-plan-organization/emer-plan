import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClientService} from '../../service/httpClientService';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-assess-link-analysis',
  templateUrl: './link-analysis.component.html',
  styleUrls: ['./link-analysis.component.css'],
  providers: [ HttpClientService ]
})
export class LinkAnalysisComponent implements OnInit {
  validateForm: FormGroup;

  id="";

  data:any={
    wasteWater:null,
    generalSolidWaste:null,
    ttraffic:null,
    wasteTransportationUnit:null,
    wasteContract:null,
    wasteGenerated:null,
    wasteGas:null,
    disposal:null,
    hazardousWaste:null,
    transshipmentDuplicate:null,
    noise:null,
    discharge:null,
    wasteDisposalUnit:null,
    deposit:null,
    id:null,
    resourceList:null
  };

  //正数（包括正整数和正小数）验证
  moreZeroValidator=(control: FormControl): { [ s: string ]: boolean } => {
    if (control.value && control.value.toString()!="" && !/^[1-9]{1,}[0-9]{0,}(\.[0-9]{1,})?$/.test(control.value)) {
      return { confirm: true, error: true };
    }
  };

  save(){
    let _this=this;
    _this.data.userId=1;
    let submitData:any = _this.data;
    _this.httpClientService.post("ecp","riskAssassment.updatePollutionAnalysis",submitData)
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
      _this.httpClientService.post("ecp","riskAssassment.updatePollutionAnalysis",submitData)
        .then(function(data:any){
          _this.router.navigateByUrl("assess/company/equipment/"+_this.id);
        },function(err){
          _this.message.error(err);
        });
    }
  }

  initData(){
    let _this =this;
    _this.httpClientService.post("ecp","riskAssassment.getPollutionAnalysis",{projectId:_this.id,userId:1})
      .then(function(data:any){
        _this.data=data;
      },function(err){
        _this.message.error(err);
      });
  }

  constructor(
    private httpClientService: HttpClientService,
    private message: NzMessageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    this.validateForm=this.fb.group({
      wasteGas:[null,[Validators.required]],
      wasteWater:[null,[Validators.required]],
      noise:[null,[Validators.required]],
      generalSolidWaste:[null,[Validators.required]],
      hazardousWaste:[null,[Validators.required]],
      discharge:[null,[Validators.required,this.moreZeroValidator]],
      ttraffic:[null,[Validators.required,this.moreZeroValidator]],
      disposal:[null,[Validators.required,this.moreZeroValidator]],
      deposit:[null,[Validators.required,this.moreZeroValidator]],
      wasteDisposalUnit:[null,[Validators.required]],
      wasteTransportationUnit:[null,[Validators.required]],
      wasteContract:[null,[Validators.required]],
      transshipmentDuplicate:[null,[Validators.required]]
    });
    this.initData();
  }

}
