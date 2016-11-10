<template>
	<div class="student-receipt-wrapper">
		<mt-header title="报班回执">
		  <router-link to="/classdetail" slot="left">
		    <mt-button icon="back"></mt-button>
		  </router-link>
		</mt-header>
		<div>
			<div class="tip">
				<p>尊敬的{{name}}:</p>
				您好，欢迎您参加跟谁学商学院的课程。为了保障会务工作的顺利进行，更好地为您提供有针对性服务，请您填写以下信息：
			</div>
			<p class="tip-p">您是否需要我们协助帮您订房？</p>
			<div class="field-wrap">
				<p>
					<label>订房</label>
					<span @click="toRoom">
						<i class="txt" v-if="hotelType == 0">未选择</i> 
						<i class="txt" v-if="hotelType == 1">双人标间</i> 
						<i class="txt" v-if="hotelType == 2">单人大床房</i> 
						<i class="txt" v-if="hotelType == 3">拼房</i> 
						<i class="txt" v-if="hotelType == 4">自己安排</i> 
						<i class="iconfont icon-arrowright"></i>
					</span>
				</p>
			</div>
			<p class="tip-p">请完善您的往返交通信息</p>
			<div class="field-wrap">
				<p>
					<label>到达日期和时间</label>
					<span @click="pickerArrive"> 
						<i class="txt">{{arriveTimeStr}}</i>
						<i class="iconfont icon-arrowright"></i>
					</span>
				</p>
				<p>
					<label>到达航班/车次</label>
					<span @click="toFlight(1)"> 
						<i class="txt">{{arriveNum}}</i>
						<i class="iconfont icon-arrowright"></i>
					</span>
				</p>
				<p>
					<label>返程日期及时间</label>
					<span @click="pickerBack"> 
						<i class="txt">{{leaveTimeStr}}</i>
						<i class="iconfont icon-arrowright"></i>
					</span>
				</p>
				<p>
					<label>返程航班/车次</label>
					<span @click="toFlight(2)"> 
						<i class="txt">{{leaveNum}}</i>
						<i class="iconfont icon-arrowright"></i>
					</span>
				</p>
			</div>
			<div class="button-control">
	  			<mt-button type="default" @click.native="save">保存</mt-button>
	  		</div>
		</div>		
		<copyright></copyright>
		<mt-datetime-picker
		    ref="picker"
		    type="datetime"
		    v-model="date"
		    @confirm="handlePicker">
		</mt-datetime-picker>
	</div>
</template>
<script>
	import {studentModifyReceipt} from '../request';
	export default {
		data() {
			return {
				date: new Date(),
				type: 1,
				arriveTimeStr: '',
				leaveTimeStr: ''
			}
		},
		computed: {
			arriveTime() {
				return this.$store.state.arriveTime;
			},
			leaveTime() {
				return this.$store.state.leaveTime;
			},
			arriveNum() {
				return this.$store.state.arriveNum;
			},
			leaveNum() {
				return this.$store.state.leaveNum;
			},
			hotelType() {
				return this.$store.state.hotelType;
			},
			id() {
				return this.$store.state.studentId;
			},
			classId() {
				return this.$store.state.classId;
			},
			name() {
				return this.$store.state.studentName;
			}
		},
		created() {
			if (this.arriveTime instanceof Date) {
				this.arriveTimeStr = this.arriveTime.toFormattedString('yyyy.MM.dd HH:mm');
			}
			if (this.leaveTime instanceof Date) {
				this.leaveTimeStr = this.leaveTime.toFormattedString('yyyy.MM.dd HH:mm');
			} 
		},
		methods: {
			toRoom() { 
				this.$router.push('/room');
			},
			toFlight(type) {
				this.$store.dispatch('setFlightType', type);
				this.$router.push('/flight');
			},
			check(params) {
				let res = true;
				if (!params.arriveTime) {
					toast('error', '请选择到达日期和时间');
					return false;
				}
				if (!params.arriveNum) {
					toast('error', '请选择到达航班/车次');
					return false;
				}
				if (!params.leaveTime) {
					toast('error', '请选择返程日期和时间');
					return false;
				}
				if (!params.leaveNum) {
					toast('error', '请选择返程航班/车次');
					return false;
				}
				if (params.hotelType == -1) {
					toast('error', '请选择订房信息');
					return false;
				}
				return res;
			},
			save() {
				let params = {};
				params.id = this.id;
				params.arriveTime = this.arriveTime;
				params.leaveTime = this.leaveTime;
				params.arriveNum = this.arriveNum;
				params.leaveNum = this.leaveNum;
				params.hotelType = this.hotelType;

				if (this.check(params)) {
					showIndicator();
					studentModifyReceipt(params)
						.then((res) => {
							toast('success', '保存信息成功');
							setTimeout(() => {
								this.$router.push('/classdetail');
							}, 1000);
						})
						.always(() => {
							hideIndicator();
						})

				}
			},
			pickerArrive() {
				this.type = 1;
				this.$refs.picker.open();
			},
			pickerBack() {
				this.type = 2;
				this.$refs.picker.open();
			},
			handlePicker() {
				if (this.type == 1) {
					//this.arriveTime = this.date;
					this.$store.dispatch('setArriveTime', this.date);
					this.arriveTimeStr = this.date.toFormattedString('yyyy.MM.dd HH:mm');
				}
				if (this.type == 2) {
					//this.leaveTime = this.date;
					this.$store.dispatch('setLeaveTime', this.date);
					this.leaveTimeStr = this.date.toFormattedString('yyyy.MM.dd HH:mm');
				}
			}
		}
	}
</script>