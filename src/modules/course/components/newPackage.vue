<template>
	<div class="package-wrap">
		<el-dialog :title="titleType" v-model="visiable">
	        <el-form :model="packageform" ref="packageform" :rules="packagerules" class="clearfix">
				<el-form-item label="套餐名称" prop="businessName" class="set-wid r-blank l-pos">
	              <el-input v-model="packageform.businessName" auto-complete="off" placeholder="请输入组合名称"></el-input>
	            </el-form-item>
	            <el-form-item label="套餐标签" prop="tagName" class="set-wid r-blank l-pos">
	              	<el-input v-model="packageform.tagName" auto-complete="off" placeholder="请输入套餐标签"></el-input>
	            </el-form-item>
	            <el-form-item label="套餐价格" prop="price" class="set-wid l-pos">
	             	<el-input-number class="input-num" placeholder="请输入价格" v-model="packageform.price"></el-input-number>
	            </el-form-item>
	        </el-form>
        	<div class="sel-course-wrap">
	        	<div class="sel-course">
	        		<span>选择课程</span>
	        		<div @click="addCourse">
	        			<span class="iconfont icon-plus"></span>
	        			<span>添加</span>
	        		</div>
	        	</div>
	        	<el-row class="list-wrap">
	        		<div v-for="(item, index) in courses">
	        			<package-card ref="packageCard" v-on:select="selectCourse" :item="item" 
	        			:ind="index">
	        			</package-card>
	        		</div>
				</el-row>
	        </div>
	        <span slot="footer" class="dialog-footer">
	        	<el-button @click.native="close">取 消</el-button>
	        	<el-button type="primary" :disabled="submitting" @click.native.prevent="handleSubmit">确 定</el-button>
	        </span>
	    </el-dialog>
	</div>
</template>
<script>
	import Vue from 'vue';
	import $ from 'jquery';
	import packageCard from './packageCard.vue';
	import {getPackageDetail, addPackageCourse, editPackageCourse, getTagList} from '../request';
	export default {
		data () {
			var checkCourseName = (rule, value, callback) => {
				var val = $.trim(value);
				if (value.length > 20) {
					callback(new Error('课程名称不能超过20个字符'));
				} else {
					callback();
				}
			};
			var checkTagName = (rule, value, callback) => {
				var val = $.trim(value);
				if (val.length > 10) {
					callback(new Error('套餐标签不能超过10个字符'));
				} else {
					callback();
				}
			};
			var checkCoursePrice = (rule, value, callback) => {
				var val = $.trim(value);
				if (val.length) {
					if (val > 10000000) {
						callback(new Error('课程价格需小于10000000'));
					} else {
						callback();
					}
				} else {
					callback(new Error('请输入套餐价格'));
				}
				
			};
			return {
				submitting: false,			
				visiable: true,
				titleType: '',
				//tagOptions: [],
				packageform: {
					id: 0,
					businessName: '',
					tagId: 0,
            		tagName: "",
					price: null			
				},
				courses: [
					{
						courseType: 0,
	                	courseRule: 0,
	                	lessonRule: 0,
	                	lessonCount: 1,
	                	onlyOneself: false,
	                	detailId: 1,
	                	courseName: '',
	                	courseId: 0
	                }
				],
				packagerules: {
					businessName: [
						{ required: true, message: '请输入课程名称', trigger: 'blur'},
						{ validator: checkCourseName}
					],
					tagName: [ 
							{trigger:'blur', validator: checkTagName}
					],
					price: [
						{required: true, trigger:'blur', validator: checkCoursePrice
						}
					]
				},
				isrefresh: false,
				courseNull: false

			}
		},
		props: {
			id: {
				type: Number,
			}
		},
		watch: {
			visiable(val) {
				if (!val) {
					this.$emit('close', this.isrefresh);
				}
			}
		},
		created() {
			if (this.id) {
				this.titleType = '编辑课程套餐';
				this.courses = [];
				this.getPackageDetailHandle();
			} else {
				this.titleType = '新增课程套餐';
			}
		},
		components: {
			packageCard: packageCard
		},
		methods: {
			/**
			 * 获取课程信息
			 */
			getPackageDetailHandle () {
				var param = {
					'id': this.id
				};
				getPackageDetail(param)
					.then((res) => {
						this.packageform.id = res.data.id;
						this.packageform.businessName = res.data.businessName;
						this.packageform.tagId = res.data.tagId;
						this.packageform.tagName = res.data.tagName;
						this.packageform.price = res.data.price;
						this.courses = res.data.courses;
						//this.getAllTags();
					});
			},
			/**
			 * 关闭弹框
			 */
			close() {
				this.visiable = false;
			},
			/**
			 * 添加课程
			 */
			addCourse() {
				var len = this.courses.length;
				var addCont = {
					'courseType': 0,
         			'courseRule': 0,
         			'lessonRule': 0,
          			'lessonCount': 1,
          			'onlyOneself': false,
          			'courseId': 0,
          			'courseName': ''
				};
				Vue.set(this.courses, len, addCont);
				
				// this.course.push(addCont);			
			},
			/**
			 * 选择一门课程，并更新此门课程的信息
			 * @param  {Object} data  当前选择的新课程对象
			 * @param  {Number} index 当前课程在所有课程列表中的索引
			 * @param  {Boolean} del 是否删除当前课程
			 */
			selectCourse (index, data, del) {
				if (del) {
					this.courses.splice(index, 1);
					//console.log(this.courses);
				} else {
					this.courses[index] = data;
				}
			},
			validateCourseCard() {
				let res = true;
				var cards = this.$refs.packageCard;
				var len = cards.length;
				if ( len > 0 ) {
					for (var i=0; i<len; i++) {
						if (!cards[i].validate()) {
							res = false;
							break;
						}
					}
					
				}
				return res;
			},
			handleSubmit() {
				this.courseNull = false;
				var self = this;
				self.$refs.packageform.validate((course) => {
					if (course) {
						if (this.validateCourseCard()) {
							var param = this.packageform;
							var courses = [];
							
							this.courses.forEach((elem) => {
								var obj = {};
								obj.courseType = elem.courseType;
								obj.courseRule = elem.courseRule;
								obj.lessonRule = elem.lessonRule;
								obj.lessonCount = elem.lessonCount;
								obj.detailId = elem.detailId;
								obj.courseId = elem.courseId;
								obj.courseName = elem.courseName;
								if (elem.onlyOneself) {
									obj.onlyOneself = 1;
								} else {
									obj.onlyOneself = 0;
								}
								courses.push(obj);
							});
							param.courses = courses;
							this.submitting = true;
								//课程
							if (this.id) {
								//保存编辑课程
								// $.extend(param, {
				    			//   'id': this.id
				    			//   });
								editPackageCourse(param)
									.then((res) => {
										//保存成功
										this.isrefresh = true;
										self.visiable = false;
									})
									.always(() => {
										this.submitting = false;
									});
							} else {
								//保存新增课程
								addPackageCourse(param)
									.then((res) => {
										//保存成功
										this.isrefresh = true;
										self.visiable = false;
									})
									.always(() => {
										this.submitting = false;
									});
							}
						} 
						
					} else {
						//console.log('error submit!!');
						return false;
					}
				});
			}
		}

	}
</script>
<style lang="sass">
	.package-wrap {
		.el-dialog {
			width: 910px;
		}
		.set-wid {
			width: 260px;
			&:first-child {
				margin-left: 10px;
			}
		}
		.my-auto {
			i {
				display: none;
			}
		}
		.input-num {
			.el-input {
				width: 260px;
			}
			.el-input-number {
				display: none;
			}
			.el-form-item_error {
				margin-left: 10px;
			}
			span:after {
				display: none;
			}
			span:before {
				display: none;
			}
		}
		.r-blank {
			margin-right: 30px;
		}
		.sel-course-wrap {
			.sel-course {
				font-size: 16px;
				margin-bottom: 20px;
				padding-left: 10px;
				> div {
					display: inline-block;
					margin-left: 20px;
					font-size: 14px;
					cursor: pointer;
					> span {
						background-color: #fff;
						color: #ffbd47;
					}
					.icon-plus {
						position: relative;
						top: -2px;
					}
				}
			}
		}
	}
</style>