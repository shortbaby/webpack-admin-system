<template>
	<div class="basic-wrap">
		<div class="clearfix">
			<ul class="l-pos li-wrap">
				<li>
					<label>机构城市:</label>
					<span>{{orgform.cityName}}</span>
				</li>
				<li>
					<label>机构品类:</label>
					<span>{{orgform.categoryStr}}</span>
				</li>
				<li>
					<label>年收入:</label>
					<span>{{orgform.annualIncomeStr}}</span>
				</li>
				<li>
					<label>年利润:</label>
					<span>{{orgform.annualProfitStr}}</span>
				</li>
				<li>
					<label>年利润水平:</label>
					<span>{{orgform.profitRateLevelStr}}</span>
				</li>
				<li>
					<label>合伙人/核心管理者:</label>
					<span>{{orgform.coreManagersStr}}</span>
				</li>
			</ul>
			<ul class="l-pos li-wrap">
				<li>
					<label>中层员工数量:</label>
					<span>{{orgform.middleManagersStr}}</span>
				</li>
				<li>
					<label>专职导师数量:</label>
					<span>{{orgform.fullTimeTeachersStr}}</span>
				</li>
				<li>
					<label>兼职导师数量:</label>
					<span>{{orgform.partTimeTeachersStr}}</span>
				</li>
				<li>
					<label>专职非导师数量:</label>
					<span>{{orgform.fullTimeStaffsStr}}</span>
				</li>
				<li>
					<label>兼职非导师数量:</label>
					<span>{{orgform.partTimeStaffsStr}}</span>
				</li>
				<li>
					<label>校区数量:</label>
					<span>{{orgform.schoolsStr}}</span>
				</li>
			</ul>
			<ul class="l-pos li-wrap">
				<li>
					<label>总教学面积:</label>
					<span>{{orgform.teachingAreaStr}}</span>
				</li>
				<li>
					<label>平均班容量:</label>
					<span>{{orgform.averageCapacityStr}}</span>
				</li>
				<li>
					<label>非考试类班级续班率:</label>
					<span>{{orgform.renewRateStr}}</span>
				</li>
				<li>
					<label>平均满班率:</label>
					<span>{{orgform.averageFullRateStr}}</span>
				</li>
			</ul>
		</div>
		<div class="edit-btn" @click="editOrg" v-if="showEditAuth">
			<span>编辑</span>
		</div>
		<new-org v-if="showEdit" :id="id"  :type="0" v-on:close="closeEdit"></new-org>
	</div>
	
</template>
<script>
	import newOrg from './newOrg.vue';
	import {getOrgDetail} from '../request';
	export default {
		data() {
			return {
				showEdit: false,
				orgform: {}
			}
		},
		props: {
			id: {
				type: Number
			}
		},
		created() {
			this.getOrgDetail();
		},
		computed: {
			showEditAuth() {
				return this.$route.path == '/org/allOrg' ? this.$TX_AUTH[140] : this.$TX_AUTH[131];
			}
		},
		methods: {
			getOrgDetail() {
				var param = {
					orgId: this.id,
					isAll: 0
				};
				getOrgDetail(param)
					.then( (res) => {
						this.orgform = res.data.orgBaseInfo;
					} );
			},
			closeEdit(isrefresh) {
				this.showEdit = false;
				if (isrefresh) {
					this.getOrgDetail();
				}
			},
			editOrg() {
				this.showEdit = true;
			}
		},
		components: {
			newOrg: newOrg
		}
	}
</script>
<style lang="sass">
	.basic-wrap {
		padding: 25px 30px;
		background-color: #fff;
		border: 1px solid #e6e6e6;
		.li-wrap {
			width: 300px;
			> li {
				height: 40px;
				line-height: 40px;
			}
			label {
				width: 150px;
				color: #9c9e9f;
			}
		}
		.edit-btn {
			margin-top: 20px;
			width: 100px;
			background-color: #ffbd47;
			color: #fff;
			height: 30px;
			border-radius: 4px;
			cursor: pointer;
			line-height: 30px;
			text-align: center;
		}
	}
</style>
