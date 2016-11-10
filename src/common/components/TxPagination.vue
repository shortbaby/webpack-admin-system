<template>
	<el-pagination v-show="visiable"
      @sizechange="handleSizeChange"
      @currentchange="handleCurrentChange"
      :current-page="pageDto.pageNum"
      :page-size="pageDto.pageSize"
      layout="prev, pager, next, jumper"
      :total="pageDto.count">
    </el-pagination>
</template>
<script>
	function getTotalPages(pageSize, count) {
        var totalPages = pageSize < 1 ? 1 : Math.ceil(count / pageSize);
        return Math.max(totalPages || 0, 1);
    }
	export default {
		props: {
			pageDto: {
				type: Object,
				default: function() {
					return {
						"count": 0,
	                    "curPageCount": 1,
	                    "pageNum": 0,
	                    "pageSize": 20,
	                    "totalPageNum": 1
					}
				}
			}
		},
		computed: {
			visiable() {
				return getTotalPages(this.pageDto.pageSize, this.pageDto.count) > 1;
			}
		},
		methods: {
			handleSizeChange(val) {
				this.$emit('sizechange', val);
			},
			handleCurrentChange(val) {
				this.$emit('currentchange', val);
			}
		}
	}
</script>