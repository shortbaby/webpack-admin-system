<template>
	<div :id="id" class="bar-chart"></div>
</template>
<script>
	var echarts = require('echarts/lib/echarts');
	require('echarts/lib/chart/bar');
	require('echarts/lib/component/tooltip');
	require('echarts/lib/component/title');
	require('echarts/lib/component/legend');
	require('echarts/lib/component/toolbox');
	export default {
		props: {
			id: {
				type: String,
				default: 'bar-chart'
			},
			options: {
				type: Object
			}
		},
		data() {
			return {
				chart: null
			}
		},
		watch: {
			options: {
				handler: function(val, oldVal) {
					if (this.chart) {
						this.chart.setOption(options, true)
					}	
				},
				deep: true
			}
		},
		methods: {
			mergeOptions: function (options) {
		      this.chart.setOption(options)
		    },
		    resize: function () {
		      this.chart.resize()
		    },
		    dispatchAction: function (payload) {
		      this.chart.dispatchAction(payload)
		    },
		    showLoading: function () {
		      this.chart.showLoading()
		    },
		    hideLoading: function () {
		      this.chart.hideLoading()
		    },
		    getDataURL: function () {
		      return this.chart.getDataURL()
		    },
		    clear: function () {
		      this.chart.clear()
		    },
		    dispose: function () {
		      this.chart.dispose()
		    }
		},
		mounted() {
			let chart = echarts.init(this.$el);
			chart.setOption(this.options);
			this.chart = chart;
		}
	}
</script>
<style lang="sass">
	.bar-chart {
		width: 600px;
  		height: 400px;
	}
</style>