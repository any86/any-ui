<template>
    <footer>
        <label v-if="isFirst" class="button-upload">
            Upload
            <input ref="upload" name="upload" class="input-upload" type="file">
        </label>
        <template v-else>
            <label class="button-upload">
                Change Picture
                <input ref="upload" name="upload" class="input-upload" type="file">
            </label>
            <button @click="upload" class="button-confirm">Confirm</button>
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
            file: null,
            overlayBase64: '',
        };
    },

    mounted() {
        // 监听上传事件
        FileAPI.event.on(this.$refs.upload, 'change', evt => {
            this.file = FileAPI.getFiles(evt)[0];
            this.isFirst = false;
            this.$emit('loaded', this.file);
            this.overlay();
        });
    },

    methods: {
        overlay() {
            const toast = this.$toast('loading...', {
                delay: -1
            });

            var rate = 1280 / 384;
            // 合成前景和用户图
            FileAPI.Image(this.file)
                .rotate(this.overlayData.rotate)
                .crop(0 - this.overlayData.x * rate, 0 - this.overlayData.y * rate, 384 * rate, 307 * rate)
                .resize(384 * this.overlayData.scale, 240 * this.overlayData.scale, 'min')
                .get((err, img) => {
                    if (err) {
                        this.$alert('请重传!');
                    } else {
                        toast.isShow = false;

                        FileAPI.Image(img)
                            .overlay([{
                                x: 0,
                                y: 0,
                                w: 384,
                                h: 307,
                                src: this.dataSource.overlay
                            }])
                            .crop(0, 0, 384, 307)
                            .get((err, img1) => {
                                if (err) {
                                    this.$alert('请重传!');
                                } else {
                                    this.overlayBase64 = img1.toDataURL();
                                    this.$emit('overlaid', this.overlayBase64);
                                }
                            });
                    }
                });
        },

        /**
         * 上传
         * @param  {Function} progress 进度回调函数
         * @param  {Function} done     完成对调函数
         */
        upload(progress = () => {}, done = () => {}) {
            FileAPI.upload({
                url: this.dataSource.url,

                headers: this.dataSource.headers,

                data: {...this.dataSource.params,
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
    },

    watch: {
        overlayData(value) {
            dir(value)
            this.overlay();
        }
    }
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
$height: 1rem;
footer {
    position: fixed;
    z-index: 99999;
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
