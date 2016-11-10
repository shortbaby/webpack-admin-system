<template>
	<div class="student-flight-wrapper">
		<mt-header title="航班或车次">
		  <router-link to="/receipt" slot="left">
		    <mt-button icon="back"></mt-button>
		  </router-link>
		</mt-header>
		<div>
			<div class="input-field">
				<input type="text" v-model="value" placeholder="请输入航班或车次"/>
			</div>
			<div class="button-control">
				<mt-button type="default" @click.native="save">保存</mt-button>
			</div>
		</div>
		<copyright></copyright>
	</div>
</template>
<script>
	export default {
		computed: {
			arriveNum() {
				return this.$store.state.arriveNum;
			},
			leaveNum() {
				return this.$store.state.leaveNum;
			},
			flightType() {
				return this.$store.state.flightType;
			},
			id() {
				return this.$store.state.studentId;
			},
			classId() {
				return this.$store.state.classId;
			}
		},
		data() {
			return {
				value: ''
			}
		},
		created() {
			if (this.flightType == 1) {
				this.value = this.arriveNum;
			}
			if (this.flightType == 2) {
				this.value = this.leaveNum;
			}
		},
		methods: {
			save() {
				if (this.flightType == 1) {
					this.$store.dispatch('setArriveNum', this.value);
				}
				if (this.flightType == 2) {
					this.$store.dispatch('setLeaveNum', this.value);
				}
				this.$router.back();
			}
		}
	}
</script>