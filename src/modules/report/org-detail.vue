<template>
	<div class="org-detail-wrapper">
		<el-tabs v-on:tab-click="changeTab">
		    <el-tab-pane label="机构品类分布" name="org-category"></el-tab-pane>
		    <el-tab-pane label="机构年收入结构分布" name="org-income"></el-tab-pane>
		    <el-tab-pane label="各城市客户数量分布" name="org-city"></el-tab-pane>
		</el-tabs>
		<transition name="component-fade" mode="out-in">
			<component v-bind:is="view"></component>
		</transition>
	</div>
</template>
<script>

	import OrgCategory from './components/org-category.vue';
	import OrgCity from './components/org-city.vue';
	import OrgIncome from './components/org-income.vue';
	export default {
		data() {
			return {
				view: 'org-category'
			}
		},
		methods: {
			changeTab(val) {
				this.view = val;
			}
		},
		components: {
			OrgCategory,
			OrgIncome,
			OrgCity
		}
	}
</script>