<template>
	<div class="switch" :class="{'checked': value}" @click.stop="change">
		<span class="switch-tag"></span>
	</div>
</template>
<script>
	export default {
		props: {
			data: {
				type: Object
			},
			checked: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				value: false
			}
		},
		created() {
			this.value = this.checked;
		},
		watch: {
			checked(val) {
				this.value = val;
			}
		},
		methods: {
			change() {
				this.value = !this.value;
				this.$emit('change', this.data, this.value);
			}
		}
	}
</script>
<style lang="sass">
	.switch {
		position: relative;
		width: 48px;
	    height: 25px;
	    outline: 0;
	    border-radius: 20px;
	    background-color: #dfdfdf;
	    box-sizing: border-box;
	    &.checked {
	    	background: #FFBD47;
	    	.switch-tag {
	    		left: 23px;
    			top: 1px;
	    	}
	    }
	    .switch-tag {
	    	display: inline-block;
		    position: absolute;
		    left: 0;
		    top: 1px;
		    height: 21px;
		    width: 22px;
		    border-radius: 11px;
		    background-color: #fff;
		    border: 1px solid #fff;
		    transition: .3s ease-in-out;
		    margin: 0;
	    }

	}
</style>