<template>
	<div class="students-wrap">
		<div class="top clearfix">
			<el-input placeholder="请输入姓名搜索" style="width: 250px;" v-model="key">
	            <el-button slot="append" icon="search" @click.native="query"></el-button>
	        </el-input>
	        <div class="button-control">
	        	<el-button type="primary" @click.native="exportStudents" v-if="$TX_AUTH[150]">导出学员</el-button>
	        	<el-button type="primary" @click.native="sign" v-if="$TX_AUTH[148]">学员报班</el-button>
	        </div>
		</div>
		<div style="overflow-x: auto">
			<el-table :data="list" style="min-width: 1200px">
		      <el-table-column property="studentName" label="姓名" align="center"></el-table-column>
		      <el-table-column label="性别" property="genderStr" align="center">
		      </el-table-column>
		      <el-table-column property="duty" label="职务" align="center"></el-table-column>
		      <el-table-column property="orgName" label="机构名称" align="center"></el-table-column>
		      <el-table-column property="identity" label="机构身份" align="center"></el-table-column>
		      <el-table-column property="mobile" label="电话" align="center"></el-table-column>
		      <el-table-column property="identityCard" label="身份证号" align="center"></el-table-column>
		      <el-table-column inline-template label="航班" align="center">
		      	<span>{{row.arriveTime | date('yyyy.MM.dd HH:mm')}}</span>
		      </el-table-column>
		      <el-table-column property="shirtSize" label="衣服尺码" align="center"></el-table-column>
		      <el-table-column inline-template label="已上课程" align="center">
		      	<div>
		      		<span v-if="row.courses.length == 0">第一次上课</span>
		      		<p class="use-lessons">
		      			<span v-for="item in row.courses">
		      				{{item.name}},
		      			</span>
		      		</p>
		      	</div>
		      	
		      </el-table-column>
		    </el-table>
		</div>
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
	import {classStudents, exportClassStudents} from '../request';
	export default {
		props: {
			id: {
				type: Number
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
			  	key: '',
	          	list: []
	        }
		},
		created() {
			this.getListData();
		},
		methods: {
			refresh() {
				this.getListData();
			},
			query() {
				this.pageDto.pageNum = 1;
				this.getListData();
			},
			exportStudents() {
				exportClassStudents({
					classId: this.id
				});
			},
			sign() {
				this.$emit('studentSign');
			},
			getListData() {
				let params = {};
				params.classId = this.id;
				if (this.key != '') {
					params.studentName = this.key;
				}
				params.pageNum = this.pageDto.pageNum;
				this.$store.dispatch('showLoading');
				classStudents(params)
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
			}
		},
		components: {
			TxPagination
		}
	}
</script>