<template>
	<div class="student-class-detail-wrapper">
		<mt-header title="班级详情">
		  <router-link to="/class" slot="left">
		    <mt-button icon="back"></mt-button>
		  </router-link>
		</mt-header>
		<div class="card">
			<img :src="classInfo.pic">
			<p class="name">{{classInfo.className}}</p>
			<p>
				<label>时间:</label> 
				<span> 
					{{classInfo.startTime | date('yyyy.MM.dd')}} - {{classInfo.endTime | date('yyyy.MM.dd')}}
				</span>
			</p>
			<p><label>地点:</label> <span>{{classInfo.address}}</span></p>
			<!-- <p><label>课程:</label> <span>310业绩倍增计划</span></p> -->
			<p><label>学员:</label> <span>{{classInfo.studentNum}}人</span></p>
		</div>
		<mt-navbar v-model="selected">
		  <mt-tab-item id="1">课程安排</mt-tab-item>
		  <mt-tab-item id="2">报班回执</mt-tab-item>
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
		  	<div class="receipt-wrapper">
		  		<p>
		  			<label>订房</label>
		  			<span v-if="receiptInfo.hotelType == 0">未选择</span> 
					<span v-if="receiptInfo.hotelType == 1">双人标间</span> 
					<span v-if="receiptInfo.hotelType == 2">单人大床房</span> 
					<span v-if="receiptInfo.hotelType == 3">拼房</span> 
					<span v-if="receiptInfo.hotelType == 4">自己安排</span>
		  		</p>
		  		<p>
		  			<label>到达日期和时间</label>
		  			<span>{{receiptInfo.arriveTime | date('MM月dd日 HH:mm')}}</span>
		  		</p>
		  		<p>
		  			<label>到达航班/车次</label>
		  			<span>{{receiptInfo.arriveNum}}</span>
		  		</p>
		  		<p>
		  			<label>返程日期及时间</label>
		  			<span>{{receiptInfo.leaveTime | date('MM月dd日 HH:mm')}}</span>
		  		</p>
		  		<p>
		  			<label>返程航班/车次</label>
		  			<span>{{receiptInfo.leaveNum}}</span>
		  		</p>
		  		<div>
		  			<mt-button type="default" @click.native="modify">修改</mt-button>
		  		</div>
		  		
		  	</div>
		  </mt-tab-container-item>
		</mt-tab-container>
		<copyright></copyright>
	</div>
</template>
<script>
	import {studentClassDetail} from '../request';
	export default {
		data() {
			return {
				selected: "1",
				classInfo: {},
				receiptInfo: {},
				lessonInfos: {}
			}
		},
		computed: {
			id() {
				return this.$store.state.studentId;
			},
			classId() {
				return this.$store.state.classId;
			}
		},
		created() {
			this.getDetail();
		},
		methods: {
			getDetail() {
				showIndicator();
				studentClassDetail({
					classId: this.classId
				})
					.then((res) => {
						this.classInfo = res.data.classInfo;
						this.receiptInfo = res.data.receiptInfo;
						this.lessonInfos = res.data.lessonInfos;
						this.$store.dispatch('setClassAddress', this.classInfo.address);
						this.$store.dispatch('setHotelName', this.classInfo.hotelName);
						this.$store.dispatch('setReceiptDesc', this.classInfo.receiptDesc);
					})
					.always(() => {
						hideIndicator();
					})
			},
			modify() {
				this.$router.push('/receipt');
			}
		}
	}
</script>
