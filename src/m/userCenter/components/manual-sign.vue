<template>
	<div class="user-sign-detail-wrapper">
		<mt-header title="手动签到">
		  <router-link to="/sign" slot="left">
		    <mt-button icon="back"></mt-button>
		  </router-link>
		</mt-header>
		<div class="info">
			<p class="name">
				{{classDetail.className}}
			</p>
		</div>
		<div class="sign-info">
			已签到{{signedCount}}/{{classDetail.studentCount}}人
		</div>
		<ul class="list">
			<li v-for="n in studentList" class="normal">
				<img class="avatar" :src="n.pic">
				<div>
					<p class="name">
						{{n.studentName}}
					</p>
					<p class="txt">
						{{n.orgName}} {{n.duty}}
					</p>
				</div>
				<div class="switch-control">
					<tx-switch :checked="n.status == 1" :data="n" @change="changeSign"></tx-switch>
					<!-- <span v-if="n.type == 0">已手动签到</span>
					<span v-if="n.type == 1">已扫码签到</span> -->
				</div>
			</li>
		</ul>
		<tx-navbar :options="options" @allCancel="allCancel" @allSign="allSign"></tx-navbar>	
		<copyright></copyright>
	</div>
</template>
<script>
	import TxNavbar from '../../common/components/tx-navbar.vue';
	import TxSwitch from '../../../common/components/Switch.vue';
	import {manualSign} from '../request';
	export default {
		data() {
			return {
				value: true,
				options: [
					{
						label: '全部取消',
						emitHandler: 'allCancel'
					},
					{
						label: '全部到课',
						emitHandler: 'allSign'
					}
				]
			}
		},
		computed: {
			classId() {
				return this.$store.state.classId;
			},
			classDetail() {
				return this.$store.state.classDetail;
			},
			studentList() {
				return this.$store.state.studentList;
			},
			signedCount() {
				return this.$store.state.signedCount;
			}
		},
		methods: {
			changeSign(item, val) {
				let params = {
					classId: this.classId,
					checkStatus: [
						{
							id: item.studentId,
							type: val ? 1 : 0
						}
					]
				}
				showIndicator();
				manualSign(params)
					.then((res) => {
						if (val) {
							toast('success','手动签到成功');
							item.status = 1;
						} else {
							toast('success','取消签到成功');
							item.status = 0;
						}
					})
					.always(() => {
						hideIndicator();
					})
			},
			allCancel() {
				let params = {
					classId: this.classId,
					checkStatus: []
				}
				this.studentList.forEach((item) => {
					let check = {
						id: item.studentId,
						type: 0
					}
					params.checkStatus.push(check);
				})
				showIndicator();
				manualSign(params)
					.then((res) => {
						toast('success', '全部取消签到成功');
						this.studentList.forEach((item) => {
							item.status = 0;
						})
					})
					.always(() => {
						hideIndicator();
					})
			},
			allSign() {
				let params = {
					classId: this.classId,
					checkStatus: []
				}
				this.studentList.forEach((item) => {
					let check = {
						id: item.studentId,
						type: 1
					}
					params.checkStatus.push(check);
				})
				showIndicator();
				manualSign(params)
					.then((res) => {
						toast('success', '全部手动签到成功');
						this.studentList.forEach((item) => {
							item.status = 1;
						})
					})
					.always(() => {
						hideIndicator();
					})
			}
		},
		components: {
			TxNavbar,
			TxSwitch
		}
	}
</script>