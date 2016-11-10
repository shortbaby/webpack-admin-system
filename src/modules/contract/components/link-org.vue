<template>
	<div class="contract-org-div">
		<top-head title="关联机构" v-on:clickright="hide"></top-head>
		<div class="contract-org-div_contend">
			<contract-info edit :data="info"></contract-info>
			<org-info edit v-on:showdialog="toggleOrgDialog" :data="orgInfo"></org-info>
			<package-info edit v-on:showdialog="togglePackageDialog" v-on:change="changePackagesInfo" :data="packagesInfo" ref="packagesComp"></package-info>
			<div class="info-head">
				<span>备注</span>
			</div>
			<el-input
			  type="textarea"
			  placeholder="请输入备注内容"
			  :autosize="{minRows: 3, maxRows: 10}"
			  v-model="remark">
			</el-input>
			<el-button type="primary" :disabled="disabled" @click.native="submit">提交审核</el-button>
		</div>
		<org-dialog v-if="showOrgDialog" v-on:addOrg="addOrg" v-on:closedialog="closeDialog"></org-dialog>
		<package-dialog v-if="showPackageDialog" :data="packagesInfo" v-on:selectPackage="addPackage" v-on:closedialog="closeDialog"></package-dialog>
	</div>
</template>
<script>
	import TopHead from '../../../common/components/TopHead.vue';
	import ContractInfo from './contract-info.vue';
	import OrgInfo from './org-info.vue';
	import PackageInfo from './package-info.vue';
	import OrgDialog from './org-dialog.vue';
	import PackageDialog from './package-dialog.vue';
	import {getById, relevance} from '../request';
	export default {
		props: {
			data: {
				type: Object
			}
		},
		data() {
			return {
				remark: '',
				showOrgDialog: false,
				showPackageDialog: false,
				info: {},
				orgInfo: {},
				submiting: false,
				packagesInfo: []
			}
		},
		computed: {
			disabled() {
				if (this.submiting) {
					return true;
				}
				if (this.orgInfo.id && this.packagesInfo.length > 0 && this.remark.length > 0) {
					return false;
				} else {
					return true;
				}
			},
			packagesDetail() {
				return this.$refs.packagesComp.list;
			}
		},
		created() {
			if (this.data) {
				this.info = this.data;
				this.getDetail();
			}
		},
		methods: {
			adaptData(data) {
				this.orgInfo = data.organizationDto || {};
				//this.orgInfo = {};
				this.packagesInfo = data.packageInfoDto;
			},
			hide() {
				this.$emit('close');
			},
			changePackagesInfo(list) {
				this.packagesInfo = list;
			},
			getDetail() {
				getById({
					id: this.data.id
				})
					.then((res) => {
						this.adaptData(res.data);
					})
			},
			closeDialog() {
				this.showOrgDialog = false;
				this.showPackageDialog = false;
				removeBodyModal();
			},
			toggleOrgDialog() {
				this.showOrgDialog = !this.showOrgDialog;
			},
			togglePackageDialog() {
				this.showPackageDialog = !this.showPackageDialog;
			},
			addOrg(val) {
				if (val) {
					this.orgInfo = val;
				}
			},
			addPackage(val) {
				if (val instanceof Array) {
					this.packagesInfo = val;
				}
				
			},
			submit() {
				let params = {};
				params.id = this.info.id;
				params.organizationId = this.orgInfo.id;
				params.remark = this.remark;
				params.packages = [];
				this.packagesDetail.forEach((item) => {
					let tmp = {};
					tmp.id = item.id;
					tmp.amount = item.amount;
					params.packages.push(tmp);
				});
				if (params.packages.length == 0) {
					toast('warning', '请选择套餐信息');
					return;
				}
				this.$store.dispatch('showLoading');
				this.submiting = true;
				relevance(params)
					.then((res) => {
						toast('success', '提交审核成功');
						setTimeout(() => {
							this.hide();
						}, 1000);
					})
					.always(() => {
						this.submiting = false;
						this.$store.dispatch('hideLoading');
					});
			}
		},
		components: {
			TopHead,
			ContractInfo,
			OrgInfo,
			PackageInfo,
			OrgDialog,
			PackageDialog
		}
	}
</script>