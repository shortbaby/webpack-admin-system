<!--
	@file 全部机构
	@author xujin
-->
<template>
	<div style="position: relative;">
		<div class="bread-navs">
            <el-breadcrumb separator=".">
                <el-breadcrumb-item v-for="item in breadOptions" 
                    @click.native="click(item)">
                    {{item.name}}
                </el-breadcrumb-item>
            </el-breadcrumb>
    	</div>
    	<transition name="slide-down">
	     	<div v-show="!showAddClass" style="position:relative;">
	    		<transition name="slide-right">
			    	<org-detail 
			    		v-if="showDetail"
			    		:id="orgId" 
			            v-on:hide="hideDetail"
			            :type="all">
			        </org-detail>
			    </transition>
				<transition name="slide-down">
					<div class="org-all-wrap" v-show="!showDetail">
						<div class="filt-wrap clearfix">
							<el-input placeholder="请输入内容" v-model="searchTxt" style="width: 300px;" class="l-pos mix-select">
								<el-select v-model="searchType" slot="prepend" style="width:100px;" placeholder="机构名称">
								    <el-option label="机构名称" value="orgName"></el-option>
								    <el-option label="学员名称" value="studentName"></el-option>
								    <el-option label="学员手机号" value="studentMobile"></el-option>
								</el-select>
								<el-button slot="append" icon="search" @click.native="searchList"></el-button>
							</el-input>
							<el-select
								class="l-pos sim-select"
							    v-model="searchObject.saleStaff"
							    placeholder="请输入销售跟进人"
							    @change="searchList">
							    <el-option
							      v-for="item in staffOptions"
							      :label="item.name"
							      :value="item.id">
							    </el-option>
							</el-select>
							<el-select v-model="searchObject.headquartersStaff" placeholder="所有总部跟进人" class="l-pos sim-select" @change="searchList">
							    <el-option
							      v-for="item in headquartersOptions"
							      :label="item.name"
							      :value="item.id">
							    </el-option>
						    </el-select>
							<el-select v-model="searchObject.category" placeholder="品类" class="l-pos sim-select" @change="searchList">
							    <el-option
							      v-for="item in categoryOptions"
							      :label="item.label"
							      :value="item.value">
							    </el-option>
						    </el-select>
							<region 
								mode="city" 
								class="l-pos sim-select" 
								:data="cityData" 
								v-on:selectcity="selectCity">				
							</region>
						    <el-select v-model="searchObject.studyStatus" placeholder="所有状态" class="l-pos sim-select" @change="searchList">
						    	<el-option label="请选择" value="0"></el-option>
							    <el-option label="在读" value="1"></el-option>
							    <el-option label="往期" value="2"></el-option>
						    </el-select>
						    <el-select v-model="searchObject.identity" placeholder="机构身份" class="l-pos sim-select" @change="searchList">
							    <el-option
							      v-for="item in indentityOptions"
							      :label="item"
							      :value="item">
							    </el-option>
						    </el-select>
						</div>
						<div class="filt-btn clearfix">
							<div class="l-pos">
								<span class="iconfont icon-organization count"></span>
								<span class="count">{{pageDto.count}}</span>
					            <span class="txt">机构信息</span>	
							</div>
							<div v-if="selectedCount" class="l-pos operate">
								<span>已选择{{selectedCount}}项：</span>
								<span class="colored" @click="notice" v-if="$TX_AUTH[139]">发通知</span>
								<span class="colored" @click="allocateHeader" v-if="$TX_AUTH[138]">分配总部跟进人</span>
								<span class="colored" @click="allocateStaff" v-if="$TX_AUTH[137]">分配销售跟进人</span>
							</div>
							<div class="r-pos">
								<el-button type="primary" @click.native="showImport" v-if="$TX_AUTH[110]">导入机构</el-button>
					            <el-button type="primary" @click.native="add" v-if="$TX_AUTH[109]">新增机构</el-button>
					            <span class="btn-set" @click="setHeader"><span class="iconfont icon-setting" title="设置"></span></span>
							</div>
						</div>
						<div style="overflow-x: auto;">
					        <table class="org-table">
					        	<thead>
					        		<tr>
						        		<th>
						        			<el-checkbox v-model="allSelected" @click.native.prevent="getAllSelected()"></el-checkbox>
						        		</th>
						        		<th v-for="item in tableHead" v-if="!item.hidden">{{item.showName}}</th>
						        		<th>操作</th>
						        	</tr>
					        	</thead>
					        	<tbody>
					        		<tr v-for="item in tableData" @click="rowClick(item, $event)">
						        		<td>
						        			<el-checkbox v-model="item.selected" @change="getSelected(item.selected)" @click.native.stop=""></el-checkbox>
						        		</td>
						        		<td v-for="ind in order">{{item[ind]}}</td>
						        		<td>
						        			<el-dropdown class="process-dropdown" trigger="click"  v-if="$TX_AUTH[140] || $TX_AUTH[141] || $TX_AUTH[142]">
							                    <span class="el-dropdown-link" @click.stop="">
							                        操作<i class="el-icon-caret-bottom el-icon-right"></i>
							                    </span>
							                    <el-dropdown-menu slot="dropdown">
											        <el-dropdown-item @click.native="edit(item)" v-if="$TX_AUTH[140]">编辑</el-dropdown-item>
											    	<el-dropdown-item @click.native="addClass(item)" v-if="$TX_AUTH[142]">报班</el-dropdown-item>
											    	<el-dropdown-item @click.native="delet(item)" v-if="$TX_AUTH[141]">删除</el-dropdown-item>
											    </el-dropdown-menu>
										    </el-dropdown>
						        		</td>
						        	</tr>
					        	</tbody>
					        </table>
				          <div class="none-list" v-if="!tableData || tableData.length == 0">
					           <span>没有搜索到信息</span>
					      </div>
						</div>
					    <div class="pager">
					        <tx-pagination @currentchange="handleCurrentChange" :page-dto="pageDto">
				            </tx-pagination>
					    </div>	
					    <new-all v-if="showAdd" v-on:close="closeAdd" :id="editId" :type="1"></new-all>    
						<set-header v-if="setHeaderState" :type="2" v-on:hide="hideHeader"></set-header>
						<sale-staff v-if="showSaleStaff" v-on:close="closeSaleStaff" :ids="orgIds" :type="all"></sale-staff>
						<header-quarter v-if="showHeader" v-on:close="closeHeader" :ids="orgIds" :type="all"></header-quarter>
						<notice v-if="showNotice" v-on:close="closeNotice" :ids="selectedIds" :orglist="selectedOrgs" :type="all"></notice>
						<batch-import v-if="showBatch" v-on:close="closeImport"></batch-import>
					</div>
				</transition>	   			    	
    		</div>
    	</transition>
		<transition name="slide-right">
			<add-class v-if="showAddClass" v-on:hide="hideClass()" :id="orgId" :type="all"></add-class>
		</transition>
	</div>
</template>

<script>
	const breadcrumbs = [
        {
            name: '机构管理',
            path: '/org/allOrg'
        },
        {
            name:  '全部机构',
            path: '/org/allOrg'
        }
    ];
	import orgDetail from './components/orgDetail.vue';
	import addClass from './components/addClass.vue';
	import Vue from 'vue';
	import SetHeader from './components/SetHeader.vue';
	import batchImport from './components/import.vue';
	import newAll from './components/newAll.vue';
	import saleStaff from './components/saleStaff.vue';
	import headerQuarter from './components/headQuarter.vue';
	import notice from './components/notice.vue';
	import Region from '../../common/components/region/region.vue';
	import TxPagination from '../../common/components/TxPagination.vue';
	import {getSaleStaff, getHeadquarters, getPackageCourse, getCityList, getIdentity, getAllOrgList, deleteOrg} from './request';
	import $ from 'jquery';
	import config from './config';
	let options = config();
	export default {
		data() {
			return {
				tableHead: [],
				tableData: [],
				pageDto: {
					count: 0,
					pageNum: 1
				},
                /**
                 * 缺少名称和page页,发请求时加上
                 */
                searchObject: {
	                saleStaff: '',
	                headquartersStaff: '',
	                studyStatus: '',
	                identity: '',
	                category: '',  
                	province: '',
                	city: '',
                },
                staffOptions: [],
                searchType: 'orgName',
                searchTxt: '',
                categoryOptions: options.categoryOptions,
                packageOptions: null,
                headquartersOptions: null,
                indentityOptions: null,
                cityData: null,
                showAdd: false,
                editId: 0,
                setHeaderState: false,
                selectedIds: [],
                selectedOrgs: [],
				selectedCount: 0,
				showSaleStaff: false,
				orgIds: '',
				showHeader: false,
				showNotice: false,
				showBatch: false,
				searchObj: {},

				showDetail: false,
				showAddClass: false,
				orgId: 0,
				all: 'all',
				order: [],
				allSelected: false
			}
		},
		created () {
			this.getListHandle();
			//this.getPackageOptions();
			this.getStaffList();
			this.getHeadquartersOptions();
			this.getIdentityOptions();
			this.getCityOptions();
		},
		mounted() {
            this.$store.dispatch('updateBreadNavs', breadcrumbs);
        },
		methods: {
			/**
			 * 表格上checkbox选择后相关数据清空
			 */
			resetSelectedData () {
				this.selectedIds = [];
				this.selectedOrgs = [];
				this.orgIds = '';
			},
			/**
        	 * 监听table上的全选框
        	 */
			getAllSelected(){
				this.resetSelectedData();
        		if (this.selectedCount != this.tableData.length) {
        			this.selectedCount = this.tableData.length;
        			this.tableData.forEach((elment) => {
        				elment.selected = true;
        				this.selectedIds.push(elment.id);
						let obj = {
							id: elment.id,
							name: elment.name
						};
						this.selectedOrgs.push(obj);
        			});
        			this.orgIds = this.selectedIds.join(',');
        			this.allSelected = true;
        		} else {
        			this.selectedCount = 0;
        			this.tableData.forEach((elment) => {
        				elment.selected = false;
        			});
        			this.allSelected = false;
        		}
			},
			/**
			 * 监听列表栏的checkbox
			 * @param  {Boolean} val 当前checkbox状态
			 */
			getSelected(val) {
				this.resetSelectedData();
				if (val) {
					this.selectedCount ++;
				} else {
					this.selectedCount -- ;
				}
				if (this.selectedCount) {
					if (this.selectedCount == this.tableData.length) {
						this.allSelected = true;
					} else {
						this.allSelected = false;
					}
					this.tableData.forEach((elment) => {
						if (elment.selected) {
							this.selectedIds.push(elment.id);
							var obj = {
								id: elment.id,
								name: elment.name
							};
							this.selectedOrgs.push(obj);
						}
					});
					this.orgIds = this.selectedIds.join(',');
				} else {
					this.allSelected = false;
				}
			},
			/**
			 * 刷新列表
			 */
			refresh() {
				this.getListHandle();
			},
			/**
			 * 获取套餐列表
			 */
			getPackageOptions () {
				var param = {
					name: '',
					type: 2
				};
				getPackageCourse(param)
					.then((res) => {
						this.packageOptions = res.data;
					});
			},
			/**
			 * 获取总部跟进人列表
			 */
			getHeadquartersOptions () {
				getHeadquarters()
					.then((res) => {
						this.headquartersOptions = res.data;
					});
			},
			/**
			 * 获取机构身份列表
			 */
			getIdentityOptions () {
				getIdentity()
					.then((res) => {
						this.indentityOptions = res.data;
					});
			},
			/**
			 * 获取城市列表
			 */
			getCityOptions () {
				getCityList()
					.then((res) => {
						this.cityData = res.data;
					});
			},
			/**
			 * 选择城市触发刷新列表请求
			 * @param  {Object} region 选择的城市区域
			 */
			selectCity (region) {
				this.searchObject.province = region.province;
				this.searchObject.city = region.areaId;
				this.refresh();
			},
			/**
			 * 获取列表请求
			 */
			getListHandle () {
				this.searchObj = {};
				this.searchObj[this.searchType] = this.searchTxt;
				var param = this.searchObj;
				if (this.searchObject.identity == '不限') {
					this.searchObject.identity = '';
				}
				if (this.searchObject.saleStaff == 0) {
					this.searchObject.saleStaff = null;
				}
				if (this.searchObject.headquartersStaff == 0) {
					this.searchObject.headquartersStaff = null;
				}
				$.extend(param, this.searchObject, {
					pageNum: this.pageDto.pageNum
				});
				this.$store.dispatch('showLoading');
				getAllOrgList(param)
					.then((res) => {
						var header = res.data.header;
						var data = res.data.result;
						this.pageDto = res.pageDto;
						this.dataConvert(header, data);
					})
					.always(() => {
						this.$store.dispatch('hideLoading');
					});
			},
			/**
			 * 拿到的表格数据进行重新组合
			 * @param  {Array} header 表头数组
			 * @param  {Array} data   表数据数组
			 */
			dataConvert(header, data){
				this.tableHead = header;
				this.tableData = [];
				this.order = [];  
				header.forEach((elment) => {
					if (!elment.hidden) {
						this.order.push(elment.name);
					}
				});
				data.forEach((elment) => {
					elment.selected = false;
					this.tableData.push(elment);
				});
			},
			/**
			 * 名称搜索查询
			 */
			searchList() {
				this.pageDto.pageNum = 1;
				this.refresh();
			},
			/**
			 * 模糊查询销售跟进人
			 * @param  {String}   queryString 模糊查询输入内容
			 * @param  {Function} cb          查询结果回调展示
			 */
		 	remoteMethod(query) {
		 		let name = query.replace(/(^\s*)|(\s*$)/g, "");
		 		if (name.length !== 0) {
		 			var param = {
						name: name
					};
					getSaleStaff(param)
						.then((res) => {
							this.queryOptions = res.data;
						});	
		 		}	 		
		 	},
		 	getStaffList() {
		 		getSaleStaff()
					.then((res) => {
						this.staffOptions = res.data;
					});
		 	},
			setHeader() {
            	this.setHeaderState = true;
            },
            hideHeader(isrefresh) {
            	this.setHeaderState = false;
            	removeBodyModal();
            	if (isrefresh) {
            		this.refresh();
            	}
            },
            showImport() {
            	this.showBatch = true;
            },
            closeImport(refresh) {
                this.showBatch = false;
                removeBodyModal();
                if (refresh) {
                	toast('success', '导入机构添加已到未生效列表');
                }
            },
            rowClick(item, event) {
            	//console.log(event.target);
            	if (event.target.className === 'el-dropdown-link') {
            		event.stopPropagation();
            		return;
            	}
        		this.orgId = item.id;
        		this.showDetail = true;
            },
            add() {
            	this.editId = 0;
            	this.showAdd = true;
            },
            /**
             * 关闭弹窗
             * @param {Boolean} refresh 是否需要刷新列表
             */
            closeAdd(refresh) {
            	if (refresh) {
            		this.refresh();
            	}
            	this.showAdd = false;
            	removeBodyModal();

            },
            edit(row) {
            	//console.log(row);
            	this.editId = row.id;
            	this.showAdd = true;
            },
            addClass(row) {
            	//console.log(row);
            	this.orgId = row.id;
            	this.showAddClass = true;
            },
            /**
             * 删除我的机构
             * @param  {Object} row 机构列表行信息
             */
            delet(row) {
            	var param = {
            		orgId: row.id
            	};
            	this.$confirm('此操作将删除机构, 是否继续?', '提示', {
	                    type: 'warning'
	                }).then(() => {
		            	deleteOrg(param).then((res) => {
		            		if (this.pageDto.curPageCount == 1) {
		            			this.pageDto.pageNum -- ;
		            		}
		            		this.refresh();
		            	});
		            });
            },
			/**
			 * 显示分配销售跟进人页面
			 */
			allocateStaff () {
				this.showSaleStaff = true;
			},
			/**
			 * 关闭分配销售跟进人页面
			 * @param {Boolean} refresh 判断是否刷新列表
			 */
			closeSaleStaff(refresh) {
				this.showSaleStaff = false;
				removeBodyModal();
				if (refresh) {
					this.refresh();
				}
			},
			allocateHeader (){
				this.showHeader = true;
			},
			closeHeader(refresh) {
				this.showHeader = false;
				removeBodyModal();
				if (refresh) {
					this.refresh();
				}
			},
			notice() {
				this.showNotice = true;
			},
			closeNotice () {
				this.showNotice = false;
				removeBodyModal();
			},
            handleCurrentChange(val) {
                this.pageDto.pageNum = val;
                this.refresh();
            },
			/**
			 * 关闭机构详情页面
			 */
            hideDetail() {
            	this.showDetail = false;
            },
            /**
			 * 关闭报班页面
			 */
            hideClass() {
            	this.showAddClass = false;
            },
			click(item) {
                window.router.push(item.path);
            }
        },
        computed: {
            breadOptions() {
                return this.$store.state.breadCrumbs;
            }
        },
		components: {
			orgDetail,
			addClass,
			notice,
			headerQuarter,
			SetHeader,
			batchImport,
			newAll,
			saleStaff,
			Region,
			TxPagination
		}
	}
	
</script>
<style lang="sass">
.org-all-wrap {
	position: absolute;
	top: 0px;
	left: 0;
	width: 100%;
	padding: 30px;
	box-sizing: border-box;
	.filt-wrap {
		.mix-select {
			margin-right: 15px;
			margin-bottom: 20px;
		}
		.sim-select {
			margin-right: 15px;
			margin-bottom: 20px;
			width: 150px;
		}
		.my-auto {
			i {
				display: none;
			}
		}
	}
	.filt-btn {
		margin: 5px 0 15px 0;
		line-height: 26px;
		.count {
			font-size: 36px;
		}
		.txt {
			font-size: 16px;
			color: #999;
			position: relative;
			top: -5px;
		}
		.btn-set {
			background-color: #fcba47;
			display: inline-block;
			height: 36px;
			width: 36px;
			cursor: pointer;
			line-height: 34px;
			text-align: center;
			border-radius: 4px;
			position: relative;
			.icon-setting {
				color: #fff;
				font-size: 18px;
				position: relative;
				top: 2px;
			}
		}
	}
	.operate {
		margin-left: 55px;
		padding-top: 10px;
		.colored {
			display: inline-block;
			margin-right: 10px;
			color: #fcba47;
			cursor: pointer;
		}
	}
}
.org-table {
	margin-bottom: 20px;
	background-color: #fff;
    min-width: 1000px;
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #e0e6ed;
    border-top: 2px solid #ffbd47;
    font-size: 14px;
    color: #1f2d3d;
	th {
		background-color: #F6F7F9;
	    border-right: 1px solid #E0E0E0;
	    text-align: center;
	    font-size: 16px;
		color: #6F7276;
	    padding-left: 18px;
	    padding-right: 18px;
	    line-height: 40px;
	    box-sizing: border-box;
	    overflow: hidden;
	    white-space: nowrap;
	    text-overflow: ellipsis;
	    font-weight: 400;
	    height: 46px;
	    min-width: 120px;
	    &:first-child {
	    	width: 80px;
	    	min-width: 80px;
	    }
	}
	tbody {
		tr:nth-child(2n){
			background-color: #F6F7F9;
		}
	}
	td {
		border-top: 1px solid #E0E0E0;
		padding: 15px;
		line-height: 1.5;
		text-align: center;
	}
}

.l-pos {
	float: left;
}
.r-pos {
	float: right;
}
</style>