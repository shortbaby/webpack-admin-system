<!--
	@file 设置时间
	@author xuguanlong
-->
<template>
	<div class="time-picker-wrap" v-clickoutside="handleClose">
        <el-input
          :placeholder="placeholder"
          icon="time"
          :readonly="true"
          @click.native="toggleMenu"
          v-model="time">
        </el-input>
        <transition name="md-fade-bottom">
            <div class="dropdown_content clearfix" v-show="visiable">
                <div class="dropdown_content-top">
                    <input class="dropdown_content-input" type="text" :class="{'error': error}" autocomplete="off" v-model="query"
                        @input="update"  @keydown.up="up" @keydown.down="down" @click.stop=""
                        @keydown.enter= "hit" @keydown.esc="reset" maxlength="5"/>
                    <span @click.stop="addTime()" class="spn">确定</span>
                </div>
                <ul class="dropdown-list" ref="dropdown_list">
                    <li ref="dropdown_item" v-for="(item, index) in list" :class="{'active': isActive(index)}" @mousedown.prevent="hit" @mousemove="setActive(index)">  
                        {{item}}
                    </li>
                </ul>
            </div>
        </transition>        
    </div>
</template>
<script>
    const TIME_PATTEN = /^(?:\d{1}|[01]\d|2[0-3])(?::[0-5]\d)$/;
    const TIME_LIST = ['05:00', '05:30', '06:00', '06:30' ,'07:00', '07:30', '08:00', '08:30', '09:00', '09:30', 
        '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', 
        '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', 
        '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', 
        '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30'];
    export default {
        name: 'time-picker',
        props: {
            placeholder: {
                type: String,
                default: '请选择时间'
            },
            value: {
                type: String
            }
        },
        created() {
            if (this.value) {
                this.time = this.value;
            }
        },
    	data () {
    		return {
                time: '',
                query: '',
                current: 0,
                error: false,
                visiable: false,
    			list: TIME_LIST
    		}
    	},
        watch: {
            value(val) {
                this.time = val;
            }
        },
    	methods: {
            handleClose() {
                this.visiable = false;
            },
            toggleMenu() {
                this.visiable = true;
            },
            addTime() {
                if (TIME_PATTEN.test(this.query)) {
                    let hour = parseInt(this.query.split(':')[0]);
                    if (hour > 4 && hour < 24) {
                        this.error = false;
                        this.time = this.query;
                        if (this.time.length === 4) {
                            this.time = '0' + this.time;
                        }
                        this.$emit('setTime', this.time);
                        this.visiable = false;
                    } else {
                        this.error = true;
                    }
                } else {
                    this.error = true;
                }
            },
    		update() {
                if (!this.query) {
                    this.list = TIME_LIST;
                } else {
                    this.list = TIME_LIST.filter((value) => {
                        if (value.indexOf(this.query) > -1) {
                            return true;
                        } else {
                            return false;
                        }
                    }) 
                }
            },
            reset() {
                this.list = TIME_LIST;
                this.query = '';
            },
            setActive(index) {
                this.current = index;
            },
            isActive(index) {
                return this.current === index;
            },
            hit(e) {
                e.preventDefault();
                e.stopPropagation();
                var result = this.list[this.current];
                this.query = result;
                this.addTime();
            },
            up() {
                if (this.current > 0) {
                    this.current--;
                    var result = this.list[this.current];
                    this.query = result;
                    this.$refs.dropdown_list.scrollTop -= this.$refs.dropdown_item[0].offsetHeight;
                }
            },
            down() {
               
                if (this.current < this.list.length - 1) {
                    this.current++;
                    var result = this.list[this.current];
                    this.query = result;
                    this.$refs.dropdown_list.scrollTop += this.$refs.dropdown_item[0].offsetHeight;
                }
            },
            filters: {
                highlight(value, phrase) {
                   // console.log(value);
                    return value.replace(new RegExp('(' + phrase + ')', 'gi'), '<strong>$1</strong>')
                }
            }
    	}
    }
</script>

<style lang="sass">
</style>