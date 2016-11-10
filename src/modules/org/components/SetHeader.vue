<template>
	<el-dialog title="设置" v-model="visible" class="setheader-dialog">
  		<div class="modal-body set-header-dialog">
			<div class="clearfix">
				<div class="hide-fields fields-list">
					<h3>隐藏字段</h3>
					<ul>
						<li v-for="item in hiddenFields" @click="select($event, item)" :class="{active: item.$selected, lock: item.lock}" transition="item">{{ item.showName }}</li>
						<p v-if="!hiddenFields.length">没有隐藏字段</p>
					</ul>
				</div>
				<div class="opt-move">
					<span class="iconfont icon-arrowleft" :class="{light: hasShowFieldsSelected}" title="移动到隐藏字段" @click="moveToHide"></span>
					<span class="iconfont icon-arrowright" :class="{light: hasHiddenFieldsSelected}" title="移动到显示字段" @click="moveToShow"></span>
				</div>
				<div class="show-fields fields-list">
					<h3>显示字段</h3>
					<ul>
						<li v-for="item in showFields" @click="select($event, item)" :class="{active: item.$selected, lock: item.lock}" transition="item">{{ item.showName }}</li>
						<p v-if="!showFields.length">没有显示字段</p>
					</ul>
				</div>
				<div class="opt-sort">
					<span :class="{light: canMoveUp}" @click="moveUp" title="向上移动"><span class="iconfont icon-arrowtop"></span></span>
					<span :class="{light: canMoveDown}" @click="moveDown" title="向下移动"><span class="iconfont icon-arrowdown"></span></span>
				</div>
			</div>			
		</div>
  		<span slot="footer" class="dialog-footer">
    		<el-button @click.native="visible = false">取 消</el-button>
    		<el-button type="primary" @click.native.prevent="save($event)">确 定</el-button>
  		</span>
	</el-dialog>
</template>

<script>
	import { getHeaderConfig, setHeaderConfig}  from '../request';
	import Vue from 'vue';
	import $ from 'jquery';
	export default {
		props: {
			type: Number,
			default: 0
		},
		data () {
			return {
				visible: true,
				fields: [],
				refresh: false
			}
		},
		watch: {
			visible(val) {
				if (!val) {
					//this.$store.dispatch('hideSetHeader');
					this.$emit('hide', this.refresh);
				}
			}
		},
		computed: {
			canMoveUp () {
				var result = false;
				var index = -1;
				var showFields = this.showFields;
				var length = showFields.length;

				while (length --) {
					if (showFields[length].$selected) {
						index = length;
						break;
					}
				}

				if (index == -1 || !index) {
					return false;
				}

				for (var i = index -1; i >= 0; i--) {
					var item = showFields[i];
					if (!item.hidden && !item.lock) {
						result = true;
						break;
					}
				}
				return result;
			},
			canMoveDown () {			
				var result = false;
				var index = -1;
				var showFields = this.showFields;
				var length = showFields.length;

				while (length --) {
					if (showFields[length].$selected) {
						index = length;
						break;
					}
				}
				
				return index >= 0 && index < showFields.length -1;
			},
			hiddenFields () {
				var result = [];
				this.fields.forEach(function (item) {
					if (!item.$using && !item.hidden) {
						result.push(item);
					}
				});
				return result;
			},
			hasHiddenFieldsSelected () {
				return this.hiddenFields.some(function (item) {
					return item.$selected;
				});
			},
			hasShowFieldsSelected () {
				return this.showFields.some(function (item) {
					return item.$selected;
				});
			},
			showFields () {
				var result = [];

				this.fields.forEach(function (item) {
					if (item.$using && !item.hidden) {
						result.push(item);
					}
				});
				return result;
			}
		},
		methods: {
			select (event, item) {
				// 锁定的不能操作 
				if (item.lock) {
					return;
				}
				this.fields.forEach(function (item) {
					Vue.set(item, '$selected', false);
				});
				Vue.set(item, '$selected', true);
			},
			moveToShow () {
				if (!this.hasHiddenFieldsSelected) {
					return;
				}
				this.hiddenFields.forEach(function (item) {
					if (item.$selected) {
						Vue.set(item, '$selected', false);
						Vue.set(item, '$using', true);
					}	
				});
			},
			moveToHide () {
				if (!this.hasShowFieldsSelected) {
					return;
				}

				this.showFields.forEach(function (item) {
					if (item.$selected) {
						Vue.set(item, '$selected', false);
						Vue.set(item, '$using', false);
					}	
				});
			},
			moveUp () {
				if (!this.canMoveUp) {
					return;
				}
				var index = -1;
				var selectedItem = null;
				var fields = this.fields;
				var preIndex = -1;
				var length = fields.length;

				while (length --) {
					if (fields[length].$selected) {
						index = length;
						selectedItem = fields[length];
						break;
					}
				}

				// 找上一个显示的字段
				for (var i = index - 1; i >= 0; i--) {
					if (fields[i].$using) {
						preIndex = i;
						break;
					}
				}
				fields[index] = fields.splice(preIndex, 1, selectedItem)[0];
			},

			moveDown () {
				if (!this.canMoveDown) {
					return;
				}
				var index = -1;
				var selectedItem = null;
				var fields = this.fields;
				var nextIndex = -1;
				var length = fields.length;

				while (length --) {
					if (fields[length].$selected) {
						index = length;
						selectedItem = fields[length];
						break;
					}
				}

				length = fields.length;

				// 找下一个显示的字段
				for (var i = index + 1; i < length; i++) {
					if (fields[i].$using) {
						nextIndex = i;
						break;
					}
				}

				fields[index] = fields.splice(nextIndex, 1, selectedItem)[0];
			},
			save (event) {
				var btn = $(event.target);
				btn.prop('disabled', true);
				var self = this;
				var content = [];

				this.fields.forEach(function (item) {
					if (item.$using) {
						content.push({
							name: item.name,
							showName: item.showName,
							type: item.type,
							lock: item.lock,
							hidden: item.hidden,
							defaultProp: item.defaultProp,
							queryProp: item.queryProp,
							sort: item.sort
						});
					}
				});

				setHeaderConfig({
					type: this.type,
					fields: JSON.stringify(content)
				})
					.then((res) => {
						this.refresh = true;
						this.visible = false;
					})
					.always(function () {
						btn.prop('disabled', false);
					});
			}
		},
		created () {
			var self = this;
			getHeaderConfig({
				type: this.type
			})
				.then(function (res) {

					var data = res.data;
					var using = data.using;
					var all = data.all;
					var hiding = [];

					all.forEach(function (item) {
						if (!using.some(function (i) { return i.name == item.name; })) {
							item.$using = false;
							hiding.push(item);
						}
					});

					var fields = using.concat(hiding);

					fields.forEach(function (item) {
						item.$selected = false;
						if (typeof item.$using == 'undefined') {
							item.$using = true;
						}
					});
					self.fields = fields;
				});
		}
	};
</script>
<style lang="sass">
	.setheader-dialog {
		.el-dialog {
			width: 737px;
		}	
	}

</style>