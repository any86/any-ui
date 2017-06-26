<template>
    <label class="component-upload">
        <input ref="upload" name="upload" class="input-upload" type="file"> Upload
    </label>
</template>
<script>
import FileAPI from 'fileapi'
export default {
    name: 'Upload',

    props: {
        progress: {
            default: 0
        },

        status: {
            type: String,
            default: 'ready'
        },

        url: {
            type: String,
            required: true
        },

        params: {
            type: Object,
            default () {
                return {};
            }
        },

        headers: {
            type: Object,
            default () {
                return {};
            }
        }
    },

    mounted() {
        // 监听上传事件
        FileAPI.event.on(this.$refs.upload, 'change', (evt) => {
            var files = FileAPI.getFiles(evt);
            this.$emit('update:progress', 0);
            this.$emit('update:status', 'upload');
            this.upload(files[0], progress => {
                this.$emit('update:progress', progress);
            }, done => {
                // 上传成功
                // this.$emit('update:status', 'success');
            });
        });
    },

    methods: {
        /**
         * 生成缩略图
         * file转base64
         * 压缩尺寸到100px
         * @param  {Object} file      
         */
        file2base64(file) {
            return new Promise((resolve, reject) => {
                FileAPI.Image(file).preview(100).get((err, img) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(img.toDataURL());
                    }
                });
            });
        },
        /**
         * 上传
         * @param  {Object}   file     文件对象
         * @param  {String}   cover    缩略图
         * @param  {Function} progress 进度回调函数
         * @param  {Function} done     完成对调函数
         */
        upload(file, progress = () => {}, done = () => {}) {
            FileAPI.upload({
                url: this.url,

                headers: this.headers,

                data: this.params,

                progress: (evt) => {
                    progress(Math.floor(evt.loaded / evt.total * 100));
                },

                files: {
                    file
                },

                complete: (err, xhr, file, options) => {
                    done(JSON.parse(xhr.response));

                }
            });
        },

    },

    watch: {

    },

    destroyed() {}
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
.component-upload {
    overflow: hidden;
    width: 100%;
    text-align: center;
    height: 1rem;
    line-height: 1rem;
    background: $base;
    color: $sub;
    font-size: $big;
    .input-upload {
        display: none;
    }
}
</style>
