<template>
	<div class="teacher-timetable-wrapper">
		<mt-header title="上课记录">
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
			<div class="hours-wrap">
				<p>该月累计上课</p>
				<p>
					<span class="lar">{{hour}}</span><span class="txt">小时</span>
					<span class="lar">{{minute}}</span><span class="txt">分钟</span>
				</p>
			</div>
			<div class="class-item" v-for="item in lessonDetails">
				<p class="name">{{item.classInfo.className}}</p>
				<p class="txt">
					上课日期: {{item.classInfo.startTime | date('yyyy.MM.dd')}} - {{item.classInfo.endTime | date('yyyy.MM.dd')}}
				</p>
				<ul>
					<li v-for="lesson in item.lessonInfos">
						<p>{{lesson.theme}} <span>2小时</span></p>
						<p>{{lesson.startTime | date('MM.dd')}}</p>
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
	import {teacherRecord} from '../request';
	export default {
		data() {
			return {
				date: new Date(),
				hour: null,
				minute: null,
				lessonDetails: []
			}
		},
		computed: {
			toDay() {
				return isToday(this.date);
			}
		},
		created() {
			this.teacherRecordList();
		},
		methods: {
			teacherRecordList() {
				if (!(this.date instanceof Date)) {
					return;
				}
				showIndicator();
				teacherRecord({
					time: this.date.getTime()
				})
					.then((res) => {
						this.hour = parseInt(res.data.duration / 60);
						this.minute = res.data.duration - this.hour * 60;
						this.lessonDetails = res.data.lessonDetails;
					})
					.always(() => {
						hideIndicator();
					})  
			},
			previous() {
				let time = this.date.getTime() - 24 * 60 * 60 * 1000;
				this.date = new Date(time);
				this.teacherRecordList();
			},
			next() {
				let time = this.date.getTime() + 24 * 60 * 60 * 1000;
				this.date = new Date(time);
				this.teacherRecordList();
			},
			pickerDate() {
				this.$refs.picker.open();
			},
			handlePicker() {
				this.teacherRecordList();
				//showIndicator();
			}
		}
	}
</script>
