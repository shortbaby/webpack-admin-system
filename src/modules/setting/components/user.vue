<template>
	<el-dialog :title="title" v-model="visiable" class="user-dialog">
        <el-form ref="form" class="user-form">
        	<el-row :gutter="20">
			  <el-col :span="12">
			  	<div>
			  		<el-form-item label="账号" prop="account" class="item-1">
		              <input type="text"  :disabled="disabled" class="el-input__inner" v-model="form.account" auto-complete="off" placeholder="请输入账号" 
		              	@blur="getUserInfo"/>
		            </el-form-item>
		            <el-form-item label="用户名" class="item-2">
		              <el-input v-model="form.name" :disabled="true" auto-complete="off" placeholder="用户名"></el-input>
		            </el-form-item>
		            <el-form-item label="所属公司" class="item-3">
		               <el-input v-model="form.company" :disabled="true" auto-complete="off" placeholder="所属公司"></el-input>
		            </el-form-item>
			  	</div>
			  </el-col>
			  <el-col :span="12">
			  	<div>
			  		<el-form-item label="登录密码" class="item-2">
		              <el-input type="password" :disabled="disabled" v-model="form.password" auto-complete="off" placeholder="请输入登录密码"></el-input>
		            </el-form-item>
			  		
		            <el-form-item label="职位" class="item-4">
		               <el-input v-model="form.position" :disabled="true" auto-complete="off" placeholder="职位"></el-input>
		            </el-form-item>
		            <el-form-item label="手机号" class="item-6">
		            	 <el-input v-model="form.mobile" :disabled="true" auto-complete="off" placeholder="手机号"></el-input>
		            </el-form-item>
			  	</div>
			  </el-col>
			</el-row>
			<label>角色（可多选）</label>
            <el-form-item class="item-7">
            	 <el-checkbox-group v-model="form.roles">
					<el-checkbox v-for="item in roles" :label="item.name" name="role"></el-checkbox>
				 </el-checkbox-group>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
	        <el-button @click.native="close">取 消</el-button>
	        <el-button type="primary" :disabled="submiting" @click.native.prevent="handleSubmit($event)">确 定</el-button>
        </span>
    </el-dialog>
</template>
<script>
	import {getUserById, getUserInfoByAccount, allRoles, userSave, userUpdate} from '../request';
	import $ from 'jquery';
	export default {
		props: {
			id: null
		},
		data() {
			return {
				visiable: true,
				form: {
					id: 0,
					account: '',
					password: '',
					name: '',
					company: '',
					position: '',
					mobile: '',
					roles: []
				},
				submiting: false,
				disabled: false,
				roleSelect: [],
				roles: []
			}
		},
		created() {
			allRoles()
				.then((res) => {
					this.roles = res.data;
					if (this.id) {
						this.disabled = true;
						this.getUserInfoById();
					}
				})	
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
				return this.id ? '编辑用户' : '新增用户';
			}
		},
		methods: {
			getUserInfoById() {
				getUserById({
					id: this.id
				})
					.then((res) => {
						this.form.id = res.data.id;
						this.form.account = res.data.account;
						this.form.name = res.data.name;
						this.form.company = res.data.company;
						this.form.position = res.data.position;
						this.form.mobile = res.data.mobile;
						this.roleSelect = res.data.role;
						this.form.password = '******';
						this.mapSelectRoles();
					})
			},
			getUserInfo() {
				if (!this.form.account) {
					return;
				}
				this.$store.dispatch('showLoading');
				this.form.id = 0;
				getUserInfoByAccount({
					account: this.form.account
				})
					.then((res) => {
						this.form.id = res.data.id;
						this.form.account = res.data.account;
						this.form.name = res.data.name;
						this.form.company = res.data.company;
						this.form.position = res.data.position;
						this.form.mobile = res.data.mobile;
					})
					.always(() => {
						this.$store.dispatch('hideLoading');
					})
			},
			close() {
				this.visiable = false;
			},
			mapFormRoles() {
				let ids = [];
				this.roles.forEach((item) => {
					if (this.form.roles.indexOf(item.name) > -1) {
						ids.push(item.id);
					}
				})
				return ids;
			},
			mapSelectRoles() {
				this.roleSelect.forEach((item) => {
					this.form.roles.push(item.name);
				})
			},
			updateUser(event) {
				let target = $(event.target);
				this.submiting = true;
				let roleIds = this.mapFormRoles();
				let params = {};
				params.id = this.id;
				params.role = roleIds.join(',');
				userUpdate(params)
					.then((res) => {
						toast('success', '更新用户信息成功');
						setTimeout(() => {
							this.visiable = false;	
							this.$emit('refresh');
						})
					}, () => {
						this.submiting = false;
					});
			},
			addUser(event) {
				if (this.form.password == '') {
					toast('warning', '请输入登录密码');
					return;
				}
				let target = $(event.target);
				this.submiting = true;
				let roleIds = this.mapFormRoles();
				let params = {};
				params.id = this.form.id;
				params.account = this.form.account;
				params.password = this.form.password;
				params.role = roleIds.join(',');
				userSave(params)
					.then((res) => {
						toast('success', '添加用户成功');						
						setTimeout(() => {
							this.visiable = false;
							this.$emit('refresh');
						})
					}, () => {
						this.submiting = false;
					})
			},
			handleSubmit(event) {
				if (!this.id) {
					this.addUser(event);
				} else {
					this.updateUser(event);
				}
				
			}

		}

	}
</script>