<template>
	<div class="student-sign-wrapper">
		<mt-header title="签到状态">
		  <router-link to="/center" slot="left">
		    <mt-button icon="back"></mt-button>
		  </router-link>
		</mt-header>
		<div>
			<div class="sign-info unchecked">
				<!-- <span class="iconfont icon-check"></span> -->
				<span class="iconfont icon-cuowu"></span>
				<p class="sign-txt">
					您已成功签到!
				</p>
			</div>
			<p class="sign-p">
				<label>签到班级:</label>
				<span>310业绩倍增计划（武汉</span>
			</p>
			<p class="sign-p">
				<label>签到时间:</label>
				<span>2016.9.20 12:30</span>
			</p>
			<p class="sign-p">
				<label>学生姓名:</label>
				<span>徐官龙</span>
			</p>
			<p class="sign-p">
				<label>上课老师:</label>
				<span>宋敏德</span>
			</p>
		</div>		
		<copyright></copyright>
	</div>
</template>
<script>
	export default {
		data() {
			return {
			}
		},
		methods: {
		}
	}
</script>
