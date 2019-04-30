import { SurveyIndexComponent } from './survey/survey-index.component';
import { SurveyCompanyBaseComponent } from './survey/company-base/company-base.component';
import { EmergencyOrgComponent } from './survey/emergency-org/emergency-org.component';
import { EmergencyContactComponent } from './survey/emergency-contact/emergency-contact.component';
import { EmergencyEquipComponent } from './survey/emergency-equip/emergency-equip.component';
import { EmergencyPlaceComponent } from './survey/emergency-place/emergency-place.component';
import { EmergencyResultComponent } from './survey/emergency-result/emergency-result.component';

import { AssessIndexComponent } from './assess/assess-index.component';;
import { AssessCompanyBaseComponent } from './assess/company-base/company-base.component';
import { NaturalEnvironmentComponent } from './assess/natural-environment/natural-environment.component';
import { EnvironmentQualityComponent } from './assess/environment-quality/environment-quality.component';
import { ProductCraftComponent } from './assess/product-craft/product-craft.component';
import { CraftStatisticsComponent } from './assess/craft-statistics/craft-statistics.component';
import { LinkAnalysisComponent } from './assess/link-analysis/link-analysis.component';
import { EquipmentListComponent } from './assess/equipment-list/equipment-list.component';
import { ManageSituationComponent } from './assess/manage-situation/manage-situation.component';
import {AcceptorStatisticsComponent} from './assess/acceptor-statistics/acceptor-statistics.component';
import { RiskIdentifyComponent } from './assess/risk-identify/risk-identify.component';
import { EmergencyMeasureComponent } from './assess/emergency-measure/emergency-measure.component';
import { EmergencyStatisticsComponent } from './assess/emergency-statistics/emergency-statistics.component';
import { EmergencySummaryComponent } from './assess/emergency-summary/emergency-summary.component';
import { ScenarioAnalysisComponent } from './assess/scenario-analysis/scenario-analysis.component';
import { SourceAnalysisComponent } from './assess/source-analysis/source-analysis.component';
import { ResourceAnalysisComponent } from './assess/resource-analysis/resource-analysis.component';
import { EnvironmentSummaryComponent } from './assess/environment-summary/environment-summary.component';
import { ConsequenceAnalysisComponent } from './assess/consequence-analysis/consequence-analysis.component';
import { GapAnalysisComponent } from './assess/gap-analysis/gap-analysis.component';
import { ReformImplementComponent } from './assess/reform-implement/reform-implement.component';
import { GasRiskComponent } from './assess/gas-risk/gas-risk.component';
import { WaterRiskComponent } from './assess/water-risk/water-risk.component';
import { CraftProcessComponent } from './assess/craft-process/craft-process.component';
import { GasAssessComponent } from './assess/gas-assess/gas-assess.component';
import { WaterAssessComponent } from './assess/water-assess/water-assess.component';
import { GasDivideComponent } from './assess/gas-divide/gas-divide.component';
import { WaterDivideComponent } from './assess/water-divide/water-divide.component';
import { LevelCalculateComponent } from './assess/level-calculate/level-calculate.component';

import { PlanIndexComponent } from './plan/plan-index.component';
import { PlanCompanyBaseComponent } from './plan/company-base/company-base.component';
import { EventLevelComponent } from './plan/event-level/event-level.component';
import { EmergencyExplainComponent } from './plan/emergency-explain/emergency-explain.component';
import { EmergencyMonitoringComponent } from './plan/emergency-monitoring/emergency-monitoring.component';
import { LinkMeasureComponent } from './plan/link-measure/link-measure.component';
import { EmergencyWarnComponent } from './plan/emergency-warn/emergency-warn.component';
import { ContactWayComponent } from './plan/contact-way/contact-way.component';

//应急资源
export const surveyRoutes=[
	{
		path:'survey/company',
		data:{
			title:'企业基本信息采集',//企业基本信息采集
			title1:'1',
			key:'survey-company',
			isOpen:false
		},
		component:SurveyIndexComponent,
		//redirectTo:'survey/company/base/:id',
		children:[
			{
				path:'base/:id',
				data:{
					title:'企业基本信息采集',
					title1:'1-1',
					key:'survey-company-base',
				},
				component:SurveyCompanyBaseComponent
			}
		]
	},
	{
		path:'survey/emergency',
		data:{
			title:'企业环境应急资源现状',//企业环境应急资源现状
			title1:'2',
			key:'environmen',
			isOpen:false
		},
		component:SurveyIndexComponent,
		//redirectTo:'survey/company/base/:id',
		children:[
			{
				path:'org/:id',
				data:{
					title:'企业内部应急救援组织架构表',//企业内部应急救援组织架构表,
					title1:'2-1',
					key:'survey-emergency-org',
				},
				component:EmergencyOrgComponent
			},
			{
				path:'contact/:id',
				data:{
					title:'企业外部应急救援机构及联系方式统计表',//企业外部应急救援机构及联系方式统计表
					title1:'2-2',
					key:'survey-emergency-contact',
				},
				component:EmergencyContactComponent
			},
			{
				path:'equip/:id',
				data:{
					title:'环境应急物资与装备调查表',//企业应急物资与装备调查表
					title1:'2-3',
					key:'survey-emergency-equip',
				},
				component:EmergencyEquipComponent
			},
			{
				path:'place/:id',
				data:{
					title:'环境应急场所表调查表',//环境应急场所调查表
					title1:'2-4',
					key:'survey-emergency-place',
				},
				component:EmergencyPlaceComponent
			}
		]
	},
	{
		path:'survey/result',
		data:{
			title:'企业环境应急资源调查结果与结论',//企业环境应急资源调查结果与结论
			title1:'3',
			key:'survey-result',
			isOpen:false
		},
		component:SurveyIndexComponent,
		children:[
			{
				path:'emergency/:id',
				data:{
					title:'企业环境应急资源调查结果与结论',//企业环境应急资源调查结果与结论,
					title1:'3-1',
					key:'survey-result-emergency',
				},
				component:EmergencyResultComponent
			}
		]
	}
]


//应急预案风险评估
export const assessRoutes=[
	{
		path:'assess/company',
		data:{
			title:'企业基本信息采集',//企业基本信息采集
      title1:"1",
			key:'assess-company',
			isOpen:false
		},
		component:AssessIndexComponent,
		children:[
			{
				path:'base/:id',
				data:{
					title:'企业基本信息采集',//企业基本信息采集表,
          title1:"1-1",
					key:'assess-company-base',
				},
				component:AssessCompanyBaseComponent
			},
			{
				path:'natural/:id',
				data:{
					title:'自然环境概况',
          title1:"1-2",
					key:'assess-company-natural'
				},
				component:NaturalEnvironmentComponent
			},
			{
				path:'quality/:id',
				data:{
					title:'环境功能区划及环境质量现状',
          title1:"1-3",
					key:'assess-company-quality'
				},
				component:EnvironmentQualityComponent
			},
			{
				path:'product/:id',
				data:{
					title:'生产工艺说明',
          title1:"1-4",
					key:'assess-company-product'
				},
				component:ProductCraftComponent
			},
			{
				path:'craft/:id',
				data:{
					title:'企业生产工艺统计表',
          title1:"1-5",
					key:'assess-company-craft'
				},
				component:CraftStatisticsComponent
			},
			{
				path:'analysis/:id',
				data:{
					title:'产污环节分析',
          title1:"1-6",
					key:'assess-company-analysis'
				},
				component:LinkAnalysisComponent
			},
			{
				path:'equipment/:id',
				data:{
					title:'主要生产设备一览表',
          title1:"1-7",
					key:'assess-company-equipment'
				},
				component:EquipmentListComponent
			},
			{
        path:'manage/:id',
        data:{
          title:'安全生产管理状况说明表',
          title1:"1-8",
          key:'assess-company-manage'
        },
        component:ManageSituationComponent
      },
      {
        path:'acceptor/:id',
        data:{
          title:'本企业厂区边界环境风险受体统计表',
          title1:"1-8",
          key:'assess-company-acceptor'
        },
        component:AcceptorStatisticsComponent
      },
			{
				path:'risk/:id',
				data:{
					title:'风险物质与风险单元辨识统计表',
          title1:"1-9",
					key:'assess-company-risk'
				},
				component:RiskIdentifyComponent
			},
			{
				path:'measure/:id',
				data:{
					title:'环境风险单元及现有风险防控与应急措施信息表',
          title1:"1-10",
					key:'assess-company-measure'
				},
				component:EmergencyMeasureComponent
			},
			{
				path:'emergencyStatistics/:id',
				data:{
					title:'环境风险物质统计表',
          title1:"1-11",
					key:'assess-company-emergencyStatistics'
				},
				component:EmergencyStatisticsComponent
			}
		]
	},
	{
		path:'assess/consequence',
		data:{
			title:'可能发生的突发环境事件及其后果情景分析',
      title1:"2",
			key:'assess-consequence',
			isOpen:false
		},
		component:AssessIndexComponent,
		children:[
			{
				path:'summary/:id',
				data:{
					title:'国内外同类企业突发环境事件汇总表',
          title1:"2-1",
					key:'assess-consequence-summary'
				},
				component:EmergencySummaryComponent
			},
			{
				path:'scenarioAnalysis/:id',
				data:{
					title:'可能发生的突发环境事件情景分析表',
          title1:"2-2",
					key:'assess-consequence-scenarioAnalysis'
				},
				component:ScenarioAnalysisComponent
			},
			{
				path:'sourceAnalysis/:id',
				data:{
					title:'突发环境事件源强分析表',
          title1:"2-3",
					key:'assess-consequence-sourceAnalysis'
				},
				component:SourceAnalysisComponent
			},
			{
				path:'resourceAnalysis/:id',
				data:{
					title:'大气污染事故风险物质释放途径、涉及环境风险防控与应急措施、应急资源情况分析表',
          title1:"2-4",
					key:'assess-consequence-resourceAnalysis'
				},
				component:ResourceAnalysisComponent
			},
			{
				path:'environmentSummary/:id',
				data:{
					title:'水污染、土壤污染事故风险物质释放途径、涉及环境风险防控与应急措施、应急资源情况分析表',
          title1:"2-5",
					key:'assess-consequence-environmentSummary'
				},
				component:EnvironmentSummaryComponent
			},
			{
				path:'consequenceAnalysis/:id',
				data:{
					title:'突发环境事件危害后果分析表',
          title1:"2-6",
					key:'assess-consequence-consequenceAnalysis'
				},
				component:ConsequenceAnalysisComponent
			}
		]
	},
	{
		path:'assess/measures',
		data:{
			title:'企业现有环境风险防控与应急措施差距分析',
      title1:"2-7",
			key:'assess-measures',
			isOpen:false
		},
		component:AssessIndexComponent,
		children:[
			{
				path:'gapAnalysis/:id',
				data:{
					title:'企业现有环境风险防控与应急措施差距分析',
          title1:"2-8",
					key:'assess-measures-gapAnalysis'
				},
				component:GapAnalysisComponent
			},
			{
				path:'reformImplement/:id',
				data:{
					title:'需要整改的项目及实施计划一览表',
          title1:"2-9",
					key:'assess-measures-reformImplement'
				},
				component:ReformImplementComponent
			}
		]
	},
	{
		path:'assess/calculate',
		data:{
			title:'风险评估计算器',
      title1:"3",
			key:'assess-calculate',
			isOpen:false
		},
		component:AssessIndexComponent,
		children:[
			{
				path:'gasRisk/:id',
				data:{
					title:'涉气风险物质数量与临界量比值(Q)',
          title1:"3-1",
					key:'assess-calculate-gasRisk'
				},
				component:GasRiskComponent
			},
			{
				path:'waterRisk/:id',
				data:{
					title:'涉水风险物质数量与临界量比值(Q)',
          title1:"3-2",
					key:'assess-calculate-waterRisk'
				},
				component:WaterRiskComponent
			},
			{
				path:'craftProcess/:id',
				data:{
					title:'企业生产工艺过程评估',
          title1:"3-3",
					key:'assess-calculate-craftProcess'
				},
				component:CraftProcessComponent
			},
			{
				path:'gasAssess/:id',
				data:{
					title:'涉气环境风险防控措施与突发大气环境事件发生情况评估',
          title1:"3-4",
					key:'assess-calculate-gasAssess'
				},
				component:GasAssessComponent
			},
			{
				path:'waterAssess/:id',
				data:{
					title:'涉水环境风险防控措施与突发水环境事件发生情况评估',
          title1:"3-5",
					key:'assess-calculate-waterAssess'
				},
				component:WaterAssessComponent
			},
			{
				path:'gasDivide/:id',
				data:{
					title:'大气环境风险受体敏感程度类型划分表',
          title1:"3-6",
					key:'assess-calculate-gasDivide'
				},
				component:GasDivideComponent
			},
			{
				path:'waterDivide/:id',
				data:{
					title:'水环境风险受体敏感程度类型划分',
          title1:"3-7",
					key:'assess-calculate-waterDivide'
				},
				component:WaterDivideComponent
			},
			{
				path:'levelCalculate/:id',
				data:{
					title:'企业环境风险等级计算表',
          title1:"3-8",
					key:'assess-calculate-levelCalculate'
				},
				component:LevelCalculateComponent
			}
		]
	}
]

//突发环境事件应急预案
export const planRoutes=[
	{
		path:'plan/company',
		data:{
			title:'企业基本信息采集',//企业基本信息采集
      title1:"1",
			key:'plan-company',
			isOpen:false
		},
		component:PlanIndexComponent,
		children:[
			{
				path:'base/:id',
				data:{
					title:'企业基本信息采集',//企业基本信息采集表,
          title1:"1-1",
					key:'plan-company-base',
				},
				component:PlanCompanyBaseComponent
			}
		]
	},
	{
		path:'plan/event',
		data:{
			title:'事件分级',
      title1:"2",
			key:'plan-event',
			isOpen:false
		},
		component:PlanIndexComponent,
		children:[
			{
				path:'level/:id',
				data:{
					title:'事件分级表',
          title1:"2-1",
					key:'plan-event-level'
				},
				component:EventLevelComponent
			}
		]
	},
	{
		path:'plan/explain',
		data:{
			title:'应急预案体系说明',
      title1:"3",
			key:'plan-explain',
			isOpen:false
		},
		component:PlanIndexComponent,
		children:[
			{
				path:'explain/:id',
				data:{
					title:'应急预案体系说明',
          title1:"3-1",
					key:'plan-explain-explain'
				},
				component:EmergencyExplainComponent
			}
		]
	},
	{
		path:'plan/preventWarn',
		data:{
			title:'预防与预警',
      title1:"4",
			key:'plan-preventWarn',
			isOpen:false
		},
		component:PlanIndexComponent,
		children:[
			{
				path:'monitoring/:id',
				data:{
					title:'环境风险源监控表',
          title1:"4-1",
					key:'plan-preventWarn-monitoring'
				},
				component:EmergencyMonitoringComponent
			},
			{
				path:'linkMeasure/:id',
				data:{
					title:'主要环节环境风险预防措施一览表',
          title1:"4-2",
					key:'plan-preventWarn-linkMeasure'
				},
				component:LinkMeasureComponent
			},
			{
				path:'emergencyWarn/:id',
				data:{
					title:'应急预警',
          title1:"4-3",
					key:'plan-preventWarn-emergencyWarn'
				},
				component:EmergencyWarnComponent
			}
		]
	},
	{
		path:'plan/contact',
		data:{
			title:'可能受影响的单位和居民代表联系方式',
      title1:"5",
			key:'plan-contact',
			isOpen:false
		},
		component:PlanIndexComponent,
		children:[
			{
				path:'contactWay/:id',
				data:{
					title:'突发环境事件可能受影响的主要单位和居民代表联系方式',
          title1:"5-1",
					key:'plan-contact-contactWay'
				},
				component:ContactWayComponent
			}
		]
	}
]
			
export const otherRoutes= [

/*********应急资源调查 - start*********/
	{path:'survey/companyBase/:id',component:SurveyCompanyBaseComponent}
/*********应急资源调查 - end*********/
];
