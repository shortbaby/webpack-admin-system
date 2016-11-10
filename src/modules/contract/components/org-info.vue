<template>
	<div class="org-info">
		<div class="info-head">
			<span>机构信息</span>
			<label @click="showOrgDialog" v-if="edit">
				<span class="txt" v-if="data.id">重新选择</span>
				<span class="iconfont icon-xinjian" v-if="!data.id"></span>
				<span class="txt" v-if="!data.id">选择机构</span>
			</label>
		</div>
		<div class="info-panel" v-if="data.id">
			<el-row :gutter="30">
			  <el-col :span="4">
			  	<div class="info-panel-item item-1">
			  		<p class="org-name">{{data.name}}</p>
			  	</div>
			  </el-col>
			  <el-col :span="4">
			  	<div class="info-panel-item item-2">
			  		<p>品类</p>
			  		<p>{{data.category}}</p>
			  	</div>
			  </el-col>
			</el-row>
		</div>
	</div>
</template>
<script>
	export default {
		props: {
			edit: {
				type: Boolean,
				default: false
			},
			data: {
				type: null
			}
		},
		data() {
			return {

			}
		},
		methods: {
			showOrgDialog() {
				this.$emit('showdialog');
			}
		}
	}
</script>