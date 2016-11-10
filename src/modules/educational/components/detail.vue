<template>
	<div class="clazz-detail-wrap">
		<transition name="slide-down">
			<div v-show="display=='detail'">
				<top-head title="班级详情" v-on:clickright="hide"></top-head>
				<!-- <span class="icon icon-times" @click="hide"></span> -->
				<course-info edit del :id="id" @editclass="editClass" @deleteclass="hide" ref="clazzComp"></course-info>
				<div class="clazz-content-wrap">
					<div class="top-tab">
						<div class="add-control" v-show="view=='courses'">
							<el-button type="primary" @click.native="arrangement" v-if="$TX_AUTH[152]">添加课节</el-button>
						</div>
						<el-tabs v-on:tab-click="changeTab">
						    <el-tab-pane label="课节安排" name="courses"></el-tab-pane>
						    <el-tab-pane label="班级学员" name="students"></el-tab-pane>
						    <el-tab-pane label="报班回执" name="feedback"></el-tab-pane>
						</el-tabs>
					</div>
					<transition name="component-fade" mode="out-in">
						<keep-alive>
							<component :id="id" v-bind:is="view" v-on:studentSign="studentSign" ref="childComp">
							</component>
						</keep-alive>
					</transition>
				</div>	
			</div>
		</transition>
		<transition name="slide-right">
			<div v-if="display=='studentSign'" class="student-sign-wrap">
				<student-sign :id="id" v-on:close="closeSign" v-on:refresh="refresh"></student-sign> 
			</div>
		</transition>
		<transition name="slide-right">
			<div v-if="display=='arrangement'" class="educational-div">
				<arrangement :id="id" v-on:closeArrangement="closeArrangement" v-on:refresh="refresh"></arrangement> 
			</div>
		</transition>
	</div>
	
</template>
<script>
	import Courses from './courses.vue';
	import Students from './students.vue';
	import Feedback from './feedback.vue';
	import TopHead from '../../../common/components/TopHead.vue';
	import StudentSign from './student-sign.vue';
	import CourseInfo from './course-info.vue';
	import Arrangement from './arrangement.vue';
	export default {
		props: {
			id: {
				type: Number
			}
		},
		data() {
			return {
				fade: false,
				display: 'detail',
				view: 'courses'
			}
		},
		methods: {
			refresh() {
				this.$refs.childComp.refresh();
			},
			editClass(val) {
				this.$emit('editclass', val);
			},

			studentSign() {
				if (this.$refs.clazzComp.checkCutTime()) {
					this.$confirm('班级已经超过报名截止日期, 是否继续?', '提示', {
	                    type: 'warning'
	                }).then(() => {
	                    this.display = 'studentSign';
	                }).catch(() => {
	                    this.$message({
	                        type: 'info',
	                        message: '已取消报班'
	                    });          
	                });
				}
			},
			closeSign() {
				this.display = 'detail';
				
			},
			arrangement() {
				this.display = 'arrangement';
			},
			closeArrangement() {
				this.display = 'detail';
				//this.$refs.childComp.refresh();
			},
			hide() {
				this.$emit('hide');
			},
			changeTab(val) {
				this.view = val;
			}
		},
		components: {
			Courses,
			Students,
			Feedback,
			TopHead,
			StudentSign,
			CourseInfo,
			Arrangement
		}
	}
</script>