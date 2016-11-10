<template>
	<div class="select-org-div">
		<div class="top clearfix">
			<el-input placeholder="机构名称" style="width: 250px;" v-model="name">
            	<el-button slot="append" icon="search" @click.native="query"></el-button>
	        </el-input>
	        <region mode="city" :data="orgCities" @selectcity="selectCity" @change="query"></region>
	        <el-select v-model="category" placeholder="请选择品类" @change="query">
                <el-option
                  v-for="item in options"
                  :label="item.label"
                  :value="item.value">
                </el-option>
            </el-select>
		</div>
		<el-table
		    :data="list"
		    selection-mode="single"
		    style="width: 100%"
		    allow-no-selection
		    @selectionchange="handleSelectionChange">
		    <el-table-column
		      type="index"
		      width="50">
		    </el-table-column>
		    <el-table-column
		      property="name"
		      label="机构名称"
		      width="200"
		      show-tooltip-when-overflow>
		    </el-table-column>
		    <el-table-column
		      property="city"
		      label="机构城市"
		      width="160">
		    </el-table-column>
		    <el-table-column
		      property="category"
		      label="品类"
		      show-tooltip-when-overflow>
		    </el-table-column>
		</el-table>
		<div class="none-list" v-if="!list || list.length == 0">
            <span>没有搜索到信息</span>
        </div>
		<div class="pager">
            <tx-pagination
              @currentchange="handleCurrentChange"
              :page-dto="pageDto">
            </tx-pagination>
        </div>
	</div>
</template>
<script>
	import Region from '../../../common/components/region/region.vue';
	import TxPagination from '../../../common/components/TxPagination.vue';
	import {categoryOptions} from '../../../common/config/orgOption';
	import {getOrgList, getOrgCityList} from '../request';
	import $ from 'jquery';
	export default {
		data() {
			return {
				category: -1,
				name: '',
				options: categoryOptions,
                list: [],
                orgCities: null,
                province: '',
                city: 0,
		        pageDto: {
                    "count": 0,
                    "curPageCount": 0,
                    "pageNum": 1,
                    "pageSize": 20,
                    "totalPageNum": 0
                },
		        selection: null
			}
		},
		created() {
			this.getOrgCities();
			this.getListData();
		},
		methods: {
			selectCity(val) {
				if (val.areaLevel == 'city') {
					this.province = val.province;
					this.city = val.areaId;
					this.query();
				}
			},
			query() {
				this.pageDto.pageNum = 1;
				this.getListData();
			},
			getListData() {
				let params = {};
				params.pageNum = this.pageDto.pageNum;
				if (this.name != '' && $.trim(this.name) != '') {
					params.orgName = $.trim(this.name);
				}
				if (this.province != '') {
					params.province = this.province;
				}
				if (this.city != 0 && this.city != '') {
					params.city = this.city;
				}
				if (this.category > 0) {
					params.category = this.category;
				}
				getOrgList(params)
					.then((res) => {
						this.list = res.data;
						this.pageDto = res.pageDto;
					})

			},
			getOrgCities() {
				getOrgCityList()
					.then((res) => {
						this.orgCities = res.data;
					})
			},
			handleCurrentChange(val) {
				this.pageDto.pageNum = val;
				this.getListData();
			},
			handleSelectionChange(val) {
		        this.selection = val;
		    }
		},
		components: {
			Region,
			TxPagination
		}
	}
</script>