<template>
    <div class="com-editor" contenteditable="true">
    </div>
</template>
<script>
import Fileapi from 'fileapi'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'

export default {

    props: {
    },

    data() {
        return {
            quill: {}
        };
    },

    mounted() {
        this.quill = new Quill(this.$el, {
            theme: 'snow'
        });

        // 监听.ql-editor元素的paste
        this.$el.querySelector('.ql-editor').addEventListener('paste', this.paste);
        
    },

    destroyed() {

    },

    methods: {
        paste(event) {
            // console.log(event.clipboardData); // will give you the mime types
            var clip = event.clipboardData || event.originalEvent.clipboardData;
            var items = clip.items;
            for (var k in items) {
                var item = items[k];
                console.log(item)
                if (item.kind === 'file' && -1 != item.type.indexOf('image')) {
                    var blob = item.getAsFile();

                    var reader = new FileReader();
                    reader.readAsDataURL(blob);

                    reader.onload = event => {
                        this.quill.insertEmbed(10, 'image', event.target.result);
                    };
                }
            }
        }
    }
}
</script>
<style scoped lang=scss>
.com-editor {
    outline: none;
    padding: 15px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    font-size: 14px;
    min-height: 150px;
    border-radius: 5px;
    img {
        display: block;
        vertical-align: middle;
        text-align: center;
        max-width: 100%;
    }
}
</style>
