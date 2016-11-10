<template>
	<div class="student-room-wrapper">
		<mt-header title="订房">
		  <router-link to="/receipt" slot="left">
		    <mt-button icon="back"></mt-button>
		  </router-link>
		</mt-header>
		<div>
			<div class="info">
				<p>
					<label>上课地点:</label>
					<span>{{hotelName}}</span>
				</p>
				<p>
					{{receiptDesc}}
				</p>
			</div>
			<div class="radios-wrap">
				<mt-radio
				  title="请选择其中一项"
				  v-model="value"
				  :options="options">
				</mt-radio>
			</div>
		</div>		
		<copyright></copyright>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				value: '',
				options: [
					{
						label: '是，1间双人标准间',
						value: '1'
					},
					{
						label: '是，1间单人大床房',
						value: '2'
					},
					{
						label: '是，拼房（双人标准间中其中一间，拼房视情况而定，成功则只需要付一半房费，不成功则需要承担全部费用）',
						value: '3'
					},
					{
						label: '否，我自己安排住宿',
						value: '4'
					}
				]
			}
		},
		watch: {
			value(val) {
				this.$store.dispatch('setHotelType', parseInt(val));
			}
		},
		computed: {
			hotelName() {
				return this.$store.state.hotelName;
			},
			receiptDesc() {
				return this.$store.state.receiptDesc;
			}
		},
		methods: {
		}
	}
</script>
