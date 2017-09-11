<template>
    <footer>
        <label v-if="'ready' == status" class="button-upload">
            Upload
            <input ref="upload" name="upload" class="input-upload" type="file">
        </label>
        <template v-else>
            <label class="button-upload">
                Change Picture
                <input ref="reUpload" name="upload" class="input-upload" type="file">
            </label>
            <button @click="confirm" class="button-confirm">Confirm</button>
        </template>
    </footer>
</template>
<script>
import FileAPI from 'fileapi'
/** 
 * 自定义事件
 * @confirm {event} 点击confirm
 * @demoLoaded {event} demo图读取完毕触发  
 * @uploading {event} 上传中
 * @uploaded {event} 上传完毕
 */
export default {
    name: 'FooterUpload',

    props: {
        uploadOptions: {},

        resultDataURL: {
            type: String
        },

        svg: {}
    },

    data() {
        return {
            status: 'ready',
            file: null,
        };
    },

    mounted() {

        const bindUpload = (ref, cb = null) => {
            FileAPI.event.on(ref, 'change', evt => {
                this.status = 'loading';
                this.file = FileAPI.getFiles(evt)[0];
                if (undefined !== this.file) {
                    var $loading = this.$loading();
                    FileAPI.Image(this.file).get((err, canvas) => {
                        // 加载完毕
                        this.status = 'loaded';
                        this.$emit('loaded', canvas.toDataURL());
                        $loading.close();
                        if (null !== cb) {
                            cb();
                        }
                    });
                }
            });
        }
        // 监听上传事件, 单文件上传
        bindUpload(this.$refs.upload, () => {
            bindUpload(this.$refs.reUpload);
        });
    },

    methods: {
        /**
         * 上传
         */
        async confirm() {
            var $loading = this.$loading();
            // svg to base64ç
            var svg_xml = new XMLSerializer().serializeToString(this.svg);
            var image = await imageLoader("data:image/svg+xml;base64," + window.btoa(unescape(encodeURIComponent(svg_xml))));
            var resultDataURL = image2DataURL(image);
            // 提供base64给预览
            this.$emit('confirm', resultDataURL);
            // 上传
            var formdata = new FormData();
            // 合成图
            formdata.append('file', new File([dataURL2BLOB(resultDataURL)], "xx.png"));
            // 用户上传图
            formdata.append('file', this.file);
            // 开始上传
            await this.$api.saveCharm(formdata);
            $loading.close();
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
