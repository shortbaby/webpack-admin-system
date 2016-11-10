<template>
	<div class="clazz-panel">
		<el-row>
		    <el-col :span="8">
		    	<div class="panel-item" v-show="info.className">
		    		<label>
		    			<span class="iconfont icon-class"></span>
		    		</label>
		    		<div class="info">
		    			<p>{{info.className}}({{info.city}})</p>
		    			<!-- <p><span>郑州</span></p> -->
		    		</div>
		    	</div>
		    </el-col>
		    <el-col :span="5">
		    	<div class="panel-item">
		    		<p class="gutter">课程</p>
		    		<p>{{info.coursesDes}}</p>
		    	</div>
		    </el-col>
		    <el-col :span="2">
		    	<div class="panel-item">
		    		<p class="gutter"><span>期数</span></p>
		    		<p>{{info.periods}}</p>
		    	</div>
		    </el-col>
		    <el-col :span="2">
		    	<div class="panel-item">
		    		<p class="gutter"><span>开班日期</span></p>
		    		<p>{{info.startTime }}</p>
		    	</div>
		    </el-col>
		    <el-col :span="2">
		    	<div class="panel-item">
		    		<p class="gutter"><span>结束日期</span></p>
		    		<p>{{info.endTime}}</p>
		    	</div>
		    </el-col>
		    <el-col :span="5" v-if="edit || del">
		    	<div class="panel-buttons" v-if="edit || del">
		    		<el-button type="primary" v-if="edit && $TX_AUTH[146]" @click.native="editClazz">编辑班级</el-button>
		    		<el-button type="primary" class="btn-del" v-if="del && $TX_AUTH[147]" @click.native="delClazz">删除班级</el-button>
		    	</div>
		    </el-col>
		</el-row>
	</div>
</template>
<script>
	import {classDel, classDetail} from '../request';
	export default {
		data() {
			return {
				info: {}
			}
		},
		props: {
			edit: {
				type: Boolean,
				default: false
			},
			del: {
				type: Boolean,
				default: false
			},
			id: null
		},
		created() {
			this.getDetail();
		},
		methods: {
			checkCutTime() {
				let date = new Date();
				return date.getTime() > this.info.cutTime;
			},
			editClazz() {
				this.$emit('editclass', this.id);
			},
			getDetail() {
				if (this.id) {
					classDetail({
						classId: this.id
					})
						.then((res) => {
							let coursesDes = '';
							res.data.courses.forEach((item) => {
								coursesDes += `${item.name},`;

							})
							coursesDes = coursesDes.length > 0 ? coursesDes.substring(0, coursesDes.length - 1)
								: '';
							this.info = {
								className: res.data.className,
								periods: res.data.periods,
								city: res.data.cityName,
								startTime: res.data.startTime,
								endTime: res.data.endTime,
								cutTime: res.data.cutTime,
								coursesDes: coursesDes
							}
						})
				}
			},
			delClazz() {
				this.$confirm('此操作将删除该班级, 是否继续?', '提示', {
                    type: 'warning'
                }).then(() => {
                    classDel({
                        classId: this.id
                    }).then((res) => {
                        toast('success', '删除班级成功');
                        setTimeout(() => {
                        	this.$emit('deleteclass');
                        }, 1000);
                        
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
			}
		}
	}
</script>