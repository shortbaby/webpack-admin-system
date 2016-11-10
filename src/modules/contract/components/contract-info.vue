<template>
	<div class="contract-info">
		<div class="info-head">
			<span>合同信息</span>
		</div>
		<div class="info-panel">
			<el-row :gutter="30">
			  <el-col :span="4">
			  	<div class="info-panel-item item-1">
			  		<p>订单号</p>
			  		<p>{{data.orderNum}}</p>
			  	</div>
			  </el-col>
			  <el-col :span="4">
			  	<div class="info-panel-item item-2">
			  		<p>生成时间</p>
			  		<p>{{data.signTime | date('yyyy.MM.dd HH:mm:ss')}}</p>
			  	</div>
			  </el-col>
			  <el-col :span="4">
			  	<div class="info-panel-item item-3">
			  		<p>产品类型</p>
			  		<p>{{data.courseTypeStr}}</p>
			  	</div>
			  </el-col>
			  <el-col :span="3">
			  	<div class="info-panel-item item-4">
			  		<p>销售跟进人</p>
			  		<p>{{data.saleStaff}}</p>
			  	</div>
			  </el-col>
			  <el-col :span="3">
			  	<div class="info-panel-item item-5">
			  		<p>收款金额</p>
			  		<p>{{data.amount | money}}</p>
			  	</div>
			  </el-col>
			  <el-col :span="3">
			  	<div class="info-panel-item item-6">
			  		<p>生效日期</p>
			  		<p>{{data.effectiveDate | date('yyyy.MM.dd')}}</p>
			  	</div>
			  </el-col>
			  <el-col :span="3">
			  	<div class="info-panel-item item-7">
			  		<p>失效日期</p>
			  		<p>{{data.expirationDate | date('yyyy.MM.dd')}}</p>
			  	</div>
			  </el-col>
			</el-row>
		</div>
	</div>
</template>
<script>
	export default {
		props: {
			data: {
				type: Object
			}
		},
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>