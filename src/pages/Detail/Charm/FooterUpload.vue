<template>
    <footer>
        <label v-if="'ready' == status" class="button-upload">
            Upload
            <input ref="upload" name="upload" class="input-upload" type="file">
        </label>
        <template v-else>
            <label class="button-upload">
                Change Picture
                <input ref="upload" name="upload" class="input-upload" type="file">
            </label>
            <button @click="confirm" class="button-confirm">Confirm{{isLockConfrim}}</button>
        </template>
    </footer>
</template>
<script>
import FileAPI from 'fileapi'
export default {
    name: 'FooterUpload',

    props: {
        dataSource: {},

        overlayDataURL: {
            type: String
        },

        isLockConfrim: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            status: 'ready',
            file: null,
        };
    },

    mounted() {
        // 监听上传事件, 单文件上传
        FileAPI.event.on(this.$refs.upload, 'change', evt => {
            this.status = 'loading';
            this.file = FileAPI.getFiles(evt)[0];
            FileAPI.Image(this.file).get((err, canvas) => {
                // 加载完毕
                this.status = 'loaded';
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
@import '../../../scss/theme.scss';
$height: 1rem;
footer {
    position: fixed;
    z-index: 90;
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
