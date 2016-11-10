<template>
	<div class="sel-student-wrap">
		<el-dialog title="选择学员" v-model="visiable">
			<div class="sel-student-table">
		        <el-table
		            :data="tableData"
		            stripe
		            selection-mode="single"
		            style="width: 100%"
		            @selectionchange="handleSelectionChange">
		           <!--  <el-table-column type="selection" width="50">
		        	</el-table-column> -->
		            <el-table-column
		              property="name"
		              label="姓名"
		              width="80">
		            </el-table-column>
		            <el-table-column
		              property="genderStr"
		              label="性别"
		              width="80">
		            </el-table-column>
		            <el-table-column
		              property="duty"
		              label="职务"
		              width="100">
		            </el-table-column>
		            <el-table-column
		              property="mobile"
		              label="电话"
		              width="180">
		            </el-table-column>
		          </el-table>
		    </div>
	        <span slot="footer" class="dialog-footer">
	        	<el-button @click.native="close">取 消</el-button>
	        	<el-button type="primary" :disabled="submitting" @click.native.prevent="handleSubmit">确 定</el-button>
	        </span>
	    </el-dialog>
	</div>
</template>
<script>
	import {getAddStudents} from '../request';
	export default {
		props: {
			id: {
				type: Number
			}
		},
		data() {
			return {
				submitting: false,
				visiable: true,
				tableData: [],
				selectedIds: [],
				selectedStudents: [],
				isrefresh: false
			}
		},
		watch: {
			visiable(val) {
				if (!val) {
					this.$emit('close', this.selectedStudents, this.isrefresh);
				}
			}
		},
		created() {
			this.getStudentList();
		},
		methods: {
			getStudentList () {
				var param = {
					orgId: this.id
				};
				getAddStudents(param)
					.then((res) => {
						this.tableData = res.data;
					});
			},
			close() {
				this.visiable = false;
			},
			handleSubmit() {
				var self = this;
				this.isrefresh = true;
				//发送请求
				this.visiable = false;
			},
			handleSelectionChange(val) {
				//this.selectedIds = [];
				this.selectedStudents = [];
				this.selectedStudents.push(val);
				// val.forEach((elment) => {
				// 	this.selectedStudents.push(elment);
				// 	this.selectedIds.push(elment.id);
				// });
			}
		},
		components: {
		}
	}
</script>
<style lang="sass">
	.sel-student-wrap {
		.sel-student-table {
			.el-table {
				border-top: 1px solid #e0e6ed;
			}
		}
	}
</style>