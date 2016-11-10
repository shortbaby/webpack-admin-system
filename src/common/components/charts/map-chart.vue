<template>
	<div :id="id" class="map-chart"></div>
</template>
<script>
	import {getChinaData} from './request';
	var echarts = require('echarts/lib/echarts');
	require('echarts/lib/chart/map');
	require('echarts/lib/component/tooltip');
	require('echarts/lib/component/title');
	require('echarts/lib/component/legend');
	require('echarts/lib/component/toolbox');
	export default {
		props: {
			id: {
				type: String,
				default: 'map-chart'
			},
			options: {
				type: Object
			}
		},
		data() {
			return {
				loadeMapData: false,
				chart: null
			}
		},
		watch: {
			options: {
				handler: function(val, oldVal) {
					if (this.chart && this.loadeMapData) {
						this.chart.setOption(options, true)
					}	
				},
				deep: true
			}
		},
		methods: {
			getMapData() {
				getChinaData()
					.then((res) => {
						this.loadeMapData = true;
						echarts.registerMap('china', res);
						let chart = echarts.init(this.$el);
						chart.setOption(this.options);
						this.chart = chart;
					})
			},
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
			this.getMapData();	
		}
	}
</script>
<style lang="sass">
	.map-chart {
		width: 800px;
  		height: 600px;
	}
</style>