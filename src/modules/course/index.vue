<!--
	@file 课程管理
	@author xujin
-->
<template>
	<div style="position: relative;">
		<div class="bread-navs">
            <el-breadcrumb separator=".">
                <el-breadcrumb-item v-for="item in breadOptions" 
                    @click.native="click(item)">
                    {{item.name}}
                </el-breadcrumb-item>
            </el-breadcrumb>
    	</div>
		<div class="course-wrap">
			<ul class="course-tab clearfix">
				<li :class="{current: isFirst}" @click="changeTabs('first')">
					课程
				</li>
				<li :class="{current: isSecond}" @click="changeTabs('second')">
					课程组合
				</li>
			</ul>
			<div style="position:relative;">
				<transition name="slide-down">
					<!-- <router-view v-on:show="showCourse" :refresh="isRefresh"></router-view> -->
					<component :is="currentView" v-on:show="showCourse" :refresh="isRefresh"></component>
				</transition>	
			</div>

		</div>
		<new-course v-if="showAdd" v-on:close="closeAdd" :id="editId" :type="courseType"></new-course>
	</div>
</template>

<script>
	import newCourse from './components/newCourse.vue';
	import combine from './components/combinedList.vue';
	import course from './components/courseList.vue';
	export default {
		data() {
			return {
				isFirst: true,
				isSecond: false,
				courseType: 0,
				showAdd: false,
				editId: 0,
				isRefresh: false,
				currentView: 'course'
			}
		},
		created () {
		},
		methods: {
			changeTabs(type) {
				if (type == 'first') {
					this.isSecond = false;
					this.isFirst = true;
					this.currentView = 'course';
					//router.push({ name: 'course' });
				}
				if (type == 'second') {
					this.isFirst = false;
					this.isSecond = true;
					this.currentView = 'combine'
					//router.push({ name: 'combine' });
				}
			},
			/**
			 * 关闭新增弹窗
			 * @param  {boolean} refresh 判断是否需要刷新列表页
			 */
			closeAdd (refresh) {
				this.showAdd = false;
				removeBodyModal();
				this.isRefresh = refresh;
			},
			showCourse (type, id) {
				this.isRefresh = false;
				this.courseType = type;
				this.showAdd = true;
				this.editId = id;
			},
			click(item) {
                window.router.push(item.path);
            }
        },
        computed: {
            breadOptions() {
                return this.$store.state.breadCrumbs;
            }
        },
		components: {
			newCourse: newCourse,
			course: course,
			combine: combine
		}
	}
	
</script>
<style lang="sass">
	.course-wrap {
		padding: 25px;
		.course-tab {	
			> li {
				float: left;
				background-color: #e6e6e6;
				height: 40px;
				font-size: 14px;
				width: 120px;
				line-height: 40px;
				text-align: center;
				border-radius: 0 5px 5px 0;
				&:first-child {
					border-radius: 5px 0 0 5px;
				}
			}
			.current {
				background-color: #ffcc66;
				color: #fff;
			}
		}
	}
</style>