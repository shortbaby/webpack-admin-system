<template>
	<div class="org-contract-list">
		<div class="contract-table">
	        <el-table
	            :data="tableData"
	            stripe
	            style="width: 100%">
	            <el-table-column
                    inline-template
	              label="时间"
                    align="center">
                  <span>{{row.payTime | date('yyyy-MM-dd HH:mm')}}</span>
	            </el-table-column>
	            <el-table-column
	              property="orderNum"
	              label="订单号"
                  align="center">
	            </el-table-column>
	            <el-table-column
	              property="courseType"
	              label="产品类型"
                  align="center">
	            </el-table-column>
                <el-table-column
                  property="amount"
                  label="收款金额"
                  align="center">
                </el-table-column>
                <el-table-column
                  property="saleStaffer"
                  label="销售"
                  align="center">
                </el-table-column>
                <el-table-column
                  inline-template
                  label="生效日期"
                  align="center">
                    <div>
                        <span>{{row.beginTime | date('yyyy-MM-dd')}}</span>
                    </div>
                </el-table-column>
                <el-table-column
                  inline-template
                  label="失效日期"
                  align="center">
                    <div>
                        <span>{{row.endTime | date('yyyy-MM-dd')}}</span>
                    </div>
                </el-table-column>
                  <el-table-column
                  property="packageName"
                  label="课程套餐"
                  align="center">
                </el-table-column>
	          </el-table>
	    </div>
        <div class="none-list" v-if="!tableData || tableData.length == 0">
            <span>没有搜索到信息</span>
        </div>
	    <div class="pager">
	        <tx-pagination @currentchange="handleCurrentChange" :page-dto="pageDto">
          </tx-pagination>
	    </div>	
	</div>
</template>
<script>
    import TxPagination from '../../../common/components/TxPagination.vue';
    import {getContractList} from '../request';
	export default {
		data() {
			return {
				tableData: [],
                pageDto: {
                  pageNum: 1
                }
			}
		},
        props: {
            id: {
                type: Number
            }
        },
        created() {
            this.getListHandle();
        },
		methods: {
            /**
             * 获取合同列表
             */
            getListHandle () {
                var param = {
                    orgId: this.id,
                    pageNum: this.pageDto.pageNum
                };
                this.$store.dispatch('showLoading');
                getContractList(param)
                    .then((res) => {
                        this.tableData = res.data;
                        this.pageDto = res.pageDto;
                    })
                    .always(() => {
                      this.$store.dispatch('hideLoading');
                    });
            },
            handleCurrentChange(val) {
               this.pageDto.pageNum = val;
               this.getListHandle();
            }
		},
        components: {
            TxPagination
        }
	}
</script>
<style lang="sass">
    .org-contract-list {
        .contract-table {
            margin-bottom: 20px;
        }
    }
</style>




