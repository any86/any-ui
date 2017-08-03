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
            uploadImg: null,
            overlayImg: null,
            overlayCanvas: null,
            overlayWidth: -1,
            overlayHeight: -1,
            canvas: null,
            context: null,
            width: -1,
            height: -1,
            isFirst: true,
            file: null
        };
    },

    mounted() {
        // 前景图
        // 500 * 400 尺寸
        FileAPI.Image('./static/C022.png').get((err, canvas) => {
            this.overlayCanvas = canvas;
            this.overlayWidth = canvas.width;
            this.overlayHeight = canvas.height;
            // this.$emit('confirm', canvas.toDataURL());
        });





        // 需要做个交互锁定/loading, 前景图加载完毕才能执行合成操作
        // 用户图
        // 监听上传事件, 单文件上传
        FileAPI.event.on(this.$refs.upload, 'change', evt => {
            this.file = FileAPI.getFiles(evt)[0];
            this.isFirst = false;
            FileAPI.Image(this.file).get((err, canvas) => {
                this.$emit('loaded', canvas.toDataURL());
            });
        });
    },

    methods: {
        _loadImage(src) {
            return new Promise((resolve, reject) => {
                var img = new Image();
                img.crossOrigin = "anonymous";
                img.src = src;
                img.onload = () => {
                    resolve(img);
                };

                img.onerror = (error) => {
                    reject(error);
                };
            });
        },

        confirm() {

                



            // FileAPI.Image(this.file).get((err, canvas) => {
            //     const startCenterX = 0;
            //     const startCenterY = 0;
            //     const width = canvas.width;
            //     const height = canvas.height;
            //     const centerX = startCenterX + width / 2 + this.overlayData.left;
            //     const centerY = startCenterY + height / 2 + this.overlayData.top;
            //     const viewWidth = 380.91;
            //     const viewHeight = 304.72;
            //     syslog(centerX, centerY, width, height);

            //     const SCALE_BACKGROUND = width / viewWidth;
            //     // const SCALE_BACKGROUND = 1;
            //     // 空白canvas
            //     const _canvas = document.createElement('canvas');
            //     const _context = _canvas.getContext('2d');
            //     _canvas.width = width;
            //     _canvas.height = height;

            //     _context.save();
            //     _context.translate(centerX, centerY);
            //     _context.rotate(Math.PI / 180 * this.overlayData.rotate);
            //     _context.translate(0 - centerX, 0 - centerY);

            //     // _context.scale(this.overlayData.scale, this.overlayData.scale);

            //     // _context.translate(this.overlayData.left * SCALE_BACKGROUND, this.overlayData.top * SCALE_BACKGROUND);
            //     _context.drawImage(canvas, centerX - width / 2, centerY - width / 2, width / SCALE_BACKGROUND, height / SCALE_BACKGROUND);
            //     _context.restore();
            //     this.$emit('confirm', _canvas.toDataURL());
            // });
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
