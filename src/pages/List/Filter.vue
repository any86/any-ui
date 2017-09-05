<template>
    <section class="filter">
        <ul class="menu">
            <template v-for="(item, i) in dataSource">
                <li v-if="'list' == item.type" :key="i" @click="openMenu(i)" :class="{active: i == activeNavIndex}">
                    {{item.children[activeOptionIndex].title}}
                    <Icon :class="{rotate: i == activeNavIndex}" value="chevron-up" class="icon"></Icon>
                </li>
                <li v-else :key="i" @click="selectNavOption(i, item.value)" :class="{active: i == activeNavIndex}">
                    {{item.title}}
                </li>
            </template>
        </ul>
        <!-- 菜单选项 -->
        <ul v-if="'list' == dataSource[activeNavIndex].type && isOpenNavIndex == activeNavIndex && isOpen" class="dropdown">
            <li v-for="(item, i) in dataSource[activeNavIndex].children" :key="item.title" @click="selectOption(i, item.value)" :class="{active: activeOptionIndex == i}" >
                {{item.title}}
            </li>
        </ul>
    </section>
</template>
<script>
export default {
    name: 'FilterLayout',

    props: {
        isOpen: {
            type: Boolean,
            default: false
        },
    },

    data() {
        return {
            dataSource: [
                {
                    type: 'list',
                    children: [
                        { type: 'item', title: this.$lang.LIST_FILTER_DEFAULT, value: 0 },
                        { type: 'item', title: this.$lang.LIST_FILTER_RECOMOND, value: 1 },
                        { type: 'item', title: this.$lang.LIST_FILTER_HIGH_TO_LOW, value: 2 },
                        { type: 'item', title: this.$lang.LIST_FILTER_LOW_TO_HIGH, value: 3 }
                    ]
                },
                { type: 'item', title: this.$lang.LIST_FILTER_BSET_SELLING, value: 4 },
                { type: 'item', title: this.$lang.LIST_FILTER_NEWSET, value: 5 }
            ],
            isOpenNavIndex: -1, // 被展开的导航索引
            activeNavIndex: 0,
            activeOptionIndex: 0,
        };
    },

    methods: {
        /**
         * 切换导航
         */
        openMenu(navIndex) {
            this.isOpenNavIndex = navIndex;
            this.activeNavIndex = navIndex;
            this.$emit('open');
        },

        selectNavOption(navIndex, value) {
            this.activeNavIndex = navIndex;
            this.activeOptionIndex = 0;
            this.$emit('select', value);
        },

        selectOption(optionIndex, value) {
            this.isOpenNavIndex = -1;
            this.activeOptionIndex = optionIndex;
            this.dataSource[this.activeNavIndex].isOpen = false;
            this.$emit('select', value);
        }
    },
}

</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
$height:1rem;
.filter {
    background: $background;
    width: 100%;

    ul.menu {
        height: $height;
        display: flex;
        li {
            flex: 1;
            height: $height;
            width: 100%;
            line-height: $height;
            display: block;
            text-align: center;
            border-color: $lightest;
            border-style: solid;
            border-width: 1px 0 1px 0;
            &:last-child {
                border-right-width: 0;
            }

            >.icon {
                transition: all .6s;
                &.rotate {
                    transform: rotate(180deg);
                }
            }

            &.active {
                color: $base;
            }
        }
    } // 下拉菜单
    ul.dropdown {
        background: $background;
        position: relative;
        z-index: 10;
        li {
            padding: $gutter;
            border-bottom: 1px solid $lightest;
            &.active {
                color: $base;
            }
        }
    }
}
</style>
