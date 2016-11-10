<template>
	<div class="courses-wrap">
		<el-table :data="list" style="min-width: 1200px">
	      <el-table-column property="number" label="课节号" align="center"></el-table-column>
	      <el-table-column inline-template label="日期" align="center">
	      	<span>
	      		{{row.startTime | date('MM月dd日')}}
	      		{{row.startTime | week}}
	      	</span>
	      </el-table-column>
	      <el-table-column inline-template label="时间" align="center">
	      		<span>
	      			{{row.startTime | date('HH:mm')}}~{{row.endTime | date('HH:mm')}}
	      		</span> 
	      </el-table-column>
	      <el-table-column property="theme" label="课节主题" align="center"></el-table-column>
	      <el-table-column property="teacherName" label="导师" align="center"></el-table-column>
	      <el-table-column property="address" label="上课地址" align="center"></el-table-column>
	      <el-table-column inline-template label="状态" align="center">
	      	<div>
	      		<span>{{row.lessonStatus}}</span>
	      	</div>
	      </el-table-column>
	      <el-table-column property="conflict" label="冲突" align="center"></el-table-column>
	      <el-table-column
              label="操作"
              type="button"
              inline-template
              width="100"
              align="center">
                <el-dropdown class="process-dropdown" trigger="click">
                    <span class="el-dropdown-link">
                        操作<i class="el-icon-caret-bottom el-icon-right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="del(row)">删除</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
           </el-table-column>
	    </el-table>
	    <div class="none-list" v-if="!list || list.length == 0">
            <span>没有搜索到信息</span>
        </div>
	    <div class="pager">
            <tx-pagination @currentchange="changePage" :page-dto="pageDto">
            </tx-pagination>
        </div>
	</div>
</template>
<script>
	import TxPagination from '../../../common/components/TxPagination.vue';
	import {classLessons, lessonDel} from '../request';
	export default {
		props: {
			id: null
		},
		created() {
			if (this.id) {
				this.getListData();
			}
		},
		data() {
			return {
				selectId: 0,
				pageDto: {
                    "count": 0,
                    "curPageCount": 0,
                    "pageNum": 1,
                    "pageSize": 20,
                    "totalPageNum": 0
                },
				list: []
	        }
		},
		methods: {
			refresh() {
				this.getListData();
			},
			getListData() {
				let params = {};
				params.pageNum = this.pageDto.pageNum;
				params.classId = this.id;
				this.$store.dispatch('showLoading');
				classLessons(params)
					.then((res) => {
						this.list = res.data;
						this.pageDto = res.pageDto;
					})
					.always(() => {
						this.$store.dispatch('hideLoading');
					})
			},
			changePage(val) {
				this.pageDto.pageNum = val;
				this.getListData();
			},
			del(val) {
				this.selectId = val.id;
                this.$confirm('此操作将删除该课节, 是否继续?', '提示', {
                    type: 'warning'
                }).then(() => {
                    lessonDel({
                        lessonIds: this.selectId
                    }).then((res) => {
                        toast('success', '删除课节成功');
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
		components: {
			TxPagination
		}
	}
</script>