<template>
	<div class="user-sign-wrapper">
		<mt-header title="签到">
		</mt-header>
		<nav>
			<a href="javascript:void(0)" @click="previous">
				<span class="iconfont icon-arrowleft"></span>
				前一天
			</a>
			<a href="javascript:void(0)" @click="pickerDate">
				{{date| date('MM月dd日')}} <span v-if="toDay">今天</span>
				<span class="iconfont icon-arrowdown"></span>
			</a>
			<a href="javascript:void(0)" @click="next">
				后一天
				<span class="iconfont icon-arrowright"></span>
			</a>
		</nav>
		<ul class="list">
			<li @click="toDetail(item)" v-for="item in list">
				<img :src="item.pic">
				<div>
					<p class="name">
						{{item.className}}
					</p>
					<p class="time">
						<span class="iconfont icon-calendar"></span>
						{{item.startTime | date('yyyy.MM.dd')}} - {{item.endTime | date('yyyy.MM.dd')}}
					</p>
					<p>
						<span class="iconfont icon-address"></span>{{item.cityName}}
						<span class="iconfont icon-users"></span>{{item.studentCount}}人
					</p>
				</div>
			</li>
		</ul>
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
	import {checkinList} from '../request';
	import {isToday} from '../../../common/util/tool';
	export default {
		data() {
			return {
				date: new Date(),
				list: [],
				pageNum: 1
			}
		},
		computed: {
			toDay() {
				return isToday(this.date);
			}
		},
		created() {
			this.getCheckinList();
		},
		methods: {
			getCheckinList() {
				if (!(this.date instanceof Date)) {
					return;
				}
				showIndicator();
				checkinList({
					startTime: this.date.toFormattedString('yyyy-MM-dd'),
					pageNum: this.pageNum
				})
					.then((res) => {
						this.list = res.data;
					})
					.always(() => {
						hideIndicator();
					})
			},
			toDetail(item) {
				this.$store.dispatch('setClassId', item.classId);
				this.$router.push('/signdetail');
			},
			previous() {
				let date = new Date(this.date.getTime() - 24 * 60 * 60 * 1000);
				this.date = date;
				this.getCheckinList();
			},
			next() {
				let date = new Date(this.date.getTime() + 24 * 60 * 60 * 1000);
				this.date = date;
				this.getCheckinList();
			},
			pickerDate() {
				this.$refs.picker.open();
			},
			handlePicker() {
				this.getCheckinList();
				//console.log(this.date.getFullYear());
				//showIndicator();
			}
		}
	}
</script>