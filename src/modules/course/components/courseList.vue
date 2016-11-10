<template>
	<div class="course-list-wrap">
		<div class="filt-btn clearfix">
			<div class="l-pos">
				<span class="iconfont icon-class"></span>
				<span>{{pageDto.count}}</span>
	            <span class="txt">个课程</span>	
			</div>
			<div class="r-pos">
				<el-input placeholder="请输入课程名称" v-model="query" style="width: 180px;" class="l-pos r-blank">
					<el-button slot="append" icon="search" @click.native="search"></el-button>
				</el-input>
	            <el-button type="primary" @click.native="add" v-if="$TX_AUTH[156]">新增课程</el-button>
			</div>
		</div>
        <el-table
        	class="course-list-table"
            :data="tableData"
            stripe
            style="width: 100%">
            <el-table-column
              property="courseName"
              label="课程名称"
              width="180"
              align="center">
            </el-table-column>
            <el-table-column
              property="price"
              label="价格"
              width="180"
              align="center">
            </el-table-column>
            <el-table-column
              property="description"
              label="描述">
            </el-table-column>
            <el-table-column
		      inline-template
		      label="操作"
		      width="120"
		      type="button"
		      align="center" v-if="$TX_AUTH[157] || $TX_AUTH[158]">
                <el-dropdown class="process-dropdown" trigger="click">
                    <span class="el-dropdown-link">
                        操作<i class="el-icon-caret-bottom el-icon-right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
				        <el-dropdown-item @click.native="edit(row)" v-if="$TX_AUTH[157]">编辑</el-dropdown-item>
				    	<el-dropdown-item @click.native="delet(row)" v-if="$TX_AUTH[158]">删除</el-dropdown-item>
				    </el-dropdown-menu>
			    </el-dropdown>			    
		    </el-table-column>
         </el-table>
        <div class="none-list" v-if="!tableData || tableData.length == 0">
            <span>没有搜索到信息</span>
        </div>
        <div class="pager">
            <tx-pagination @currentchange="handleCurrentChange" :page-dto="pageDto"></tx-pagination>
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
            name:  '课程列表',
            path: '/course/courseList'
        },
        {
            name: '课程',
            path: '/course/courseList'
        }
    ];
	import {getSingleCourseList, deleteSingle} from '../request';
	import TxPagination from '../../../common/components/TxPagination.vue';
	import $ from 'jquery';
	export default {
		data() {
			return {
				tableData: [],
                pageDto: {
			        count: 0,
			        pageNum: 1,
			        pageSize: 20,
			        curPageCount: 1
			    },
                query: ''
			}
		},
		props: {
			refresh: {
				type: Boolean,
			}
		},
		created () {
			this.getListHandle();
		},
		mounted() {
            this.$store.dispatch('updateBreadNavs', breadcrumbs);
        },
		watch: {
			refresh(val) {
				if (val) {
					this.refreshList();
				}
			}
		},
		methods: {
			/**
			 * 获取课程列表请求
			 */
			getListHandle () {
				var query = $.trim(this.query);
				var param = {
					'query': query,
					'pageNum': this.pageDto.pageNum
				};
				this.$store.dispatch('showLoading');
				getSingleCourseList(param)
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
				deleteSingle(param)
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
            	this.$emit('show', 1, 0);
            },
            /**
			 * 编辑课程操作
			 */
            edit(row) {
            	var editId = row.id;
            	this.$emit('show', 1, editId);
            },
            /**
			 * 删除课程操作
			 */
            delet(row) {
            	this.$confirm('此操作将删除该课程, 是否继续?', '提示', {
                    type: 'warning'
                }).then(() => {
                	this.deleteHandle(row.id);
                });
            },
            handleCurrentChange(val) {
                this.pageDto.pageNum = val;
                this.refreshList();
            }
		},
		components: {
			TxPagination
		}
	}
</script>
<style lang="sass">
	.course-list-wrap {
		position: absolute;
		top: 0px;
		left: 0;
		width: 100%;
		box-sizing: border-box;
		.filt-btn {
			margin: 30px 0 15px;
			line-height: 26px;
			span {
				font-size: 36px;
			}
			.txt {
				font-size: 16px;
				color: #999;
				position: relative;
				top: -5px;
			}
		}
		.r-blank {
			margin-right: 20px;
		}
		.course-list-table {
			margin-bottom: 20px;
		}
	}
	.l-pos {
		float: left;
	}
	.r-pos {
		float: right;
	}
</style>