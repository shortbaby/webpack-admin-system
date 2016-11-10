<!--
    @file 中国地址选择器
    @author XiaoBin Li(lixiaobin@baijiahulian.com)
-->

<template>
    <div class="region-picker" v-clickoutside="handleClose">
        <el-input placeholder="请选择城市" 
            :icon="iconClass"
            :readonly="disabled"
            @click.native="toggleMenu"
            v-model="currentValue">
        </el-input>
        <transition name="md-fade-bottom">
            <div class="dropdown_content clearfix" v-show="visiable" :style="styleObj">
                <div class="dropdown-div_left">
                    <ul class="provinces-list">
                        <li v-for="province in provinces" 
                            class="list-li"
                            :class="{active: regionData.province === province}"
                            @click="selectProvince(province)">
                            <span class="list-span">{{province}}</span>
                        </li>
                    </ul>
                </div>
                <div class="dropdown-div_middle">
                    <ul class="cities-list">
                        <li v-for="city in cities" 
                            class="list-li" 
                            :class="{active: regionData.city === city}"
                            @click="selectCity(city)">
                            <span class="list-span">{{city}}</span>
                        </li>
                       <!--  <el-option v-for="city in cities" :key="city" :value="city"></el-option> -->
                    </ul>
                </div>
                <div class="dropdown-div_right" v-if="mode=='district'">
                    <ul class="districts-list">
                        <li v-for="district in districts" 
                            class="list-li"
                            :class="{active: regionData.district === district}" 
                            @click="selectDistrict(district)">
                            <span class="list-span">{{district}}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>

import Vue from 'vue';
import {getArea} from './request';
function convertToArray (obj) {
    var result = [];
    for (var key in obj) {
        if ( key !== 'id') {
            result.push(key);
        }
    }
    return result;
}

export default {
    props: {
        mode: {
            type: String,
            default: 'district'
        },
        data: {
            type: Object,
            default: null
        },
        city: {
            type: Object
        },
        all: {
            type: Boolean
        },
        labeled: {
            type: Boolean
        }
    },
    data () {
        return  {
            width: 0,
            visiable: false,
            provinces: [],
            cities: [],
            districts: [],
            value: '',
            disabled: true,
            regionData: {
                province: '',
                city: '',
                district: '',
                areaId: '',
                areaLevel: ''
            }
        }
    },
    watch: {
        data(val) {
            if (val) {
                this.cityData = val;
                this.provinces = convertToArray(this.cityData);
            }      
        },
        city(val) {
            //console.log(val);
            this.regionData.province = val.province;
            this.regionData.city = val.city;
        }
    },
    computed: {
        styleObj() {
            if (this.labeled) {
                return {
                    top: 75 + 'px',
                    width: this.width + 'px'
                }
            } else {
                return {
                    width: this.width + 'px'
                }
            }        
        },
        iconClass() {
            return this.visiable ? 'caret-top' : 'caret-bottom';
        },
        currentValue() {
            if (this.regionData.province.length === 0) {
                return '';
            }
            return this.mode == 'district' 
                ? `${this.regionData.province}/${this.regionData.city}/${this.regionData.district}`
                : `${this.regionData.province}/${this.regionData.city}`;
        }
    },
    created () {
        this.width = this.mode == 'district' ? 305 : 203;
        if (this.all) {
            getArea ()
                .then( (res) => {
                    this.cityData = window.area = res;
                    this.provinces = convertToArray(res);
                    //this.provinces.unshift('不限');
                });
        } else {
            this.cityData = this.data;
            this.provinces = convertToArray(this.cityData);
        }
    },

    methods: {
        toggleMenu() {
            // debugger;
            this.visiable = true;
        },
        handleClose() {
            this.visiable = false;
        },
       
        setBlankRegionData() {
            this.regionData = {
                province: '',
                city: '',
                district: '',
                areaId: '',
                areaLevel: ''
            }
        },
        selectProvince(val) {
            if (val == '不限') {
                this.setBlankRegionData();
                this.$emit('selectcity', this.regionData);
                this.handleClose();
            } else {
                this.regionData.province = val;
                this.changeProvince(val);
                //this.$emit('selectcity', this.regionData);
            }
        },
        selectCity(val) {
            if (val == "不限") {
                this.regionData.city = '';
                this.regionData.areaId = '';
                this.regionData.areaLevel = 'city';
                this.regionData.district = '';
                this.$emit('selectcity', this.regionData);
                this.handleClose();
            } else {
                this.regionData.city = val;
                this.changeCity(val);
                if (this.mode == 'city') {
                    this.handleClose();
                    this.$emit('selectcity', this.regionData);
                }
            }
        },
        selectDistrict(val) {
            this.regionData.district = val;
            this.changeDistrict(val);
            this.handleClose();
            this.$emit('selectcity', this.regionData);
        },
        changeProvince(newValue, oldValue) {
            if (newValue) {
                this.cities = convertToArray(this.cityData[newValue]);
                this.regionData.city = '';
                this.regionData.areaId = this.cityData[newValue]['id'];
                this.regionData.areaLevel = 'province';
                this.districts = [];
                this.regionData.district = '';
            } else {
                this.cities = [];
                this.districts = [];
            }
        },
        changeCity (newValue, oldValue) {
            if (newValue) {
                if (this.mode == 'district') {
                    this.districts = convertToArray(this.cityData[this.regionData.province][newValue]);
                }
                this.regionData.areaId = this.cityData[this.regionData.province][newValue]['id'];
                this.regionData.areaLevel = 'city';
                this.regionData.city = newValue;
            }
        },
        changeDistrict (newValue, oldValue) {
            if (newValue) {
                this.regionData.areaId = this.cityData[this.regionData.province][this.regionData.city][newValue]['id'];
                this.regionData.district = newValue;
            }
        }
    }
}
</script>
<style lang="sass">

</style>