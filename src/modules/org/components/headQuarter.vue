<template>
	<el-dialog title="分配总部跟进人" v-model="visiable" class="sale-staff-dialog">
	<el-radio-group v-model="selectVal">
	  	<el-radio class="radio-btn" v-for="item in queryOptions" :label="item.id">{{item.name}}</el-radio>
	</el-radio-group>
	<div class="none-list" v-if="!queryOptions || queryOptions.length == 0">
            <span>没有搜索到信息</span>
    </div>
	<div class="pager">
	    <tx-pagination @currentchange="handleCurrentChange" :page-dto="pageDto">
   		</tx-pagination>
	</div>
	<span slot="footer" class="dialog-footer">
        <el-button @click.native="visiable = false">取 消</el-button>
        <el-button type="primary" :disabled="submitting" @click.native.prevent="handleSubmit">确 定</el-button>
    </span>
	</el-dialog>
</template>
<script>
	import TxPagination from '../../../common/components/TxPagination.vue';
	import {getHeaderList, allocateHeadquarters, allocateHeadquartersAll} from '../request';
	export default {
		data () {
			return {
				submitting: false,
				visiable: true,
				queryOptions: [],
				selectVal: '',
				isrefresh: false,
				pageDto: {
					pageNum: 1
				}
			}
		},
		props: {
			ids: {
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
				getHeaderList()
					.then( (res) => {
						this.queryOptions = res.data;
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
					allocateHeadquartersAll(param)
						.then((res) => {
							this.isrefresh = true;
							this.visiable = false;
						})
						.always(() => {
							this.submitting = false;
						});
				} else {
					allocateHeadquarters(param)
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
                console.log(`当前页: ${val}`);
            }
		},
		components: {
			TxPagination
		}
	}
</script>
<style lang="sass">

</style>



