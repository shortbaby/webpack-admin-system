<template>
	<div class="student-record-wrapper">
		<mt-header title="上课记录">
		  <router-link to="/center" slot="left">
		    <mt-button icon="back"></mt-button>
		  </router-link>
		</mt-header>
		<mt-loadmore :auto-fill="false" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">	
			<ul class="list">
				<li @click="toDetail(item)" v-for="item in list">
					<p class="p1">{{item.courseName}}</p>
					<p class="p2">课程有效期至{{item.expirationDate | date('yyyy年MM月dd日')}}</p>
					<span>以上{{item.useNum}}次/共{{item.totalNum}}次课 <i class="iconfont icon-arrowright"></i></span>
				</li>
			</ul>
		</mt-loadmore>
		<copyright></copyright>
	</div>
</template>
<script>
	import {studentConsumeRecord} from '../request';
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
			}
		},
		created() {
			
		},
		methods: {
			toDetail(item) {
				if (this.loading) {
					return;
				}
				this.$store.dispatch('setRecordId', item.courseNumId);
				this.$store.dispatch('setCourseId', item.courseId);
				this.$router.push('/recorddetail')
			},
			loadBottom(id) {
				this.loading = true;
				studentConsumeRecord()
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