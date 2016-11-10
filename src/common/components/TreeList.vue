<template>
	<div class="tree-list_wrap">
		<div class="tree-node" :class="{expanded: item.expanded}" v-for="item in treeData">
			<div class="tree-node_contend" style="padding-left: 0px" @click="toggleNode(item)">
				<span class="tree-node_expand-icon user-select-none" :class="{ 'expanded': item.expanded, 'is-leaf': !item[props.children] || item[props.children].length == 0}" ></span>
				<el-checkbox class="checkbox" v-model="item.checked" @change="handleCheckChange($event, item)"></el-checkbox>
				<span>{{item[props.label]}}</span>
			</div>
			<div class="tree-node_children" v-if="item[props.children] && item[props.children].length > 0">
				<div class="tree-node" :class="{expanded: child.expanded}" v-for="child in item[props.children]">
					<div class="tree-node_contend" style="padding-left: 16px" @click="toggleNode(child)">
						<span class="tree-node_expand-icon user-select-none" :class="{expanded: child.expanded, 'is-leaf': !child[props.children] || child[props.children].length == 0}"></span>
						<el-checkbox class="checkbox" v-model="child.checked" @change="handleCheckChange($event, child)"></el-checkbox>
						<span>{{child[props.label]}}</span>
					</div>
					<div class="tree-node_children" v-if="child[props.children] && child[props.children].length > 0">
						<div class="tree-node" :class="{expanded: grandchild.expanded}" v-for="grandchild in child[props.children]">
							<div class="tree-node_contend" style="padding-left: 32px" @click="toggleNode(grandchild)">
								<span class="tree-node_expand-icon user-select-none" :class="{expanded: grandchild.expanded, 'is-leaf': !grandchild[props.children] || grandchild[props.children].length == 0}"></span>
								<el-checkbox class="checkbox" v-model="grandchild.checked" @change="handleCheckChange($event, grandchild)"></el-checkbox>
								<span>{{grandchild[props.label]}}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import Vue from 'vue';
	export default {
		props: {
			data: {
				type: Array
			},
			props: {
				type: Object,
				default: function() {
					return {
						label: 'label',
		           		children: 'children'
					}
				}
			},
			selects: {
				type: Array
			}
		},
		data() {
			return {
				treeData: [],
				broadcast: true,
			}
		},
		watch: {
			data(val) {
				Vue.set(this, 'treeData', this.adptaData());
			},
			selects(val) {
				this.selectPermissons();
			}
		},
		created() {
			Vue.set(this, 'treeData', this.adptaData());
		},
		methods: {
			selectPermissons() {
				this.broadcast = false;
				this.treeData.forEach((item) => {
					this.selectItem(item);
				});
				this.broadcast = true;
			},
			selectItem(item) {
				item.checked = false;
				if (this.selects instanceof Array) {
					if (this.selects.indexOf(item.id) > -1) {
						item.checked = true;
					}
					if (item[this.props.children] && item[this.props.children].length > 0) {
						item[this.props.children].forEach((child) => {
							this.selectItem(child);
						})
					}
				}	
			},
			addTreeProperty(item) {
				Vue.set(item, 'checked', false);
				Vue.set(item, 'expanded', false);
				if (item[this.props.children] instanceof Array && item[this.props.children].length > 0) {
					item[this.props.children].forEach((item) => {
						this.addTreeProperty(item);
					})
				}
			},
			checkedItem(item, checked) {
				//item.checked = checked;
				if (item[this.props.children] && item[this.props.children].length > 0 && this.broadcast) {
					item[this.props.children].forEach((child) => {
						this.checkedItem(child, checked);
					})
				}
				this.checkedParentAndGrand(item);
				item.checked = checked;
			},
			checkedParentAndGrand(item) {
				let superId = item.suervisorId;
				let grandpaId = item.grandpaId;
				if (superId) {
					this.manualSelectItem(superId);
				}
				if (grandpaId) {
					this.manualSelectItem(grandpaId);
				}
				
			},
			getItemInArrayById(id, array) {
				let res = null;
				for (let i = 0; i < array.length; i++) {
					let item = array[i];
					if (item.id == id) {
						res = item;
					} else {
						res = this.getItemInArrayById(id, item[this.props.children]);
					}
					if (res) {
						break;
					}
				};
				return res;
			},
			manualSelectItem(id) {
				this.broadcast = false;
				let item = this.getItemInArrayById(id, this.treeData);
				if (item) {
					let res = false;
					if (item[this.props.children] instanceof Array && item[this.props.children].length > 0) {
						for (let n of item[this.props.children]) {
							if (n.checked) {
								res = true;
								break;
							}
						}
						if (res) {
							item.checked = true;
						}
					}
				} 
				this.broadcast = true;
			},
			handleCheckChange(event, item) {
				this.$nextTick(() => {
					this.checkedItem(item, item.checked);
					this.$emit('selectChange', this.treeData);
				})
			},
			toggleNode(item) {
				item.expanded = !item.expanded;
			},
			deepCopy(array) {
			    var out = [],i = 0,len = array.length;
			    for (; i < len; i++) {
			        if (array[i] instanceof Array){
			            out[i] = this.deepcopy(array[i]);
			        } else {
			        	Vue.set(out, i, array[i]);
			        }
			    }
			    return out;
			},
			adptaData() {
				let treeData = this.deepCopy(this.data);
				treeData.forEach((item) => {
					this.addTreeProperty(item);
				});
				return treeData
			}
		}
	}
</script>
<style lang="sass">
	@import '../../resource/css/common/mixin';
	.tree-list_wrap {
		overflow: auto;
	    cursor: default;
	    background: #fff;
	    border: 1px solid #d3dce6;
	}
	.tree-node {
		
		.tree-node_children {
			display: none;	
		}
		&.expanded {
			> .tree-node_children {
				display: block;
			}
		}
	}
	.tree-node_contend {
		@include user-select(none);
		&:hover {
			background: #e5e9f2;
		}
	}
	.tree-node_expand-icon {
		display: inline-block;
    	vertical-align: middle;
    	cursor: pointer;
	    width: 0;
	    height: 0;
	    margin-left: 10px;
	    margin-right: 5px;
	    border: 6px solid transparent;
	    border-right-width: 0;
	    border-left-color: #99a9bf;
	    border-left-width: 7px;
	    -webkit-transform: rotate(0);
	    transform: rotate(0);
	    -webkit-transition: -webkit-transform .3s ease-in-out;
	    transition: -webkit-transform .3s ease-in-out;
	    transition: transform .3s ease-in-out;
	    transition: transform .3s ease-in-out,-webkit-transform .3s ease-in-out;
	    &.expanded {
	    	-webkit-transform: rotate(90deg);
    		transform: rotate(90deg);
	    }
	    &.is-leaf {
	    	border-color: transparent;
    		cursor: default;
	    }
	}
	
</style>