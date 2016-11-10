<template>
	<div class="educational-periods">
		<transition name="slide-down">
			<div class="educational-periods-content" v-show="!fade">
                <div class="top clearfix">
                    <div class="left">
                        <span class="iconfont icon-teacher"></span>
                        <span>{{pageDto.count}}</span>
                        <span class="txt">条导师课时统计</span>
                    </div>
                    <div class="filter-wrap">
                         <el-date-picker
                          v-model="dateRange"
                          type="daterange"
                          align="right"
                          placeholder="选择日期范围"
                          :picker-options="pickerOptions"
                          style="width: 220px">
                        </el-date-picker>
                        <el-input placeholder="请输入导师姓名" v-model="key" style="width: 300px;">
                            <el-button slot="append" icon="search" @click.native="query"></el-button>
                        </el-input>
                       
                        <el-button type="primary" @click.native="exportPeriods" v-if="$TX_AUTH[155]">导出</el-button>
                    </div>
                </div>
				<div class="list">
					<el-table :data="list" stripe style="width: 100%" @cellclick="tableClick">
                        <el-table-column property="teacherName" label="导师姓名" align="center">
                        </el-table-column>
                        <el-table-column property="teachClassNum" label="所教班级数" align="center">
                        </el-table-column>
                        <el-table-column property="courseNum" label="已上课程数" align="center">
                        </el-table-column>
                        <el-table-column property="totalLessonHour" label="总课时" align="center">
                        </el-table-column>
                    </el-table>
                    <div class="none-list" v-if="!list || list.length == 0">
                        <span>没有搜索到信息</span>
                    </div>
                    <div class="pager">
                        <tx-pagination  @currentchange="handleCurrentChange" :page-dto="pageDto"></tx-pagination>
                    </div>
				</div>
			</div>
		</transition>
		<transition name="slide-right">
			<periods-detail v-if="fade" :id="teacherId" :date="dateRange" v-on:hidedetail="hidePeriods"></periods-detail>
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
            name:  '课时统计',
            path: '/educational/periods'
        }
    ];
    import {teacherStatisticSearch, teacherStatisticSearchExport} from './request';
	import PeriodsDetail from './components/periods-detail.vue';
    import TxPagination from '../../common/components/TxPagination.vue';
	export default {
        mounted() {
            this.$store.dispatch('updateBreadNavs', breadcrumbs);
        },
		data() {
			return {
				fade: false,
				keyType: '',
				key: '',
                dateRange: '',
                teacherId: 0,
                pickerOptions: {
                  disabledDate(time) {
                    return time.getTime() > Date.now();
                  },
                  shortcuts: [
                      {
                          text: '清除',
                          onClick(picker) {
                              picker.$emit('pick', []); 
                          }
                      },
                      {
                          text: '最近一周',
                          onClick(picker) {
                              const end = new Date();
                              const start = new Date();
                              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                              picker.$emit('pick', [start, end]);
                          } 
                      }, 
                      {
                          text: '最近一个月',
                          onClick(picker) {
                              const end = new Date();
                              const start = new Date();
                              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                              picker.$emit('pick', [start, end]);
                          }
                      }, 
                      {
                          text: '最近三个月',
                          onClick(picker) {
                              const end = new Date();
                              const start = new Date();
                              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                              picker.$emit('pick', [start, end]);
                          }
                      }
                  ]
                },
				list: [],
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
            this.getListData();
        },
        watch: {
            dateRange(val, olv) {
                let eq = true;
                if (val instanceof Array && olv instanceof Array && val.length == olv.length) {
                    let l = val.length;
                    for (let i = 0; i < l; i++) {
                        if (val[i] && (val[i].getTime() != olv[i].getTime())) {
                            eq = false;
                        }
                    };
                } else {
                    eq = false;
                }
                if (!eq) {
                   this.query(); 
                }
            }
        },
		methods: {
            handleCurrentChange(val) {
                this.pageDto.pageNum = val;
                this.getListData();
            },
            query() {
                this.pageDto.pageNum = 1;
                this.getListData();
            },
            getListData() {
                let params = {}
                params.pageNum = this.pageDto.pageNum;
                if (this.dateRange instanceof Array && (this.dateRange[0] instanceof Date) 
                    && (this.dateRange[1] instanceof Date)) {

                    params.startTimeStr = this.dateRange[0].toFormattedString('yyyy-MM-dd');
                    params.endTimeStr = this.dateRange[1].toFormattedString('yyyy-MM-dd');
                    // if (params.startTime == params.endTime) {
                    //     params.endTime += 24 * 60 * 60 * 1000;
                    // }
                }
                if (this.key) {
                    params.teacherName = this.key;
                }
                this.$store.dispatch('showLoading');
                teacherStatisticSearch(params)
                    .then((res) => {
                        this.list = res.data;
                        this.pageDto = res.pageDto;
                    })
                    .always(() => {
                        this.$store.dispatch('hideLoading');
                    })
            },
			showPeriods() {
				this.fade = true;
			},
			tableClick(row) {
                this.teacherId = row.teacherId;
				this.showPeriods();
			},
			hidePeriods() {
				this.fade = false;
			},
            exportPeriods() {
                let params = {};
                if (this.dateRange instanceof Array 
                    && (this.dateRange[0] instanceof Date) 
                    && (this.dateRange[1] instanceof Date)) {

                    params.startTimeStr = this.dateRange[0].toFormattedString('yyyy-MM-dd');
                    params.endTimeStr = this.dateRange[1].toFormattedString('yyyy-MM-dd');
                }
                if (this.key) {
                    params.teacherName = this.key;
                }
                teacherStatisticSearchExport(params);
            }
		},
		components: {
			PeriodsDetail,
            TxPagination
		}
	}
</script>