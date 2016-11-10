

'use strict';
import Vue from 'vue';

Vue.filter('yen', function (input) {
    if (input || (+input === 0)) {
        return '&yen;' + parseFloat(input).toFixed(2);
    }
    else {
        return '';
    }
})