import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

import { ActivatedRoute,Router} from '@angular/router';

import { HttpClientService } from '../../service/httpClientService';

@Component({
  selector: 'app-assess-craft-statistics',
  templateUrl: './craft-statistics.component.html',
  styleUrls: ['./craft-statistics.component.css'],
  providers: [ HttpClientService ]
})
export class CraftStatisticsComponent implements OnInit {
  id="";
  isPassValid:boolean=true;

  tableData:Array<any>=[];

  getOneTableData(){
    return {
      isOtherCrafts:"",
      process:"",
      processArray:[],
      productionProcessName:"",
      isTimeOut:"",
      processNumber:"",
      id:""
    };
  }

  addParent(){
    let oneTableData=this.getOneTableData();
    this.tableData.push(oneTableData);
  }

  delParent(index){
    let _this=this;
    let id=_this.tableData[index].id;
    if(id==""){
      _this.deleteParent(index);
    }else {
      _this.httpClientService.post("ecp", "ecpCommon.deleteRow", {id: id, type: "productionProcess"})
        .then(function (data) {
          _this.deleteParent(index);
        }, function (err) {
          _this.message.error(err);
        });
    }
  }
  deleteParent(index){
    this.tableData.splice(index, 1);
    if(this.tableData.length == 0){
      this.addParent();
    }
  }

  save(){
    let _this=this;
    let submitData:any=new Object();
    _this.restoreTableData();
    submitData.projectId=_this.id;
    submitData.userId=1;
    submitData.jsonData=_this.tableData;
    _this.httpClientService.post("ecp","riskAssassment.updateProductionProcess",submitData)
      .then(function(data:any){
        _this.message.success("保存成功");
      },function(err){
        _this.message.error(err);
      });
  }

  next(){
    let _this=this;
    _this.isPassValid = true;
    //TODO  添加验证
    if(_this.isPassValid){
      let submitData:any=new Object();
      _this.restoreTableData();
      submitData.projectId=_this.id;
      submitData.userId=1;
      submitData.jsonData=_this.tableData;
      _this.httpClientService.post("ecp","riskAssassment.updateProductionProcess",submitData)
        .then(function(data:any){
          _this.router.navigateByUrl("assess/company/analysis/"+_this.id);
        },function(err){
          _this.message.error(err);
        });
    }

  }

  trunTableData(){
    let _this=this;
    _this.tableData.forEach(item=>{
      item.processArray=item.process.split(",")
    });
  }
  restoreTableData(){
    let _this=this;
    _this.tableData.forEach(item=>{
      item.process=item.processArray.join(",");
    });
  }

  initData(){
    let _this =this;
    _this.httpClientService.post("ecp","riskAssassment.getProductionProcess",{projectId:_this.id,userId:1})
      .then(function(data:any){
        _this.tableData=data;
        _this.trunTableData();
      },function(err){
        _this.message.error(err);
      });
  }

  constructor(
    private router:Router,
    private activatedRoute: ActivatedRoute,
    private httpClientService:HttpClientService,
    private message:NzMessageService
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.initData();
  }

}
