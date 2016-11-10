<template>
	<el-dialog :title="title" v-model="visible" size="tiny" class="new-role-modal">
	  <span class="role-txt">角色名称</span>
	  <el-input
		  placeholder="请输入内容"
		  v-model="roleName">
	  </el-input>
	  <span slot="footer" class="dialog-footer">
	    <el-button @click.native="visible = false">取 消</el-button>
	    <el-button type="primary" :disabled="submiting" @click.native="submit($event)" >确 定</el-button>
	  </span>
	</el-dialog>
</template>
<script>
	import {roleAdd, roleEdit} from '../request';
	import $ from 'jquery';
	export default {
		props: {
			role: null
		},
		data() {
			return {
				visible: true,
				roleName: '',
				submiting: false
			}
		},
		created() {
			if (this.role && this.role.name) {
				this.roleName = this.role.name;
			}
		},
		computed: {
			title() {
				return this.role ? '编辑角色': '新增角色';
			}
		},
		watch: {
			visible(val) {
				if(!val) {
					this.$emit('closedialog');
				}
			}
		},
		methods: {
			submit(event) {
				let target = $(event.target);
				if (this.roleName == '' || $.trim(this.roleName).length == 0) {
					toast('warning', '请输入角色名称');
					return;
				}
				if (this.role && this.role.id) {
					this.submiting = true;
					roleEdit({
						id: this.role.id,
						name: $.trim(this.roleName)
					})
						.then((res) => {
							toast('success', '修改角色名称成功');
							setTimeout(() => {
								this.visible = false;
								this.$emit('refresh');
							}, 1000);
						}, () => {
							this.submiting = false;
						});
				} else {
					this.submiting = true;
					roleAdd({
						name: $.trim(this.roleName)
					})
						.then((res) => {
							toast('success', '添加角色成功');
							setTimeout(() => {
								this.visible = false;
								this.$emit('refresh', true);
							}, 1000);
						}, () => {
							this.submiting = false;
						});
				}
				
			}
		}
	}
</script>