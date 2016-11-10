<template>
	<div class="choose-wrapper">
		<p>选择机构</p>
		<ul v-for="item in list" @click="select(item)">
			<li :class="{active: selectOrg == item}">
				<p>
					<span>{{item.orgName}}</span>
					<span class="iconfont icon-xuanze"></span>
				</p>
				
			</li>
		</ul>
		<div class="button-control">
			<mt-button type="default" :disabled="disabled" @click.native="save">进入学员中心</mt-button>
		</div>
		<copyright></copyright>
	</div>
</template>
<script>
	import {getOrgList} from '../request';
	export default {
		data() {
			return {
				selectOrg: null,
				list: []
			}
		},
		created(){
			if(this.openId) {
				getOrgList({
					openId: this.openId
				})
					.then((res) => {
						this.list = res.data;
					})
			}
		},
		computed: {
			openId() {
				return this.$store.state.openId;
			},
			disabled(val) {
				return !this.selectOrg;
			}
		},
		methods: {
			select(item) {
				this.selectOrg = item;
				this.$store.dispatch('setOrgId', item.id);
			},
			save() {
				this.$router.push('/center');
			}
		}
	}
</script>