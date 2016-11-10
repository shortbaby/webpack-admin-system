<template>
	<div class="feedback_wrap">
		<label>报班回执</label>
		<el-switch
		  v-model="sendFeedBack"
		  on-text=""
		  off-text=""
		  @change="setReceipt($event)" v-if="$TX_AUTH[149]">
		</el-switch>
		<p class="feedback-tip tip-first">
			启用后，会向所有班级中的学员发送报班回执，学员在微信端填写，学员填写的信息会在班级学员中体现
		</p>
		<p class="feedback-tip tip-two">
			启用前，需要先填写酒店安排，这些是学员选择是否选择订房服务的参考信息
		</p>
		<transition name="md-fade-bottom">
			<div class="feedback-info" v-show="sendFeedBackOk">
				<div class="preview">
					<p class="t1">请填写酒店及备注信息，以便学员决定是否需要订房服务。</p>
					<p class="t2">学生中心的展示如图：</p>
					<div class="arrow-left"></div>
					<div class="pic"></div>
				</div>
				<label>参考信息</label>
				<div class="input-control">
					<span>酒店</span>
					<el-input
					    placeholder="请输入学员即将入住的酒店名称"
					    v-model="hotelName">
					</el-input>
				</div>
				<div class="input-control">
					<span>备注</span>
					<el-input
					  type="textarea"
					  placeholder="请输入备注信息"
					  :autosize="{minRows: 3, maxRows: 10}"
					  v-model="remark">
					</el-input>
					<p class="feedback-tip tip-three">
						示例: 上课所在酒店。双人标准间、单人大床房间价格一样: 500元/间/夜，含双早
					</p>
				</div>
				<el-button type="primary" @click.native="save" :disabled="disabled">保存</el-button>
			</div>
		</transition>
	</div>
</template>
<script>
	import {setJoinReceipt, setDefaultReceiptData} from '../request';
	import $ from 'jquery';
	export default {
		props: {
			id: null
		},
		data() {
			return {
				sendFeedBack: false,
				sendFeedBackOk: false,
				hotelName: '',
				disabled: false,
				remark: ''
			}
		},
		methods: {
			setReceipt(event) {
				if (this.id) {
					// let target = $(event.target);
					// target.prop('disabled', true);
					let receipt = this.sendFeedBack ? 1 : 0;
					setJoinReceipt({
						classId: this.id,
						receipt: receipt
					})
						.then((res) => {
							if (receipt == 1) {
								this.sendFeedBackOk = true;
							} else {
								this.sendFeedBackOk = false;
							}	
						})

				}
			},
			save(event) {
				if (this.hotelName != '') {
					this.disabled = true;
					setDefaultReceiptData({
						classId: this.id,
						hotelName: this.hotelName,
						receiptDesc: this.remark
					})
						.then((res) => {
							toast('success', '设置报班回执成功');
						})
						.always(() => {
							this.disabled = false;
						})

				} else {
					toast('warning', '请先填写入住酒店名称');
					return;
				}
			}
		}
	}
</script>