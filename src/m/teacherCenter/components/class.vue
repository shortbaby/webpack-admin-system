<template>
	<div class="teacher-class-wrapper">
		<mt-header title="我的班级">
		  <router-link to="/center" slot="left">
		    <mt-button icon="back"></mt-button>
		  </router-link>
		</mt-header>
		<div>
			<ul>
				<li class="class-item" @click="toDetail(item)" v-for="item in list">
					<div>
						<img :src="item.pic">
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
		</div>	
		<copyright></copyright>
	</div>
</template>
<script>
	import {teacherClasses} from '../request';
	export default {
		data() {
			return {
				list: []
			}
		},
		created() {
			this.getClasses();
		},

		methods: {
			getClasses() {
				teacherClasses()
					.then((res) => {
						this.list = res.data;
					})
			},
			toDetail(item) {
				this.$store.dispatch('setClassId', item.id);
				this.$router.push('/classdetail');
			}
		}
	}
</script>
