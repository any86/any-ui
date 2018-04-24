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
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        var geometry = new THREE.BoxGeometry(1, 1, 1);
        var material = new THREE.MeshBasicMaterial({ color: '#ccc' });
        var cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        var light = new THREE.AmbientLight('#ff0000');
        scene.add(light);

        camera.position.z = 5;

        var animate = function() {
            requestAnimationFrame(animate);

            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;

            renderer.render(scene, camera);
        };

        animate();

        // WebFont.load({
        //     custom: {
        //         families: ['Cochin'],
        //         urls: ['./static/fonts.css']
        //     },

        //     fontactive: (familyName, fvd) => {
        //         this.isFontLoaded = true;

        //         this.text = this.randomText();
        //         this.draw(this.text);
        //         this.convert();
        //     }
        // });
    },

    methods: {},

    watch: {}
};
</script>
<style scoped lang="scss">
@import '../scss/variables.scss';
</style>
