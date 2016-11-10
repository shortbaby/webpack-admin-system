<template>
	<el-dialog :title="title" v-model="visiable" class="teacher-dialog">
        <el-form :model="form" ref="form" :rules="rules" class="teacher-form">
        	<el-row :gutter="20">
			  <el-col :span="12">
			  	<div>
			  		<el-form-item label="姓名" prop="name" class="item-1">
		              <el-input v-model="form.name" auto-complete="off" placeholder="请输入导师姓名"></el-input>
		            </el-form-item>     
		            <el-form-item label="职位" class="item-3">
		            	<el-input v-model="form.position" auto-complete="off" placeholder="请输入导师的职位"></el-input>
		            </el-form-item>
			  	</div>
			  </el-col>
			  <el-col :span="12">
			  	<div>
			  		 <el-form-item label="公司" prop="company" class="item-2">
		               <el-input v-model="form.company" auto-complete="off" placeholder="请输入导师所属公司"></el-input>
		            </el-form-item>
		            <el-form-item label="手机号" prop="mobile" class="item-4">
		            	 <el-input v-model="form.mobile" auto-complete="off" placeholder="请输入手机号"></el-input>
		            </el-form-item>
			  	</div>
			  </el-col>
			</el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
	        <el-button @click.native="close">取 消</el-button>
	        <el-button type="primary" :disabled="submitting" @click.native.prevent="handleSubmit">确 定</el-button>
        </span>
    </el-dialog>
</template>
<script>
	import {teacherSave, teacherUpdate} from '../request';
	import $ from 'jquery';
	export default {
		props: {
			data: null
		},
		data() {
			var checkName = (rule, value, callback) => {
				if (value.length > 30) {

					callback(new Error('用户名不能超过30个字符'));
				} else if($.trim(value).length == 0) {

					callback(new Error('用户名不能为空'));
				} else {
					callback();
				}
			}
			var checkCompany = (rule, value, callback) => {
				if($.trim(value).length == 0) {

					callback(new Error('所属公司不能为空'));
				} else {
					callback();
				}
			}
			var checkMobile = (rule, value, callback) => {
				if(!(/^1[34578]\d{9}$/.test(value))) {
					callback(new Error('请输入正确的手机号'));
				} else {
					callback();
				}
			}
			return {
				visiable: true,
				submitting: false,
				form: {
					name: '',
					company: '',
					position: '',
					mobile: ''
				},
				rules: {
					name: [
						{ required: true, message: '请输入用户名', trigger: 'blur'},
						{ validator: checkName}
					],
					company: [
						{ required: true, message: '请输入所属公司', trigger: 'blur'},
						{ validator: checkCompany}
					],
					position: [
						{ required: true, message: '请输入职位', trigger: 'blur'}
					],
					mobile: [
						{ required: true, message: '请输入手机号', trigger: 'blur'},
						{ validator: checkMobile}
					]
				}
			}
		},
		created() {
			if (this.data) {
				this.form.name = this.data.name;
				this.form.company = this.data.company;
				this.form.position = this.data.position;
				this.form.mobile = this.data.mobile;
				this.form.id = this.data.id;
			}
		},
		watch: {
			visiable(val) {
				if (!val) {
					this.$emit('closedialog');
				}
			}
		},
		computed: {
			title() {
				return this.data ? '修改导师信息': '新增导师';
			}
		},
		methods: {
			close() {
				this.visiable = false;
			},
			handleSubmit() {
				this.$refs.form.validate((valid) => {
					if (valid) {
						this.submitting = true;
						if (this.form.id) {
							teacherUpdate(this.form)
								.then((res) => {
									toast('success', '更新导师成功');
									this.$emit('callback');
									setTimeout(() => {
										this.close();
									}, 1000);
								}, () => {
									this.submitting = false;
								})
						} else {
							teacherSave(this.form)
								.then((res) => {
									toast('success', '添加导师成功');
									this.$emit('callback');
									setTimeout(() => {
										this.close();
									}, 1000);
								}, () => {
									this.submitting = false;
								})
						}
						
						
					} else {
						toast('warning', '请输入完整信息');
						return false;
					}
		        });
			}

		}

	}
</script>