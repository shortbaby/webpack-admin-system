<template>
	<div class="student-record-detail-wrapper">
		<mt-header title="课程详情">
		  <router-link to="/record" slot="left">
		    <mt-button icon="back"></mt-button>
		  </router-link>
		</mt-header>
		<ul class="list">
			<li>
				<p class="p1">四大课程模块</p>
				<p class="p2">
					<label>上课日期：</label>
					2016年10月25日 - 2016年10月27日
				</p>
				<p>
					<label>上课地点：</label>
					武汉
				</p>
			</li>
			<li>
				<p class="p1">310业绩倍增计划</p>
				<p class="p2">
					<label>上课日期：</label>
					2016年10月25日 - 2016年10月27日
				</p>
				<p>
					<label>上课地点：</label>
					武汉
				</p>
			</li>
			<li>
				<p class="p1">310业绩倍增计划</p>
				<p class="p2">
					<label>上课日期：</label>
					2016年10月25日 - 2016年10月27日
				</p>
				<p>
					<label>上课地点：</label>
					武汉
				</p>
			</li>
		</ul>
		<copyright></copyright>
	</div>
</template>
<script>
	export default {
		data() {
			return {

			}
		},
		computed: {
			id() {
				return this.$store.state.studentId;
			},
			recordId() {
				return this.$store.state.recordId;
			},
			courseId() {
				return this.$store.state.courseId;
			}
		}
	}
</script>