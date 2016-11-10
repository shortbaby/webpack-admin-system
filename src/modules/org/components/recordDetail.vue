<template>
	<el-dialog title="报班记录" v-model="visiable" class="record-detail-dialog">
		<ul v-if="detailLog.length" class="record-detail-wrap">
			<li v-for="item in detailLog">
				<div v-if="item.type==1">
					<span class="name">{{item.operName}}</span>
					<span>将学员</span>
					<span class="name">{{item.studentName}}</span>
					<span>报名加入</span>
					<span>{{item.className}}</span>
				</div>
				<div v-if="item.type==2">
					<span class="name">{{item.operName}}</span>
					<span>将学员</span>
					<span class="name">{{item.studentName}}</span>
					<span>退出</span>
					<span>{{item.className}}</span>
				</div>
				<div class="record-time">{{item.createTime}}</div>
			</li>
		</ul>
		 <div class="none-list" v-if="!detailLog || detailLog.length == 0">
	           <span>没有搜索到信息</span>
	    </div>
		<span slot="footer" class="dialog-footer">
        	<el-button type="primary" @click.native="visiable = false">确 定</el-button>
        </span>
	</el-dialog>
</template>
<script>
	import {getRecordList} from '../request';
	export default {
		props: {
			id: {
				type: Number
			}
		},
		data() {
			return {
				visiable: true,
				detailLog: []
			}
		},
		watch: {
			visiable(val) {
				if (!val) {
					this.$store.dispatch('hideRecords');
				}
			}
		},
		created() {
			this.getRecordHandle();
		},
		methods: {
			getRecordHandle() {
				var param = {
					orgId: this.id
				};
				getRecordList(param)
					.then((res) => {
						this.detailLog = res.data;
					});
			}
		}
	}
</script>
<style lang="sass">
	.record-detail-dialog {
		.el-dialog {
			width: 640px;
		}
		.record-detail-wrap {
			margin-top: 10px;
			margin-bottom: 10px;
			li {
				border-top: 1px solid #d6d6d6;
				padding: 10px 5px;
				.name {
					color: #ffbd47;
				}
				.record-time {
					color: #999;
					height: 35px;
					line-height: 35px;
				}
				&:first-child {
					border-top: none;
				}
			}
		}
	}
</style>