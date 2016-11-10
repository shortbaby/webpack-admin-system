<template>
	<div id="tx-nav-bar" :class="{'bottom': position == 'bottom', 'top': position == 'top'}">
		<div v-for="(item, index) in options" class="tx-nav-bar_item" @click.stop="click(item, index)" 
			:class="{'actived': selectIndex == index}">
			{{item.label}}
		</div>
	</div>
</template>
<script>
	export default {
		props: {
			position: {
				type: String,
				default: 'bottom'
			},
			options: {
				type: Array
			}
		},
		data() {
			return {
				selectIndex: 0
			}
		},	
		methods: {
			click(item, index) {
				this.selectIndex = index;
				if (item.emitHandler) {
					this.$emit(item.emitHandler);
				}
			}
		}
	}
</script>
<style lang="sass">
	#tx-nav-bar {
		z-index: 2;
		width: 100%;
		position: fixed;
		background: #FFFFFF;
		box-shadow: 0px 2px 7px 0px rgba(0,0,0,0.20);
		display: flex;
		&.top {
			top: 0
		}
		&.bottom {
			bottom: 0;
		}
		> div {
			font-size: 1.5rem;
			text-align: center;
			flex: 1;
			background: #fff;
			color: #ec960c;
			padding: 1.5rem 0;
			&.actived {
				background: #ffbd47;
				color: #fff;
			}
		}
	}
</style>