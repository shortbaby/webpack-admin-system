<template>
	<div class="teacher-timetable-wrapper">
		<mt-header title="课表">
		  <router-link to="/center" slot="left">
		    <mt-button icon="back"></mt-button>
		  </router-link>
		</mt-header>
		<nav>
			<a href="javascript:void(0)" @click="previous">
				<span class="iconfont icon-arrowleft"></span>
				前一天
			</a>
			<a href="javascript:void(0)" @click="pickerDate">
				{{date | date('MM月dd日')}} <span v-if="toDay">今天</span>
				<span class="iconfont icon-arrowdown"></span>
			</a>
			<a href="javascript:void(0)" @click="next">
				后一天
				<span class="iconfont icon-arrowright"></span>
			</a>
		</nav>
		<div>
			<div class="course-item">
				<p>{{classInfo.className}}</p>
				<ul>
					<li class="clearfix" v-for="item in lessons">
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
		<copyright></copyright>
		<mt-datetime-picker
		    ref="picker"
		    type="date"
		    v-model="date"
		    @confirm="handlePicker">
		</mt-datetime-picker>
	</div>
</template>
<script>
	import {isToday} from '../../../common/util/tool';
	import {teacherLessons} from '../request';
	export default {
		data() {
			return {
				date: new Date(),
				classInfo: {},
				lessons: []
			}
		},
		computed: {
			toDay() {
				return isToday(this.date);
			}
		},
		created() {
			this.getLessons();
		},
		methods: {
			getLessons() {
				if (!(this.date instanceof Date)) {
					return;
				}
				showIndicator();
				teacherLessons({
					time: this.date.getTime()
				})
					.then((res) => {
						this.classInfo = res.data.classInfo;
						this.lessons = res.data.lessonInfos;
					})
					.always(() => {
						hideIndicator();
					})  
			},
			previous() {
				let time = this.date.getTime() - 24 * 60 * 60 * 1000;
				this.date = new Date(time);
				this.getLessons();
			},
			next() {
				let time = this.date.getTime() + 24 * 60 * 60 * 1000;
				this.date = new Date(time);
				this.getLessons();
			},
			pickerDate() {
				this.$refs.picker.open();
			},
			handlePicker() {
				this.getLessons();
			}
		}
	}
</script>
