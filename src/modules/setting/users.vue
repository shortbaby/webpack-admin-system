<template>
	<div class="user-list-wrap">
        <div class="top clearfix">
            <div class="left">
                <span class="txt">用户管理</span>
            </div>
            <div class="search-form">
                <el-select v-model="roleId" placeholder="所有角色" @change="query">
                    <el-option
                      v-for="item in roleOptions"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                </el-select>
                <el-select v-model="company" placeholder="所有公司" @change="query">
                    <el-option
                      v-for="item in companyOptions"
                      :label="item"
                      :value="item">
                    </el-option>
                </el-select>
                <el-input placeholder="输入用户名或手机号搜索" style="width: 250px;" v-model="key">
                    <el-button slot="append" icon="search" @click.native="query"></el-button>
                </el-input>
                <el-button type="primary" @click.native="addUser">新增用户</el-button>
            </div>  
        </div>
        <div class="user-table" style="overflow-x: auto;">
            <el-table :data="list" stripe style="min-width: 1200px;">
                <el-table-column property="account" label="账号" align="center"></el-table-column>
                <el-table-column property="name" label="用户名" align="center"></el-table-column>
                <el-table-column property="mobile" label="手机号" align="center"></el-table-column>
                <el-table-column property="role" label="角色" align="center"></el-table-column>
                <el-table-column property="company" label="所属公司" align="center"></el-table-column>
                <el-table-column inline-template label="添加时间" align="center">
                    <span>{{row.createTime | date('yyyy.MM.dd  HH:mm')}}</span>
                </el-table-column>
                <el-table-column label="操作" type="button" inline-template width="120" align="center">
                    <el-dropdown class="process-dropdown" trigger="click">
                        <span class="el-dropdown-link">
                            操作<i class="el-icon-caret-bottom el-icon-right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="edit(row)">编辑</el-dropdown-item>
                            <el-dropdown-item @click.native="del(row)">删除</el-dropdown-item>
                            <el-dropdown-item v-if="row.status == 0" @click.native="disabled(row)">禁用</el-dropdown-item>
                            <el-dropdown-item v-if="row.status == 2" @click.native="enabled(row)">启用</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-table-column>
            </el-table>
            <div class="none-list" v-if="!list || list.length == 0">
                <span>没有搜索到信息</span>
            </div>
        </div>
        <div class="pager">
            <tx-pagination @currentchange="handleCurrentChange" :page-dto="pageDto">
            </tx-pagination>
        </div>
        <user :type="1" v-if="showUserDialog" :id="selectId" @closedialog="closeUserDialog" @refresh="query"></user>
    </div>	
</template>
<script>
    const breadcrumbs = [
        {
            name: '系统设置',
            path: '/setting/role'
        },
        {
            name:  '用户管理',
            path: '/setting/users'
        }
    ];
    import {userGetAllRoles, userGetAllCompany, userQuery, userDelete, userDisable} from './request';
    import User from './components/user.vue';
    import TxPagination from '../../common/components/TxPagination.vue';
    import $ from 'jquery';
    export default {
    	data() {
    		return {
                list: [],
                roleOptions: [],
                companyOptions: [],
                pageDto: {
                    "count": 0,
                    "curPageCount": 0,
                    "pageNum": 1,
                    "pageSize": 20,
                    "totalPageNum": 0
                },
                showUserDialog: false,
                loading: true,
                fade: false,
                selectId: 0,
                roleId: 0,
                company: '',
                key: ''
            }
    	},
        created() {
            this.getCompanyOptions();
            this.getRolesOptions();
            this.getListData();
        },
        mounted() {
            this.$store.dispatch('updateBreadNavs', breadcrumbs);
        },
        methods: {
            query() {
                this.pageDto.pageNum = 1;
                this.getListData();
            },
            getCompanyOptions() {
                userGetAllCompany()
                    .then((res) => {
                        this.companyOptions = res.data;
                    })
            },
            getRolesOptions() {
                userGetAllRoles()
                    .then((res) => {
                        this.roleOptions = res.data;
                    })
            },
            getListData() {
                let params = {};
                params.pageNum = this.pageDto.pageNum;
                params.key = $.trim(this.key);
                if (this.roleId != 0) {
                    params.roleId = this.roleId;
                }
                if (this.company != '') {
                    params.company = this.company;
                }
                this.$store.dispatch('showLoading');
                userQuery(params)
                    .then((res) => {
                        this.list = res.data;
                        this.pageDto = res.pageDto;
                    })
                    .always(() => {
                        this.$store.dispatch('hideLoading');
                    })


            },
            handleCurrentChange(val) {
                this.pageDto.pageNum = val;
                this.getListData();
            },
            closeUserDialog() {
            	this.showUserDialog = false;
            	removeBodyModal();
            },
            addUser() {
                this.selectId = 0;
            	this.showUserDialog = true;
            },
            edit(val) {
                this.selectId = val.id;
                this.showUserDialog = true;
            },
            disabled(val) {
                this.selectId = val.id;
                this.$confirm('此操作将禁用该用户, 是否继续?', '提示', {
                    type: 'warning'
                })
                    .then(() => {
                        userDisable({
                            id: this.selectId,
                            status: 2
                        })
                            .then((res) => {
                                toast('success', '禁用用户成功');
                                this.getListData();
                            })
                    })
                    .catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消禁用操作'
                        });          
                    });

            },
            enabled(val) {
                this.selectId = val.id;
                this.$confirm('此操作将启用该用户, 是否继续?', '提示', {
                    type: 'warning'
                })
                    .then(() => {
                        userDisable({
                            id: this.selectId,
                            status: 0
                        })
                            .then((res) => {
                                toast('success', '启用用户成功');
                                this.getListData();
                            })
                    })
                    .catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消启用操作'
                        });          
                    });
            },
            del(val) {
                this.selectId = val.id;
                this.$confirm('此操作将删除该用户, 是否继续?', '提示', {
                    type: 'warning'
                })
                    .then(() => {
                        userDelete({
                            id: this.selectId
                        })
                            .then((res) => {
                                toast('success', '删除用户成功');
                                this.getListData();
                            })
                    })
                    .catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除操作'
                        });          
                    });
            }
        },
        components: {
        	User,
            TxPagination
        }
    }
</script>