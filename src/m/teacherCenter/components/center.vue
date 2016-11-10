<template>
	<div class="teacher-center-wrapper">
		<div class="info-panel">
			<div class="info">
				<div class="main-info">
					<div class="avatar">
						<img :src="info.pic">
					</div>
					<p class="name">
						{{info.name}}
					</p>
					<p>
						{{info.position}}
					</p>
				</div>
				<router-link to="/profile">
					<span class="iconfont icon-arrowright" ></span>
				</router-link>
				
			</div>	
		</div>
		<div class="naver">
			<ul>
				<li @click="toTimetable">
					<span class="iconfont icon-iconkebiao"></span>
					<span class="iconfont icon-arrowright"></span>
					<div>
						<p>课表</p>
						<p>今日共{{info.todayLessonCount}}节课</p>
					</div>
					
				</li>
				<li @click="toClass">
					<span class="iconfont icon-iconbanji"></span>
					<span class="iconfont icon-arrowright"></span>
					<div>
						<p>班级</p>
						<p>共{{info.classCount}}个班级</p>
					</div>
					
				</li>
				<li @click="toRecord">
					<span class="iconfont icon-iconshangkejilu"></span>
					<span class="iconfont icon-arrowright"></span>
					<div>
						<p>上课记录</p>
						<p>共{{info.lessonCount}}次记录</p>
					</div>
					
				</li>
			</ul>
		</div>
		<copyright></copyright>
	</div>
</template>
<script>
	import {teacherInfo} from '../request';
	export default {
		data() {
			return {
				info: {}
			}
		},
		created() {
			this.getTeacherInfo();
		},
		methods: {
			getTeacherInfo() {
				showIndicator();
				teacherInfo()
					.then((res) => {
						this.info = res.data;
						this.$store.dispatch('setTeacherId', this.info.id);
					})
					.always(() => {
						hideIndicator();
					})
			},
 			toTimetable() {
				this.$router.push('/timetable');
			},
			toClass() {
				this.$router.push('/class')
			},
			toRecord() {
				this.$router.push('/record')
			}

		}
	}
</script>