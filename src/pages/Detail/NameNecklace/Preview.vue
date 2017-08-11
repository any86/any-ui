<template>
    <section class="row row-preview">
        <span>preview :</span>
        <span class="font-preview">{{text}}</span>
        <div class="input">
            <v-input type="letter" v-model="text" maxlength="13" placeholder="Enter Name or text here..."></v-input>
            <span class="text">
                <a class="text-danger">{{13 - text.length}}</a> left</span>
        </div>
    </section>
</template>
<script>
import VInput from '@/packages/Input/Input'
export default {
    name: 'Preview',

    data() {
        return { text: '', };
    },

    components: { VInput }
}
</script>
<style scoped lang="scss">
@import '../../../scss/theme.scss';
.row-preview {
    .font-preview {
        font-family: CommercialScriptBT-Regular;
        font-size: .8rem;
        color: $base;
    }
    .input {
        margin-top: $gutter;
        display: flex;
        border: 1px solid $lightest;
        padding: 0 $gutter;
        span {
            display: block;
            flex: 1 0 auto;
            line-height: 1rem;
        }
    }
}
</style>
