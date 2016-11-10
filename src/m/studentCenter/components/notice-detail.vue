<template>
	<div class="student-notice-detail-wrapper">
		<mt-header title="通知详情">
		  <router-link to="/notice" slot="left">
		    <mt-button icon="back"></mt-button>
		  </router-link>
		</mt-header>
		<div class="content">
			<h3>{{detail.title}}</h3>
			<p><span class="time">{{detail.msgTime}}</span></p>
			<p class="txt">
				{{detail.content}}
			</p>
			<div class="images">
				<img :src="item" v-for="item in imageList"> 
			</div>
		</div>	
		<copyright></copyright>
	</div>
</template>
<script>
	import {studentMsgDetail, studentReadMsg} from '../request';
	export default {
		data() {
			return {
				detail: {},
				imageList: []
			}
		},
		computed: {
			noticeId() {
				return this.$store.state.noticeId;
			}
		},
		created() {
			this.read();
			this.getNoticeDetail();
		},
		methods: {
			read() {
				studentReadMsg({
					param: this.noticeId
				})
					.then((res)=> {})
					.always(() => {})
			},
			getNoticeDetail() {
				showIndicator();
				studentMsgDetail({
					param: this.noticeId
				})
					.then((res) => {
						this.detail = res.data;
						if (res.data.urls && res.data.urls.length > 0) {
							this.imageList = res.data.urls.split(',');
						}
						
					})
					.always(() => {
						hideIndicator();
					})
			}
		}
	}
</script>
