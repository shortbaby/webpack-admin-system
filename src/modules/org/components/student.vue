<template>
	<div class="org-student-wrap">	
		<div class="student-table">
	        <el-table
	            :data="tableData"
	            stripe
	            style="min-width:2000px;">
	        	</el-table-column>
	        	<el-table-column
	              property="name"
	              label="学员姓名"
	              align="center"
	              min-width="120">
	            </el-table-column>
	            <el-table-column
	              inline-template
	              label="核心学员"
	              align="center"
	              width="100">
                  <div>
                  	<span v-if="row.isCore == 0"> 否</span>
                  	<span v-if="row.isCore == 1"> 是</span>
                  </div>
                 </el-table-column>
	            <el-table-column
	              property="mobile"
	              label="手机号"
	              align="center"
	              min-width="160">
	            </el-table-column>
	            <el-table-column
	              property="genderStr"
	              label="性别"
                  align="center"
                  width="80">
	            </el-table-column>
	            <el-table-column
	              property="duty"
	              label="职务"
                  align="center"
                  min-width="180">
	            </el-table-column>
	            <el-table-column
	              property="email"
	              label="邮箱"
                  width="200"
                  align="center">
	            </el-table-column>
	            <el-table-column
	              property="wechat"
	              align="center"
	              min-width="200"
	              label="微信号">
	            </el-table-column>
	            <el-table-column
	              property="hasBindWechat"
	              label="公众号绑定"
	              align="center"
	              min-width="180">
	            </el-table-column>
	            <el-table-column
	              property="identityCard"
	              label="身份证号"
                  min-width="200"
                  align="center">
	            </el-table-column>
	            <el-table-column
	              inline-template
	              label="出生日期"
	              width="180"
	              align="center">
                  <span>{{row.birthday | date('yyyy-MM-dd')}}</span>
	            </el-table-column>
	            <el-table-column
	              property="tshirtSizeStr"
	              label="文化衫尺码"
                  align="center"
                  width="160">
	            </el-table-column>
	            <el-table-column
			      inline-template
			      label="操作"
			      width="120"
			      type="button"
			      align="center" v-if="showEditAuth">
                    <el-dropdown class="process-dropdown" trigger="click">
                        <span class="el-dropdown-link">
                            操作<i class="el-icon-caret-bottom el-icon-right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
					    <el-dropdown-item @click.native="editStudent(row)">编辑</el-dropdown-item>
					    <el-dropdown-item @click.native="deleteStudent(row)">删除</el-dropdown-item>
					</el-dropdown>
			    </el-table-column>
	          </el-table>
	    </div>
	    <div class="none-list" v-if="!tableData || tableData.length == 0">
	        <span>没有搜索到信息</span>
	    </div>
	    <div class="pager">
	        <tx-pagination @currentchange="handleCurrentChange" :page-dto="pageDto"></tx-pagination>
	    </div>
	    <add-student v-if="addStudentStatus" :id="studentId" :orgid="id" v-on:close="closeAddStudent" :type="type"></add-student>	
	</div>
</template>
<script>
	import addStudent from './addStudent.vue';
	import TxPagination from '../../../common/components/TxPagination.vue';
	import {getStudentList, deleteMyStudent, deleteAllStudent} from '../request';
	export default {
		data() {
			return {
				tableData: [],
				pageDto: {
					pageNum: 1
				},
                studentId: 0,
                addStudentStatus: false
			}
		},
		computed: {
			showEditAuth() {
				return this.$route.path == '/org/allOrg' ? this.$TX_AUTH[144] : this.$TX_AUTH[135];
			}
		},
		props: {
			id: {
				type: Number
			},
			status: {
				type: Boolean
			},
			type: {
				type: String
			}
		},
		created () {
			this.getStudentListHandle();
		},
		watch: {
			status(val) {
				//新增学员监听
				this.addStudentStatus = this.status;
				this.studentId = 0;
			}
		},
		methods: {
			/**
			 * 获取学员列表信息
			 */
			getStudentListHandle () {
				var param = {
					orgId: this.id,
					pageNum: this.pageDto.pageNum
				};
				this.$store.dispatch('showLoading');
				getStudentList(param)
					.then((res) => {
						this.tableData = res.data;
						this.pageDto = res.pageDto;
					})
					.always(() => {
						this.$store.dispatch('hideLoading');
					});
			},
			refresh() {
				this.getStudentListHandle();
			},
			closeAddStudent(isrefresh) {
				this.addStudentStatus = false;
				removeBodyModal();
				this.$emit('close');
				if (isrefresh) {
					this.refresh();
				}
			},
			editStudent(row) {
				this.addStudentStatus = true;
				this.studentId = row.id;
				//this.$store.dispatch('showAddStudent');
			},
			/**
			 * 删除学员
			 * @param  {Object} row 当前选中行的信息
			 */
			deleteStudent(row) {
				var param = {
					id: row.id,
					orgId: this.id
				};
				if (this.type == 'all') {
					this.$confirm('此操作将删除该学员, 是否继续?', '提示', {
	                    type: 'warning'
	                }).then(() => {
						deleteAllStudent(param)
							.then((res) => {
								if (this.pageDto.curPageCount == 1) {
		                            this.pageDto.pageNum -- ;
		                        }
								this.refresh();
							});
					});
				} else {
					deleteMyStudent(param)
						.then((res) => {
							this.refresh();
						});
				}
			},
            handleCurrentChange(val) {
                this.pageDto.pageNum = val;
                this.getStudentListHandle();
            }
		},
		components: {
			addStudent,
			TxPagination
		}
	}
</script>
<style lang="sass">
	.org-student-wrap {
		.student-table {
			margin-bottom: 20px;
			width: 100%;
			overflow: auto;
			.el-table__body-wrapper {
				overflow: visible;
			}		
		}
	}
</style>




