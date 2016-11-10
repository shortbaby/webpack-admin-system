<template>
	<div class="package-info">
		<div class="info-head">
			<span>套餐信息</span>
			<label @click="showPackageDialog" v-if="edit">
				<!-- <span class="txt">重新选择</span> -->
				<span class="iconfont icon-xinjian"></span>
				<span class="txt">添加套餐</span>
			</label>
		</div>
		<div class="info-panel" v-if="list && list.length > 0">
			<ul class="package-list" >
				<li v-for="(item, index) in list">
					<span class="name">{{item.name}}</span>
					<span>数量</span>
					<span class="txt" v-if="!edit">×{{item.amount}}</span>
					<el-input-number v-if="edit" v-model="item.amount"></el-input-number>
					<span class="money">{{item.price | money}}</span>
					<span class="iconfont icon-shanchu" v-if="edit" @click="del(index)"></span>
				</li>
			</ul>
			<div class="bottom">
				<span>合计:</span>
				<span class="money">
					{{totalMoney | money}}
				</span>
			</div>
		</div>
	</div>
</template>
<script>
	import {findInArray} from '../../../common/util/tool';
	export default {
		props: {
			edit: {
				type: Boolean,
				default: false
			},
			data: {
				type: Array
			}
		},
		watch: {
			data(val) {
				if (val instanceof Array && val.length > 0) {
					for (var i = 0; i < val.length; i++) {
						let item = val[i];
						let findIndex = findInArray(item, this.list, 'id');
						if (findIndex == -1) {
							let tmp = {};
							tmp.id = item.id;
							tmp.amount = item.amount || 1;
							tmp.name = item.name;
							tmp.price = item.price;
							this.list.push(tmp);
						}
					};

					for (var j = 0; j < this.list.length; j++) {
						let item = this.list[j];
						let findIndex = findInArray(item, val, 'id');
						if (findIndex == -1) {
							this.list.splice(j, 1);
						}
					};
				} else {
					this.list = [];
				}
			}
		},
		data() {
			return {
				list: []
			}
		},
		computed: {
			totalMoney() {
				let m = 0;
				this.list.forEach((item) => {
					m += item.price * item.amount;
				})
				return m;
			}
		},
		methods: {
			del(index) {
				this.list.splice(index, 1);
				this.$emit('change', this.list);
			},
			showPackageDialog() {
				this.$emit('showdialog');
			}
		}
	}
</script>