<template>
    <footer>
        <label v-if="isFirst" class="button-upload">
            Upload
            <input ref="upload" name="upload" class="input-upload" type="file">
        </label>
        <template v-else>
            <label class="button-upload">
                Change Picture
                 <!-- <input ref="upload" name="upload" class="input-upload" type="file">  -->
            </label>
            <button @click="confirm" class="button-confirm">Confirm</button>
        </template>
    </footer>
</template>
<script>
import FileAPI from 'fileapi'
export default {
    name: 'FooterUpload',

    props: {
        dataSource: {},

        overlayData: {}
    },

    data() {
        return {
            isFirst: true,
            file: null
        };
    },

    mounted() {
        // 监听上传事件, 单文件上传
        FileAPI.event.on(this.$refs.upload, 'change', evt => {
            this.file = FileAPI.getFiles(evt)[0];
            FileAPI.Image(this.file).get( (err, canvas)=> {

                this.$emit('loaded', canvas.toDataURL());
            });
        });
    },

    methods: {
        /**
         * 上传
         * @param  {Function} progress 进度回调函数
         * @param  {Function} done     完成对调函数
         */
        confirm(progress = () => { }, done = () => { }) {
            FileAPI.upload({
                url: this.dataSource.url,

                headers: this.dataSource.headers,

                data: {
                    ...this.dataSource.params,
                    base64: this.overlayBase64
                },

                progress: (evt) => {
                    this.$emit('progress', Math.floor(evt.loaded / evt.total * 100));
                },

                files: {
                    file: this.file,
                    // file: dataURLtoBlob(this.overlayBase64)
                },

                complete: (err, xhr, file, options) => {
                    if (err) {
                        done(err);
                    } else {
                        done(JSON.parse(xhr.response), file);
                    }
                }
            });
        },
    }
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
$height: 1rem;
footer {
    position: fixed;
    z-index: 999;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    height: $height;
    .button-upload {
        flex: 1;
        line-height: $height;
        text-align: center;
        font-size: $big;
        background: $base;
        color: $sub;
        .input-upload {
            display: none;
        }
    }
    .button-confirm {
        flex: 1;
        background: $darkest;
        color: $sub;
        font-size: $big;
    }
}
</style>
