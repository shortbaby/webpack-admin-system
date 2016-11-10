<template>
	<div class="teacher-class-detail-wrapper">
		<mt-header title="班级详情">
		  <router-link to="/class" slot="left">
		    <mt-button icon="back"></mt-button>
		  </router-link>
		</mt-header>
		<div class="card">
			<img :src="classInfo.pic">
			<p class="name">{{classInfo.className}}</p>
			<p><label>时间:</label> <span>{{classInfo.startTime | date('yyyy.MM.dd')}} - {{classInfo.endTime | date('yyyy.MM.dd')}}</span></p>
			<p><label>地点:</label> <span>{{classInfo.address}}</span></p>
			<!-- <p><label>课程:</label> <span>310业绩倍增计划</span></p> -->
			<p><label>学员:</label> <span>{{classInfo.studentNum}}人</span></p>
		</div>
		<mt-navbar v-model="selected">
		  <mt-tab-item id="1">课程安排</mt-tab-item>
		  <mt-tab-item id="2">学员</mt-tab-item>
		</mt-navbar>
		<mt-tab-container v-model="selected">
		  <mt-tab-container-item id="1">
		    <div class="lessons-wrapper">
				<div class="course-item" v-for="(value, key, index) in lessonInfos">
					<p>第{{index}}天 {{key}}</p>
					<ul>
						<li class="clearfix" v-for="item in value">
							<div class="left">
								<p>{{item.startTime | date('HH:mm')}}</p>
								<p>{{item.endTime | date('HH:mm')}}结束</p>
							</div>
							<div>
								<p>{{item.theme}}</p>
								<p>{{item.teacherName}}</p>
							</div>
						</li>
					</ul>
				</div>
		    </div>
		  </mt-tab-container-item>
		  <mt-tab-container-item id="2">
		  	<div class="student-wrapper">
		  		<div class="list clearfix">
		  			<div class="item" v-for="(n, index) in studentInfos" v-if="index < 20">
		  				<div class="avatar">
		  					<img class="avatar" :src="n.pic">
		  				</div>
		  				<p>{{n.name}}</p>
		  			</div>
		  		</div>
		  		<p @click="toAllStudents">
		  			查看全部学员({{studentInfos.length}}人)
		  			<span class="iconfont icon-arrowright"></span>
		  		</p>
		  	</div>
		  </mt-tab-container-item>
		</mt-tab-container>
		<copyright></copyright>
	</div>
</template>
<script>
	import {teacherClassDetail} from '../request';
	export default {
		data() {
			return {
				selected: "1",
				classInfo: {},
				lessonInfos: [],
				studentInfos: []
			}
		},
		computed: {
			classId() {
				return this.$store.state.classId;
			}
		},
		created() {
			if (this.classId) {
				showIndicator();
				teacherClassDetail({
					classId: this.classId
				})
					.then((res) => {
						this.classInfo = res.data.classInfo;
						this.lessonInfos = res.data.lessonInfos;
						this.studentInfos = res.data.studentInfos;

						this.$store.dispatch('setStudents', this.studentInfos);
					})
					.always(() => {
						hideIndicator();
					})
			}
		},
		methods: {
			modify() {
				this.$router.push('/receipt')
			},
			toAllStudents() {
				this.$router.push('/allstudents');
			}
		}
	}
</script>
