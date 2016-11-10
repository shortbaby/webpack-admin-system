<template>
	<div class="user-sign-detail-wrapper">
		<mt-header title="签到">
		  <router-link to="/sign" slot="left">
		    <mt-button icon="back"></mt-button>
		  </router-link>
		</mt-header>
		<div class="info">
			<p class="name">
				{{classDetail.className}}
			</p>
			<p>
				<label>时间:</label>
				{{classDetail.startTime | date('yyyy.MM.dd')}} - {{classDetail.endTime | date('yyyy.MM.dd')}}
			</p>
			<p>
				<label>地点:</label>
				{{classDetail.address}}
			</p>
			<p>
				<label>课程:</label>
				{{classDetail.theme}}
			</p>
			<p>
				<label>学员:</label>
				{{classDetail.studentCount}}人
			</p>
		</div>
		<div class="sign-info">
			已签到{{signedCount}}/{{classDetail.studentCount}}人
		</div>
		<ul class="list">
			<li v-for="n in studentList" :class="{'signed': n.status == 1}">
				<img class="avatar" :src="n.pic">
				<div>
					<p class="name">
						{{n.studentName}}
					</p>
					<p class="txt">
						{{n.duty}}
					</p>
				</div>
				<span class="iconfont icon-success"></span>
			</li>
		</ul>
		<tx-navbar :options="options" @manualSign="manualSign" @scancodeSign="scancodeSign"></tx-navbar>	
		<copyright></copyright>
	</div>
</template>
<script>
	import TxNavbar from '../../common/components/tx-navbar.vue';
	import {checkinDetail, scanCodeSign} from '../request';
	import wechatConfig from '../wechatConfig';
	import qrSign from '../../../common/function/qrSign';
	export default {
		data() {
			return {
				classDetail: {},
				signedCount: 0,
				studentList: [],
				options: [
					{
						label: '手动签到',
						emitHandler: 'manualSign'
					},
					{
						label: '扫码签到',
						emitHandler: 'scancodeSign'
					}
				]
			}
		},
		computed: {
			id() {
				return this.$store.state.classId
			}
		},
		created() {
			this.getDetail();
		},
		methods: {
			getDetail() {
				showIndicator();
				checkinDetail({
					id: this.id
				})
					.then((res) => {
						this.classDetail = res.data.classDetail;
						this.signedCount = res.data.signedCount;
						this.studentList = res.data.studentList;
						this.$store.dispatch('setClassDetail', this.classDetail);
						this.$store.dispatch('setSignedCount', this.signedCount);
						this.$store.dispatch('setStudentList', this.studentList);
					})
					.always(() => {
						hideIndicator();
					})
			},
			doSign () {
				var self = this;
				window.wx.scanQRCode({
					needResult: 1,
					scanType: ["qrCode"],
					success: function(res) {
						let token = res.resultStr;
						if(!token) {
							dispatch('TOAST', "读取二维码信息失败");
							return;
						}
						scanCodeSign(
							{	
							})
							.then(function(res) {
								// 更新一下列表
								//self.getCheckInList();
								self.scancodeSign();
							});
					}
				});
			},
			scancodeSign() {
				var now = Math.floor(+new Date() / 1000);
				var timestamp = wechatConfig.timestamp;
				if (now - timestamp > 7200) {
					qrSign(wechatConfig).then(this.doSign);
				} else {
					this.doSign();
				}
			},
			manualSign() {
				this.$router.push('/manualsign');
			}
		},
		components: {
			TxNavbar
		}
	}
</script>