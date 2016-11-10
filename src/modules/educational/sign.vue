<template>
	<div style="position: relative">
        <transition name="slide-down">
            <div v-show="!fade" class="educational-sign-wrap">
                
                <div class="search-form clearfix">
                    <div class="left">
                        <h3><span class="iconfont icon-sign"></span>签到</h3>
                    </div>
                    <div class="right">
                        <el-date-picker
                          v-model="date"
                          type="date"
                          placeholder="请选择日期">
                        </el-date-picker>
                        <el-input placeholder="输入班级名称搜索" style="width: 250px;" v-model="queryString">
                            <el-button slot="append" icon="search" @click.native="query"></el-button>
                        </el-input>
                    </div>
                </div>
                <div class="sign-table" style="overflow-x: auto">
                    <el-table
                        :data="list"
                        stripe
                        style="min-width: 1100px;"
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
                            <span>{{row.cutTime | date('yyyy.MM.dd HH:mm')}}</span>
                        </el-table-column>
                        <el-table-column property="studentNum" label="已有学员数" align="center"></el-table-column>
                        <el-table-column property="description" label="备注" align="center"></el-table-column>
                    </el-table>
                    <div class="none-list" v-if="!list || list.length == 0">
                        <span v-if="options.length == 0">该天没有要签到的班级</span>
                        <span v-else>没有查询到签到信息</span>
                    </div>
                </div>
                <div class="pager">
                    <tx-pagination @currentchange="handleCurrentChange" :page-dto="pageDto"></tx-pagination>
                </div>  
            </div>
        </transition>
        <transition name="slide-right">
            <sign-detail v-if="fade" 
                :id="selectId" 
                v-on:hide="hideDetail">
            </sign-detail>
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
            name:  '签到管理',
            path: '/educational/sign'
        }
    ];
	import SignDetail from './components/sign-detail.vue';
    import TxPagination from '../../common/components/TxPagination.vue';
    import {queryAllClass} from './request';
    import $ from 'jquery';
	export default {
        mounted() {
            this.$store.dispatch('updateBreadNavs', breadcrumbs);
        },
		data() {
			return {
				date: new Date(),
                queryString: '',
                fade: false,
                pageDto: {
                    "count": 0,
                    "curPageCount": 0,
                    "pageNum": 1,
                    "pageSize": 20,
                    "totalPageNum": 0
                },
				list: [],
				options: [
                    {
                      id: '选项1',
                      name: '黄金糕'
                    }, 
                    {
                      id: '选项2',
                      name: '双皮奶'
                    }
                ]
			}
		},
        created() {
            this.getListData();
        },
		methods: {
            query() {
                this.pageDto.pageNum = 1;
                this.getListData();
            },
            getListData() {
                let params = {};
                if (this.date) {
                    params.startTimeStr = this.date.toFormattedString('yyyy-MM-dd');
                }
                if (this.queryString) {
                    params.className = $.trim(this.queryString);
                }
                params.pageNum = this.pageDto.pageNum;
                this.$store.dispatch('showLoading');
                queryAllClass(params)
                    .then((res) => {
                        this.list = res.data;
                        this.pageDto = res.pageDto;
                    })
                    .always(() => {
                        this.$store.dispatch('hideLoading');
                    })

            },
            tableClick(row) {
                this.selectId = row.id;
                this.fade = true;
            },
            hideDetail() {
                this.fade = false;
            },
            handleCurrentChange(val) {
                this.pageDto.pageNum = val;
                this.getListData();
            }
		},
		components: {
            TxPagination,
            SignDetail
		}
	}
</script>