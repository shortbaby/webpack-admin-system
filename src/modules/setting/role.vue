<template>
	<div class="setting-role-div">
		<h3>
			角色管理
		</h3>
		<div class="role-container clearfix">
			<div class="left">
				<div class="t-head">
					<span>角色</span>
					<label class="btn-label" @click="addNewRole">
						<span class="iconfont icon-xinjian"></span>
						<span>新增角色</span>
					</label>
				
				</div>
				<ul class="role-list">
					<li v-for="item in list" @click.stop="detail(item)" :class="{'active': item == selectRole}">
						<span class="iconfont icon-users"></span>
						<span class="name">{{item.name}}</span>
						<span class="iconfont icon-shanchu" @click.stop="delRole(item)"></span>
						<span class="iconfont icon-bianji" @click.stop="editRole(item)"></span>
					</li>
				</ul>
			</div>
			<div class="right">
				<div class="t-head">
					<span>权限</span>
				</div>
				<div class="permisson-tree">
					<tree-list 
						:data="treeList"
						:props="props"
						:selects="permissons"
						@selectChange="selectTree">
					</tree-list>
				</div>
				<el-button type="primary" v-show="state == 'edit'" @click.native="save">保存权限</el-button>
			</div>
		</div>
		<new-role v-if="showNewRole" :role="selectRole" @closedialog="closeNewRole" @refresh="refresh"></new-role>
	</div>
</template>
<script>
	const breadcrumbs = [
        {
            name: '系统设置',
            path: '/setting/role'
        },
        {
            name:  '角色管理',
            path: '/setting/role'
        }
    ];
	import TreeList from '../../common/components/TreeList.vue';
	import NewRole from './components/new-role.vue';
	import {getRoleList, getPermissions, roleAdd, roleDel, roleDetail, roleEdit, detailPermissions, savePermissions} 
		from './request';
	export default {
		data() {
			return {
				treeList: [],
		        showNewRole: false,
		        list: [],
		        permissons: [],
		        props: {
		           label: 'display',
		           children: 'children'
		        },
		        state: 'view',
		        selectRole: null,
		        pageDto: {
                    "count": 0,
                    "curPageCount": 0,
                    "pageNum": 1,
                    "pageSize": 20,
                    "totalPageNum": 0
                },
                selectPermissions: []
			}
		},
		created() {
			this.getTreeList();
			this.getRoles();
		},
		mounted() {
            this.$store.dispatch('updateBreadNavs', breadcrumbs);
        },
		methods: {
			refresh(add) {
				this.getRoles();
				if (add) {
					this.permissons = [];
					this.state = 'view';
				}
			},
			getRoles() {
				let params = {};
				params.pageNum = this.pageDto.pageNum;
				params.pageSize = this.pageDto.pageSize;
				this.$store.dispatch('showLoading');
				getRoleList(params)
					.then((res) => {
						this.list = res.data || [];
					})
					.always(() => {
						this.$store.dispatch('hideLoading');
					})
			},
			getTreeList() {
				getPermissions()
					.then((res) => {
						this.treeList = res.data || [];
					})
			},
			addNewRole() {
				this.selectRole = null;
				this.showNewRole = true;
			},
			editRole(role) {
				this.selectRole = role;
				this.showNewRole = true;
			},
			deleteRole() {
				roleDel({
          			id: this.selectRole.id
          		})
          			.then((res) => {
          				this.state = 'view';
      					this.selectRole = null;
      					this.getRoles();
          				toast("success", '角色删除成功');
          			})
			},
			delRole(role) {
				this.selectRole = role;
				var self = this;
				this.$confirm('此操作将删除该角色, 是否继续?', '提示', {
		        	type: 'warning'
		        })
		        	.then(() => {
		        		self.deleteRole(); 		
		        	})
		        	.catch(() => {
		          		this.$message({
		            		type: 'info',
		           			message: '已取消删除'
		          		});          
		        	});
			},
			detail(role) {
				this.selectRole = role;
				this.state = 'edit';
				detailPermissions({
					id: role.id
				})
					.then((res) => {
						this.permissons = res.data.permissions;
					})
			},
			save() {
				if (this.selectRole) {
					this.$store.dispatch('showLoading');
					savePermissions({
						id: this.selectRole.id,
						permissions: this.selectPermissions.join(',')
					})
						.then((res) => {
							toast('success', '保存角色权限成功')
						})
						.always(() => {
							this.$store.dispatch('hideLoading');
						})
				}
			},
			selectTree(data) {
				this.getPermissions(data);
			},
			setPermission(item) {
				if (item.checked) {
					this.selectPermissions.push(item.id);
				}
				if (item[this.props.children] instanceof Array && item[this.props.children].length > 0) {
					item[this.props.children].forEach((item) => {
						this.setPermission(item);
					})
				}
			},
			getPermissions(data) {
				this.selectPermissions = [];
				data.forEach((item) => {
					this.setPermission(item);
				})
			},
			closeNewRole() {
				this.showNewRole = false;
				removeBodyModal();
			}
		},
		components: {
			TreeList: TreeList,
			NewRole: NewRole
		}
	}
</script>