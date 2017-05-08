<template>
    <div class="com-checkbox-group">
        <div class="group">
            <v-checkbox class="v-checkbox" @input="select(checkbox.value)" v-model="booleanList[i]" v-for="(checkbox, i) in opts.children" :key="checkbox.value" :opts="checkbox" :disabled="checkbox.disabled">
                {{checkbox.label}}
            </v-checkbox>
        </div>
    </div>
</template>
<script>
import VCheckbox from './Checkbox'
export default {
    name: 'checkboxGroup',

    computed: {
        booleanList() {
            if(null != this.value) {
                return this.opts.children.map(checkbox => {
                    // this.value里的值都是字符串, 因为从路由混合得到的
                    // 所以checkbox.value + ''转类型
                    // indeof内部因该是'==='判断
                    var tag = false;
                    this.value.forEach(v => {
                        if (checkbox.value == v) {
                            tag = true;
                        }
                    });
                    return tag;
                });                
            } else {
                this.$emit('input', []);
                return this.opts.children.map(checkbox => {
                    return false;
                });
            }
        }
    },

    props: {
        opts: {
            type: Object
        },

        value: {
            type: Array,

            default (value) {
                if (null == value || undefined == value) {
                    return [];
                }
            }
        }
    },

    methods: {
        select(value) {
            var newValue = Object.assign(this.value);

            if (-1 == this.value.indexOf(value)) {
                newValue.push(value);
            } else {
                newValue = this.value.filter(v => {
                    return value != v;
                })
            }

            this.$emit('input', newValue);
        }
    },

    components: {
        VCheckbox
    }
}
</script>
<style scoped lang=scss>
.com-checkbox-group {
    .group {
        margin-top: 19px;
        .v-checkbox{margin-right: 15px;}
    }
}
</style>
