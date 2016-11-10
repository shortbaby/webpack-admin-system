<template>
	<el-dialog title="分配销售跟进人" v-model="visiable" class="sale-staff-dialog">
	<el-select
		class="my-auto"
	    v-model="query"
	    filterable
	    placeholder="请输入关键词"
	    :filter-method="remoteMethod">
	</el-select>
	<el-radio-group v-model="selectVal">
	  	<el-radio class="radio-btn" v-for="item in queryOptions" :label="item.id">{{item.name}}</el-radio>
	</el-radio-group>
	<div class="none-list" v-if="!queryOptions || queryOptions.length == 0">
        <span>没有搜索到信息</span>
    </div>
	<div class="pager">
		<tx-pagination @currentchange="handleCurrentChange" :page-dto="pageDto"></tx-pagination>
	</div>
	<span slot="footer" class="dialog-footer">
        <el-button @click.native="visiable = false">取 消</el-button>
        <el-button type="primary" :disabled="submitting" @click.native.prevent="handleSubmit">确 定</el-button>
    </span>
	</el-dialog>
</template>
<script>
	import TxPagination from '../../../common/components/TxPagination.vue';
	import {getStaffList, allocateSale, allocateAll} from '../request';
	export default {
		data () {
			return {
				visiable: true,
				query: '',
				queryOptions: [],
				selectVal: '',
				pageDto: {
					pageNum: 1
				},
				isrefresh: false,
				submitting: false
			}
		},
		props: {
			ids: {
				type: String
			},
			type: {
				type: String
			}
		},
		created() {
			this.getListHandle();
		},
		watch: {
			visiable(val) {
				if (!val) {
					this.$emit('close', this.isrefresh);
				}
			}
		},
		methods: {
			/**
			 * 获取列表
			 * @param  {Boolean} once 判断是否是第一次获取列表
			 */
			getListHandle () {
				var param = {
					name: '',
					pageNum: this.pageDto.pageNum
				};
				getStaffList(param)
					.then( (res) => {
						this.queryOptions = res.data;
						this.pageDto = res.pageDto;
					});
			},
			/**
			 * 模糊查询销售跟进人
			 */
			remoteMethod(query) {
				let name = query.replace(/(^\s*)|(\s*$)/g, "");
		 			var param = {
						name: name,
						pageNum: 1
					};
					getStaffList(param)
						.then( (res) => {
							this.queryOptions = res.data;
							this.pageDto = res.pageDto;
						});
			},
			/**
			 * 保存当前操作
			 */
			handleSubmit(){
				var param = {
					staffId: this.selectVal,
					orgIds: this.ids
				};
				this.submitting = true;
				if (this.type == 'all') {
					allocateAll(param)
						.then((res) => {
							this.isrefresh = true;
							this.visiable = false;
						})
						.always(() => {
							this.submitting = false;
						});
				} else {
					allocateSale(param)
						.then((res) => {
							this.isrefresh = true;
							this.visiable = false;
						})
						.always(() => {
							this.submitting = false;
						});
				}
				
			},
            handleCurrentChange(val) {
                this.pageDto.pageNum = val;
                this.getListHandle();
            }
		},
		components: {
			TxPagination: TxPagination
		}
	}
</script>
<style lang="sass">
	.sale-staff-dialog {
		.el-dialog {
			width: 440px;
			.my-auto {
				margin: 20px 10px;
				i {
					display: none;
				}
				.el-select-dropdown {
					display: none;
				}
			}
			.radio-btn {
				width: 180px;
				margin: 20px 10px;
				&:first-child {
					margin-top: 0;
				}
			}
		}
		
	}
</style>



