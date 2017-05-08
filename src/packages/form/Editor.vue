<template>
    <div class="com-editor" @paste="paste"></div>
</template>
<script>
import Fileapi from 'fileapi'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'

export default {
    name: 'Editor',

    props: {
        opts: {
            type: Object
        },

        value: {
            type: String
        }
    },

    data() {
        return {
            quill: null,
            modules: {
                toolbar: [
                    [{ 'size': ['small', false, 'large', 'huge'] }], 
                    ['bold', 'underline'],
                    ['code-block'],
                    [{
                        'header': [1, 2, 3, 4, 5, 6, false]
                    }],

                    [{
                        'color': []
                    }],
                    ['clean']
                ]
                // toolbar: [['code-block'], ['image']]
                // toolbar: [['image']]
            }
        };
    },

    mounted() {
        this.quill = new Quill(this.$el, {
            theme: 'snow',
            modules: this.modules
        });

        this.quill.pasteHTML(this.value);

        this.quill.on('text-change', (delta, oldDelta, source) => {
            var html = this.$el.children[0].innerHTML;
            this.$emit('input', html);
        });
    },

    methods: {
        paste(event) {
            // console.log(event.clipboardData); // will give you the mime types
            var clip = event.clipboardData || event.originalEvent.clipboardData;
            var items = clip.items;

            for (var k in items) {
                var item = items[k];
                if (item.kind === 'file' && -1 != item.type.indexOf('image')) {
                    var blob = item.getAsFile();

                    var reader = new FileReader();
                    reader.readAsDataURL(blob);

                    reader.onload = event => {
                        setTimeout(() => {
                            syslog(this.quill.getSelection())
                            const index = (this.quill.getSelection() || {}).index || this.quill.getLength();
                            this.quill.insertEmbed(index, 'image', event.target.result, 'user');

                            // this.$emit('input', this.qui)
                        }, 0);
                    };
                }
            }
        }
    }
}
</script>
<style scoped lang="scss">
.com-editor {
    outline: none;
    box-sizing: border-box;
    border: 1px solid #ccc;
    min-height: 150px;
    border-radius: 0 0 5px 5px;
    img {
        display: block;
        vertical-align: middle;
        text-align: center;
        max-width: 100%;
    }
}
</style>
