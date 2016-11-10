<template>
	<div class="org-detail-wrapper">
		<el-tabs v-on:tab-click="changeTab">
		    <el-tab-pane label="报班情况报表" name="class-detail"></el-tab-pane>
		</el-tabs>
		<transition name="component-fade" mode="out-in">
			<keep-alive>
				<component v-bind:is="view"></component>
			</keep-alive>
		</transition>
	</div>
</template>
<script>
	import ClassDetail from './components/class-detail.vue';
	export default {
		data() {
			return {
				view: 'class-detail'
			}
		},
		methods: {
			changeTab(val) {
				this.view = val;
			}
		},
		components: {
			ClassDetail
		}
	}
</script>