<template>
    <main></main>
</template>
<script>
import axios from 'axios';
import WebFont from 'webfontloader';
// import { Scene, WebGLRenderer, PerspectiveCamera, BoxGeometry, MeshBasicMaterial, Mesh } from 'three';
import * as THREE from 'three';

// three
export default {
    name: 'ThreeDemo',

    data() {
        return {};
    },

    async mounted() {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();

        renderer.setClearColor(0xeeeeee);
        renderer.setSize(window.innerWidth, window.innerHeight);
        
        document.body.appendChild(renderer.domElement);
    },

    methods: {},

    watch: {}
};
</script>
<style scoped lang="scss">
@import '../scss/variables.scss';
</style>
