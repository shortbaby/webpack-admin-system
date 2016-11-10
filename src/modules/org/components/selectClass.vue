<template>
	<div class="sel-class-wrap">
		<el-dialog title="选择班级" v-model="visiable">
			<div class="class-filter">
				<el-input placeholder="班级名称搜索" v-model="className" style="width: 200px;" class="l-pos r-blank">
					<el-button slot="append" icon="search" @click.native="search"></el-button>
				</el-input>
		        <el-select v-model="courseIds" placeholder="所有课程" class="l-pos r-blank" @change="search">
				    <el-option
				      v-for="item in courseOptions"
				      :label="item.name"
				      :value="item.id">
				    </el-option>
			    </el-select>
				<el-select v-model="cityId" placeholder="所有城市" class="l-pos r-blank" @change="search">
				    <el-option
				      v-for="item in cityOptions"
				      :label="item.name"
				      :value="item.id">
				    </el-option>
			    </el-select>
				<el-date-picker type="date" placeholder="请选择开班日期" v-model="startdate" ></el-date-picker>
			</div>

			<div class="sel-class-table">
		        <el-table
		            :data="tableData"
		            stripe
		            selection-mode="single"
		            style="width: 100%"
		            @selectionchange="handleSelectionChange">
		            <el-table-column
		              property="className"
		              label="班级名称"
		              align="center">
		            </el-table-column>
		            <el-table-column
		              inline-template
		              label="课程"
		              align="center">
		              <div>
		              	<span v-for="item in row.courses">{{item.name}}</span>
		              </div>
		            </el-table-column>
		            <el-table-column
		              inline-template
		              label="开班日期"
		              width="160"
		              align="center">
		              <span>{{row.startTime | date('yyyy-MM-dd')}}</span>
		            </el-table-column>
		            <el-table-column
		              inline-template
		              property="endTime"
		              label="结束日期"
		              width="160"
		              align="center">
		              <span>{{row.endTime | date('yyyy-MM-dd')}}</span>
		            </el-table-column>
		            <el-table-column
		              property="address"
		              label="上课地址"
		              align="center">
		            </el-table-column>
		            <el-table-column
		              inline-template
		              property="cutTime"
		              label="报班截止时间"
		              width="160"
		              align="center">
		              <span>{{row.cutTime | date('yyyy-MM-dd')}}</span>
		            </el-table-column>
		          </el-table>
		    </div>
		    <div class="none-list" v-if="!tableData || tableData.length == 0">
		   		<span>没有搜索到信息</span>
		    </div>
		    <div class="pager">
		         <tx-pagination @currentchange="handleCurrentChange" :page-dto="pageDto"></tx-pagination>
		    </div>
	        <span slot="footer" class="dialog-footer">
	        	<el-button @click.native="close">取 消</el-button>
	        	<el-button type="primary" @click.native.prevent="handleSubmit">确 定</el-button>
	        </span>
	    </el-dialog>
	</div>
</template>
<script>
	import {getAddClass, getUseableCourse, getUseableCity} from '../request';
	import TxPagination from '../../../common/components/TxPagination.vue';
	export default {
		props: {
			id: {
				type: Number
			}
		},
		data() {
			return {
				className: '',
				cityId: null,
				startdate: '',
				visiable: true,
				selectedClass: [],
				courseOptions: [],
				cityOptions: [],
				courseIds: 0,
				ids: [],
				tableData: [],
				pageDto: {
					pageNum: 1
				},
				isrefresh: false
			}
		},
		watch: {
			visiable(val) {
				if (!val) {
					this.$emit('close', this.selectedClass, this.isrefresh);
				}
			},
			startdate(val) {
				this.getClassList();
			}
		},
		created() {
			this.getCourse();
		},
		methods: {
			/**
			 * 班级搜索
			 */
			search() {
				this.pageDto.pageNum = 1;
				this.getClassList();
			},
			/**
			 * 获取所有可用课程
			 */
			getCourse () {
				var param = {
					orgId: this.id
				};
				var self = this;
				getUseableCourse(param)
					.then( (res) => {
						self.courseOptions = res.data;
						if (self.courseOptions.length) {
							self.courseOptions.forEach( (elem, index) => {
								if (index > 0) {
									self.ids.push(elem.id);
								}
							});
							if (self.ids.length) {
								self.ids.join(',');
							}
							self.getCity();
							self.getClassList();
						}						
					});
			},
			/**
			 * 获取班级列表
			 */
			getClassList () {
				var param = {
					cityId: this.cityId,
					className: this.className,
					page: this.pageDto.pageNum,
					pageSize: this.pageDto.pageSize,
					orgId: this.id,
					hasLeftNum: 1
				};

				if (this.startdate) {
					param.startTimeStr = this.startdate.toFormattedString('yyyy-MM-dd');
				} 

				if (this.courseIds == 0) {
					param.courseIds = this.ids.join(',');
				} else {
					param.courseIds = this.courseIds;
				}
				this.$store.dispatch('showLoading');
				getAddClass(param)
					.then( (res) => {
						this.tableData = res.data;
						this.pageDto = res.pageDto;
					})
					.always(() => {
						this.$store.dispatch('hideLoading');
					})
			},
			/**
			 * 获取可用城市列表
			 */
			getCity() {
				var param = {};
				if (this.courseIds == 0) {
					param.courseIds = this.ids.join(',');
				} else {
					param.courseIds = this.courseIds;
				}
				getUseableCity(param)
					.then( (res) => {
						this.cityOptions = res.data;
					} );
			},
			close() {
				this.visiable = false;
			},
			checkClassCutTime(clazz) {
				let date = new Date();
				let cutTime = clazz.cutTime;
				return date.getTime() > cutTime;
			},
			handleSubmit() {
				var self = this;
				this.isrefresh = true;
				this.selectedClass.forEach((item) => {
					if (this.checkClassCutTime(item)) {
						this.$confirm('选择的班级已经超过报名截止日期, 是否继续?', '提示', {
		                    type: 'warning'
		                }).then(() => {
		                    this.visiable = false;
		                }).catch(() => {         
		                });
					} else {
						this.visiable = false;
					}
				})
				if (this.selectedClass.length == 0) {
					toast('warning', '请先选择班级');
				}
				//发送请求	
			},
			handleSelectionChange(val) {
				this.selectedClass = [];
				this.selectedClass.push(val);
			},
            handleCurrentChange(val) {
                this.pageDto.pageNum = val;
                this.getClassList();
            }
		},
		components: {
			TxPagination
		}
	}
</script>
<style lang="sass">
	.sel-class-wrap {
		.el-dialog {
			width: 1200px;
		}
		.class-filter {
			margin: 20px 0;
		}
		.r-blank {
			margin-right: 30px;
		}
		.pager {
			margin-top: 20px;
		}
	}
</style>