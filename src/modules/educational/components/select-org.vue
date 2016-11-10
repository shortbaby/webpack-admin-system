<template>
	<el-dialog title="选择机构" v-model="visiable" class="select-org_dialog">
		<div class="select-org_filterwrap">
			<el-input placeholder="请输入机构名称搜索" style="width: 215px;" v-model="key">
	            <el-button slot="append" icon="search" @click.native="query"></el-button>
	        </el-input>
	        <region mode="city" :data="cityData" @selectcity="selectCity"></region>
	        <el-select v-model="category" placeholder="请选择品类" @change="query">
	            <el-option
	              v-for="item in categoryOptions"
	              :label="item.label"
	              :value="item.value">
	            </el-option>
	        </el-select>
		</div>
		<div class="select-org_table">
			<el-table
			    :data="list"
			    selection-mode="single"
			    style="width: 100%"
			    @selectionchange="handleSelectionChange">
			    <el-table-column property="name" label="机构名称" align="center"></el-table-column>
			    <el-table-column property="city" label="所在城市" align="center"></el-table-column>
			    <el-table-column property="category" label="机构品类" align="center"></el-table-column>
			</el-table>
			 <div class="none-list" v-if="!list || list.length == 0">
	            <span>没有搜索到信息</span>
	        </div>
		    <div class="pager">
	            <tx-pagination @currentchange="changePage" :page-dto="pageDto">
	            </tx-pagination>
	        </div>
		</div>
        <span slot="footer" class="dialog-footer">
	        <el-button @click.native="close">取 消</el-button>
	        <el-button type="primary" @click.native="submit">确 定</el-button>
        </span>
    </el-dialog>
</template>
<script>
	import Region from '../../../common/components/region/region.vue';
	import TxPagination from '../../../common/components/TxPagination.vue';
	import {signOrgList, allOrgList, orgCityList} from '../request';
	import {categoryOptions} from '../../../common/config/orgOption';
	export default {
		props: {
			id: Number
		},
 		data() {
 			return {
 				visiable: true,
 				key: '',
 				category: '',
 				regionData: null,
 				categoryOptions: categoryOptions,
 				cityData: {},
                pageDto: {
                    "count": 0,
                    "curPageCount": 0,
                    "pageNum": 1,
                    "pageSize": 20,
                    "totalPageNum": 0
                },
				list: [],
		        selection: null
 			}
 		},
 		watch: {
 			visiable(val) {
 				if (!val) {
					this.$emit('closedialog');
				}
 			}
 		},
 		created() {
 			this.getListData();
 			this.getOrgCityList();
 		},
 		methods: {
 			getOrgCityList() {
 				orgCityList()
 					.then((res) => {
 						this.cityData = res.data;	
 					})
 			},
  			query() {
 				this.pageDto.pageNum = 1;
 				this.getListData();
 			},
 			getListData() {
 				let params = {};
 				params.pageNum = this.pageDto.pageNum;
 				if (this.key != '') {
 					params.orgName = this.key;
 				}
 				if (this.category != 0) {
 					params.category = this.category;
 				}
 				if (this.regionData && this.regionData.province.length > 0) {
 					params.province = this.regionData.province;
 				}
 				if (this.regionData && this.regionData.city.length > 0) {
 					params.city = this.regionData.areaId;
 				}
 				params.classId = this.id;
 				this.$store.dispatch('showLoading');
 				signOrgList(params)
 					.then((res) => {
 						this.list = res.data;
 						this.pageDto = res.pageDto;
 					})
 					.always(() => {
 						this.$store.dispatch('hideLoading');
 					})
 			},
 			selectCity(data) {
 				this.regionData = data;
 				this.query();
 			},
 			handleSelectionChange(val) {
 				this.selection = val;

 			},
 			close() {
				this.visiable = false;
			},
			submit() {
				if (!this.selection) {
					this.$confirm('你还没有选择机构, 确定关闭吗?', '提示', {
	                    type: 'warning'
	                }).then(() => {
	                    this.close();
	                }).catch(() => {   
	                	return;    
	                });
				} else {
					this.$emit('selectorg', this.selection);
					this.close();
				}
			},
			changePage(val) {
				this.pageDto.pageNum = val;
				this.getListData();
			}
 		},
 		components: {
 			Region,
 			TxPagination
 		}
	}
</script>