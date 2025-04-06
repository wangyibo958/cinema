<template>
    <div class="layout">
        
        <div class="head">
            <headWeb></headWeb>
        </div>

    
        <div class="main">
            <mainWeb></mainWeb>
        </div>
        
        
    </div>
</template>

<script>
// App.vue
import HeadWeb from '@/commpouet/HeadWeb.vue' // 确保路径完全一致

import mainWeb from './views/mainWeb.vue';

export default {
    name:"layoutWeb",
    components:{
        headWeb,
        mainWeb,
    }
}
</script>

<style>
body{
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    overflow-y: scroll;
    background: #81cde84b;
    
}

</style>