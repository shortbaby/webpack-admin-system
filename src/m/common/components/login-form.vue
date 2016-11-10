<template>
	<div class="login-form">
		<div class="form-control">
			<mt-field class="mobile-field" v-model="mobile" label="+86" placeholder="请输入手机号" type="tel"></mt-field>
		</div>
		<div class="form-control">
			<mt-field label="" class="code-field" v-model="code">
				<span :class="{'disabled': getCoding}" @click="getCode">{{codeTip}}</span>
			</mt-field>
		</div>
		<mt-button type="default" :disabled="submiting" @click.native="bind">绑定</mt-button>
	</div>
</template>
<script>
	import MtButton from 'mint-ui/lib/button';
	import MtField from 'mint-ui/lib/field';
	import Toast from 'mint-ui/lib/toast';
	import 'mint-ui/lib/button/style.css';
	import 'mint-ui/lib/field/style.css';
	import 'mint-ui/lib/toast/style.css';
	import {bind, sendCode} from '../request';
	import getUrlSearch from '../../../common/function/getUrlSearch';
	import redirect from '../../../common/function/redirect';
	export default {
		data() {
			return {
				mobile: '',
				code: '',
				count: 60,
				query: {},
				getCoding: false,
				submiting: false,
				codeTip: '获取验证码',
				timer: null
			}
		},
		created() {
			this.query = getUrlSearch();
		},
		methods: {
			timeStep() {
				this.count--;
				this.codeTip = `重新获取(${this.count}s)`;
				if (this.count < 1 && this.timer) {
					clearInterval(this.timer);
					this.getCoding = false;
					this.codeTip = `获取验证码`;
				}
			},
			startTimer() {	
				this.codeTip = `重新获取(${this.count}s)`;
				this.timer = setInterval(() => {
					this.timeStep();
				}, 1000);
				this.timeStep();

			},
			getCode() {
				this.count = 60;
				if (this.getCoding) {
					return;
				} else {
					if (this.mobile == '') {
						Toast('手机号不能为空');
						return;
					}
					if (!(/^1[34578]\d{9}$/.test(this.mobile))) {
						Toast('请输入正确的手机号');
						return;
					}
					let params = {
						mobile: this.mobile,
						userRole: this.query.userRole
					};
					this.getCoding = true;
					sendCode(params)
						.then((res) => {
							Toast('验证码已发送');
							this.startTimer();
						}, () => {
							this.getCoding = false;
						});
				}
			},
			bind() {
				if (this.mobile == '') {
					Toast('手机号不能为空');
					return;
				}
				if (!(/^1[34578]\d{9}$/.test(this.mobile))) {
					Toast('请输入正确的手机号');
					return;
				}
				if (this.code == '') {
					Toast('请输入验证码');
					return;
				}
				this.submiting = true;
				let params = {
					mobile: this.mobile,
					code: this.code,
					openId: this.query.openId,
					userRole: this.query.userRole
				}
				bind(params)
					.then((res) => {
						Toast('绑定成功');
						redirect(res.data.url);
					})
					.always(() => {
						this.submiting = false;
					})
				
			}
		},
		components: {
			MtButton,
			MtField
		}
	}
</script>