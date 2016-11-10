<template>
	<div>
		<div class="bread-navs">
	        <el-breadcrumb separator=".">
	            <el-breadcrumb-item v-for="item in breadOptions" 
	                @click.native="click(item)">
	                {{item.name}}
	            </el-breadcrumb-item>
	        </el-breadcrumb>
		</div>
		<div style="position:relative;">
			<div class="course-list-wrap package-wrap">
				<div class="filt-btn clearfix">
					<div class="l-pos">
						<span class="iconfont icon-class"></span>
						<span>{{pageDto.count}}</span>
			            <span class="txt">个套餐</span>	
					</div>
					<div class="r-pos">
						<el-input placeholder="请输入套餐名称" v-model="query" style="width: 180px;" class="l-pos r-blank">
							<el-button slot="append" icon="search" @click.native="search"></el-button>
						</el-input>
			            <el-button type="primary" @click.native="add" v-if="$TX_AUTH[159]">新增课程套餐</el-button>
					</div>
				</div>

				<div class="course-list-table">
			        <el-table
			            :data="tableData"
			            stripe
			            style="width: 100%">
			            <el-table-column
			              property="businessName"
			              label="套餐名称"
			              width="180">
			            </el-table-column>
			            <el-table-column
			              property="tagName"
			              label="套餐标签"
			              width="180">
			            </el-table-column>
			            <el-table-column
			              property="multiNames"
			              label="套餐内容">
			            </el-table-column>
			            <el-table-column
			              property="price"
			              label="价格"
			              width="180">
			            </el-table-column>
			            <el-table-column
					      inline-template
					      label="操作"
					      width="120"
					      type="button"
					      align="center" v-if="$TX_AUTH[160] || $TX_AUTH[161]">
		                    <el-dropdown class="process-dropdown" trigger="click">
		                        <span class="el-dropdown-link">
		                            操作<i class="el-icon-caret-bottom el-icon-right"></i>
		                        </span>
		                        <el-dropdown-menu slot="dropdown">
							        <el-dropdown-item @click.native="edit(row)" v-if="$TX_AUTH[160]">编辑</el-dropdown-item>
							    	<el-dropdown-item @click.native="delet(row)" v-if="$TX_AUTH[161]">删除</el-dropdown-item>
							    </el-dropdown-menu>
						    </el-dropdown>			    
					    </el-table-column>
			          </el-table>
			    </div>
			    <div class="pager">
			        <tx-pagination @currentchange="handleCurrentChange" :page-dto="pageDto">
		            </tx-pagination>
			    </div>	
			    <new-package v-if="showAdd" v-on:close="closeAdd" :id="editId"></new-package>
			</div>	
		</div>
	</div>
</template>
<script>
	const breadcrumbs = [
        {
            name: '课程管理',
            path: '/course/courseList'
        },
        {
            name:  '课程套餐',
            path: '/course/coursePackage'
        }
    ];
	import newPackage from './newPackage.vue';
	import TxPagination from '../../../common/components/TxPagination.vue';
	import {getPackageCourseList, deletePackage} from '../request';
	import $ from 'jquery';
	export default {
		data() {
			return {
				tableData: [],
                pageDto: {
			        count: 0,
			        pageNum: 1
			    },
                query: '',
                showAdd: false,
                editId: 0
			}
		},
		created () {
			this.getListHandle();
		},
		mounted() {
            this.$store.dispatch('updateBreadNavs', breadcrumbs);
        },
		methods: {
			/**
			 * 获取课程列表
			 */
			getListHandle () {
				var query = $.trim(this.query);
				var param = {
					'query': query,
					'pageNum': this.pageDto.pageNum
				};
				this.$store.dispatch('showLoading');
				getPackageCourseList(param)
					.then((res) => {
						this.tableData = res.data;
						this.pageDto = res.pageDto;
					})
					.always(() => {
						this.$store.dispatch('hideLoading');
					});
			},
			/**
			 * 删除课程请求
			 */
			deleteHandle (id) {
				var param = {
					'id': id
				};
				deletePackage(param)
					.then((res) => {
						if (this.pageDto.curPageCount == 1) {
                            this.pageDto.pageNum -- ;
                        }
						this.refreshList();
					});
			},
			/**
			 * 搜索课程操作
			 */
			search () {
				this.pageDto.pageNum = 1;
				this.refreshList();
			},
			/**
			 * 刷新列表操作
			 */
            refreshList() {
            	this.getListHandle();
            },
            /**
			 * 添加课程操作
			 */
            add() {
            	this.editId = 0;
            	this.showAdd = true;
            },
            /**
			 * 关闭新增弹框
             * @param  {boolean} param 判断是否在关闭弹框时刷新页面
             */
            closeAdd(param) {
            	this.showAdd = false;
            	removeBodyModal();
            	if (param) {
            		this.refreshList();
            	}
            },
            /**
			 * 编辑课程操作
			 */
            edit(row) {
            	//console.log(row);
            	this.editId = row.id;
            	this.showAdd = true;
            },
            /**
			 * 删除课程操作
			 */
            delet(row) {
            	this.$confirm('此操作将删除该课程套餐, 是否继续?', '提示', {
                    type: 'warning'
                }).then(() => {
            		this.deleteHandle(row.id);
            	});
            },
            handleCurrentChange(val) {
                this.pageDto.pageNum = val;
                this.refreshList();
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
			newPackage,
			TxPagination
		}
	}
</script>
<style lang="sass">
	.package-wrap {
		padding: 0 30px;
	}
</style>