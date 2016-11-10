<template>
	<div class="teacher-list-wrap">
        <div class="top clearfix">
            <div class="left">
                <span class="txt">导师管理</span>
            </div>
            <div class="search-form">
                <el-input placeholder="请输入导师姓名或手机号搜索" style="width: 250px;" class="input-first" v-model="teacherName">
                    <el-button slot="append" icon="search" @click.native="query"></el-button>
                </el-input>
                <el-button type="primary" @click.native="addTeacher">新增导师</el-button>
            </div>  
        </div>
        <div class="user-table" style="overflow-x: auto;">
            <el-table :data="list" stripe style="min-width: 1100px">
                <el-table-column property="name" label="姓名" align="center"></el-table-column>
                <el-table-column property="company" label="公司" align="center"></el-table-column>
                <el-table-column property="position" label="职位" align="center"></el-table-column>
                <el-table-column property="mobile" label="手机号" align="center"></el-table-column>
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
        <teacher :type="1" :data="modifyTeacher" v-on:callback="getListData" v-if="showTeacherDialog" @closedialog="closeTeacherDialog"></teacher>
    </div>	
</template>
<script>
    const breadcrumbs = [
        {
            name: '系统设置',
            path: '/setting/role'
        },
        {
            name:  '导师管理',
            path: '/setting/teachers'
        }
    ];
    import Teacher from './components/teacher.vue';
    import TxPagination from '../../common/components/TxPagination.vue';
    import {teacherQuery, teacherDelete} from './request';
    import $ from 'jquery';
    export default {
    	data() {
    		return {
                teacherName: '',
                list: [],
                showTeacherDialog: false,
                loading: true,
                fade: false,
                modifyTeacher: null,
                pageDto: {
                    "count": 0,
                    "curPageCount": 0,
                    "pageNum": 1,
                    "pageSize": 20,
                    "totalPageNum": 0
                },
                selectId: 0
            }
    	},
        created() {
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
            getListData() {
                let params = {};
                if ($.trim(this.teacherName)) {
                    params.param = $.trim(this.teacherName);
                }
                params.pageNum = this.pageDto.pageNum;
                this.$store.dispatch('showLoading');
                teacherQuery(params)
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
            closeTeacherDialog() {
            	this.showTeacherDialog = false;
            	removeBodyModal();
            },
            addTeacher() {
                this.modifyTeacher = null;
            	this.showTeacherDialog = true;
            },
            edit(val) {
                this.modifyTeacher = val;
                this.showTeacherDialog = true;
            },
            del(val) {
                this.$confirm('此操作将删除该导师, 是否继续?', '提示', {
                    type: 'warning'
                })
                    .then(() => {
                        teacherDelete({
                            id: val.id
                        })
                            .then((res) => {
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                            })
                            .always(() => {
                                this.getListData();
                            })
                        
                    })
                    .catch(() => {
                        this.$message({
                            type: 'info',
                            message: '删除失败,已取消删除'
                        });          
                    });
            }
        },
        components: {
        	Teacher,
            TxPagination
        }
    }
</script>