<template>
    <transition-group class="component-notification" name="list" tag="div">
        <notification-item v-for="(item, i) in list" :key="item.id" :holdTime="item.holdTime" :content="item.content" :id="item.id" :title="item.title" :type="item.type" @close="removeItem">
        </notification-item>
    </transition-group>
</template>
<script>
import notificationItem from './Item';
export default {
    name: 'Notification',

    props: {
        value: {
            type: Boolean
        }
    },

    data() {
        return {
            list: []
        };
    },

    methods: {
        removeItem(id) {
            this.list = this.list.filter(item => {
                return id == item.id ? false : true;
            });
        }
    },

    components: {
        notificationItem
    }
}
</script>
<style scoped lang="scss">
.component-notification {
    position: fixed;
    z-index: 1989;
    top: 15px;
    right: 15px;
    width: 320px;
}

// 动画
.list-enter {
    opacity: 0;
    transform: translateX(100px);
}

.list-leave-active {
    opacity: 0;
    transform: translateY(-30px);
    position: absolute;
}
</style>
