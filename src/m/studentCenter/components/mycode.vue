<template>
	<div class="student-code-wrapper">
		<mt-header title="我的二维码">
		  <router-link to="/center" slot="left">
		    <mt-button icon="back"></mt-button>
		  </router-link>
		</mt-header>
		<div class="code-content">
			<img class="avatar" :src="studentPic">
			<div class="info">
				<p>{{studentName}}</p>
				<p><span>{{orgName}}</span><span>{{duty}}</span></p>
			</div>
			<div class="wxcode">
				<img :src="qrcode(token, 9)">	
			</div>
			<p><span>扫一扫上面的二维图案，完成签到</span></p>
		</div>		
		<copyright></copyright>
	</div>
</template>
<script>
	import {getCookie} from '../../../common/function/cookie';
	export default {
		data() {
			return {
				token: ''
			}
		},
		created() {
			let token = getCookie('WECHAT_COOKIE_ID');
			this.token = token;
		},
		computed: {
			studentPic() {
				return this.$store.state.pic;
			},
			studentName() {
				return this.$store.state.studentName;
			},
			orgName() {
				return this.$store.state.orgName;
			},
			duty() {
				return this.$store.state.duty;
			}
		},
		methods: {
			qrcode(url, size) {
				var qrSize = size || 6;
				if (!url) {
					return '';
				}
			 	return 'http://m.genshuixue.com/static/qrcode?size=' + qrSize + '&margin=0'
			        + '&url=' + encodeURIComponent(url);
			}
		}
	}
</script>
