<template>
	<div class="org-detail-wrapper">
		<el-tabs v-on:tab-click="changeTab">
		    <el-tab-pane label="新增机构数" name="increase-org"></el-tab-pane>
		    <el-tab-pane label="机构回访" name="org-return"></el-tab-pane>
		</el-tabs>
		<transition name="component-fade" mode="out-in">
			<component v-bind:is="view"></component>
		</transition>
	</div>
</template>
<script>
	import IncreaseOrg from './components/increase-org.vue';
	import OrgReturn from './components/org-return.vue';
	export default {
		data() {
			return {
				view: 'increase-org'
			}
		},
		methods: {
			changeTab(val) {
				this.view = val;
			}
		},
		components: {
			IncreaseOrg,
			OrgReturn
		}
	}
</script>