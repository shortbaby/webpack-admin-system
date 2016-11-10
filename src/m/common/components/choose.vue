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
	</div>
</template>
<script>
	import MtButton from 'mint-ui/lib/button';
	import MtField from 'mint-ui/lib/field';
	import Toast from 'mint-ui/lib/toast';
	import 'mint-ui/lib/button/style.css';
	import 'mint-ui/lib/field/style.css';
	import 'mint-ui/lib/toast/style.css';
	import {getOrgList} from '../request';
	import redirect from '../../../common/function/redirect';
	import getUrlSearch from '../../../common/function/getUrlSearch';
	export default {
		data() {
			return {
				selectOrg: null,
				list: []
			}
		},
		created(){
			let query = getUrlSearch();
			if (query.openId) {
				getOrgList({
					openId: query.openId
				})
					.then((res) => {
						this.list = res.data;
					})
			}
		},
		computed: {
			disabled(val) {
				return !this.selectOrg;
			}
		},
		methods: {
			select(item) {
				this.selectOrg = item;
			},
			save() {
				if (this.selectOrg) {
					redirect(this.selectOrg.jumpUrl);
				}	
			}
		},
		components: {
			MtButton,
			MtField
		}
	}
</script>