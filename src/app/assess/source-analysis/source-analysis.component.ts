import { Component, OnInit } from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';

import {ActivatedRoute, Router} from '@angular/router';

import {HttpClientService} from '../../service/httpClientService';

@Component({
  selector: 'app-assess-source-analysis',
  templateUrl: './source-analysis.component.html',
  styleUrls: ['./source-analysis.component.css'],
	providers: [HttpClientService]
})
export class SourceAnalysisComponent implements OnInit {

  constructor(
	private router: Router,
	private activatedRoute: ActivatedRoute,
	private httpClientService: HttpClientService,
	private message: NzMessageService
	) { }
	
	id = "";
	isPassValid: boolean = true;
	tableData:Array<any>=[];
	physicalAndChemicalModal:boolean=false;
	physicalAndChemicalSearch:any={
		name:""
	};
	physicalAndChemical={
		ID:null,
		AddUser:null,
		AddTime:null,
		ModifyUser:null,
		ModifyTime:null,
		DelFlag:null,
		ChemicalsChinese:null,
		ChemicalsEnglish:null,
		ChemicalsChinese2:null,
		ChemicalsEnglish2:null,
		TechnicalInstructionsCode:null,
		CasNo:null,
		MolecularFormula:null,
		MolecularWeight:null,
		HarmfulComponents:null,
		HarmfulSubstanceContent:null,
		HarmfulSubstanceCasNo:null,
		RtecsNo:null,
		HazardIdentification:null,
		InvasionPathway:null,
		HealthHazard:null,
		EnvironmentalHazards:null,
		RiskOfExplosion:null,
		SkinContact:null,
		EyeContact:null,
		Inhalation:null,
		Ingestion:null,
		HazardCharacteristics:null,
		Flammability:null,
		ReactiveActivity:null,
		HarmfulCombustionProducts:null,
		ExtinguishingMode:null,
		EmergencyManagement:null,
		SmallLeakage:null,
		MassLeakage:null,
		ERGGuide:null,
		ERGGuidelines:null,
		OperationalConsiderations:null,
		StorageConsiderations:null,
		OccupationalExposureLimits:null,
		OlfactoryThreshold:null,
		MonitoringMethod:null,
		EngineeringControl:null,
		RespiratorySystemProtection:null,
		EyeProtection:null,
		BodyProtection:null,
		HandProtection:null,
		OtherProtection:null,
		MainComponent:null,
		Appearance:null,
		PH:null,
		MeltingPoint:null,
		AtmosphericBoiling:null,
		CriticalPressure:null,
		HeatOfVaporization:null,
		LiquidDensity:null,
		RelativeDensity:null,
		SpecificHeat:null,
		GasAdiabatic:null,
		SteamDensity:null,
		RelativeVaporDensity:null,
		SaturatedVapor:null,
		CombustionHeat:null,
		CriticalTemperature:null,
		CriticalPressureBoiling:null,
		Logarithmic:null,
		Combustibility:null,
		Suggested:null,
		FlashPoint:null,
		Spontaneous:null,
		Ignition:null,
		Explosion:null,
		LowerExplosion:null,
		Solubility:null,
		MainUses:null,
		Properties:null,
		Stability:null,
		ProhibitedSubstance:null,
		Conditions:null,
		Polymerization:null,
		Decomposition:null,
		Acute:null,
		Subacute:null,
		Thrill:null,
		Allergenic:null,
		Reproductive:null,
		Mutagenicity:null,
		Teratogenicity:null,
		Carcinogenicity:null,
		Ecotoxicological:null,
		Biodegradability:null,
		NonBiodegradability:null,
		Bioconcentration:null,
		OtherHarmfulEffects:null,
		WasteProperty:null,
		WasteDisposalMethods:null,
		Abandoned:null,
		IMDGRulePageNumber:null,
		DangerousGoodsNumber:null,
		UNNumber:null,
		PackagingMarks:null,
		PackagingCategory:null,
		PackagingMethod:null,
		Transportation:null,
		RegulatoryInformation:null,
		Reference:null,
		FillingDepartment:null,
		DataAuditUnit:null,
		Modification:null,
		OtherInformation:null
	};
	
	
	physicalAndChemicalSch(){
		let _this=this;
		_this.httpClientService.post("ecp", "ecpCommon.getPhysicochemicalProperties", _this.physicalAndChemicalSearch)
		  .then(function (data: any) {
				if(data.properties && data.properties!=null){
					_this.physicalAndChemical=data.properties;
				}
		  }, function (err) {
		    _this.message.error(err);
		  });
	}
	
	save(){
		let _this=this;
		_this.restoreTableData();
		let submitData:any=new Object();
		submitData.projectId=_this.id;
		submitData.userId=1;
		submitData.jsonData=_this.tableData;
		_this.httpClientService.post("ecp","riskAssassment.updateScenario",submitData)
		.then(function(data:any){
			_this.message.success("保存成功");
		},function(err){
			_this.message.error(err);
		});
	}
	
	next(){
		let _this=this;
		_this.isPassValid = true;
		if(_this.isPassValid){
			_this.restoreTableData();
			let submitData:any=new Object();
			submitData.projectId=_this.id;
			submitData.userId=1;
			submitData.jsonData=_this.tableData;
			_this.httpClientService.post("ecp","riskAssassment.updateScenario",submitData)
			.then(function(data:any){
				_this.router.navigateByUrl("assess/consequence/resourceAnalysis/"+_this.id);
			},function(err){
				_this.message.error(err);
			});
		}
	}
	
	trunTableData(){
	  let _this=this;
	  _this.tableData.forEach(item=>{
	    item.pollutionTypesArray=item.pollutionTypes.split(";")
	  });
	}
	
	restoreTableData(){
	  let _this=this;
	  _this.tableData.forEach(item=>{
	    item.pollutionTypes=item.pollutionTypesArray.join(";");
	  });
	}
	
	initData(){
		let _this = this;
		_this.httpClientService.post("ecp", "riskAssassment.getScenario", {projectId: _this.id, userId: 1})
		  .then(function (data: any) {
		    _this.tableData = data;
				_this.trunTableData();
		  }, function (err) {
		    _this.message.error(err);
		  });
	}
	
  ngOnInit() {
		this.id = this.activatedRoute.snapshot.paramMap.get('id');
		this.initData();
  }
}
