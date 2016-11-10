<template>
	<div class="contract-list-div">
		<transition name="slide-down">	
			<div class="contract-list-content" v-show="view == 'list'">
				<div>
					<div class="contract-tag tag-1">
						<label>
							<span>{{unCommit}}</span>笔
						</label>
						<p>待关联机构合同</p>
					</div>
					<div class="contract-tag tag-2">
						<label>
							<span>{{unReviewed}}</span>笔
						</label>
						<p>待审核合同</p>
					</div>
				</div>
				<div class="top clearfix">
		            <div class="left">
		                <span class="iconfont icon-contract"></span>
		                <span>{{pageDto.count}}</span>
		                <span class="txt">条合同信息</span>
		            </div>
		            <div class="search-form">
		            	<el-date-picker
					      v-model="dateRange"
					      type="daterange"
					      align="right"
					      placeholder="选择创建日期范围"
                          format="yyyy/MM/dd"
					      :picker-options="pickerOptions"
					      style="width: 220px">
					    </el-date-picker>
		                <el-select v-model="auditStatus" placeholder="审核状态">
		                    <el-option
		                      v-for="item in options"
		                      :label="item.label"
		                      :value="item.value">
		                    </el-option>
		                </el-select>
		                <el-select v-model="saleStaffId" placeholder="请选择销售跟进人" style="width: 160px">
                            <el-option v-for="item in saleStaffs" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
		                <el-input placeholder="请输入订单号搜索" v-model="orderNum" style="width: 250px;">
		                    <el-button slot="append" icon="search" @click.native="query"></el-button>
		                </el-input>
		            </div>  
		        </div>
                <div class="el-popover tx-popopver" v-show="showPopover" style="width: 200px; position: absolute; transform-origin: center top 0px;"
                    :style="{left: popoverX + 'px', top: popoverY + 'px'}"
                    x-placement="bottom-end">
                        <div class="el-popover__title tx-popopver" >审核备注</div> 
                            {{remark}}
                            <div x-arrow="" class="popper__arrow" style="left: 188.5px;"></div>
                </div>
                <div class="contract-table">
                    <el-table :data="list" stripe style="min-width: 1400px">
                        <el-table-column label="时间" width="180" align="center" inline-template>
                            <span>{{row.signTime | date('yyyy.MM.dd HH:mm:ss')}}</span>
                        </el-table-column>
                        <el-table-column property="orderNum" label="订单号" width="180" align="center"></el-table-column>
                        <el-table-column property="courseTypeStr" label="产品类型" align="center"></el-table-column>
                        <el-table-column inline-template label="收款金额" align="center">
                            <span>{{row.amount | money}}</span>
                        </el-table-column>
                        <el-table-column property="saleStaff" label="销售跟进人" align="center"></el-table-column>
                        <el-table-column inline-template label="合同生效时间" align="center">
                            <span>{{row.effectiveDate | date('yyyy.MM.dd')}}</span>
                        </el-table-column>
                        <el-table-column inline-template label="合同失效时间" align="center">
                            <span>{{row.expirationDate | date('yyyy.MM.dd')}}</span>
                        </el-table-column>
                        <el-table-column property="organization" label="关联机构" align="center">
                        </el-table-column>
                        <el-table-column label="审核状态" inline-template width="100" align="center">
                          	<div>
                                <span :class="{'uncommit': row.status == 1, 'wait': row.status == 2, 'pass': row.status == 3, 
                                    'unpass': row.status == 4}">
                                {{row.statusStr}}
                                </span>
                          		<!-- <el-popover v-if="row.status == 4" ref="remarkPopover" placement="top-end" title="审核备注" 
                                    width="200" trigger="click" :content="row.reviewRemark">
  								</el-popover> -->
	                        	<p v-if="row.status == 4" class="tx-popover" style="color: #999; cursor: pointer" @click="showPopoverTip(row, $event)">查看备注</p>
                          	</div>	
                        </el-table-column>
                        <el-table-column label="操作" type="button" inline-template width="100" align="center">
                            <div class="opration">
                                <span v-if="row.status == 1 && $TX_AUTH[113]" @click="linkOrg(row)">关联机构</span>                
                                <span v-if="row.status == 3" @click="detail(row)">查看详情</span>
                                <span v-if="row.status == 2 && !$TX_AUTH[114]" @click="detail(row)">
                                    查看详情</span>
                                <span v-if="row.status == 4 && !$TX_AUTH[113]" @click="detail(row)">
                                    查看详情</span>
                                <el-dropdown class="process-dropdown" v-if="(row.status == 2 || row.status == 4) 
                                    && $TX_AUTH[113] && $TX_AUTH[114]" trigger="click">
                                    <span class="el-dropdown-link">
                                        操作<i class="el-icon-caret-bottom el-icon-right"></i>
                                    </span>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item @click.native="detail(row)" >查看详情</el-dropdown-item>
                                        <el-dropdown-item v-if="row.status == 4 && $TX_AUTH[113]" @click.native="linkOrg(row)">关联机构</el-dropdown-item>
                                        <el-dropdown-item v-if="row.status == 2 && $TX_AUTH[114]" @click.native="verifyContract(row)">审核合同</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </div>
                            
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
			</div>
		</transition>
		<transition name="slide-right">
			<detail v-if="view == 'detail'" v-on:close="hide" :data="selectItem"></detail>
		</transition>
		<transition name="slide-right">
			<link-org v-if="view == 'linkOrg'" v-on:close="hide" :data="selectItem"></link-org>
		</transition>
		<transition name="slide-right">
			<verify v-if="view == 'verify'" v-on:close="hide" :data="selectItem"></verify>
		</transition>
		
	</div>

</template>
<script>
    const breadcrumbs = [
        {
            name: '合同管理',
            path: '/contract/list'
        },
        {
            name:  '合同列表',
            path: '/contract/list'
        }
    ];
	import Detail from './components/detail.vue';
	import Verify from './components/verify.vue';
	import LinkOrg from './components/link-org.vue';
    import TxPagination from '../../common/components/TxPagination.vue';
    import auditOptions from '../../common/config/auditOption';
    import {getContractList, getAllSaleStaffs} from './request';
    import $ from 'jquery';
	export default {
		data() {
			return {
				pickerOptions: {
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
			      }, {
			        text: '最近一个月',
			        onClick(picker) {
			          const end = new Date();
			          const start = new Date();
			          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
			          picker.$emit('pick', [start, end]);
			        }
			      }, {
			        text: '最近三个月',
			        onClick(picker) {
			          const end = new Date();
			          const start = new Date();
			          start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
			          picker.$emit('pick', [start, end]);
			        }
			      }]
			    },
			    options: auditOptions,
                list: [],
                view: 'list',
                selectItem: null,
                auditStatus: 0,
                dateRange: '',
                orderNum: '',
                loading: false,
                saleStaffId: null,
                saleStaffs: [],
                unCommit: null,
                unReviewed: null,
                remark: '',
                showPopover: false,
                popoverX: 0,
                popoverY: 0,
                documentClickHandler: function() {},
                pageDto: {
                    "count": 0,
                    "curPageCount": 0,
                    "pageNum": 1,
                    "pageSize": 20,
                    "totalPageNum": 0
                }
			}		
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
            },
            auditStatus(val, olv) {
                this.query();
            },
            saleStaffId(val, olv) {
                this.query();
            }
        },
        created() {
            this.getListData();
            this.getSaleStaffs();
        },
        beforeDestroy() {
            $(document).off('click', this.documentClickHandler);
        },
        mounted() {
            var self = this;
            this.documentClickHandler = function(event) {
                event.stopPropagation();
                let target = $(event.target);
                if (target.hasClass('tx-popover')) {
                    return;
                } else {
                    self.showPopover = false;
                }
            }
            this.$store.dispatch('updateBreadNavs', breadcrumbs);
            $(document).on('click', this.documentClickHandler);
        },
		methods: {
            showPopoverTip(row, event) {
                this.remark = row.reviewRemark;
                let target = $(event.target);
                let pos = target.position();
                let offset = target.offset();
                this.popoverX = offset.left - 192 - 200 + 50;
                this.popoverY = offset.top - 90 + target.height();
                this.showPopover = true;
            },
            hidePopover() {
                //this.showPopover = false;
            },
            getListData() {
                let params = this.getParams();
                this.$store.dispatch('showLoading');
                getContractList(params)
                    .then((res) => {
                        this.unCommit = res.data.unCommit;
                        this.unReviewed = res.data.unReviewed;
                        this.list = res.data.list;
                        this.pageDto = res.pageDto;
                    })
                    .always(() => {
                        this.$store.dispatch('hideLoading');
                    })
            },
            query() {
                this.pageDto.pageNum = 1;
                this.getListData();
            },
            getParams() {
                let params = {};
                if (this.dateRange) {
                    let startDate = this.dateRange[0];
                    let endDate = this.dateRange[1];
                    if (startDate instanceof Date && endDate instanceof Date) {
                        let startTime = startDate.getTime();
                        let endTime = endDate.getTime();
                        if (startTime == endTime) {
                            endTime += 24 * 60 * 60 * 1000;
                        }
                        params.startTime = startTime;
                        params.endTime = endTime;
                    }
                }
                if (this.auditStatus != 0) {
                    params.status = this.auditStatus;
                }
                if (this.saleStaffId) {
                    params.saleStaffId = this.saleStaffId;
                }
                if (this.orderNum != '' && $.trim(this.orderNum) != '') {
                    params.orderNum = $.trim(this.orderNum);
                }
                params.pageSize = this.pageDto.pageSize;
                params.pageNum = this.pageDto.pageNum;
                return params;
            },
            getSaleStaffs() {
                getAllSaleStaffs()
                    .then((res) => {
                        this.saleStaffs = res.data;
                        this.saleStaffs.unshift({
                            id: 0,
                            name: '所有人'
                        })
                    })
            },
            handleCurrentChange(val) {
                this.pageDto.pageNum = val;
                this.getListData();
            },
            detail(row) {
            	this.selectItem = row;
            	this.view = 'detail';
            	console.log(row);
            },
            linkOrg(row) {
            	this.selectItem = row;
            	this.view = 'linkOrg';
            	console.log(row);
            },
            verifyContract(row) {
            	this.selectItem = row;
            	this.view = 'verify';
            	console.log(row);
            },
            hide() {
            	this.view = 'list';
                this.getListData();
            }
		},
		components: {
			Detail: Detail,
			LinkOrg: LinkOrg,
			Verify: Verify,
            TxPagination: TxPagination
		}
	}
</script>