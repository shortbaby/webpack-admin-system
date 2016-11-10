<template>
	<div class="student-contract-wrapper">
		<mt-header title="合同">
		  <router-link to="/center" slot="left">
		    <mt-button icon="back"></mt-button>
		  </router-link>
		</mt-header>
		<mt-loadmore :auto-fill="false" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
			<ul class="list">
				<li v-for="item in list">
					<div class="top">
						<p>
							<label>订单号:</label>
							<span>{{item.orderNum}}</span>
						</p>
						<p>
							<label>
								支付时间:
							</label>
							<span>{{item.signTime | date('yyyy.MM.dd HH:mm:ss')}}</span>
						</p>
						<p>
							<label>
								销售人:
							</label>
							<span>{{item.saleStaff}}</span>
						</p>
					</div>
					<div class="bottom">
						<p v-for="p in item.packageInfoDto">
							<span class="iconfont icon-coursebundle"></span>
							<span class="name">{{p.name}}</span>
							<span>×{{p.amount}}</span>
							<span>{{p.price | money}}</span>
						</p>
						<p>
							<span>{{item.amount | money}}</span>
							<span>总计:</span>
							
						</p>
					</div>
				</li>
			</ul>
		</mt-loadmore>
		<copyright></copyright>
	</div>
</template>
<script>
	import {studentContracts} from '../request';
	export default {
		data() {
			return {
				loading: false,
				list: [],
				allLoaded: false
			}
		},
		computed: {
			id() {
				return this.$store.state.studentId;
			}
		},
		created() {
			this.getContracts();
		},
		methods: {
			getContracts() {
				showIndicator();
				studentContracts()
					.then((res) => {
						this.list = this.list.concat(res.data);
					})
					.always((res) => {
						hideIndicator();
					})
			},
			loadBottom(id) {
				this.loading = true;
				studentContracts()
					.then((res) => {
						this.list = this.list.concat(res.data);
					})
					.always((res) => {
						this.$refs.loadmore.onBottomLoaded(id);
						this.loading = false;
					})
			}
		}
	}
</script>