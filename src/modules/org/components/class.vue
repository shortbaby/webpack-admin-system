<template>
	<div class="org-class-list">
		<div class="class-table">
	        <el-table
	            :data="tableData"
	            stripe
	            style="width: 100%">
	            <el-table-column
	              property="className"
	              label="班级名称"
	              width="180"
	              align="center">
	            </el-table-column>
	            <el-table-column
	              inline-template
	              label="上课时间"
	              align="center">
	              	<div>
	              		<span>{{row.startTime | date('yyyy.MM.dd')}}</span>
	              		<span>-</span>
	              		<span>{{row.endTime | date('yyyy.MM.dd')}}</span>
	              	</div>
	            </el-table-column>
	            <el-table-column
	              property="teacherStr"
	              label="讲师"
	              align="center">
	            </el-table-column>
	            <el-table-column
	              property="studentName"
	              label="学员"
	              align="center"
	              width="120">
	            </el-table-column>
	            <el-table-column
	              property="mobile"
	              label="学员电话"
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
					    <el-dropdown-item @click.native="quitClass(row)">退班</el-dropdown-item>
					</el-dropdown>
			    </el-table-column>
	          </el-table>
	    </div>
	    <div class="none-list" v-if="!tableData || tableData.length == 0">
	           <span>没有搜索到信息</span>
	    </div>
	    <div class="pager">
	        <tx-pagination @currentchange="handleCurrentChange" :page-dto="pageDto">
            </tx-pagination>
	    </div>
	    <record-detail v-if="showRecordStatus" :id="id"></record-detail>	
	</div>
</template>
<script>
	import recordDetail from './recordDetail.vue';
	import TxPagination from '../../../common/components/TxPagination.vue';
	import {quitMyClass, getClassList, quitClass} from '../request';
	export default {
		data() {
			return {
				tableData: [],
				pageDto: {
					pageNum: 1
				}
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
			showRecordStatus() {
				return this.$store.state.org.showRecordStatus;
			},
			showEditAuth() {
				return this.$route.path == '/org/allOrg' ? this.$TX_AUTH[143] : this.$TX_AUTH[133];
			}
		},
		created(){
			this.getClassListHandle();
		},
		methods: {
			/**
			 * 刷新列表
			 */
			refresh () {
				this.getClassListHandle();
			},
			/**
			 * 获取班级列表
			 */
			getClassListHandle() {
				var param = {
					orgId: this.id,
					pageNum: this.pageDto.pageNum
				};
				this.$store.dispatch('showLoading');
				getClassList(param)
					.then((res) => {
						this.tableData = res.data;
						this.pageDto = res.pageDto;
					})
					.always(() => {
						this.$store.dispatch('hideLoading');
					});
			},
			/**
			 * 退班操作
			 * @param  {Object} row 列表行信息
			 */
			quitClass(row) {
				var param = {
					orgId: this.id,
					classId: row.classId,
					userId: row.studentId,
					userName: row.studentName 
				};
				if (this.type == 'all') {
					this.$confirm('此操作将退出班级, 是否继续?', '提示', {
	                    type: 'warning'
	                }).then(() => {
						quitClass(param)
							.then((res) => {
								this.refresh();
							});
						});
				} else {
					this.$confirm('此操作将退出班级, 是否继续?', '提示', {
	                    type: 'warning'
	                }).then(() => {
						quitMyClass(param)
							.then((res) => {
								this.refresh();
							});
					});
				} 
			},
            handleCurrentChange(val) {
                this.pageDto.pageNum = val;
                this.refresh();
            }
		},
		components: {
			recordDetail,
			TxPagination
		}
	}
</script>
<style lang="sass">
	
</style>




