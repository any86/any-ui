<template>
    <div class="com-tree-view">
        <div class="btn-group">
            <a @click="showModal" class="btn btn-default">
                {{activeNode.label || opts.placeholder}}
                <i class="caret" :class="{rotate: isShowModal}"></i>
            </a>
            <a class="btn btn-default">
                <i class="fa fa-remove"></i>
            </a>
        </div>
        <v-modal v-model="isShowModal">
            <v-dialog v-model="isShowModal">
                <v-tree :value="activeNode" @input="changeTreeValue" :data="opts.data"></v-tree>
            </v-dialog>
        </v-modal>
    </div>
</template>
<script>
import VTree from './Tree'
import VModal from '../Dialog/Modal'
import VDialog from '../Dialog/Dialog'
export default {
    name: 'TreeView',

    props: {
        opts: {

        },

        value: {
            type: [String, Number]
        }
    },

    data() {
        return {
            isShowModal: false,
            activeNode: {}
        };
    },

    mounted() {
        this.activeNode = this.findTreeNode(this.value, this.opts.data);
    },

    methods: {
        showModal() {
            this.isShowModal = true;
        },

        changeTreeValue(item) {
            this.activeNode = item;
            this.isShowModal = false;
            this.$emit('input', item.value);
        },

        findTreeNode(value, nodes) {
            var activeNode = {};
            var length = nodes.length;
            for (var i = 0; i < length; i++) {
                if (value == nodes[i].value) {
                    activeNode = nodes[i];
                    return activeNode;
                } else {
                    if (undefined != nodes[i].children) {
                        activeNode = this.findTreeNode(value, nodes[i].children);
                        if (undefined != activeNode) {
                            return activeNode;
                        }
                    }
                }
            }

        }
    },

    components: {
        VTree,
        VModal,
        VDialog
    }
}
</script>
<style scoped lang=scss>
.com-tree-view {
}
</style>
