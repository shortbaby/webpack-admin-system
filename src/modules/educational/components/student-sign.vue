<template>
	<div>
		<top-head title="学员报班" v-on:clickright="hide"></top-head>
		<h3 class="head">班级信息</h3>
		<course-info :id="id"></course-info>
		<h3 class="head">
			机构信息
			<label @click="selectOrg" class="user-select-none">
				<span class="txt again" v-if="selectedOrg.id">重新选择</span>
				<span class="iconfont icon-xinjian" v-if="!selectedOrg.id"></span>
				<span class="txt" v-if="!selectedOrg.id">选择机构</span>
			</label>		
		</h3>
		<div class="clazz-panel" v-show="selectedOrg.id">
			<el-row>
			    <el-col :span="3" class="col-spec">
			    	<div class="panel-item">
			    		<div class="org-name">
			    			<p>{{selectedOrg.name}}</p>
			    			<!-- <p><span>郑州</span></p> -->
			    		</div>
			    	</div>
			    </el-col>
			    <el-col :span="2">
			    	<div class="panel-item">
			    		<p class="gutter">品类</p>
			    		<p>{{selectedOrg.category}}</p>
			    	</div>
			    </el-col>
			     <el-col :span="5">
			    	<div class="panel-item">
			    		<p class="gutter">城市</p>
			    		<p>{{selectedOrg.city}}</p>
			    	</div>
			    </el-col>
			</el-row>
		</div>
		<h3 class="head">
			学员信息
			<label @click="selectStudent" class="user-select-none">
				<span class="iconfont icon-xinjian" ></span>
				<span class="txt">选择学员</span>
			</label>	
		</h3>
		<div class="clazz-panel" v-show="selectedStudent.id">
			<div>
				<ul class="select-student_ul">
					<li>
						<span>{{selectedStudent.name}}</span><span>{{selectedStudent.gender | gender}}</span>
						|<span>{{selectedStudent.duty}}</span>|<span>{{selectedStudent.mobile}}</span>
						<span class="iconfont icon-shanchu" @click="delStudent()"></span>
					</li>
				</ul>
			</div>
			
		</div>
		<el-button class="btn-sign" type="primary" :disabled="disabled" @click.native="sign($event)">报班</el-button>
		<select-org v-if="showSelectOrg" :id="id" v-on:closedialog="hideSelectOrg" @selectorg="chooseOrg"></select-org>
		<select-student 
			v-if="showSelectStudent" 
			:org-id="selectedOrg.id" 
			v-on:closedialog="hideSelectStudent" 
			@selectstudents="chooseStudents">
		</select-student>
	</div>
</template>
<script>
	import TopHead from '../../../common/components/TopHead.vue';
	import CourseInfo from './course-info.vue';
	import SelectOrg from './select-org.vue';
	import SelectStudent from './select-student.vue';
	import {joinClass} from '../request';
	import $ from 'jquery';
	export default {
		props: {
			id: {
				type: Number
			}
		},
		data() {
			return {
				showSelectOrg: false,
				showSelectStudent: false,
				selectedOrg: {},
				selectedStudent: {}
			}
		},
		computed: {
			disabled() {
				return this.selectedOrg.id && this.selectedStudent.id ? false : true
			}
		},
		methods: {
			hide() {
				this.$emit('close');
				this.$emit('refresh');
			},
			selectOrg() {
				this.showSelectOrg = true;
			},
			hideSelectOrg() {
				this.showSelectOrg = false;
				removeBodyModal();
			},
			chooseOrg(val) {
				this.selectedOrg = val;
			},
			chooseStudents(val) {
				this.selectedStudent = val;
			},
			hideSelectStudent() {
				this.showSelectStudent = false;
				removeBodyModal();
			},
			selectStudent() {
				if (!this.selectedOrg.id) {
					toast('warning', '请先选择机构');
					return;
				}
				this.showSelectStudent = true;
			},
			delStudent() {
				this.selectedStudent = null;
			},
			sign(event) {
				let target = $(event.target);
				target.prop('disabled', true);
				joinClass({
					classId: this.id,
					orgId: this.selectedOrg.id,
					userId: this.selectedStudent.id,
					userName: this.selectedStudent.name
				})
					.then((res) => {
						toast('success', '学员报班成功');
						setTimeout(() => {
							this.hide();
						}, 1000);
					})
					.always(() => {
						target.prop('disabled', false);

					})
			}
		},
		components: {
			TopHead: TopHead,
			CourseInfo: CourseInfo,
			SelectOrg: SelectOrg,
			SelectStudent: SelectStudent
		}
	}
</script>