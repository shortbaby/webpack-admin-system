<template>
	<div class="message-list-wrap">
		<div class="top clearfix">
	        <div class="left">
	            <span class="iconfont icon-message"></span>
	            <span>{{pageDto.count}}</span>
	            <span class="txt">条消息</span>
	            <span class="selected">已选择{{multipleSelection.length}}项:</span>
	            <span class="btn-spn" @click="batchRead">标记已读</span>
	        </div>
	    </div>
	    <div class="message-table">
	        <el-table :data="list" stripe selection-mode="multiple" style="width: 100%;"
	            @selectionchange="handleMultipleSelectionChange">
    			<el-table-column type="selection" width="50"></el-table-column>
	            <el-table-column inline-template label="消息内容" align="left">
	            	<div>
	            		{{row.messageInfo.content}}
	            	</div>
	            </el-table-column>
	            <el-table-column property="statusStr" label="状态" width="120" align="center">
	            </el-table-column>
	            <el-table-column property="dateStr" label="消息时间" width="180" align="center">
	            </el-table-column>
	        </el-table>
	        <div class="none-list" v-if="!list || list.length == 0">
	            <span>没有搜索到信息</span>
	        </div>
	    </div>
	    <div class="pager">
	        <tx-pagination @currentchange="handleCurrentChange" :page-dto="pageDto"></tx-pagination>
	    </div>
	</div>
</template>
<script>
	const breadcrumbs = [
        {
            name: '消息中心',
            path: '/message/list'
        },
        {
            name:  '消息列表',
            path: '/message/list'
        }
    ];
	import TxPagination from '../../common/components/TxPagination.vue';
	import {queryBtach, queryNewCount, readBatch} from './request';
	export default {
		data() {
			return {
				pageDto: {
                    "count": 0,
                    "curPageCount": 0,
                    "pageNum": 1,
                    "pageSize": 20,
                    "totalPageNum": 0
                },
                submitting: false,
                multipleSelection: [],
				list: []
			}
		},
		mounted() {
            this.$store.dispatch('updateBreadNavs', breadcrumbs);
        },
        created() {
        	this.getListData();
        },
		methods: {
			getListData() {
				let params = {};
				params.pageNum = this.pageDto.pageNum;
				this.$store.dispatch('showLoading');
				queryBtach(params)
					.then((res) => {
						this.list = res.data;
						this.pageDto = res.pageDto;
					})
					.always(() => {
						this.$store.dispatch('hideLoading');
					})
			},
			handleCurrentChange(val) {
				this.pageDto.pageNum = val;
				this.getListData();
			},
			handleMultipleSelectionChange(val) {
				 this.multipleSelection = val;
			},
			batchRead() {
				if (!this.multipleSelection || this.multipleSelection.length == 0) {
					toast('error', '请先选择消息');
				} else {
					if (this.submitting) {
						return;
					}
					let ids = [];
					this.multipleSelection.forEach((item) => {
						ids.push(item.id);
					})
					let params = {
						ids: ids.join(',')
					}
					this.submitting = true;
					readBatch(params)
						.then((res) => {
							toast('success', '标记消息已读成功');
							this.getListData();
						})
						.always(() => {
							this.submitting = true;
						})
				}
			}
		},
		components: {
			TxPagination
		}
	}
</script>