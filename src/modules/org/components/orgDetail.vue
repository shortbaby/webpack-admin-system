<template>
	<div style="position:relative;">			
	    
		<transition name="slide-down">
			<div v-show="!showAddClass" class="org-detail-wrap">
				<top-head title="机构详情" v-on:clickright="hide"></top-head>
				<!-- <span class="icon icon-times" @click="hide"></span> -->
				<div class="clazz-panel">
					<el-row class="info-wrap">
					    <el-col :span="6">
					    	<div class="panel-item info">
					    		<label>
					    			<span class="iconfont icon-organization"></span>
					    		</label>
					    		<p>{{orgInfo.name}}</p>
					    	</div>
					    </el-col>
					    <el-col :span="3">
					    	<div class="panel-item">
					    		<p>{{orgInfo.city}}</p>
					    		<p class="gutter"><span>机构城市</span></p>
					    		<p v-if="orgInfo.category">{{orgInfo.category}}</p>
					    		<p v-else>--</p>
					    		<p><span>品类</span></p>
					    	</div>
					    </el-col>
					    <el-col :span="4">
					    	<div class="panel-item">
					    		<p v-if="orgInfo.headquartersStaff">{{orgInfo.headquartersStaff}}</p>
					    		<p v-else>--</p>
					    		<p class="gutter"><span>总部跟进人</span></p>
					    		<p v-if="orgInfo.saleStaff">{{orgInfo.saleStaff}}</p>
					    		<p v-else>--</p>
					    		<p><span>销售跟进人</span></p>
					    	</div>
					    </el-col>
					    <el-col :span="4">
					    	<div class="panel-item">
					    		<p>{{orgInfo.contractAmount}}</p>
					    		<p class="gutter"><span>合同总额</span></p>
					    		<p>{{orgInfo.contractNumber}}</p>
					    		<p><span>合同个数</span></p>
					    	</div>
					    </el-col>
					    <el-col :span="4">
					    	<div class="panel-item">
					    		<p>{{orgInfo.classesNumber}}</p>
					    		<p class="gutter"><span>已报班级</span></p>
					    		<p>{{orgInfo.studentNumber}}</p>
					    		<p><span>学员数量</span></p>
					    	</div>
					    </el-col>
					    <el-col :span="3">
					    	<div class="panel-buttons">
					    		<el-button type="primary" @click.native="notice" v-if="showNoticeAuth">发通知</el-button>
					    		<br/>
					    		<br/>
					    		<el-button type="primary" @click.native="addClass" v-if="showJoinClassAuth">学员报班</el-button>
					    	</div>
					    </el-col>
					</el-row>
				</div>
				<div v-show="showAddBtn" class="addstudent-control" @click="showAddStudent" v-if="showAddStudentAuth">
					<!-- <span class="icon-plus icon">新增学员</span> -->
					<span>新增学员</span>
				</div>
				<div v-show="showRecordBtn" class="record-control" @click="showRecordDetail">
					<span>查看报班记录</span>
				</div>	
				<div class="org-content-wrap">
					<div>
						<el-tabs @tab-click="changeTab">
						    <el-tab-pane label="基本资料" name="basic"></el-tab-pane>
						    <el-tab-pane label="班级" name="clazz"></el-tab-pane>
						    <el-tab-pane label="跟进记录" name="follow"></el-tab-pane>
						    <el-tab-pane label="课程消耗" name="consume"></el-tab-pane>
						    <el-tab-pane label="合同" name="contract"></el-tab-pane>
						    <el-tab-pane label="学员" name="student"></el-tab-pane>
						</el-tabs>
					</div>
					<transition name="component-fade" mode="out-in">
						<keep-alive>
							<component v-bind:is="view" :id="id" :status="addStudentStatus" v-on:close="closeAddStudent" :type="type"></component>
						</keep-alive>
					</transition>
				</div>
				<notice v-if="showNotice" v-on:close="closeNotice" :ids="selectedIds" :orglist="selectedOrgs" :type="type"></notice>
			</div>
		</transition>
		<transition name="slide-right">
	    	<add-class 
	    		v-if="showAddClass"
	    		:id="id" 
	            v-on:hide="hideAddClass"
	            :type="type">
	        </add-class>
		</transition>
	</div>
</template>
<script>
	import TopHead from '../../../common/components/TopHead.vue';
	import Basic from './basic.vue';
	import Class from './class.vue';
	import Follow from './follow.vue';
	import Consume from './consume.vue';
	import Contract from './contract.vue';
	import Student from './student.vue';
	import addClass from './addClass.vue';
	import notice from './notice.vue';
	import {getOrgInfo} from '../request';
	export default {
		data() {
			return {
				view: 'basic',
				showAddBtn: false,
				showRecordBtn: false,
				showAddClass: false,
				addStudentStatus: false,
				showNotice: false,
				orgInfo: {
					id: 0,
					name:'',
			        city: '',
			        category: '',
			        headquartersStaff: '',
			        saleStaff: '',
			        contractAmount: 0,
			        contractNumber: 0,
			        classesNumber: 0,
			        studentNumber: 0
				},
				selectedIds: [],
				selectedOrgs: []
			}
		},
		props: {
			id: {
				type: Number
			},
			type: {
				type: String
			}
		},
		computed: {
			showNoticeAuth() {
				return this.$route.path == '/org/allOrg' ? this.$TX_AUTH[139] : this.$TX_AUTH[130];
			},
			showJoinClassAuth() {
				return this.$route.path == '/org/allOrg' ? this.$TX_AUTH[142] : this.$TX_AUTH[133];
			},
			showAddStudentAuth() {
				return this.$route.path == '/org/allOrg' ? this.$TX_AUTH[144] : this.$TX_AUTH[135];
			}
		},
		watch: {
			/**
			 * 切换到学员栏时显示“添加学员”按钮
			 */
			view (val) {
				if (val === 'student') {
					this.showAddBtn = true;
					this.showRecordBtn = false;
				} 
				else if (val === 'clazz') {
					this.showRecordBtn = true;
					this.showAddBtn = false;
				}
				else {
					this.showAddBtn = false;
					this.showRecordBtn = false;
				}
			}
		},
		created() {
			this.getOrgInfo();
		},
		methods: {
			getOrgInfo () {
				var param = {
					orgId: this.id
				};
				getOrgInfo(param)
					.then((res) => {
						this.orgInfo = res.data;
						var obj = {
							id: res.data.id,
							name: res.data.name
						};
						this.selectedIds.push(res.data.id);
						this.selectedOrgs.push(obj);
					});
			},
			notice() {
				this.showNotice = true;
			},
			closeNotice () {
				this.showNotice = false;
				removeBodyModal();
			},
			/**
			 * 关闭当前页面
			 */
			hide() {
				this.$emit('hide', 0);
			},
			/**
			 * 显示报班页面
			 */
			addClass() {
				this.showAddClass = true;
			},
			/**
			 * tab切换事件
			 */
			changeTab(val) {
				//console.log(val);
				this.view = val;
			},
			/**
			 * 显示新增学员弹框
			 */
			showAddStudent() {
				this.addStudentStatus = true;
				//this.$store.dispatch('showAddStudent');
			},
			closeAddStudent() {
				this.addStudentStatus = false;
				removeBodyModal();
			},
			/**
			 * 显示报班记录详情
			 */
			showRecordDetail() {
				this.$store.dispatch('showRecords');
			},
			/**
			 * 关闭报班页面
			 */
			hideAddClass() {
				this.showAddClass = false;
				removeBodyModal();
			}
		},
		components: {
			basic: Basic,
			clazz: Class,
			follow: Follow,
			consume: Consume,
			contract: Contract,
			student: Student,
			addClass: addClass,
			topHead: TopHead,
			notice
		}
	}
</script>
<style lang="sass">
	.org-detail-wrap {
	    // opacity: 1;
		position: absolute;
		top: 0px;
		left: 0;
		width: 100%;
		box-sizing: border-box;
		.icon-times {
		    position: absolute;
		    z-index: 10;
		    right: 20px;
		    top: 10px;
		    font-size: 24px;
		    cursor: pointer;
		}
		.record-control, .addstudent-control {
			float: right;
			position: relative;
			top: 15px;
			right: 30px;		
			width: 100px;
			text-align: center;
			background-color: #ffbd47;
			height: 35px; 
			line-height: 35px;
			border-radius: 4px;
			color: #fff;
		}
		.clazz-panel {
			margin: 30px;
			background-color: #fff;
			padding: 20px;
			border: 1px solid #e6e6e6;
			overflow: auto;
			.info-wrap {
				min-width: 1100px;
			}
		    .panel-item {
		    	height: 95px;
		    	border-right: 1px solid #ddd;
		    	label {
		    		float: left;
		    		width: 55px;
		    		font-size: 38px;
		    	}
		    	p {
		    		text-align: center;
		    		font-size: 15px;
		    		span {
		    			color: #99a9bf;
		    			font-size: 13px;
		    		}
		    		&.gutter {
		    			margin-bottom: 10px;
		    		}
		    	}		    	
		    }
		    .info {
	    		line-height: 95px;
	    		p {
	    			float: left;
	    			text-align: left;
	    			font-size: 18px;
	    			margin-top: 5px;
	    			max-width: 200px;
				    white-space: nowrap;
				    overflow: hidden;
				    text-overflow: ellipsis;
	    		}
	    		.iconfont {
	    			font-size: 36px;
	    		}
	    	}
		    .panel-buttons {
		    	text-align: center;
		    }
		}
		.org-content-wrap {
			margin-top: 30px;
			border-top: 1px solid #ebebeb;
			padding: 0 30px;
		}
	}
</style>