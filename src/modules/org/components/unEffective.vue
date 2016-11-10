<template>
  <div class="org-list-wrap">
		<div class="filt-wrap clearfix">
			<el-input placeholder="请输入内容" v-model="searchTxt" style="width: 300px;" class="l-pos mix-select">
                <el-select v-model="searchType" slot="prepend" style="width:100px;" placeholder="机构名称">
                    <el-option label="机构名称" value="orgName"></el-option>
                    <el-option label="学员名称" value="studentName"></el-option>
                    <el-option label="学员手机号" value="studentMobile"></el-option>
                </el-select>
                <el-button slot="append" icon="search" @click.native="searchList"></el-button>
            </el-input>
			<region 
                mode="city" 
                class="l-pos sim-select" 
                :data="cityData" 
                v-on:selectcity="selectCity">               
            </region>
		</div>
		<div class="filt-btn clearfix">
			<div class="l-pos">
				<span class="iconfont icon-organization count"></span>
                <span class="count">{{pageDto.count}}</span>
                <span class="txt">机构信息</span> 	
			</div>
			<div class="r-pos">
			    <el-button type="primary" @click.native="showImport" v-if="$TX_AUTH[110]">导入机构</el-button>
                <el-button type="primary" @click.native="add" v-if="$TX_AUTH[109]">新增机构</el-button>
                <span class="btn-set" @click="setHeader"><span class="iconfont icon-setting" title="设置"></span></span>
			</div>
		</div>
		<set-header v-if="setHeaderState" :type="1" v-on:hide="hideHeader"></set-header>
        <div style="overflow-x: auto;">
            <table class="org-table">
                <thead>
                    <tr>
                        <th>序号</th>
                        <th v-for="item in tableHead" v-if="!item.hidden">{{item.showName}}</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in tableData">
                        <td>{{index+1}}</td>
                        <td v-for="ind in order">{{item[ind]}}</td>
                        <td>
                            <el-dropdown class="process-dropdown" trigger="click"  v-if="$TX_AUTH[131] || $TX_AUTH[132]">
                                <span class="el-dropdown-link">
                                    操作<i class="el-icon-caret-bottom el-icon-right"></i>
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item @click.native="edit(item)" v-if="$TX_AUTH[131]">编辑</el-dropdown-item>
                                    <el-dropdown-item @click.native="delet(item)" v-if="$TX_AUTH[132]">删除</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="none-list" v-if="!tableData || tableData.length == 0">
                <span>没有搜索到信息</span>
            </div>
        </div>
        <div class="pager">
            <tx-pagination @currentchange="handleCurrentChange" :page-dto="pageDto">
            </tx-pagination>
        </div>
        <new-org v-if="showAdd" v-on:close="closeAdd" :id="editId" :type="1"></new-org>
        <batch-import v-if="showBatch" v-on:close="closeImport"></batch-import>
	</div>
</template>
<script>
    const breadcrumbs = [
        {
            name: '机构管理',
            path: '/org/effective'
        },
        {
            name:  '我的机构',
            path: '/org/effective'
        },
        {
            name: '未生效',
            path: '/org/effective'
        }
    ];
    import batchImport from './import.vue';
	import SetHeader from './SetHeader.vue';
    import newOrg from './newOrg.vue';
    import Region from '../../../common/components/region/region.vue';
    import TxPagination from '../../../common/components/TxPagination.vue';
    import {getCityList, getMyOrgList, deleteMyOrg} from '../request';
    import $ from 'jquery';
	export default {
		data() {
			return {
				searchType: 'orgName',
                searchTxt: '',
                cityData: null,
                tableHead: [],
                tableData: [],
                searchObject: {
                    isValid: 0, 
                    province: '',
                    city: '',
                },
                pageDto: {
                    pageNum: 1
                },
                showAdd: false,
                editId: 0,
                setHeaderState: false,
                showBatch: false,
                searchObj: {}
			}
		},
        created() {
            this.getListHandle();
            this.getCityOptions();
        },
        mounted() {
            this.$store.dispatch('updateBreadNavs', breadcrumbs);
        },
        watch: {
        },
		methods: {
            /**
             * 刷新列表
             */
            refresh() {
                this.getListHandle();
            },
            /**
             * 获取列表请求
             */
            getListHandle () {
                this.searchObj = {};
                this.searchObj[this.searchType] = this.searchTxt;
                var param = this.searchObj;
                $.extend(param, this.searchObject, {
                    pageNum: this.pageDto.pageNum
                });
                this.$store.dispatch('showLoading');
                getMyOrgList(param)
                    .then((res) => {
                       var header = res.data.header;
                        var data = res.data.result;
                        this.pageDto = res.pageDto;
                        this.dataConvert(header, data);
                    })
                    .always(() => {
                        this.$store.dispatch('hideLoading');
                    });
            },
            /**
             * 拿到的表格数据进行重新组合
             * @param  {Array} header 表头数组
             * @param  {Array} data   表数据数组
             */
            dataConvert(header, data){
                this.tableHead = header;
                this.tableData = data;
                this.order = [];  
                header.forEach((elment) => {
                    if (!elment.hidden) {
                        this.order.push(elment.name);
                    }
                });
            },
            /**
             * 获取城市列表
             */
            getCityOptions () {
                getCityList()
                    .then((res) => {
                        this.cityData = res.data;
                    });
            },
            /**
             * 选择城市触发刷新列表请求
             * @param  {Object} region 选择的城市区域
             */
            selectCity (region) {
                this.searchObject.province = region.province;
                this.searchObject.city = region.areaId;
                this.pageDto.pageNum = 1;
                this.refresh();
            },
            /**
             * 名称搜索查询
             */
            searchList() {
                this.pageDto.pageNum = 1;
                this.refresh();
            },
			setHeader() {
            	this.setHeaderState = true;
            },
            hideHeader(isrefresh) {
                this.setHeaderState = false;
                removeBodyModal();
                if (isrefresh) {
                    this.refresh();
                }
            },
            showImport() {
            	this.showBatch = true;
            },
            closeImport(refresh) {
                this.showBatch = false;
                removeBodyModal();
                if (refresh) {
                    this.refresh();
                }
            },
            add() {
                this.editId = 0;
                this.showAdd = true;
            },
            /**
             * 关闭弹窗
             * @param {Boolean} refresh 是否需要刷新列表
             */
            closeAdd(refresh) {
                if (refresh) {
                    this.refresh();
                }
                this.showAdd = false;
                removeBodyModal();
            },
            edit(row) {
                this.editId = row.id;
            	this.showAdd = true;
            },
            /**
             * 删除我的机构
             * @param  {Object} row 机构列表行信息
             */
            delet(row) {
                var param = {
                    orgId: row.id
                };
                this.$confirm('此操作将删除该机构, 是否继续?', '提示', {
                    type: 'warning'
                }).then(() => {
                    deleteMyOrg(param).then((res) => {
                        if (this.pageDto.curPageCount == 1) {
                            this.pageDto.pageNum -- ;
                        }
                        this.refresh();
                    });
                });
            },
            addClass(row) {
                //console.log(row);
                this.orgId = row.id;
                this.$emit('show', 'class', this.orgId);
            },
            handleCurrentChange(val) {
                this.pageDto.pageNum = val;
                this.refresh();
            }
		},
		components: {
			SetHeader,
            newOrg,
            Region,
            TxPagination,
            batchImport
		}
	}
</script>
<style lang="sass">
	
</style>