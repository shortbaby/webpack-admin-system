<template>
	<div class="clazz-list-wrap">
		<new-clazz v-if="showNewClazzDialog" :id="selectId" v-on:closedialog="close" v-on:refresh="refresh"></new-clazz>
        <import v-if="showImport" v-on:closedialog="closeImport"></import>
        <transition name="slide-down">
            <div class="content" v-show="!fade">
                <div class="top clearfix">
                    <div class="left">
                        <span class="iconfont icon-class"></span>
                        <span>{{pageDto.count}}</span>
                        <span class="txt">个班级</span>
                    </div>
                    <div class="search-form">
                        <el-select v-model="courseId" placeholder="所有课程" @change="query" style="min-width: 210px">
                            <el-option
                              v-for="item in lessonOptions"
                              :label="item.name"
                              :value="item.id">
                            </el-option>
                        </el-select>
                        <el-date-picker
                          v-model="date"
                          type="date"
                          placeholder="开班日期">
                        </el-date-picker>
                        <el-input placeholder="请输入班级名称搜索" style="width: 250px;" v-model="className">
                            <el-button slot="append" icon="search" @click.native="query"></el-button>
                        </el-input>
                        <el-button type="primary" @click.native="add" v-if="$TX_AUTH[145]">新增班级</el-button>
                    </div>  
                </div>
                <div class="educational-table">
                    <el-table
                        :data="list"
                        stripe
                        style="min-width: 1200px;"
                        @cellclick="tableClick">
                        <el-table-column property="className" label="班级名称" align="center"></el-table-column>
                        <el-table-column property="address" label="上课地址" align="center"></el-table-column>
                        <el-table-column property="periods" label="期数" align="center"></el-table-column>
                        <el-table-column inline-template label="开班日期" align="center">
                            <span>{{row.startTime | date('yyyy.MM.dd')}}</span>
                        </el-table-column>
                        <el-table-column inline-template label="结束日期" align="center">
                            <span>{{row.endTime | date('yyyy.MM.dd')}}</span>
                        </el-table-column>
                        <el-table-column inline-template label="报班截止时间" align="center">
                            <span>{{row.cutTime | date('yyyy.MM.dd')}}</span>
                        </el-table-column>
                        <el-table-column property="studentNum" label="已有学员数" align="center"></el-table-column>
                        <el-table-column
                          label="操作"
                          type="button"
                          inline-template
                          width="100"
                          align="center" v-if="$TX_AUTH[146] || $TX_AUTH[147]">
                            <el-dropdown class="process-dropdown" trigger="click">
                                <span class="el-dropdown-link">
                                    操作<i class="el-icon-caret-bottom el-icon-right"></i>
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item @click.native="edit(row)" v-if="$TX_AUTH[146]">编辑</el-dropdown-item>
                                    <el-dropdown-item @click.native="del(row)" v-if="$TX_AUTH[147]">删除</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </el-table-column>
                    </el-table>
                    <div class="none-list" v-if="!list || list.length == 0">
                        <span>没有搜索到信息</span>
                    </div>
                </div>
                <div class="pager">
                    <tx-pagination @currentchange="handleCurrentChange" :page-dto="pageDto"></tx-pagination>
                </div>
            </div>
        </transition>
        <transition name="slide-right">
            <detail v-if="fade" 
                :id="selectId" 
                v-on:hide="hideDetail"
                v-on:editclass="editClassFromChild">
            </detail>
        </transition>
    </div>	
</template>
<script>
    const breadcrumbs = [
        {
            name: '教务管理',
            path: '/educational/classes'
        },
        {
            name:  '班级管理',
            path: '/educational/classes'
        }
    ];
    import {getClassesList, fuzzyQuery, classDel} from './request';
    import NewClazz from './components/new-clazz.vue';
    import Detail from './components/detail.vue';
    import TxPagination from '../../common/components/TxPagination.vue';
    export default {
        name: 'classes',
    	data() {
    		return {
                lessonOptions: [],
                list: [],
                loading: true,
                fade: false,
                selectId: 0,
                className: '',
                date: '',
                showImport: false,
                courseId: 0,
                pageDto: {
                    "count": 0,
                    "curPageCount": 0,
                    "pageNum": 1,
                    "pageSize": 20,
                    "totalPageNum": 0
                }
            }
    	},
        created() {
            this.getLessonOptions();
            this.getListData();
        },
        mounted() {
            this.$store.dispatch('updateBreadNavs', breadcrumbs);
        },
        watch: {
            date(val) {
                this.query();
            }
        },
        methods: {
            refresh() {
                this.query();
            },
            query() {
                this.pageDto.pageNum = 1;
                this.getListData();
            },
            getLessonOptions() {
                let params = {
                    type: 0
                }
                fuzzyQuery(params)
                    .then((res) => {
                        this.lessonOptions = res.data;
                        this.lessonOptions.unshift({
                            id: 0,
                            name: '所有课程'
                        })
                    })
            },
            getListData() {
                let params = {};
                if (this.className != '') {
                    params.className = this.className;
                }
                if (this.date != '') {
                    params.startTimeStr = this.date.toFormattedString('yyyy-MM-dd');
                }
                if (this.courseId) {
                    params.courseIds = this.courseId;
                }
                params.pageNum = this.pageDto.pageNum;

                this.$store.dispatch('showLoading');
                getClassesList(params)
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
            add() {
                this.selectId = 0;
                this.$store.dispatch('showNewClazzDialog');
            },

            close() {
                this.$store.dispatch('hideNewClazzDialog');
                removeBodyModal();
            },
            hideDetail() {
                this.fade = false;
            },
            tableClick(row, column, cell, event) {
                if (column.type === 'button') {
                    event.stopPropagation();
                    return;
                }
                this.selectId = row.id;
                this.fade = true;
            },
            editClassFromChild(val) {
                this.selectId = val;
                this.$store.dispatch('showNewClazzDialog');
            },
            edit(val) {
                this.selectId = val.id;
                this.$store.dispatch('showNewClazzDialog');
            },
            del(val) {
                this.selectId = val.id;
                this.$confirm('此操作将删除该班级, 是否继续?', '提示', {
                    type: 'warning'
                }).then(() => {
                    classDel({
                        classId: this.selectId
                    }).then((res) => {
                        toast('success', '删除班级成功');
                        this.getListData();  
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            }
        },
        computed: {
            showNewClazzDialog() {
                return this.$store.state.educational.newClazzVisiable;
            }
        },
        components: {
            NewClazz,
            Detail,
            TxPagination
        }
    }
</script>