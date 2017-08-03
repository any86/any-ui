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
            <li v-for="(item, i) in dataSource[activeNavIndex].children" :key="item.title" @click="selectOption(i, item.value)">
                {{item.title}}
            </li>
        </ul>
    </section>
</template>
<script>
export default {
    name: 'FilterLayout',

    props: {
        scrollY: {
            type: Number,
            default: 0
        },

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
                        { type: 'item', title: 'Default', value: 0 },
                        { type: 'item', title: 'Recomond', value: 1 },
                        { type: 'item', title: 'Hight To Low', value: 2 },
                        { type: 'item', title: 'Low To Hight', value: 3 }
                    ]
                },
                { type: 'item', title: 'Best Selling', value: 4 },
                { type: 'item', title: 'Newest', value: 5 }
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
            font-size: $big;
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
            padding: 3*$gutter;
            border-bottom: 1px solid $lightest;
            font-size: $big;
            &.active {
                color: $base;
            }
        }
    }
}
</style>
