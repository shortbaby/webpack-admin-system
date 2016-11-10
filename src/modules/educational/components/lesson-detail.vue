<template>
	<el-dialog :title="title" v-model="visiable" @click.native="click($event)">
		<el-form ref="form" :model="form" class="lesson-info-form" label-position="top">
			<el-row :gutter="20">
			  <el-col :span="8">
					<el-form-item label="导师">
					    <tx-suggest
                          :value="form.teacherName"
                          :fetch-suggestions="querySearchTeacher"
                          custom-item="teacher-item"
                          placeholder="请输入老师名称搜索"
                          :trigger-on-focus="true"
                          @select="handleSelectTeacher">
                        </tx-suggest>
					</el-form-item>
					<el-form-item prop="date1" label="上课时间">
				        <time-picker :value="form.startTime" v-on:setTime="setStartTime"></time-picker>	
				    </el-form-item>
			  </el-col>
			  <el-col :span="8">
				<el-form-item label="上课地址">
				    <el-input v-model="form.address" placeholder="请输入上课地址"></el-input>
				</el-form-item>
				 <el-form-item prop="date1" label="下课时间">
				    <time-picker :value="form.endTime" v-on:setTime="setEndTime"></time-picker>
				</el-form-item>
			  </el-col>
			  <el-col :span="8">
				<el-form-item prop="date1" label="日期">
				    <el-date-picker type="date" placeholder="选择日期" 
				    	v-model="form.date" 
				    	style="width: 100%;">
				    </el-date-picker>
				</el-form-item>
				<el-form-item label="时长">
					<span class="tip-msg" :class="{ wrong: msgError}">{{durationMsg}}</span>
				</el-form-item>
			  </el-col>
			</el-row>
		</el-form>
		<div class="conflicts-info-wrap" v-if="teacherConflicts.length > 0">
			<p>
				<span class="iconfont icon-warn-copy"></span>
				<span>导师冲突({{teacherConflicts.length}})</span>
			</p>
			<ul>
				<li v-for="item in teacherConflicts">
					<span>{{item.courseName}}</span> 
					<span>第{{item.index}}节</span>
					<span>
						{{item.lessonStartTime | date('MM月dd日')}} 
						{{item.lessonStartTime | date('HH:mm')}}-{{item.lessonEndTime | date('HH:mm')}}
					</span>
				</li>
			</ul>	
		</div>
        <span slot="footer" class="dialog-footer">
	        <el-button @click.native.stop="close">取 消</el-button>
	        <el-button type="primary" @click.native.stop="handleSubmit" :disabled="submiting" v-if="$TX_AUTH[152]">保存</el-button>
        </span>
    </el-dialog>
</template>
<script>
	import Vue from 'vue';
	import TimePicker from '../../../common/components/TimePicker.vue';
	import TxSuggest from '../../../common/components/TxSuggest.vue';
	import {lessonDetail, queryTeacher, lessonEdit} from '../request';
	Vue.component('teacher-item', {
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
			id: null
		},
		data() {
			return {
				form : {
					teacher: '',
					teacherName: '',
					address: '',
					date: '',
					startTime: '',
					endTime: ''	
				},
				classId: 0,
				teacherConflicts: [],
				msgError: false,
				title: '课节详情',
				visiable: true,
				submiting: false
			}
		},
		created() {
			this.getDetail();
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
		watch: {
			visiable(val) {
				if (!val) {
					this.$emit('closedialog');
				}
			}
		},
		methods: {
			adptaData(data) {
				this.title = data.className;
				this.classId = data.classId;
				this.form.teacher = {
					id: data.teacherId,
					name: data.teacherName
				};
				this.form.teacherName = data.teacherName;
				this.form.address = data.address;
				this.form.date = new Date(data.startTime);
				this.form.startTime = new Date(data.startTime).toFormattedString('HH:mm');
				this.form.endTime = new Date(data.endTime).toFormattedString('HH:mm');
				this.teacherConflicts = data.teacherConflict.data || [];
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
			handleSelectTeacher(item) {
                this.form.teacher = item;
                this.form.teacherName = item.name;
            },
			getDetail() {
				if (this.id) {
					this.$store.dispatch('showLoading');
					lessonDetail({
						lessonId: this.id
					})
						.then((res) => {
							this.adptaData(res.data);
						})
						.always(() => {
							this.$store.dispatch('hideLoading');
						})
				}
			},
			click(event) {
				//event.stopPropagation();
			},
			setStartTime(val) {
                this.form.startTime = val;
			},
			setEndTime(val) {
                this.form.endTime = val;
			},
			close() {
				this.visiable = false
			},
			checkParams() {
				let params = {};
				params.lessonId = this.id;
				params.classId = this.classId;

				if (!this.form.teacher || this.form.teacherName == '') {
					toast('error', '请先选择导师');
					return false;
				}
				params.teacherId = this.form.teacher.id;
				if (this.form.address == '') {
					toast('error', '请输入上课地址');
					return false;
				}
				params.address = this.form.address;
				if (!(this.form.date instanceof Date)) {
					toast('error', '请选择上课日期');
					return false;
				}
				params.date = this.form.date.toFormattedString('yyyy-MM-dd');
				if (this.form.startTime == '') {
					toast('error', '请设置上课时间');
					return false;
				}
				params.startTimeStr = this.form.startTime;
				if (this.form.endTime == '') {
					toast('error', '请设置下课时间');
					return false;
				}
				params.endTimeStr = this.form.endTime;

				return params;
			},
			handleSubmit() {
				let params = this.checkParams();
				if (params) {
					//this.$store.dispatch('showLoading');
					this.submiting = true;
					lessonEdit(params)
						.then((res) => {
							toast('success', '保存课节信息成功');
							setTimeout(() => {
								this.close();
								this.$emit('refresh');
							}, 1000);
						}, () => {
							this.submiting = false;
						});
				}
				
			}
		},
		components: {
			TimePicker,
			TxSuggest
		}
	}
</script>