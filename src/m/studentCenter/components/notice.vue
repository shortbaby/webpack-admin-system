<template>
	<div class="student-notice-wrapper">
		<mt-header title="通知">
		  <router-link to="/center" slot="left">
		    <mt-button icon="back"></mt-button>
		  </router-link>
		</mt-header>
		<div>
			<mt-loadmore :auto-fill="false" :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
				<ul class="notice-list">
					<li :class="{new: item.readStatus == 0}" @click="toDetail(item)" v-for="item in list">
						<span class="iconfont icon-dian"></span>
						<div>
							<p class="title">{{item.title}}</p>
							<p>{{item.createTime | date('MM.dd')}}</p>
						</div>
						<span class="iconfont icon-right"></span>
					</li>
				</ul>
			</mt-loadmore>
		</div>	
		<copyright></copyright>
	</div>
</template>
<script>
	import {studentMsgList} from '../request';
	export default {
		data() {
			return {
				submiting: false,
				loading: false,
				allLoaded: false,
				list: [],
				pageDto: {
			        count: 0,
			        curPageCount: 1,
			        pageNum: 1,
			        pageSize: 20
			    }
			}
		},
		created() {
			this.getMsgList();
		},
		methods: {
			getMsgList() {
				showIndicator();
				let params = {
					pageNum: this.pageDto.pageNum
				}
				studentMsgList(params)
					.then((res) => {
						this.list = this.list.concat(res.data);
						this.pageDto = res.pageDto;
					})
					.always(() => {
						hideIndicator();
					})
			},
			toDetail(item) {
				this.$store.dispatch('setNoticeId', item.id);
				//item.new = false;
				this.$router.push('/noticedetail');
			},
			loadTop(id) {
				let params = {};
				params.pageNum = 1;
				this.loading = true;
				studentMsgList(params)
					.then((res) => {
						if (res.data instanceof Array) {
							this.list = res.data.concat(this.list);
							this.pageDto = res.pageDto;
						}	
					})
					.always(() => {
						this.$refs.loadmore.onTopLoaded(id);
						this.loading = false;
					})
				
			},
			loadBottom(id) {
				this.loading = true;
				let params = {};
				params.pageNum = this.pageDto.pageNum + 1;
				studentMsgList()
					.then((res) => {
						this.list = this.list.concat(res.data);
						this.pageDto = res.pageDto;
					})
					.always((res) => {
						this.$refs.loadmore.onBottomLoaded(id);
						this.loading = false;
					})
			}
		}
	}
</script>
