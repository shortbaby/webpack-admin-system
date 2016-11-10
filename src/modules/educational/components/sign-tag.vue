<template>
	<div class="sign-tag-div">
		<span class="sign-tag" @click="signAttend" :class="{unchecked: tag == 2, active: tag == 1}">
			到课<i class="iconfont icon-xuanze"></i>
		</span>
		<span class="sign-tag" @click="signAbsence" :class="{unchecked: tag == 1, active: tag == 2}">
			未到课<i class="iconfont icon-times"></i>
		</span>
	</div>
</template>
<script>
	export default {
		props: {
			value: {
				type: Number
			},
			id: {
				type: Number
			},
			disabled: Boolean
		},
		data() {
			return {
				tag: 0
			}
		},
		created() {
			if (this.value) {
				this.tag = this.value;
			}
		},
		watch: {
			value(val) {
				this.tag = this.value;
			}
		},
		methods: {
			signAttend() {
				if (this.disabled) {
					return;
				}
				if (this.tag == 1) {
					this.tag = 0;
				} else {
					this.tag = 1;	
				}
				this.$emit('sign', this.tag, this.id)
			},
			signAbsence() {
				if (this.disabled) {
					return;
				}
				if (this.tag == 2) {
					this.tag = 0;
				} else {
					this.tag = 2;
				}
				this.$emit('sign', this.tag, this.id)
			}
		}
	}
</script>