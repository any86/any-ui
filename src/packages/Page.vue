<template>
    <nav>
        <ul class="pagination">
            <li :class="{disabled: value <= 1}"><a @click="previous"><i class="glyphicon glyphicon-arrow-left"></i> 上一页</a></li>
            <li :class="{active: i == value}" v-for="i in pageNumber">
                <a @click="pageTo(i)">{{i}}</a>
            </li>
            <li :class="{disabled: value >= count}"><a @click="next">下一页<i class="glyphicon glyphicon-arrow-right"></i></a></li>
        </ul>
    </nav>
</template>
<script>
export default {
    props: {
        disabled: {
            type: Boolean,
            default: false
        },

        value: {
            type: [Number, String]
        },

        count: {
            type: Number
        },

        limit: {
            type: Number
        }
    },

    computed: {
        pageNumber() {
            var array = [];
            // 总数是否超过max
            if (10 < this.count) {
                if (4 >= this.value) {
                    for (var i = 1; i <= 10; i++) {
                        array.push(i);
                    }
                } else if (this.count < this.value + 5) {
                    for (var i = this.count - 10; i <= this.count; i++) {
                        array.push(i);
                    }
                } else {
                    for (var i = this.value - 4; i <= this.value + 5; i++) {
                        array.push(i);
                    }
                }
            } else {
                for (var i = 1; i <= this.count; i++) {
                    array.push(i);
                }
            }
            return array;
        }
    },

    methods: {
        pageTo: function(page) {
            if(!this.disabled) {
                this.$emit('input', page);
            }
        },

        previous: function() {
            if(!this.disabled) {
                if (1 < this.value) {
                    this.$emit('input', this.value - 1);
                }
            }
        },

        next: function() {
            if(!this.disabled) {
                if (this.value < this.count) {
                    this.$emit('input', this.value + 1);
                }                
            }
        },
    }
};
</script>
<style scoped lang=scss>
.pagination {
    margin: 0;
    padding: 0;
    li {
        &.active {
            a {
                background: #ccc;
                border-color: #ccc;
                color: #fff;
            }
        }
        a {
            color: #444;
        }
    }
    li:not(.active) {
        cursor: pointer;
    }
}
</style>
