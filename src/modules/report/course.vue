<template>
	<div class="org-detail-wrapper">
		<el-tabs v-on:tab-click="changeTab">
		    <el-tab-pane label="课程消耗报表" name="course-resume"></el-tab-pane>
		</el-tabs>
		<transition name="component-fade" mode="out-in">
		<keep-alive>
			<component v-bind:is="view"></component>
		</keep-alive>
		</transition>
	</div>
</template>
<script>
	import CourseResume from './components/course-resume.vue';
	export default {
		data() {
			return {
				view: 'course-resume'
			}
		},
		methods: {
			changeTab(val) {
				this.view = val;
			}
		},
		components: {
			CourseResume
		}
	}
</script>