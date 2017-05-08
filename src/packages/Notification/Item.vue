<template>
    <div v-if="!isClose" class="notification-item">
        <div class="body">
            <v-close @click.native="close" class="close"></v-close>
            <a :class="['title', link && 'link']" v-html="title"></a>
            <p class="content" v-html="content"></p>
        </div>
        <v-progress-line v-if="-1 < this.holdTime" :value="progress" :time="holdTime"></v-progress-line>
    </div>
</template>
<script>
import VClose from '../Static/CloseButton'
import VProgressLine from '../Progress/Line'
export default {
    name: 'notificationItem',

    props: {
        id: {
            type: Number
        },

        link: {
            type: Boolean,
            default: false
        },

        title: {
            type: String,
            default: '通知'
        },

        content: {
            type: [String, Number]
        },

        holdTime: {
            type: Number,
            default: 5000
        },

        type: {
            type: String
        }
    },

    data() {
        return {
            isClose: false,
            progress: 100
        }
    },

    mounted() {
        if (-1 < this.holdTime) {
            setTimeout(() => {
                this.$emit('close', this.id);
            }, this.holdTime);
        }
    },

    methods: {
        close() {
            this.$emit('close', this.id);
        }
    },

    components: {
        VClose,
        VProgressLine
    }

}
</script>
<style scoped lang="scss">
.notification-item {
    overflow: hidden;
    transition: all .5s;
    width: 320px;
    margin: 15px 0;
    border-radius: 4px;
    background: #fff;
    box-shadow: 1px 2px 3px rgba(#000, .1), -1px -2px 3px rgba(#aaa, .1);
    .body {
        padding: 15px;
        position: relative;
        .close {
            position: absolute;
            top: 15px;
            right: 15px;
        }
        .title {
            font-size: 14px;
            color: #222;
            text-decoration: none;
        }
        .countdown {
            color: #ccc;
            font-size: 14px;
        }
        .link {
            &:hover {
                text-decoration: underline;
                cursor: pointer;
            }
        }
        .content {
            font-size: 12px;
            color: #666;
            line-height: 1.5;
            letter-spacing: 1px;
            padding: 0;
            margin: 5px 0;
        }
    }
}
</style>
