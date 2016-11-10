<template>
	<div style="position: relative;">
		<div class="addclass-wrap">
			<top-head title="学员报班" v-on:clickright="hide"></top-head>
			<div class="addclass-content">
				<div class="info-title">机构信息</div>
				<div class="clazz-panel">
					<el-row>
					    <el-col :span="4">
					    	<div class="panel-item org-name">
					    		{{orgInfo.name}}
					    	</div>
					    </el-col>
					    <el-col :span="2">
				    		<div class="panel-item">
					    		<p><span>品类</span></p>
					    		<p v-if="orgInfo.category">{{orgInfo.category}}</p>
					    		<p v-else>--</p>
					    	</div>
					    </el-col>
					    <el-col :span="10">
					    	<div class="panel-item">
					    		<p><span>课程套餐</span></p>
							    <p>{{orgInfo.packageStr}}</p>
					    	</div>
					    </el-col>
					</el-row>
				</div>
				<div class="selclass">
					<div class="info-title clearfix">
						<span class="l-pos">班级信息</span>
						<div v-if="classList.length" class="l-pos" @click="selectClass">
							<span class="sel-txt l-blank">重新选择</span>
						</div>
						<div v-else class="l-pos" @click="selectClass">
							<span class="iconfont icon-xinjian"></span>
							<span class="sel-txt">选择班级</span>
						</div>
					</div>

					<ul class="class-list">
						<li v-for="item in classList" class="clazz-panel">
							<el-row>
							    <el-col :span="4">
							    	<div class="panel-item org-name">
							    		{{item.className}}
							    	</div>
							    </el-col>
							    <el-col :span="4">
							    	<div class="panel-item">
							    		<p><span>课程</span></p>
							    		<p>
							    			<span v-for="c in item.courses">
							    				{{c.name}}
							    			</span>
							    		</p>
							    	</div>
							    </el-col>
							    <el-col :span="2">
							    	<div class="panel-item">
							    		<p><span class="grey">期数</span></p>
							    		<p>{{item.periods}}</p>
							    	</div>
							    </el-col>
							    <el-col :span="3">
							    	<div class="panel-item">
							    		<p><span class="grey">开班时间</span></p>
							    		<p>{{item.startTime | date('yyyy-MM-dd')}}</p>
							    	</div>
							    </el-col>
							    <el-col :span="3">
							    	<div class="panel-item">
							    		<p><span class="grey">结束时间</span></p>
							    		<p>{{item.endTime | date('yyyy-MM-dd')}}</p>
							    	</div>
							    </el-col>
							</el-row>
						</li>
					</ul>	
				</div>	
				<div class="selclass">
					<div class="info-title clearfix">
						<span class="l-pos">学员信息</span>
						<div v-if="studentList.length" class="l-pos" @click="selectStudent">
							<span class="sel-txt l-blank">重新选择</span>
						</div>
						<div v-else class="l-pos" @click="selectStudent">
							<span class="iconfont icon-xinjian"></span>
							<span class="sel-txt">选择学员</span>
						</div>
					</div>	
					<ul v-if="studentList.length" class="student-list">
						<li v-for="item in studentList">
							<span class="stu-name">{{item.name}}</span>
							<span>{{item.genderStr}}&nbsp;|</span>
							<span>{{item.duty}}&nbsp;|</span>
							<span>{{item.mobile}}</span>
							<span></span>
						</li>
					</ul>	
				</div>
			</div>

			<div class="addclass-btn">
				<el-button v-if="studentList.length && classList.length"  type="primary" class="btn-com" :disabled="submitting"  @click.native="signUp">报班</el-button>
				<el-button v-else class="btn-com btn-dis">报班</el-button>
			</div>
			<select-clazz v-if="classShow" v-on:close="closeSelClass" :id="id"></select-clazz>
			<select-student v-if="studentShow" v-on:close="closeSelStudent" :id="id"></select-student>
		</div>
	</div>

</template>
<script>
	import selectClass from './selectClass.vue';
	import selectStudent from './selectStudent.vue';
	import TopHead from '../../../common/components/TopHead.vue';
	import {getAddInfo, signUpMy, signUp} from '../request';
	export default {
		data() {
			return {
				submitting: false,
				orgInfo: {
					name: '',
        			category: '',
        			packageStr: ''
				},
				studentList: [],
				classList: [],
				classShow: false,
				studentShow: false
			}
		},
		props: {
			id: {
				type: Number
			},
			type: {
				type: String
			}
		},
		created(){
			this.getAddInfo();
		},
		methods: {
			getAddInfo(){
				var param = {
					orgId: this.id
				};
				getAddInfo(param)
					.then( (res) => {
						this.orgInfo = res.data;
					} );
			},
			/**
			 * 关闭当前页面
			 */
			hide() {
				this.$emit('hide');
			},
			/**
			 * 报班
			 */
			signUp() {
				var param = {
					orgId: this.id,
					classId: this.classList[0].id,
					userId: this.studentList[0].id,
					userName: this.studentList[0].name
				};
				this.submitting = true;
				if (this.type == 'all') {
					signUp(param)
						.then((res) => {
							toast('success', '报班成功');
							this.hide();
						})
						.always(() => {
							this.submitting = false;
						});
				} else {
					signUpMy(param)
						.then((res) => {
							toast('success', '报班成功');
							this.hide();
						})
						.always(() => {
							this.submitting = false;
						});
				}
				
			},
			/**
			 * 选择班级
			 */
			selectClass() {
				this.classShow = true;
			},
			/**
			 * 选择学员
			 */
			selectStudent() {
				this.studentShow = true;
			},
			/**
			 * 关闭添加班级窗口
			 */
			closeSelClass(list, refresh) {
				this.classShow = false;
				removeBodyModal()
				if (list.length && refresh) {
					this.classList = list;
				}
			},
			/**
			 * 关闭添加学员窗口
			 */
			closeSelStudent(list, refresh) {
				this.studentShow = false;
				removeBodyModal()
				if (list.length && refresh) {
					this.studentList = list;
				}
			}
		},
		components: {
			selectClazz: selectClass,
			selectStudent: selectStudent,
			topHead: TopHead
		}
	}
</script>
<style lang="sass">
	.addclass-wrap {
	    //opacity: 1;
		position: absolute;
		background-color: #f6f7f9;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		.addclass-content {
			padding: 0 20px;
		}
		
		.info-title {
			padding: 30px 0 20px 0;
			font-size: 16px;
			> span {
				display: inline-block;
			}
			.iconfont {
				font-size: 12px;
				font-weight: bold;
				margin-left: 20px;
			}
			.sel-txt {
				color: #ffbd47;
				font-size: 14px;
				margin-left: 5px;
				cursor: pointer;
			}
			.l-blank {
				margin-left: 30px;
			}
		}
		.clazz-panel {
			background-color: #fff;
			padding: 30px;
			margin-bottom: 15px;
		    .panel-item {
		    	height: 50px;
		    	//border-right: 1px solid #ddd;
		    	p {
		    		text-align: left;
		    		font-size: 14px;
		    		margin-bottom: 5px;
		    		.grey {
		    			color: #99a9bf;
		    		}
		    	}
		    }
		    .org-name {
		    	font-size: 14px;
		    	font-weight: bold;
		    	line-height: 50px;
		    }
		}
		.selclass {
			ul {
				margin-top: 10px;
				background-color: #fff;
			}
			.class-list {

			}
			.student-list {
				padding: 20px;
				font-size: 15px;
				> li {
					height: 30px;
					line-height: 30px;
					span {
						font-size: 14px;
						color: #9c9e9f;
						display: inline-block;
						margin-right: 5px;
					}
					.stu-name {
						font-size: 15px;
						color: #000;
						font-weight: bold;
						margin-right:15px;
					}
				}
			}
		}
		.addclass-btn {
			padding: 20px;
			.btn-com {
				color: #fff;
				width: 120px;
				height: 40px;
				border: none;
			}
			.btn-dis {
				background-color: #d7d8d9;
			}
		}
	}
</style>