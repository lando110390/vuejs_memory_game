<template>
    <button class="btn" @click="_onClick()">{{title}}</button>
</template>

<script>
import {bus} from '../main';

export default {
    name: 'btn',
    props: {
        title: {
            type: String,
            required: true
        }
    },
    methods: {
        _onClick: function() {
            bus.$emit('restartGame');
        }
    }
}
</script>

<style>
h1 {
    text-align: center;
    padding: 10px;
    background: #2570a1;
    color: white;
    margin: 0 8px 39px;
}
</style>