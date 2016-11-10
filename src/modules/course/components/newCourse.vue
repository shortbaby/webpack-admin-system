<template>
	<div class="new-course-wrap">
		<el-dialog :title="titleType" v-model="visiable">
	        <el-form label-position="top" :model="courseform" ref="courseform" :rules="courserules" v-if="type==1">
				<el-form-item label="课程名称" prop="courseName" class="set-wid">
	              <el-input v-model="courseform.courseName" auto-complete="off" placeholder="请输入课程名称"></el-input>
	            </el-form-item>
	            <el-form-item label="课程描述"  prop="description" class="set-wid">
	              <el-input v-model="courseform.description" auto-complete="off" placeholder="请输入课程描述"></el-input>
	            </el-form-item>
	            <el-form-item label="课程价格" prop="price" class="set-wid set-bottom">
	             	<el-input-number class="input-num" placeholder="请输入课程价格" v-model="courseform.price"></el-input-number>
	            </el-form-item>
	        </el-form>
	        <el-form :model="combineform" ref="combineform" :rules="combinerules" v-if="type==2">
				<el-form-item label="组合名称" prop="courseName" class="set-wid">
	              <el-input v-model="combineform.courseName" auto-complete="off" placeholder="请输入组合名称"></el-input>
	            </el-form-item>
	            <el-form-item label="组合描述"  prop="description" class="set-wid">
	              <el-input v-model="combineform.description" auto-complete="off" placeholder="请输入组合描述"></el-input>
	            </el-form-item>
	            <el-form-item label="组合价格" prop="price" class="set-wid set-bottom">
	             	<el-input-number class="input-num" placeholder="请输入价格" v-model="combineform.price"></el-input-number>
	            </el-form-item>
	            <el-form-item label="课程" prop="courseNameList" class="set-wid clear-f">
		            <el-select v-model="combineform.courseNameList" placeholder="请选择课程" multiple>
						<el-option
				      		v-for="item in courseList"
				      		:label="item.name"
				      		:value="item.id">
				      	</el-option>
					</el-select>
	            </el-form-item>
	        </el-form>
	        <span slot="footer" class="dialog-footer">
	        	<el-button @click.native="close">取 消</el-button>
	        	<el-button type="primary" :disabled="submitting" @click.native.prevent="handleSubmit">确 定</el-button>
	        </span>
	    </el-dialog>
	</div>
</template>
<script>
	import {getSingleDetail, getCombineDetail, addSingleCourse, addCombineCourse, editSingleCourse, editCombineCourse,getCourseList} from '../request';
	import $ from 'jquery';
	export default {
		data () {
			var checkCourseName = (rule, value, callback) => {
				if (value.length > 20) {
					callback(new Error('课程名称不能超过20个字符'));
				} else {
					callback();
				}
			};
			var checkCoursePrice = (rule, value, callback) => {
				if (value > 10000000) {
					callback(new Error('课程价格需小于10000000'));
				}
				else if (value == '') {
					callback(new Error('请填写课程价格'));
				} else {
					callback();
				}
			};
			var checkDescription = (rule, value, callback) => {
				if (value.length > 50) {
					callback(new Error('课程描述不能超过50个字符'));
				} else {
					callback();
				}
			};
			var checkCourseNameList = (rule, value, callback) => {
				callback();
			};
			return {	
				submitting: false,		
				visiable: true,
				titleType: '',
				courseform: {
					courseName: '',
					description: '',
					price: ''
				},
				combineform: {
					courseName: '',
					description: '',
					price: '',
					courseNameList: []
					
				},
				courseList: [],
				courserules: {
					courseName: [
						{ required: true, message: '请输入课程名称', trigger: 'blur'},
						{ validator: checkCourseName}
					],
					price: [
						{ type:'number', required: true, validator: checkCoursePrice, trigger: 'blur'}
					],
					description: [{ validator: checkDescription, trigger: 'blur' }]
				},
				combinerules: {
					courseName: [
						{ required: true, message: '请输入课程名称', trigger: 'blur'},
						{ validator: checkCourseName}
					],
					price: [
						{ type:'number', required: true, trigger:'blur', validator: checkCoursePrice
						}
					],
					description: [{ validator: checkDescription, trigger: 'blur' }],
					courseNameList: [
						{ required: true, validator: checkCourseNameList}
					]
				},
				isrefresh: false
			}
		},
		props: {
			id: {
				type: Number,
			},
			type: {
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
			//console.log(this.visiable);
			if (this.type == 1) {
				if (this.id) {
					this.titleType = '编辑课程';
					this.getSingleDetailHandle();
				} else {
					this.titleType = '新增课程';
				}
			}
			else {
				if (this.id) {
					this.titleType = '编辑课程组合';
					this.getCombineDetailHandle();
				} else {
					this.titleType = '新增课程组合';
					this.getCourses();
				}
			}
		},
		methods: {
			getCourses(){
				var param = {
					name: '',
					type: 0
				};
				getCourseList(param)
					.then((res) => {
						this.courseList = res.data;
					});
			},
			close() {
				this.visiable = false;
			},
			/**
			 * 获取课程信息
			 */
			getSingleDetailHandle () {
				var param = {
					'id': this.id
				};
				getSingleDetail(param)
					.then((res) => {
						this.courseform = res.data;
					});
			},
			/**
			 * 获取课程组合信息
			 */
			getCombineDetailHandle () {
				var param = {
					'id': this.id
				};
				getCombineDetail(param)
					.then((res) => {
						var data = res.data;
						var list = [];
						this.combineform.courseName = data.courseName;
						this.combineform.description = data.description;
						this.combineform.price = data.price;
						data.courseList.forEach((elem) => {
							list.push(elem.id);
						});
						var param = {
							name: '',
							type: 0
						};
						getCourseList(param)
							.then((res) => {
								this.courseList = res.data;
								this.combineform.courseNameList = list;
							});
					});
			},
			/**
			 * 获取课程下拉信息
			 */
			// getCourseListHandle() {
			// 	var param = {
			// 		name: '',
			// 		type: 0
			// 	};
			// 	getCourseList(param)
			// 		.then((res) => {
			// 			this.courseList = res.data;
			// 		})
			// },
			
			handleSubmit() {
				if (this.type == 1) { 
					this.$refs.courseform.validate((course) => {
						if (course) {
							var param = this.courseform;
							this.submitting = true;
							//  课程
							if (this.id) {
								//保存编辑课程
								$.extend(param, {
				                    'id': this.id
				                });
								editSingleCourse(param)
									.then((res) => {
										//保存成功
										this.isrefresh = true;
										this.visiable = false;
									})
									.always(() => {
										this.submitting = false;
									});
							} else {
								//保存新增课程
								addSingleCourse(param)
									.then((res) => {
										//保存成功
										this.isrefresh = true;
										this.visiable = false;
									})
									.always(() => {
										this.submitting = false;
									});
							}
						} else {
							//console.log('error submit!!');
							return false;
						}
					});
				} else {
					this.$refs.combineform.validate((course) => {
						if (course) {
							if(!this.combineform.courseNameList.length) {
								toast('error', '课程组合不能为空');
								return false;
							} else {
								var param = {
									courseName: this.combineform.courseName,
									description: this.combineform.description,
									price: this.combineform.price,
									courseIds: this.combineform.courseNameList
								};
								this.submitting = true;
								//组合课程
								if (this.id) {
									//保存编辑课程
									$.extend(param, {
					                    'id': this.id
					                });
									editCombineCourse(param)
										.then((res) => {
											//保存成功
											this.isrefresh = true;
											this.visiable = false;
										})
										.always(() => {
											this.submitting = false;
										});
								} else {
									//保存新增课程
									addCombineCourse(param)
										.then((res) => {
											//保存成功
											this.isrefresh = true;
											this.visiable = false;
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

	}
</script>
<style lang="sass">
	.new-course-wrap {
		.el-dialog {
			width: 440px;
			.set-wid {
				width: 400px;
			}
			.set-bottom {
				margin-bottom: 9px;
				.el-form-item__error {
					position: relative;
					top: -5px;
				}
			}
		}
		.input-num {
			.el-input {
				width: 400px;
			}
			span:after {
				display: none;
			}
			span:before {
				display: none;
			}

		}
		
		.clear-f {
			> label {
				float: none;
			}
		}
	}
</style>