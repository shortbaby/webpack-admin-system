<template>
	<div class="consume-list-wrap">
		<div class="consume-wrap">
			<div v-for="(item, index) in list" class="consume-list clearfix" @click="showConsumeDetail(item.courseNumId, item.courseName)">
				<div class="l-pos">
					{{item.courseName}}
				</div>
				<div class="l-pos oneself" v-if="item.onlyOneself">仅限本人上课</div>
				<div class="l-pos time-limit">
					有效期&nbsp;{{item.effectiveDate | date('yyyy-MM-dd')}}&nbsp;至&nbsp;{{item.expirationDate | date('yyyy-MM-dd')}}
				</div>
				<div v-if="item.lessonRule" class="l-pos">
					<el-progress :percentage="percent[index]" class="consume-progress"></el-progress>
				</div>
				<div class="l-pos consume-detail">
					<span class="consumed"></span>
					<span>已消耗{{item.useNum}}</span>
					<span class="total"></span>
					<span v-if="item.lessonRule">总次数{{item.totalNum}}</span>
					<span v-else>总次数不限</span>
				</div>		
			</div>
		</div>
		<consume-detail v-if="showDetai" v-on:close="closeDetail" :id="classId" :consumetitle="courseName"></consume-detail>
	</div>
</template>
<script>
	import consumeDetail from './consumeDetail.vue';
	import {getConsumeList} from '../request';
	export default {
		data() {
			return {
				list: [],
				percent: [],
				showDetai: false,
				classId: 0,
				courseName: ''
			}
		},
		props: {
			id: {
				type: Number
			}
		},
		created() {
			//this.percent = Math.round(this.consumed / this.total * 100);
			this.getConsumeListHandle();
		},
		methods : {
			/**
			 * 获取课消列表
			 */
			getConsumeListHandle () {
				var param = {
					orgId: this.id
				};
				getConsumeList(param)
					.then( (res) => {
						this.list = res.data;
						this.getPercentage(this.list);
					} );
			},
			getPercentage (arr) {
				var self = this;
				arr.forEach(function(element, index) {
					self.percent[index] = Math.round(element.useNum / element.totalNum * 100);
				});
			},
			/**
			 * 关闭课消详情弹窗
			 */
			closeDetail () {
				this.showDetai = false;
				removeBodyModal();
			},
			/**
			 * 展示课消详情
			 */
			showConsumeDetail(id, name) {
				this.showDetai = true;
				this.classId = id;
				this.courseName = name;
			}
		},
		components: {
			consumeDetail: consumeDetail
		}
	}
</script>

<style lang="sass">
	.consume-list-wrap {
		overflow: auto;
		.consume-wrap {
			padding: 30px;
			min-width: 1200px;
			background-color: #fff;
			border: 1px solid #e0e0e0;
			margin-bottom: 30px;
			.consume-list {
				padding-left: 20px;
				//width: 100%;
				height: 80px;
				font-size: 14px;
				line-height: 80px;
				border: #e6e6e6 1px dotted;
				margin-top: 30px;
				&:first-child {
					margin-top: 0;
				}
				&:hover {
					cursor: pointer;
					background-color: #f7f7f7;
				}
				.oneself {
					margin-left: 55px;
					color: #9c9e9f;
				}
				.time-limit {
					margin-left: 55px;
					color: #9c9e9f;
				}
			}
			.consume-progress {
				height: 80px;
				line-height: 80px;
				width: 240px;
				margin-left: 90px;
				.el-progress-bar__inner {
					background-color: #ffbd47;
				}
			}
			.consume-detail {
				> span {
					display: inline-block;
				}
				.consumed {
					width: 30px;
					height: 10px;
					background-color: #ffbd47;
					margin-left: 70px;
					margin-right: 10px;
				}
				.total {
					width: 30px;
					height: 10px;
					background-color: #e6e6e6;
					margin-left: 30px;
					margin-right: 10px;
				}			
			}
		}
	}
	

</style>
