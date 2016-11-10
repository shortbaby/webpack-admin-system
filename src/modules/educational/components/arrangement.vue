<template>
	<div class="arrangement-wrap">
		<top-head title="排课" v-on:clickright="hide"></top-head>
		<div class="lesson-info-div">
			<h3>填写课次信息</h3>
			<el-form ref="form" :model="form" label-width="80px" class="lesson-info-form">
				<el-row :gutter="20">
				  <el-col :span="12">
				  	<div class="row-left">
				  		<el-form-item label="班级">
                            <tx-suggest
                              :value="form.className"
                              :fetch-suggestions="querySearch"
                              custom-item="my-item"
                              placeholder="请输入班级名称搜索"
                              :trigger-on-focus="true"
                              @select="handleSelectClass">
                            </tx-suggest>
						    <!-- <el-input v-model="form.className" placeholder="请输入班级名称"></el-input> -->
						</el-form-item>
						<el-form-item label="导师">
                            <tx-suggest
                              :value="form.teacherName"
                              :fetch-suggestions="querySearchTeacher"
                              custom-item="my-item"
                              placeholder="请输入老师名称搜索"
                              :trigger-on-focus="true"
                              @select="handleSelectTeacher">
                            </tx-suggest>
						</el-form-item>
						<el-form-item prop="date1" label="日期">
					        <el-date-picker type="date" placeholder="选择日期" 
					        	v-model="form.date" 
					        	style="width: 100%;">
					        </el-date-picker>
					    </el-form-item>
					    <el-form-item prop="date1" label="下课时间">
					        <time-picker :value="form.endTime" v-on:setTime="setEndTime"></time-picker>
					    </el-form-item>
				  	</div>
				  </el-col>
				  <el-col :span="12">
				  	<div class="row-right">
				  		<el-form-item label="课节主题">
						    <el-input v-model="form.theme" placeholder="请输入课节主题"></el-input>
						</el-form-item>
						<el-form-item label="上课地址">
						    <el-input v-model="form.address" placeholder="请输入上课地址"></el-input>
						</el-form-item>
						<el-form-item prop="date1" label="上课时间">
					        <time-picker :value="form.startTime" v-on:setTime="setStartTime"></time-picker>	
					    </el-form-item>
					    <el-form-item label="时长">
							<span class="tip-msg" :class="{wrong: msgError}">{{durationMsg}}</span>
						</el-form-item>
				  	</div>
				  </el-col>
				</el-row>
				<div class="button-control">
					<el-button type="primary" @click.native="ok">确定</el-button>
			    	<el-button @click.native.prevent="reset">重置</el-button>
				</div>	
			</el-form>
		</div>
		<div class="lessons-table">
            <el-table :data="list" stripe style="width: 100%">
                <el-table-column property="number" label="课节号" align="center"></el-table-column>
                <el-table-column inline-template label="日期" align="center">
                    <span>{{row.startTime | date('MM月dd日')}}</span>
                </el-table-column>
                <el-table-column inline-template label="时间" align="center">
                    <span>{{row.startTime | date('HH:mm')}} - {{row.endTime | date('HH:mm')}}</span>
                </el-table-column>
                <el-table-column property="theme" label="课节主题" align="center"></el-table-column>
                <el-table-column property="teacherName" label="导师" align="center"></el-table-column>
                <el-table-column property="address" label="上课地址" align="center"></el-table-column>
                <el-table-column property="lessonStatus" label="状态" align="center">
                </el-table-column>
                <el-table-column property="conflict" label="冲突" align="center"></el-table-column>
                <el-table-column inline-template label="操作" align="center">
                    <a href="javascript:void(0)" @click="del(row)" class="del-a">
                        删除
                    </a>
                </el-table-column>
            </el-table>
            <div class="none-list" v-if="!list || list.length == 0">
                <span>没有搜索到课节信息</span>
            </div>
        </div>
        <div class="pager">
            <tx-pagination @currentchange="handleCurrentChange" :page-dto="pageDto"></tx-pagination>
        </div>
	</div>
</template>
<script>
    import Vue from 'vue';
	import TopHead from '../../../common/components/TopHead.vue';
	import TimePicker from '../../../common/components/TimePicker.vue';
    import TxPagination from '../../../common/components/TxPagination.vue';
    import TxSuggest from '../../../common/components/TxSuggest.vue';
    import {queryClass, queryTeacher, classLessons, lessonDel, lessonAdd, classDetail} from '../request';
    Vue.component('my-item', {
        functional: true,
        render: function (h, ctx){
            var item = ctx.props.item;
            return h('li', ctx.data, [
                h('div', { attrs: { class: 'name' } }, [item.name]),
            ]);
        },
        props: {
          item: { type: Object, required: true }
        }
    });
	export default {
        props: {
            id: Number,
            time: Number
        },
        created() {
            if (this.time) {
                this.form.date = new Date(this.time);
                this.form.startTime = this.form.date.toFormattedString('HH:mm');
            }
            if (this.id) {
                classDetail({
                    classId: this.id
                })
                    .then((res) => {
                        this.form.class = {
                            id: this.id,
                            name: res.data.className
                        };
                        this.form.className = res.data.className;
                        this.queryClassLessons();
                    })
            }
        },
		data() {
			return {
				form : {
                    className: '',
					class: null,
					theme: '',
                    teacherName: '',
					teacher: null,
					address: '',
					date: '',
                    startTime: '',
                    endTime: ''
					
				},
                msgError: false,
                pageDto: {
                    "count": 0,
                    "curPageCount": 0,
                    "pageNum": 1,
                    "pageSize": 20,
                    "totalPageNum": 0
                },
				list: [],
				rules:[]
			}
		},
		computed: {
			durationMsg() {
                if (this.form.startTime == '' || this.form.endTime == '') {
				    return '请先设置上下课时间';
                } else {
                    let date = new Date().toFormattedString('yyyy/MM/dd');
                    let start = this.form.startTime;
                    let end = this.form.endTime;
                    if (start.length === 4) {
                        start = '0' + start;
                    }
                    if (end.length === 4) {
                        end = '0' + end;
                    }
                    let startTimeStamp = new Date().fromFormattedString(`${date} ${start}:00`, 'yyyy/MM/dd HH:mm:ss').getTime();
                    let endTimeStamp = new Date().fromFormattedString(`${date} ${end}:00`, 'yyyy/MM/dd HH:mm:ss').getTime();
                    let diffTime = endTimeStamp - startTimeStamp;
                    if (diffTime <= 0) {
                        this.msgError = true;
                        return '下课时间须大于上课时间';
                    } else {
                        this.msgError = false;
                        let hour = parseInt(diffTime / (3600 * 1000));
                        let minute = parseInt((diffTime % (3600 * 1000)) / (60 * 1000));
                        if (hour > 0 && minute > 0) {
                            return `${hour}小时${minute}分钟`;
                        } else if (minute > 0) {
                            return `${minute}分钟`;
                        } else if (hour > 0){
                            return `${hour}小时`;
                        }
                    }
                }
			}
		},
		methods: {
            reset() {
                this.form =  {
                    className: '',
                    class: null,
                    theme: '',
                    teacherName: '',
                    teacher: null,
                    address: '',
                    date: '',
                    startTime: '',
                    endTime: ''
                    
                };
            },
            checkParams() {
                let params = {};
                if (!this.form.class) {
                    toast('error', '请先选择班级');
                    return;
                }
                params.classId = this.form.class.id;
                if (!this.form.theme) {
                    toast('error', '请输入课节主题');
                    return;
                }
                params.theme = this.form.theme;
                if (this.form.teacher) {
                    params.teacherId = this.form.teacher.id;
                }
                if (this.form.address) {
                    params.address = this.form.address;
                }

                if (!this.form.date) {
                    toast('error', '请输入上课日期');
                    return;
                }
                params.date = this.form.date.toFormattedString('yyyy-MM-dd');
                if (!this.form.startTime) {
                    toast('error', '请输入上课时间');
                    return;
                }
                params.startTimeStr = this.form.startTime;
                if (!this.form.endTime) {
                    toast('error', '请输入下课时间');
                    return;
                }
                params.endTimeStr = this.form.endTime;

                return params;
            },
            ok() {
                if (this.msgError) {
                    toast('error', '请先设置正确的上课时间');
                    return;
                }
                let params = this.checkParams();
                if (params) {
                    this.$store.dispatch('showLoading');
                    lessonAdd(params)
                        .then((res) => {
                            toast('success', '添加课节成功');
                            this.queryClassLessons();
                        })
                }            
            },
            queryClassLessons() {
                if (this.form.class) {
                    let params = {};
                    params.pageNum = this.pageDto.pageNum;
                    params.classId = this.form.class.id;
                    this.$store.dispatch('showLoading');
                    classLessons(params)
                        .then((res) => {
                            this.list = res.data;
                            this.pageDto = res.pageDto;
                        })
                        .always(() => {
                            this.$store.dispatch('hideLoading');
                        })
                }  
            },
            querySearch(queryString, cb) {
                let params = {
                    className: queryString
                }
                queryClass(params)
                    .then((res) => {
                        cb(res.data);
                    })
            },
            querySearchTeacher(queryString, cb) {
                let params = {
                    key: queryString,
                    pageNum: 1
                }
                queryTeacher(params)
                    .then((res) => {
                        cb(res.data);
                    })
            },
            handleSelectClass(item) {
                this.form.class = item;
                this.form.className = item.name;
                this.queryClassLessons();
            },
            handleSelectTeacher(item) {
                this.form.teacher = item;
                this.form.teacherName = item.name;
            },
			setStartTime(val) {
                this.form.startTime = val;
			},
			setEndTime(val) {
                this.form.endTime = val;
			},
            handleCurrentChange(val) {
                this.pageDto.pageNum = val;
                this.queryClassLessons();
            },
            del(item) {
                this.$confirm('此操作将删除该课节, 是否继续?', '提示', {
                    type: 'warning'
                }).then(() => {
                    lessonDel({
                        lessonIds: item.lessonId
                    }).then((res) => {
                        toast('success', '删除课节成功');
                        this.queryClassLessons();  
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            },
			hide() {
				this.$emit('closeArrangement');
                this.$emit('refresh');
			}
		},
		components: {
			TopHead,
			TimePicker,
            TxPagination,
            TxSuggest
		}
	}
</script>