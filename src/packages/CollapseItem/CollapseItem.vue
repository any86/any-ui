<template>
    <div v-bind="$attrs" v-on="$listeners" :is-unfolded="isUnfolded" class="atom-collapse__item">
        <header @click="toggle" :class="{'item__header--line': hasLine}" class="item__header">
            <!-- <span :class="[`header__arrow--${isUnfolded ? 'open' : 'close'}`]" class="header__arrow"></span> -->
            <a-icon 
                value="arrow" 
                size="14" 
                :style="{transform: `rotate(${isUnfolded ? 90 : 0}deg)`}" class="header__arrow"/>
            <!-- 这只有vue2.4以上$attrs默认才是{} -->
            <slot name="title">{{$attrs.title}}</slot>
        </header>
        <div v-show="isUnfolded" :class="{'zoom-enter-active': hasAnimate}" class="item__body">
            <slot></slot>
        </div>

    </div>
</template>
<script>
import { getHeight } from '@/utils/dom';
import AIcon from '@/packages/Icon'
export default {
    name: 'AtomCollapseItem',

    props: {
        isOpen: {
            type: Boolean,
            default: false
        },

        hasLine: {
            type: Boolean,
            default: false
        },

        hasAnimate: {
            type: Boolean,
            default: true
        }
    },

    data() {
        return {
            index: 0,
            isUnfolded: false
        };
    },

    mounted() {
        if (this.$isServer) return;
        this.index = this.$parent.count;
        this.$parent.count++;
        this.$parent.status.push(this.isOpen);
    },

    methods: {
        toggle() {
            this.isUnfolded = !this.isUnfolded;
            if (this.$parent.isAccordion) {
                this.$parent.status = this.$parent.status.map((isOpen, i) => {
                    return this.index == i ? this.isUnfolded : false;
                });
            } else {
                this.$parent.status = this.$parent.status.map((isOpen, i) => {
                    return this.index == i ? this.isUnfolded : isOpen;
                });
            }
            this.$emit('update:isOpen', this.isUnfolded);
            if (this.isUnfolded) {
                this.$emit('change', this.index);
            }
        }
    },

    watch: {
        isOpen: {
            immediate: true,
            handler(value) {
                this.isUnfolded = value;
            }
        },

        ['$parent.status'](value) {
            for (let k in value) {
                if (this.index == k) {
                    this.isUnfolded = value[k];
                    break;
                }
            }
        }
    },

    components: { AIcon }
};
</script>