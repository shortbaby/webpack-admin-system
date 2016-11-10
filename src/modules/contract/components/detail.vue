<template>
	<div class="contract-detail-div">
		<top-head title="合同详情" v-on:clickright="hide"></top-head>
		<div class="contract-detail-div_contend">
			<div class="info-panel verify-info">
				<p class="res unpass" v-if="detail.status == 4">
					<span class="iconfont icon-cuowu"></span>
					<span class="msg">审核未通过</span>
				</p>
				<p class="res pass" v-if="detail.status == 3">
					<span class="iconfont icon-check"></span>
					<span class="msg">审核通过</span>
				</p>
				<p class="remark-p" v-if="detail.reviewRemark">
					<label>审核备注:</label>
					{{detail.reviewRemark}}
				</p>
				<p>
					<span>审核人:</span>
					<span>{{detail.reviewer}}</span>
					<span>审核日期:</span>
					<span>{{detail.reviewTime | date('yyyy.MM.dd')}}</span>
				</p>
			</div>
			<contract-info :data="data"></contract-info>
			<org-info :data="detail.orgInfo"></org-info>
			<package-info :data="detail.packages"></package-info>
			<remark :data="detail.remark"></remark>
		</div>
	</div>
</template>
<script>
	import TopHead from '../../../common/components/TopHead.vue';
	import ContractInfo from './contract-info.vue';
	import OrgInfo from './org-info.vue';
	import PackageInfo from './package-info.vue';
	import Remark from './remark.vue';
	import {getById} from '../request';
	export default {
		props: {
			data: {
				type: Object
			}
		},
		data() {
			return {
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
				this.detail.status = data.status;
				this.detail.reviewRemark = data.reviewRemark;
				this.detail.reviewer = data.reviewer;
				this.detail.reviewTime = data.reviewTime;
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