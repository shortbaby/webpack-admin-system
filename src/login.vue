<template>
	<div id="login" class="login">
		<div class="logo-feidu-login">
	        <img src="src/resource/img/tianxiao-logo.png">
	    </div>
	    <p style="font-size: 24px;">天校定制管理系统</p>
	    <form>
	        <div class="form-li">
	            <span class="icon-username"></span>
	            <input type="text" :class="{'error': userNameCheck}" id="username" name="username" placeholder="请输入用户名" v-model="username">
	        </div>
	        <div class="form-li">
	            <span class="icon-password"></span>
	            <input type="password" :class="{'error': passwordCheck}" id="password" name="password" placeholder="请输入密码" v-model="password">
	        </div>
	        <verify-code v-if="showVerifyCode" :show="showVerifyCode" :code="code" :check="codeCheck" :mobile="username"></verify-code>
	        <div class="form-li">
	            <input class="btn-submit" data-disable-with="登录中..." name="commit" type="button" value="登录" @click="submit($event)">
	        </div>
	    </form>
	</div>
</template>
<script>
	import VerifyCode from './common/components/VerifyCode.vue';
	import { mapGetters } from 'vuex';
	import $ from 'jquery';
	const MAX_ERROR_TIMES = 2;
	export default {
		data() {
			return {
				username: '',
				userRoleOptions: [
			        {
			            value: '2',
			            label: '员工'
			        },
			        {
			            value: '1',
			            label: '老师'
			        }
				],
				userRole: 2,
				password: '',
				code: '',
				submitted: false
			}
		},
		computed: {
			userNameCheck() {
				return this.username === '';
			},
			passwordCheck() {
				return this.password === '';
			},
			codeCheck() {
				return this.showVerifyCode && this.code === '';
			},
			params() {
				return {
					mobile: this.username,
					password: this.password,
					userRole: this.userRole,
					code: this.showVerifyCode ? this.code : undefined
				}
			},
			showVerifyCode() {
				return this.$store.state.login.errorTimes > MAX_ERROR_TIMES;
			}
		},
		methods: {
			submit(event) {
				this.$store.dispatch('incrementErrorTimes');
				var btn = $(event.target);
				if (this.userNameCheck || this.passwordCheck) {
					this.$message({
						message: '请输入用户名和密码',
						duration: 2000,
	          			type: 'error'
					});
					return;
				}
				if (this.codeCheck) {
					this.$message({
						message: '请输入验证码',
						duration: 2000,
	          			type: 'error'
					});
					return;
				}
			}
		},
		components: {
			VerifyCode: VerifyCode
		}
	}
</script>