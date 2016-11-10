<template>
	<div class="consume-detail-wrap">
		<el-dialog :title="title" v-model="visiable">
			<div class="consume-table">
				<el-table
			        :data="tableData"
			        stripe
			        width="100%">
			        <el-table-column
			          property="className"
			          label="班级名称"
			          width="120"
			          align="center">
			        </el-table-column>
			        <el-table-column
			          inline-template
			          label="上课日期"
			          align="center">
			          	<span>{{row.startTime}} -- {{row.endTime}}</span>
			        </el-table-column>
			        <el-table-column
			          property="cityName"
			          label="地址"
			          align="center"
			          width="100">
			        </el-table-column>
			        <el-table-column
			          property="courseName"
			          label="课程名称"
			          width="160"
			          align="center">
			        </el-table-column>
			        <el-table-column
			          property="studentName"
			          label="上课学员"
			          width="120"
			          align="center">
			        </el-table-column>
			        <el-table-column
			          property="mobile"
			          label="学员手机号"
			          width="160"
			          align="center">
			        </el-table-column>
		        </el-table>				
			</div>
	        <span slot="footer" class="dialog-footer">
	        	<el-button type="primary" @click.native="visiable = false">确 定</el-button>
	        </span>
	    </el-dialog>
	</div>

</template>
<script>
	import {getConsumeDetail} from '../request';
	export default {
		props: {
			id: {
				type: Number
			},
			consumetitle: {
				type: String
			}
		},
		data() {
			return {
				visiable: true,
				tableData: [],
				title: ''
			}
		},
		watch: {
			visiable(val) {
				if (!val) {
					this.$emit('close');
				}
			}
		},
		created() {
			this.getDetailHandle();
			this.title = this.consumetitle + '消耗明细';
		},
		methods: {
			/**
			 * 获取课消详情
			 */
			getDetailHandle () {
				var param = {
					classCourseNumId: this.id
				};
				getConsumeDetail(param)
					.then( (res) => {
						this.tableData = res.data;
					} );
			}
		}
	}
</script>
<style lang="sass">
	.consume-detail-wrap {
		.el-dialog {
			width: 1100px;
			.consume-table {
				padding: 20px;
				.el-table {
					border-top: 1px solid #e0e6ed;
				}
			}
		}
	}
	
</style>