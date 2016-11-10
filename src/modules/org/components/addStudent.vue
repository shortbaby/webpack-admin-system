<template>
	<el-dialog :title="titleType" v-model="visiable" class="student-dialog">
        <el-form :model="studentform" ref="studentform" :rules="studentrules" class="new-org-form">
            <el-form-item label="姓名" prop="name" class="item-1">
              	<el-input v-model="studentform.name" auto-complete="off" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="gender" class="item-2">
	            <el-select v-model="studentform.gender" placeholder="请选择">
					<el-option
			      		v-for="item in genderOptions"
			      		:label="item.label"
			      		:value="item.value">
			      	</el-option>
				</el-select>
            </el-form-item>
            <el-form-item label="职务" prop="duty" class="item-2">
              	<el-input v-model="studentform.duty" auto-complete="off" placeholder="请输入职务"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="mobile" class="item-1">
              	<el-input v-model="studentform.mobile" auto-complete="off" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item label="出生日期" class="item-2">
            	 <el-date-picker type="date" placeholder="请选择日期" :picker-options="pickerOptions" v-model="studentform.birthday"></el-date-picker>
            </el-form-item>          
            <el-form-item label="邮箱" class="item-2">
	              <el-input v-model="studentform.email" auto-complete="off" placeholder="请输入邮箱"></el-input>
            </el-form-item>
            <el-form-item label="微信号" class="item-1">
              	<el-input v-model="studentform.wechat" auto-complete="off" placeholder="请输入微信号"></el-input>
            </el-form-item>
            <el-form-item label="文化衫尺寸" class="item-2">
              	<el-select v-model="studentform.tshirtSize" placeholder="请选择">
					<el-option
			      		v-for="item in clothSizeOptions"
			      		:label="item.label"
			      		:value="item.value">
			      	</el-option>
				</el-select>
            </el-form-item>
            <el-form-item label="身份证号" class="item-2">
	              <el-input v-model="studentform.identityCard" auto-complete="off" placeholder="请输入身份证号"></el-input>
            </el-form-item>   
        </el-form>
        <span slot="footer" class="dialog-footer">
        	<el-button @click.native="visiable = false">取 消</el-button>
        	<el-button type="primary" :disabled="submitting" @click.native.prevent="handleSubmit">确 定</el-button>
        </span>
    </el-dialog>
</template>
<script>
	import config from '../config.js';
	import $ from 'jquery';
	import {getStudentDetail, saveEditStudent, saveAddStudent, saveEditAllStudent, saveAddAllStudent} from '../request';
	let options = config();
	export default {
		props: {
			id: {
				type: Number
			},
			orgid: {
				type: Number
			},
			type: {
				type: String
			}
		},
		data() {
			var checkStudentName = (rule, value, callback) => {
				if (value.length > 20) {
					callback(new Error('班级名称不能超过20个字符'));
				} else {
					callback();
				}
			};
			return {
				submitting: false,
				visiable: true,
				titleType: '新增学员',
				isrefresh: false,
				pickerOptions: {
                  disabledDate(time) {
                    return time.getTime() > Date.now();
                  }
                },
				studentform: {
					name: '',
        			mobile: '',
			        gender: '',
			        duty: '',
			        email: '',
			        wechat: '',
			        tshirtSize: '',
			        identityCard: '',
			        birthday: '',
			        hasBindWechat: ''
				},
				studentrules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur'},
						{ validator: checkStudentName}
					],
					gender: [
						{type:'number', required: true, message: '性别必选', trigger: 'change'}
					],
					mobile: [
						{ required: true, message: '请输入手机号', trigger: 'blur'}
					],
					duty: [
						{ required: true, message: '请输入职务', trigger: 'blur'}
					]
				},
				genderOptions: options.genderOptions,
				clothSizeOptions: options.clothSizeOptions
			}
		},
		watch: {
			visiable(val) {
				if (!val) {
					//this.$store.dispatch('hideAddStudent');
					this.$emit('close', this.isrefresh)
					
				}
			}
		},
		created() {
			if (this.id) {
				this.titleType = '编辑学员';
				this.getStudentDetailHandle();
			} else {
				this.titleType = '新增学员';
			}
		},
		methods: {
			/**
			 * 获取学员详情
			 */
			getStudentDetailHandle () {
				var param = {
					id: this.id,
					orgId: this.orgid
				};
				getStudentDetail(param)
					.then( (res) => {
						this.studentform = res.data;
						if (!this.studentform.birthday) {
							this.studentform.birthday = '';
						}
					});
			},
			/**
			 * 保存学员信息
			 */
			save() {
				if (this.studentform.birthday) {
					if (typeof(this.studentform.birthday) == 'object') {
						this.studentform.birthday = this.studentform.birthday.getTime();
					}
				}
				var param = this.studentform;
				this.submitting = true;
				if (this.id) {
					$.extend(param, {
						id: this.id,
						
					});
					if (this.type == 'all') {
						saveEditAllStudent(param)
						.then((res) => {
							this.isrefresh = true;
							this.visiable = false;
							
						})
						.always(() => {
							this.submitting = false;
						});
					} else {
						saveEditStudent(param)
							.then((res) => {
								this.isrefresh = true;
								this.visiable = false;
								
							})
							.always(() => {
								this.submitting = false;
							});
					}
					
				} else {
					$.extend(param, {
						orgId: this.orgid
					});
					if (this.type == 'all') {
						saveAddAllStudent(param)
							.then((res) => {
								this.isrefresh = true;
								this.visiable = false;
								
							})
							.always(() => {
								this.submitting = false;
							});
					} else {
						saveAddStudent(param)
							.then((res) => {
								this.isrefresh = true;
								this.visiable = false;
								
							})
							.always(() => {
								this.submitting = false;
							});
					}
				}
			},
			close() {
				this.visiable = false;
			},
			handleSubmit() {
				var self = this;
				self.$refs.studentform.validate((student) => {
					if (student) {
						this.save();
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			}
		},
		components: {
		}
	}
</script>
<style lang="sass">
	.student-dialog {
		.el-dialog {
			width: 640px;
		}
		.el-form-item {
			display: inline-block;
			margin-bottom: 20px;
			&.item-1 {
				width: 180px;
			}
			&.item-2 {
				width: 180px;
				margin-left: 25px;
				.el-select {
					.el-input {
						.el-input__icon {
							top: 73%;
						}
					}
				}
			}
			&.item-3 {
				width: 180px;
				.el-select {
					.el-input {
						.el-input__icon {
							top: 73%;
						}
					}
				}
			}
			&.item-4 {
				margin-left: 25px;
				label {
					float: none;
				}
				.region-picker {
					> div {
						display: inline-block;
					}
				}
				.province {
					margin-right: 25px;
				}
				.el-select {
					display: inline-block;
					width: 180px;
					.el-input {
						.el-input__icon {
							top: 50%;
						}
					}
				}
			}
		}	
	}

</style>
