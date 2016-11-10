<template>
	<div class="clazz-sign-wrap">
		<top-head :title="title" v-on:clickright="hide"></top-head>	
		<div class="search-form clearfix">
			<div class="right">
               <el-button type="primary" :disabled="submiting" @click.native="signAll" v-if="$TX_AUTH[153]">全部到课</el-button>
               <el-input placeholder="输入机构名称或学员名称搜索" style="width: 250px;" v-model="queryString">
                   <el-button slot="append" icon="search" @click.native="query"></el-button>
               </el-input>
                 
			</div>
		</div>
		<div class="sign-table" >
			<el-table
                :data="list" stripe style="width: 100%">
                <el-table-column property="studentName" label="姓名" align="center"></el-table-column>
                <el-table-column property="orgName" label="机构" align="center"></el-table-column>
                <el-table-column property="duty" label="职务" align="center"></el-table-column>
                <el-table-column property="shirtSizeStr" label="衣服尺码" align="center"></el-table-column>
                <el-table-column property="typeStr" label="签到方式" align="center">
                </el-table-column>
                <el-table-column label="签到"
                  type="button"
                  inline-template
                  width="400px"
                  align="center" v-if="$TX_AUTH[153]">
                  <sign-tag :disabled="disabled" :value="row.status" :id="row.studentId" v-on:sign="manualSign"></sign-tag>
                </el-table-column>
            </el-table>
            <div class="none-list" v-if="!list || list.length == 0">
                <span>没有查询到签到信息</span>
            </div>
		</div>
        <div class="pager">
            <tx-pagination @currentchange="handleCurrentChange" :page-dto="pageDto"></tx-pagination>
        </div>
	</div>
</template>
<script>
	import TopHead from '../../../common/components/TopHead.vue';
	import SignTag from './sign-tag.vue';
	import TxPagination from '../../../common/components/TxPagination.vue';
	import {checkinList, manualSign, cancelSign, allSign} from '../request';
	export default {
		props: {
			id: Number
		},
		data() {
			return {
				title: '签到详情',
				queryString: '',
				disabled: false,
				submiting: false,
				pageDto: {
                    "count": 0,
                    "curPageCount": 0,
                    "pageNum": 1,
                    "pageSize": 20,
                    "totalPageNum": 0
                },
				list: []
			}
		},
		created() {
			if (this.id) {
				this.getListData();
			}
		},
		methods: {
			query() {
				this.pageDto.pageNum = 1;
				this.getListData();
			},
			getListData() {
				let params = {};
				params.classId = this.id;
				if (this.queryString) {
					params.search = this.queryString;
				}
				this.$store.dispatch('showLoading');
				checkinList(params)
					.then((res) => {
						this.list = res.data;
						this.pageDto = res.pageDto;
					})
					.always(() => {
						this.$store.dispatch('hideLoading');
						this.disabled = false;
					})
			},
			hide() {
				this.$emit('hide');
			},
			signAll() {
				if (this.list.length == 0) {
					toast('warning', '没有学员, 无法签到');
					return;
				}
				this.disabled = true;
				let params = {
					classId: this.id,
					type: 0,
					status: 1
				}
				this.submiting = true;
				allSign(params)
					.then((res) => {
						toast('success', '全部签到成功');
					}, () => {
						this.submiting = false;
					})
					.always(() => {
						this.submiting = false,
						this.getListData();
					})
			},
			manualSign(tag, id) {
				this.disabled = true;
				if (tag) {
					let params = {};
					params.classId = this.id;
					params.checkStatus = [];
					params.checkStatus.push({
						id: id,
						type: tag
					});
					manualSign(params)
						.then((res) => {
							toast('success', '手动签到成功');
						})
						.always(() => {
							this.getListData();
						})

				} else {
					let params = {};
					params.classId = this.id;
					params.studentId = id;
					cancelSign(params)
						.then((res) => {
							toast('success', '取消签到成功')
						})
						.always(() => {
							this.getListData();
						})
				}
			},
			handleCurrentChange(val) {
				this.pageDto.pageNum = val;
				this.getListData();
			}
		},
		components: {
			TopHead,
			SignTag,
			TxPagination
		}

	}
</script>