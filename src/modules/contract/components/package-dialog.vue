<template>
	<el-dialog title="选择套餐" v-model="show">
		<div class="package-dialog-content">
			<div class="top">
				 <el-select
				    v-model="tag"
				    placeholder="请选择标签"
				    @change="query">
				    <el-option
				      v-for="item in tagOptions"
				      :key="item.id"
				      :label="item.name"
				      :value="item.id">
				    </el-option>
				  </el-select>
			</div>
			<div class="package-table">
				<el-table
				    :data="list"
				    selection-mode="multiple"
				    style="width: 100%"
				    ref="table"
				    @selectionchange="handleMultipleSelectionChange">
				    <el-table-column
				      type="selection"
				      width="50">
				    </el-table-column>
				    <el-table-column
				        property="name"
				      	label="课程套餐"
				      	width="280">
				    </el-table-column>
				    <el-table-column
				        property="tagName"
				        label="标签"
				        width="150">
				    </el-table-column>
				    <el-table-column
				      inline-template
				      label="价格">
				      <span>{{row.price | money}}</span>
				    </el-table-column>
				</el-table>
				<div class="none-list" v-if="!list || list.length == 0">
                    <span>没有搜索到信息</span>
                </div>
				<div class="pager">
					<tx-pagination :page-dto="pageDto"
                        @currentchange="handleCurrentChange">
                    </tx-pagination>
                </div>
			</div>	
		</div>
		<span slot="footer" class="dialog-footer">
	        <el-button @click.native="close">取 消</el-button>
	        <el-button type="primary" @click.native.prevent="handleSubmit">确 定</el-button>
        </span>
	</el-dialog>
</template>
<script>
	import TxPagination from '../../../common/components/TxPagination.vue';
	import {queryPackage, getBusniessTags} from '../request';
	import {findInArray, mergeArray} from '../../../common/util/tool';
	export default {
		data() {
			return {
				show: true,
				tag: '',
				tagOptions: [],
				selectLoading: false,
				list: [],
		        selection: [],
		        pageDto: {
                    "count": 0,
                    "curPageCount": 0,
                    "pageNum": 1,
                    "pageSize": 20,
                    "totalPageNum": 0
                }
			}
		},
		props: {
			data: {
				type: Array
			}
		},
		created() {
			if (this.data && this.data.length > 0) {
				mergeArray(this.selection, this.data, 'id');
			}
			this.getRemoteOptions();
			this.getListData();

		},
		watch: {
			show(val) {
				if(!val) {
					this.$emit('closedialog');
				}
			}
		},
		methods: {
			query() {
				this.pageDto.pageNum = 1;
				this.getListData();
			},
			getListData() {
				let params = {};
				params.pageNum = this.pageDto.pageNum;
				if (this.tag) {
					params.tagId = this.tag;
				}
				queryPackage(params)
					.then((res) => {
						this.list = res.data;
						this.pageDto = res.pageDto;
						this.$nextTick(() => {
							this.selectFill();
						});
					})
			},
			selectFill() {
				this.$refs.table.tableData.forEach((item) => {
					if (findInArray(item, this.selection, 'id') > -1) {
						item.$selected = true;
					}
				})
			},
			getRemoteOptions() {
				getBusniessTags()
					.then((res) => {
						this.tagOptions = res.data;
					})
			},
			close() {
				this.show = false;
			},
			handleSubmit() {
				this.$refs.table.tableData.forEach((item) => {
					let index = findInArray(item, this.selection, 'id')
					if (index > -1 && !item.$selected) {
						this.selection.splice(index, 1);
					}
					if (index == -1 && item.$selected) {
						this.selection.push(item);
					}
				})
				this.$emit('selectPackage', this.selection);
				this.close();
			},
			handleCurrentChange(val) {
				this.pageDto.pageNum = val;
				this.getListData();
			},
			handleMultipleSelectionChange(val) {
		    }
		},
		components: {
			TxPagination
		}
	}
</script>