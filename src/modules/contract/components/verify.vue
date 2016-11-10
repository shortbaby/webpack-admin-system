<template>
	<div class="contract-verify-div">
		<top-head title="审核合同" v-on:clickright="hide"></top-head>
		<div class="contract-verify-div_contend">
			<contract-info :data="data"></contract-info>
			<org-info :data="detail.orgInfo"></org-info>
			<package-info :data="detail.packages"></package-info>
			<remark :data="detail.remark"></remark>
			<div class="info-head">
				<span>审核备注</span>
			</div>
			<el-input
			  type="textarea"
			  placeholder="请输入备注内容"
			  :autosize="{minRows: 3, maxRows: 10}"
			  v-model="verifyRemark">
			</el-input>
			<el-button @click.native="verify($event, 4)" :disabled="submiting">不通过</el-button>
			<el-button type="primary" :disabled="submiting" @click.native="verify($event, 3)">通过</el-button>
		</div>
	</div>
</template>
<script>
	import $ from 'jquery';
	import TopHead from '../../../common/components/TopHead.vue';
	import ContractInfo from './contract-info.vue';
	import OrgInfo from './org-info.vue';
	import PackageInfo from './package-info.vue';
	import Remark from './remark.vue';
	import {getById, review} from '../request';
	export default {
		props: {
			data: {
				type: Object
			}
		},
		data() {
			return {
				verifyRemark: '',
				submiting: false,
				detail: {
					orgInfo: {},
					packages: [],
					remark: {}
				}
			}
		},
		created() {
			this.getDetail();
		},
		methods: {
			adaptData(data) {
				this.detail.orgInfo = data.organizationDto;
				this.detail.packages = data.packageInfoDto;
				this.detail.remark = {
					relevancerName: data.relevancerName,
					relevancerPositon: data.relevancerPositon,
					relevanceTime: data.relevanceTime,
					remark: data.remark
				}
			},
			hide() {
				this.$emit('close');
			},
			verify(event, status) {
				let target = $(event.target);

				if (this.verifyRemark == '') {
					toast('warning', '请填写审核备注信息');
					return;
				}
				target.prop('disabled', true);
				this.$store.dispatch('showLoading');
				this.submiting = true;
				review({
					id: this.data.id,
					status: status,
					reviewRemark: this.verifyRemark
				})
					.then((res) => {
						toast('success', '提交审核结果成功');
						setTimeout(() => {
							this.hide();
						}, 1000);
					})
					.always(() => {
						this.submiting = false;
						target.prop('disabled', false);
						this.$store.dispatch('hideLoading');
					});
			},
			getDetail() {
				getById({
					id: this.data.id
				})
					.then((res) => {
						this.adaptData(res.data);
					})
			}
		},
		components: {
			TopHead,
			ContractInfo,
			OrgInfo,
			PackageInfo,
			Remark
		}
	}
</script>