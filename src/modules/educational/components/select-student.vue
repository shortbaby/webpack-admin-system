<template>
	<el-dialog title="选择学员" v-model="visiable">
		<div class="select-student_table">
			<el-table
			    :data="list"
			    selection-mode="single"
			    style="width: 100%"
			    @selectionchange="handleSelectionChange">
			    <el-table-column
			      label="姓名"
			      property="name" align="center">
			    </el-table-column>
			    <el-table-column
			      inline-template
			      label="性别" align="center">
			      <span>{{row.gender | gender}}</span>
			    </el-table-column>
			    <el-table-column
			      property="duty"
			      label="职务"
				  align="center">
			    </el-table-column>
			    <el-table-column
			      property="mobile"
			      label="电话"
				  align="center">
			    </el-table-column>
			</el-table>
			<div class="none-list" v-if="!list || list.length == 0">
	            <span>没有搜索到信息</span>
	        </div>
		    <div class="pager">
	            <tx-pagination @currentchange="changePage" :page-dto="pageDto">
	            </tx-pagination>
	        </div>
		</div>
        <span slot="footer" class="dialog-footer">
	        <el-button @click.native="close">取 消</el-button>
	        <el-button type="primary" @click.native="submit">确 定</el-button>
        </span>
    </el-dialog>
</template>
<script>
	import {orgStudentsList} from '../request';
	import TxPagination from '../../../common/components/TxPagination.vue';
	export default {
		props: {
			orgId: {
				type: Number
			}
		},
 		data() {
 			return {
 				visiable: true,
 				list: [],
		        selection: null,
		        pageDto: {
                    "count": 0,
                    "curPageCount": 0,
                    "pageNum": 1,
                    "pageSize": 20,
                    "totalPageNum": 0
                }
 			}
 		},
 		created() {
 			this.getListData();
 		},
 		watch: {
 			visiable(val) {
 				if (!val) {
					this.$emit('closedialog');
				}
 			}
 		},
 		methods: {
 			handleSelectionChange(val) {
 				this.selection = val;
 			},
 			getListData() {
 				let params = {
 					pageNum: this.pageDto.pageNum,
 					orgId: this.orgId
 				};
 				this.$store.dispatch('showLoading');
 				orgStudentsList(params)
 					.then((res) => {
 						this.list = res.data;
 						this.pageDto = res.pageDto;
 					})
 					.always(() => {
 						this.$store.dispatch('hideLoading');
 					})
 			},
 			close() {
				this.visiable = false;
			},
			submit() {
				if (!this.selection) {
					this.$confirm('你还没有选择学员, 确定关闭吗?', '提示', {
	                    type: 'warning'
	                }).then(() => {
	                    this.close();
	                }).catch(() => {   
	                	return;    
	                });
				} else {
					this.$emit('selectstudents', this.selection);
					this.close();
				}
			},
			changePage(val) {
				this.pageDto.pageNum = val;
				this.getListData();
			}
 		},
 		components: {
 			TxPagination
 		}
	}
</script>