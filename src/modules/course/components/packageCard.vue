<template>
	<el-col :span="12" class="sel-list">
    	<div class="sel-wrap">
    		<div>
    			<span class="r-blank">课程类型</span>
    			<el-radio-group v-model="course.courseType" @change="handleChange">
				  	<el-radio :label="0">课程</el-radio>
				  	<el-radio :label="1">课程组合</el-radio>
				</el-radio-group>
    		</div>
			<div v-show="course.courseType">
				<div class="clearfix course-type">
					<span class="r-blank l-pos">选择组合</span>
					<el-select
					 v-model="combineId"
					  class="my-auto l-pos"
					  @change="handleChange">
					    <el-option
					      v-for="item in combineOptions"
					      :label="item.name"
					      :value="item.id">
					    </el-option>
					</el-select>
				</div>
				<div class="limit-wrap">
					<span class="r-blank clear">上课规则</span>
					<el-radio-group v-model="course.courseRule" @change="handleChange">
			    	<el-radio :label="0">其中一门课程一次</el-radio>
						<el-radio :label="1">每门课程一次</el-radio>
					</el-radio-group>
				</div>
			</div>							
			<div v-show="!course.courseType">
				<div class="clearfix course-type">
					<span class="r-blank l-pos">选择课程</span>
					<el-select
					 v-model="courseId"
					  class="my-auto l-pos"
					  @change="handleChange">
					    <el-option
					      v-for="item in courseOptions"
					      :label="item.name"
					      :value="item.id">
					    </el-option>
					</el-select>
				</div>
			
				<div class="clearfix limit-wrap">
					<span class="r-blank l-pos">次数限制</span>
					<el-radio-group v-model="course.lessonRule" class="l-pos" @change="handleChange">
				    	<el-radio :label="1">限制</el-radio>
						<el-radio :label="0">不限制</el-radio>
					</el-radio-group>
					<el-input-number v-if="course.lessonRule" :min="1" :max="10000000" class="limits" v-model="course.lessonCount" @change="handleChange"></el-input-number>
				</div>
			</div>
			<div class="one-wrap">
				<span class="r-blank">仅限本人参加</span>
				<el-switch v-model="course.onlyOneself" @change="handleChange">
				</el-switch>
				<span class="delete" @click="delCourse">删除</span>
			</div>
    	</div>
    </el-col>
</template>
<script>
	import {getCourseList} from '../request';
	export default {
		props: {
			item: {
				type: Object,
			},
			ind: {
				type: Number,
			}
		},
		data() {
			return {
				course: {
					onlyOneself: false,
					lessonCount: 1
				},
				combineId: '',
				courseId: '',
				isDelete: false,
				courseOptions: [],
				combineOptions: [],
			}
		},
		watch: {
		},
		created() {
			this.course = this.item;

			if (this.item.onlyOneself) {
				this.course.onlyOneself = true;
			} else {
				this.course.onlyOneself = false;
			}

			if (this.course.courseType) {
				this.combineId = this.course.courseId;
			} else {
				this.courseId = this.course.courseId;
			}

			this.getCourse();
			this.getCombine();
		},
		methods: {
			validate() {
				if (this.course.courseType) {
					if (this.combineId == '') {
						toast('error', '课程名不能为空');
						return false;
					} else {
						return true;
					}
				} else {
					if (this.courseId == '') {
						toast('error', '课程名不能为空');
						return false;
					} else {
						return true;
					}
				}
			},
			delCourse () {
				this.isDelete = true;
				this.$emit('select', this.ind, this.course, this.isDelete);
			},
			getCourse() {
		 			var param = {
						name: '',
						type: 0
					};
					getCourseList(param)
						.then((res) => {
							this.courseOptions = res.data;
						});	
		    },
		    getCombine() {
		    	var param = {
						name: '',
						type: 1
					};
					getCourseList(param)
						.then((res) => {
							this.combineOptions = res.data;
						});	
		    },
		    handleChange (item) {
		    	console.log(this.course);
		    	if (this.course.courseType) {
					this.course.courseId = this.combineId;
				} else {
					this.course.courseId = this.courseId;
				}
		    	this.$emit('select', this.ind, this.course);
		    }
		}

	}
</script>
<style lang="sass">
	.sel-list {
		padding: 0 10px;
		// &:nth-child(2n) {
		// 	padding-right: 0;
		// 	padding-left: 10px;
		// }
		margin-bottom: 20px;
	}
	.sel-wrap {
		background: #F5F7F7;
		border-radius: 4px; 
		padding: 20px;
		
	}
	.course-type {
		height: 70px;
		line-height: 70px;
		.el-input {
			width: 280px;
			margin-top: 18px;
		}
		.my-auto {
			i {
				display: none;
			}
		}
	}
	.one-wrap {
		margin-top: 10px;
		.delete {
			display: inline-block;
			color: #ff442b;
			float: right;
			margin-right:10px;
			cursor: pointer;
		}
	}
	.limit-wrap {
		height: 40px;
		line-height: 30px;
		.limits {
			width: 110px;
			float: left;
			margin-left: 17px;
			position: relative;
			top: -4px;
			.el-input {
				width: 100px;
			}
			span {
				display: none;
			}
		}
	}
</style>
