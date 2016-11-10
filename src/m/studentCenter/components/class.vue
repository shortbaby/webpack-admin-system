<template>
	<div class="student-class-wrapper">
		<mt-header title="我的班级">
		  <router-link to="/center" slot="left">
		    <mt-button icon="back"></mt-button>
		  </router-link>
		</mt-header>
		<mt-loadmore :auto-fill="false" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
			<ul>
				<li class="class-item" @click="toDetail(item)" v-for="item in list">
					<div>
						<img src="http://img.gsxservice.com/36218_w4bny0tf.jpeg@1e_40h_40w_1c_0i_1o_1l_90Q_1x.jpeg">
					</div>
					<p class="name">{{item.className}}</p>
					<p class="txt">
						<span class="iconfont icon-calendar"></span>
						<span>{{item.startTime | date('yyyy.MM.dd')}} - {{item.endTime | date('yyyy.MM.dd')}}</span>
						<span class="iconfont icon-address"></span>
						<span>{{item.cityName}}</span>
						<span class="iconfont icon-arrowright"></span>
					</p>
				</li>
			</ul>
		</mt-loadmore>
		<!-- <copyright></copyright> -->
	</div>
</template>
<script>
	import {studentClasses} from '../request';
	export default {
		data() {
			return {
				allLoaded: false,
				loading: false,
				list: []
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
			this.getClasses();
		},
		methods: {
			toDetail(item) {
				if (this.loading) {
					return;
				}
				this.$store.dispatch('setClassId', item.id);
				this.$router.push('/classdetail');
			},
			getClasses() {
				showIndicator();
				studentClasses()
					.then((res) => {
						this.list = this.list.concat(res.data);
					})
					.always((res) => {
						hideIndicator();
					})
			},
			loadBottom(id) {
				this.loading = true;
				studentClasses()
					.then((res) => {
						this.list = this.list.concat(res.data);
					})
					.always((res) => {
						this.$refs.loadmore.onBottomLoaded(id);
						this.loading = false;
					})
			}
		}
	}
</script>
