<!--
    @file 中国地址选择器
    @author XiaoBin Li(lixiaobin@baijiahulian.com)
-->

<template>
    <div class="region-picker">
        <div class="province">
            <el-select v-model="regionData.province" placeholder="省份" @change="changeProvince">
                <el-option v-for="province in provinces" :key="province" :value="province"></el-option>
            </el-select>
        </div>
        <div class="city">
            <el-select v-model="regionData.city" placeholder="城市" @change="changeCity">
                <el-option v-for="city in cities" :key="city" :value="city"></el-option>
            </el-select>
        </div>
        <div class="district" v-if="mode=='district'">
            <el-select v-model="regionData.district" placeholder="区县" @change="changeDistrict">
                <el-option v-for="district in districts" :key="district" :value="district"></el-option>
            </el-select>
        </div>
    </div>
</template>

<script>

import {getArea} from './request';
import Vue from 'vue';
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
        }
    },
    data () {
        return  {
            cityData: null,
            province: '',
            city: '',
            provinces: [],
            cities: [],
            districts: [],
            regionData: {
                province: '',
                city: '',
                district: '',
                areaId: '',
                areaLevel: ''
            }
        }
    },
    created () {
        if (this.cityData) {
            this.provinces = convertToArray(this.cityData);
            if (this.province) {
                this.selectProvince(this.province);
            }
            if (this.city) {
                this.selectCity(this.city);
            }
        } else {
            getArea ()
                .then((res) => {
                    this.cityData = window.area = res;
                    this.provinces = convertToArray(res);
                    if (this.province) {
                        this.selectProvince(this.province);
                    }
                    if (this.city) {
                        this.selectCity(this.city);
                    }
                });
        }
    },
    methods: {
        setProvinceAndCity(data) {
            if (data.province) {
                this.province = data.province;
            }  
            if (data.city) {
                this.city = data.city;
            }
            if (this.cityData) {
                this.selectProvince(this.province);
                this.selectCity(this.city);
            }
        },
        selectProvince(val) {
            this.cities = convertToArray(this.cityData[val]);
            if (this.cities.indexOf(this.regionData.city) == -1) {
                this.regionData.city = '';
            }
            this.regionData.province = val;               
            this.regionData.areaId = this.cityData[val]['id'];
            this.regionData.areaLevel = 'province';
            this.districts = [];
            this.regionData.district = '';
        },
        selectCity(val) {
            this.regionData.areaId = this.cityData[this.regionData.province][val]['id'];
            this.regionData.areaLevel = 'city';
            this.regionData.city = val;
            if (this.mode === 'district') {
                this.districts = convertToArray(this.cityData[this.regionData.province][val]);
            }
        },
        changeProvince(newValue, oldValue) {
            if (newValue) {
                this.cities = convertToArray(this.cityData[newValue]);
                if (this.cities.indexOf(this.regionData.city) == -1) {
                    this.regionData.city = '';
                }                
                this.regionData.areaId = this.cityData[newValue]['id'];
                this.regionData.areaLevel = 'province';
                this.districts = [];
                this.regionData.district = '';
            } else {
                this.cities = [];
                this.districts = [];
            }
            this.$emit('selectcity', this.regionData);
        },
        changeCity (newValue, oldValue) {
            if (newValue) {
                this.regionData.areaId = this.cityData[this.regionData.province][newValue]['id'];
                this.regionData.areaLevel = 'city';
                this.regionData.city = newValue;
                if (this.mode === 'district') {
                    this.districts = convertToArray(this.cityData[this.regionData.province][newValue]);
                }
            }
            this.$emit('selectcity', this.regionData);
        },
        changeDistrict (newValue, oldValue) {
            if (newValue) {
                this.regionData.areaId = this.cityData[this.regionData.province][this.regionData.city][newValue]['id'];
                this.regionData.district = newValue;
            }
            this.$emit('selectcity', this.regionData);
        }
    }
}
</script>