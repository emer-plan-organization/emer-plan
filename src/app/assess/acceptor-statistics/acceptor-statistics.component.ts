import {Component, OnInit} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';

import {ActivatedRoute, Router} from '@angular/router';

import {HttpClientService} from '../../service/httpClientService';

@Component({
  selector: 'app-assess-acceptor-statistics',
  templateUrl: './acceptor-statistics.component.html',
  styleUrls: ['./acceptor-statistics.component.css'],
  providers: [HttpClientService]
})
export class AcceptorStatisticsComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private httpClientService: HttpClientService,
    private message: NzMessageService
  ) {
  }

  id = "";
  isPassValid: boolean = true;
  tableData = [];
  curEnvironmentalFactors=-1;
  atmosphereModal: boolean = false;
  waterModal:boolean=false;
  soilModal:boolean=false;

  atmosphereCategoryCheckOption: Array<any> = [
    {label: '医疗卫生机构', value: '医疗卫生机构',checked:false},
    {label: '文化教育机构', value: '文化教育机构',checked:false},
    {label: '行政机关', value: '行政机关',checked:false},
    {label: '企事业单位', value: '企事业单位',checked:false},
    {label: '居住区', value: '居住区',checked:false},
    {label: '科研单位', value: '科研单位',checked:false},
    {label: '公园', value: '公园',checked:false},
    {label: '商场', value: '商场',checked:false},
    {label: '军事禁区', value: '军事禁区',checked:false},
    {label: '军事管理区', value: '军事管理区',checked:false},
    {label: '国家相关保密区域', value: '国家相关保密区域',checked:false},
    {label: '不涉及以上类别', value: '不涉及以上类别',checked:false}
  ];

  waterCategoryCheckOption={
    option1:[
      {label:'集中式地表水',value:'集中式地表水',checked:false},
      {label:'地下水饮用水水源保护区（一级保护区）',value:'地下水饮用水水源保护区（一级保护区）',checked:false},
      {label:'地下水饮用水水源保护区（二级保护区）',value:'地下水饮用水水源保护区（二级保护区）',checked:false},
      {label:'地下水饮用水水源保护区（准保护区）',value:'地下水饮用水水源保护区（准保护区）',checked:false},
      {label:'农村及分散式饮用水水源保护区',value:'农村及分散式饮用水水源保护区',checked:false},
      {label:'废水排入受纳水体后24小时流经范围（按受纳河流最大日均流速计算）内涉及跨国界的',value:'废水排入受纳水体后24小时流经范围（按受纳河流最大日均流速计算）内涉及跨国界的',checked:false}
    ],
    option2:[
      {label:'国家公园',value:'国家公园',checked:false},
      {label:'国家级水产种质资源保护区',value:'国家级水产种质资源保护区',checked:false},
      {label:'省级水产种质资源保护区',value:'省级水产种质资源保护区',checked:false},
      {label:'水产养殖区',value:'水产养殖区',checked:false},
      {label:'地方级海洋特别保护区',value:'地方级海洋特别保护区',checked:false},
      {label:'国家级海洋特别保护区',value:'国家级海洋特别保护区',checked:false},
      {label:'天然渔场',value:'天然渔场',checked:false},
      {label:'国家级海洋自然保护区',value:'国家级海洋自然保护区',checked:false},
      {label:'地方级海洋自然保护区',value:'地方级海洋自然保护区',checked:false},
      {label:'海水浴场',value:'海水浴场',checked:false},
      {label:'国家级自然保护区',value:'国家级自然保护区',checked:false},
      {label:'地方级自然保护区',value:'地方级自然保护区',checked:false},
      {label:'盐场保护区',value:'盐场保护区',checked:false},
      {label:'生物多样性保护优先区域',value:'生物多样性保护优先区域',checked:false},
      {label:'世界文化和自然遗产地',value:'世界文化和自然遗产地',checked:false},
      {label:'国家重要湿地',value:'国家重要湿地',checked:false},
      {label:'国家级风景名胜区',value:'国家级风景名胜区',checked:false},
      {label:'省级风景名胜区',value:'省级风景名胜区',checked:false},
      {label:'国家级森林公园',value:'国家级森林公园',checked:false},
      {label:'省级森林公园',value:'省级森林公园',checked:false},
      {label:'世界地质公园',value:'世界地质公园',checked:false},
      {label:'国家级地质公园',value:'国家级地质公园',checked:false},
      {label:'省级地质公园',value:'省级地质公园',checked:false},
      {label:'基本农田保护区',value:'基本农田保护区',checked:false},
      {label:'基本草原',value:'基本草原',checked:false},
      {label:'企业雨水排口、清净废水排口、污水排口下游10公里流经范围内涉及跨省的',value:'企业雨水排口、清净废水排口、污水排口下游10公里流经范围内涉及跨省的',checked:false}
    ],
    option3:[
      {label:'溶岩地貌',value:'溶岩地貌',checked:false},
      {label:'泄洪区',value:'泄洪区',checked:false},
      {label:'泥石流  ',value:'泥石流',checked:false}
    ],
    option4:[
      {label:'其他受纳水体',value:'其他受纳水体',checked:false},
      {label:'不涉及以上类别',value:'不涉及以上类别',checked:false}
    ]
  };

  soilCategoryCheckOption: Array<any> = [
    {label: '基本农田保护区', value: '基本农田保护区',checked:false},
    {label: '居住商用地', value: '居住商用地',checked:false},
    {label: '其他土地类别', value: '其他土地类别',checked:false},
    {label: '不涉及以上类别', value: '不涉及以上类别',checked:false}
  ];
  atmosphereCategoryCheckOptionChange() {
    let option=this.atmosphereCategoryCheckOption.filter(item=>{
      return (item.value=='不涉及以上类别' && item.checked==true);
    });
    if(option!=null && option.length>0){
      this.atmosphereCategoryCheckOption = this.atmosphereCategoryCheckOption.map(item => {
        return {
          ...item,
          checked: (item.value=='不涉及以上类别')
        };
      });
    }
  }

  doSlctAtmosphere(){
    let checkOptionArr=this.atmosphereCategoryCheckOption.filter(item=>{
      return (item.value=='不涉及以上类别' && item.checked==true);
    });
    if(checkOptionArr!=null && checkOptionArr.length>0){
      //清空子项
      this.deleteCurByParent();
      /*this.tableData[this.curEnvironmentalFactors].receptors=[];
      let oneChildTableData = this.getOneChildTableData();
      oneChildTableData.category="无";
      oneChildTableData.category1="不涉及以上类别";
      oneChildTableData.pointName="/";
      oneChildTableData.position="/";
      oneChildTableData.pointName="/";
      oneChildTableData.peopleNumber="/";
      oneChildTableData.emergencyContact="/";
      oneChildTableData.contactNumber="/";
      this.tableData[this.curEnvironmentalFactors].receptors.push(oneChildTableData);*/
      //this.addChildren(this.curEnvironmentalFactors);
    }else{
      checkOptionArr=this.atmosphereCategoryCheckOption.filter(item=>{return item.checked==true;});
      if(checkOptionArr!=null && checkOptionArr.length>0){
        this.tableData[this.curEnvironmentalFactors].receptors=this.tableData[this.curEnvironmentalFactors].receptors
          .filter(item=>(item.category1!=null && item.category1!="" && item.category1!="不涉及以上类别"));
        checkOptionArr.forEach(item=>{
          let oneChildTableData = this.getOneChildTableData();
          oneChildTableData.category=item.value;
          oneChildTableData.category1=item.value;
          if(item.value=="军事禁区" || item.value=="军事管理区" || item.value=="国家相关保密区域"){
            oneChildTableData.peopleNumber="/";
          }
          this.tableData[this.curEnvironmentalFactors].receptors.push(oneChildTableData);
        });
      }
    }
    this.atmosphereModal=false;
  }

  waterCategoryCheckOptionChange(){
    let option=this.waterCategoryCheckOption.option4.filter(item=>{
      return (item.value=='不涉及以上类别' && item.checked==true);
    });
    if(option!=null && option.length>0){
      this.waterCategoryCheckOption.option1=this.waterCategoryCheckOption.option1.map(item => {
        return {
          ...item,
          checked: false
        };
      });
      this.waterCategoryCheckOption.option2=this.waterCategoryCheckOption.option2.map(item => {
        return {
          ...item,
          checked: false
        };
      });
      this.waterCategoryCheckOption.option3=this.waterCategoryCheckOption.option3.map(item => {
        return {
          ...item,
          checked: false
        };
      });
      this.waterCategoryCheckOption.option4=this.waterCategoryCheckOption.option4.map(item => {
        return {
          ...item,
          checked: (item.value=='不涉及以上类别')
        };
      });
    }
  }

  doSlctWater(){
    let checkOptionArr=this.waterCategoryCheckOption.option4.filter(item=>{
      return (item.value=='不涉及以上类别' && item.checked==true);
    });
    if(checkOptionArr!=null && checkOptionArr.length>0){
      //清空子项
      this.deleteCurByParent();
      /*this.tableData[this.curEnvironmentalFactors].receptors=[];
      let oneChildTableData = this.getOneChildTableData();
      oneChildTableData.category="无";
      oneChildTableData.category1="不涉及以上类别";
      oneChildTableData.pointName="/";
      oneChildTableData.position="/";
      oneChildTableData.pointName="/";
      oneChildTableData.peopleNumber="/";
      oneChildTableData.emergencyContact="/";
      oneChildTableData.contactNumber="/";
      this.tableData[this.curEnvironmentalFactors].receptors.push(oneChildTableData);*/
    }else{
      checkOptionArr=
      [
        ...this.waterCategoryCheckOption.option1.filter(item=>{return item.checked==true;}),
        ...this.waterCategoryCheckOption.option2.filter(item=>{return item.checked==true;}),
        ...this.waterCategoryCheckOption.option3.filter(item=>{return item.checked==true;}),
        ...this.waterCategoryCheckOption.option4.filter(item=>{return item.checked==true;})
      ];
      if(checkOptionArr!=null && checkOptionArr.length>0){
        this.tableData[this.curEnvironmentalFactors].receptors=this.tableData[this.curEnvironmentalFactors].receptors
          .filter(item=>(item.category1!=null && item.category1!="" && item.category1!="不涉及以上类别"));
        checkOptionArr.forEach(item=>{
          if(item.value!="废水排入受纳水体后24小时流经范围（按受纳河流最大日均流速计算）内涉及跨国界的"
            && item.value!="企业雨水排口、清净废水排口、污水排口下游10公里流经范围内涉及跨省的"
            && item.value!="溶岩地貌" && item.value!="泄洪区" && item.value!="泥石流"
          ){
            let oneChildTableData = this.getOneChildTableData();
            oneChildTableData.category=item.value;
            oneChildTableData.category1=item.value;
            if(item.value=="其他受纳水体"){
              oneChildTableData.category="";
            }
            this.tableData[this.curEnvironmentalFactors].receptors.push(oneChildTableData);
          }
        });
      }
    }
    this.waterModal=false;
  }

  soilCategoryCheckOptionChange(){
    let option=this.soilCategoryCheckOption.filter(item=>{
      return (item.value=='不涉及以上类别' && item.checked==true);
    });
    if(option!=null && option.length>0){
      this.soilCategoryCheckOption = this.soilCategoryCheckOption.map(item => {
        return {
          ...item,
          checked: (item.value=='不涉及以上类别')
        };
      });
    }
  }

  doSlctSoil(){
    let checkOptionArr=this.soilCategoryCheckOption.filter(item=>{
      return (item.value=='不涉及以上类别' && item.checked==true);
    });
    if(checkOptionArr!=null && checkOptionArr.length>0){
      //清空子项
      this.deleteCurByParent();
      /*this.tableData[this.curEnvironmentalFactors].receptors=[];
      let oneChildTableData = this.getOneChildTableData();
      oneChildTableData.category="无";
      oneChildTableData.category1="不涉及以上类别";
      oneChildTableData.pointName="/";
      oneChildTableData.position="/";
      oneChildTableData.pointName="/";
      oneChildTableData.peopleNumber="/";
      oneChildTableData.emergencyContact="/";
      oneChildTableData.contactNumber="/";
      this.tableData[this.curEnvironmentalFactors].receptors.push(oneChildTableData);*/
      //this.addChildren(this.curEnvironmentalFactors);
    }else{
      checkOptionArr=this.soilCategoryCheckOption.filter(item=>{return item.checked==true;});
      if(checkOptionArr!=null && checkOptionArr.length>0){
        this.tableData[this.curEnvironmentalFactors].receptors=this.tableData[this.curEnvironmentalFactors].receptors
          .filter(item=>(item.category1!=null && item.category1!="" && item.category1!="不涉及以上类别"));
        checkOptionArr.forEach(item=>{
          let oneChildTableData = this.getOneChildTableData();
          oneChildTableData.category=item.value;
          oneChildTableData.category1=item.value;
          if(item.value=="其他土地类别"){
            oneChildTableData.category="";
          }
          this.tableData[this.curEnvironmentalFactors].receptors.push(oneChildTableData);
        });
      }
    }
    this.soilModal=false;
  }

  slctCategory(index) {
    this.curEnvironmentalFactors=index;
    let environmentalFactors = this.tableData[index].environmentalFactors;
    if (environmentalFactors != null) {
      if (environmentalFactors == "1") {//大气
        this.atmosphereCategoryCheckOption = this.atmosphereCategoryCheckOption.map(item => {
            return {
              ...item,
              checked: false
            };
        });
        this.atmosphereModal = true;
      }
      if (environmentalFactors == "2") {//水
        this.waterCategoryCheckOption.option1= this.waterCategoryCheckOption.option1.map(item => {
          return {
            ...item,
            checked: false
          };
        });
        this.waterCategoryCheckOption.option2 = this.waterCategoryCheckOption.option2.map(item => {
          return {
            ...item,
            checked: false
          };
        });
        this.waterCategoryCheckOption.option3 = this.waterCategoryCheckOption.option3.map(item => {
          return {
            ...item,
            checked: false
          };
        });
        this.waterCategoryCheckOption.option4 = this.waterCategoryCheckOption.option4.map(item => {
          return {
            ...item,
            checked: false
          };
        });
        this.waterModal=true;
      }
      if (environmentalFactors == "3") {//土壤
        this.soilCategoryCheckOption=this.soilCategoryCheckOption.map(item => {
          return {
            ...item,
            checked: false
          };
        });
        this.soilModal=true;
      }
    }
  }

  getAtmosphereSpecificInstructions(index):String{
    let _this=this;
    let category500m={have:[],noHave:[]};
    let category5km={have:[],noHave:[]};
    let category5kmSecret={have:[],noHave:[]};
    let noCategory5kmSecret={noHave:[]};
    let receptors = _this.tableData[index].receptors;
    if(receptors && receptors.length>0){
      let noInvolve=receptors.filter(item=>{return item.category1=="不涉及以上类别"});
      if(noInvolve!=null && noInvolve.length>0){
        noCategory5kmSecret.noHave= _this.atmosphereCategoryCheckOption
          .filter(item=>{return item.value!="不涉及以上类别"})
          .map(item => {return item.value;});
        return "本企业周边5km内不涉及 "+noCategory5kmSecret.noHave.join(",")+" 等区域。";
      }else{
        let returnStr="";
        let numRe=new RegExp("^[0-9]{1,}(.[0-9]{1,})?$")
        receptors.forEach(item=>{
          if(numRe.test(item.recentDistance)){
            let recentDistance= parseFloat(item.recentDistance);
            if(item.category1=="军事禁区" || item.category1=="军事管理区" || item.category1=="国家相关保密区域;"){
              if(recentDistance<=5000){
                category5kmSecret.have.push(item);
              }
            }else{
              if(recentDistance<=500){
                category500m.have.push(item);
              }else if(recentDistance<=5000){
                category5km.have.push(item);
              }
            }
          }
        });
        if(category500m.have.length>0){
          //returnStr=""
          let categoryName="";
          let peopleNumber=0;
          category500m.have.forEach(item=>{
            categoryName+=item.category1+",";
            if(numRe.test(item.peopleNumber)){
              peopleNumber+=parseFloat(item.peopleNumber);
            }
          });
          categoryName=categoryName.replace(/,$/,"");
          returnStr+="本企业周边500米范围内"+categoryName+"等人口总数约为"+peopleNumber+"人;";
        }
        if(category5km.have.length>0){
          let categoryName="";
          let peopleNumber=0;
          category5km.have.forEach(item=>{
            categoryName+=item.category1+",";
            if(numRe.test(item.peopleNumber)){
              peopleNumber+=parseFloat(item.peopleNumber);
            }
          });
          categoryName=categoryName.replace(/,$/,"");
          returnStr+="本企业周边5km范围内"+categoryName+" 等人口总数约为"+peopleNumber+"人;";
          //category5km.noHave=_this.getNoRepeat(_this.atmosphereCategoryCheckOption,category5km.have);
        }
        if(category5kmSecret.have.length>0){
          let categoryName="";
          category5kmSecret.have.forEach(item=>{
            categoryName+=item.category1+",";
          });
          categoryName=categoryName.replace(/,$/,"");
          returnStr+="本企业周边5km内涉及"+categoryName+"等区域;";
        }
        return returnStr;
      }
    }
    return "";
  }

  getSoilSpecificInstructions(index):String{
    let _this=this;
    let receptors = _this.tableData[index].receptors;
    if(receptors && receptors.length>0){
      let noInvolve=receptors.filter(item=>{return item.category1=="不涉及以上类别"});
      if(noInvolve!=null && noInvolve.length>0){
        return "本企业周边不涉及基本农田保护区、居住商用地等土壤受体;";
      }else{
        let returnStr="本企业周边土壤受体主要为";
        returnStr+=receptors.map(item=>{
          return item.category1;
        }).join(",")+";";
        return returnStr;
      }
    }
    return "";
  }

  specificInstructionsBlur(index){
    let environmentalFactors = this.tableData[index].environmentalFactors;
    if (environmentalFactors != null) {
      if (environmentalFactors == "1") {//大气
        this.tableData[index].specificInstructions=this.getAtmosphereSpecificInstructions(index);
      }
      if (environmentalFactors == "3") {//土壤
        this.tableData[index].specificInstructions=this.getSoilSpecificInstructions(index);
      }
    }
  }
  getEnvironmentalFactorsName(environmentalFactors): String {
    if (environmentalFactors != null) {
      if (environmentalFactors == "1") {
        return "大气";
      }
      if (environmentalFactors == "2") {
        return "水";
      }
      if (environmentalFactors == "3") {
        return "土壤";
      }
    }
  }

  getOneChildTableData() {
    return {
      peopleNumber: null,
      pointName: null,
      emergencyContact: null,
      contactNumber: null,
      id: null,
      position: null,
      category: null,
      category1:null,
      recentDistance: null
    };
  }

  addChildren(index) {
    let oneChildTableData = this.getOneChildTableData();
    this.tableData[index].receptors.push(oneChildTableData);
  }

  delChildren(index, cIndex) {
    let _this = this;
    let id = _this.tableData[index].receptors[cIndex].id;
    if (id == "") {
      _this.deleteChildren(index, cIndex);
    } else {
      _this.httpClientService.post("ecp","ecpCommon.deleteRow",{id:id,type:"borderRiskReceptor1"})
        .then(function(data){
          _this.deleteChildren(index,cIndex);
        },function(err){
          _this.message.error(err);
        });
    }
  }

  deleteChildren(index, cIndex) {
    this.tableData[index].receptors.splice(cIndex, 1);
    if (this.tableData[index].receptors.length == 0) {
      this.addChildren(index);
    }
  }

  deleteCurByParent(){
    let _this=this;
    _this.httpClientService.post("ecp","ecpCommon.deleteRow",{id:this.tableData[this.curEnvironmentalFactors].environmentalFactors,type:"borderRiskReceptor"})
      .then(function(data){
        _this.tableData[_this.curEnvironmentalFactors].receptors=[];
        let oneChildTableData = _this.getOneChildTableData();
        oneChildTableData.category="无";
        oneChildTableData.category1="不涉及以上类别";
        oneChildTableData.pointName="/";
        oneChildTableData.position="/";
        oneChildTableData.recentDistance="/";
        oneChildTableData.peopleNumber="/";
        oneChildTableData.emergencyContact="/";
        oneChildTableData.contactNumber="/";
        _this.tableData[_this.curEnvironmentalFactors].receptors.push(oneChildTableData);
      },function(err){
        _this.message.error(err);
      });
  }

  save() {
    let _this=this;
    let submitData:any=new Object();
    submitData.projectId=_this.id;
    submitData.userId=1;
    submitData.jsonData=_this.tableData;
    _this.httpClientService.post("ecp","riskAssassment.updateCompanyBorderRiskReceptor",submitData)
      .then(function(data:any){
        _this.message.success("保存成功");
      },function(err){
        _this.message.error(err);
      });
  }

  next() {
    let _this=this;
    _this.isPassValid = true;
    if(_this.isPassValid){
      let submitData:any=new Object();
      submitData.projectId=_this.id;
      submitData.userId=1;
      submitData.jsonData=_this.tableData;
      _this.httpClientService.post("ecp","riskAssassment.updateCompanyBorderRiskReceptor",submitData)
        .then(function(data:any){
          _this.router.navigateByUrl("assess/company/risk/"+_this.id);
        },function(err){
          _this.message.error(err);
        });
    }
  }

  /*turnData(){
    if(this.tableData && this.tableData!=null && this.tableData.length>0){
      this.tableData.forEach(item=>{
        if(item.receptors && item.receptors!=null && item.receptors.length>0){
          item.receptors.forEach(cItem=>{
            cItem.category1=cItem.category;
          });
        }
      });
    }
  }*/

  initData() {
    let _this = this;
    _this.httpClientService.post("ecp", "riskAssassment.getCompanyBorderRiskReceptor", {projectId: _this.id, userId: 1})
      .then(function (data: any) {
        _this.tableData = data;
        //_this.turnData();
      }, function (err) {
        _this.message.error(err);
      });
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.initData();
  }

}
