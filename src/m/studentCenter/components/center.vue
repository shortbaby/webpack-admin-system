<template>
	<div class="student-center-wrapper">
		<div class="info-panel">
			<div class="top clearfix">
				<div class="left" @click="toNotice">
					<span class="iconfont icon-xiaoxi"></span>
					<mt-badge v-if="info.unReadMsgCount" type="error" size="small">{{info.unReadMsgCount}}</mt-badge>
				</div>
				<div class="right" @click="toCode">
					<span class="iconfont icon-erweima"></span>
				</div>
			</div>
			<div class="info">
				<div class="main-info">
					<div class="avatar">
						<img :src="info.pic">
					</div>
					<p class="name">
						{{info.name}}
					</p>
					<p>
						<span>{{info.orgName}}</span> <span class="duty">{{info.duty}}</span>
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
				<li @click="toContract">
					<span class="iconfont icon-contract"></span>
					<span class="iconfont icon-arrowright"></span>
					<div>
						<p>合同</p>
						<p>共{{info.contractCount}}个合同</p>
					</div>
				</li>
			</ul>
		</div>
		<copyright></copyright>
	</div>
</template>
<script>
	import {studentInfo} from '../request';
	export default {
		created() {
			this.getInfo();
		},
		data() {
			return {
				info: {}
			}
		},
		computed: {
			id() {
				return this.$store.state.studentId;
			}
		},
		methods: {
			getInfo() {
				showIndicator();
				studentInfo()
					.then((res) => {
						this.info = res.data;
						this.$store.dispatch('setStudentId', this.info.id);
						this.$store.dispatch('setStudentName', this.info.name);
						this.$store.dispatch('setOrgName', this.info.orgName);
						this.$store.dispatch('setDuty', this.info.duty);
						this.$store.dispatch('setPic', this.info.pic);
					})
					.always(() => {
						hideIndicator();
					})
			},
			toNotice() {
				this.$router.push('/notice');
			},
			toCode() {
				this.$router.push('/mycode');
			},
			toTimetable() {
				this.$router.push('/timetable');
			},
			toClass() {
				this.$router.push('/class')
			},
			toRecord() {
				this.$router.push('/record')
			},
			toContract() {
				this.$router.push('/contract')
			}

		}
	}
</script>