<template>
    <!-- poster="//vjs.zencdn.net/v/oceans.png" -->
    <video ref="player" id="player" class="video-js vjs-fluid vjs-big-play-centered" controls preload="auto" width="100%">
        <source src="//vjs.zencdn.net/v/oceans.mp4" type="video/mp4" />
        <source src="//vjs.zencdn.net/v/oceans.webm" type="video/webm" />
        <source src="//vjs.zencdn.net/v/oceans.ogv" type="video/ogg" />
    </video>
</template>

<script>
// import videojs from 'video.js';
// require('video.js/dist/video-js.min.css');
export default {
    name: 'AtomVideo',

    data() {
        return { player: null };
    },

    mounted() {
        this.player = videojs(this.$refs.player, {
            controls: true,
            autoplay: false,
            preload: 'auto'
        });
        // this.player.enterFullScreen();
    },

    destroyed() {}
};
</script>
<style lang="scss">
@import '../../scss/variables.scss';
.video-js {
    width: 100%;
    min-height: 240px;
}
</style>
