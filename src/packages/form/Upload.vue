<template>
    <div class="com-upload-mulit">
        <!-- 按钮 -->
        <label class="btn btn-default" :ref="opts.name">
            {{opts.placeholder}}
            <input name="upload" class="input-upload" type="file" multiple>
        </label>
        <!-- 预览 -->
        <transition-group class="previews" v-show="0 < previews.length" tag="ul">
            <li v-for="(preview, i) in previews" :key="i">
                <span @click="remove(i, preview.id)" class="remove">X</span>
                <span class="mask" :style="{background: 'rgba(0,0,0, ' + (100 - preview.progress) / 100 + ')'}"></span>
                <p class="progress2">{{preview.progress}}%</p>
                <p class="title">{{preview.fileName}}</p>
                <img :src="preview.url">
            </li>
        </transition-group>
    </div>
</template>
<script>
// fileAPI对于每次多选的文件,如果再次选择相同的几个文件, 那么不触发上传
import FileAPI from 'fileapi'
export default {
    name: 'uploadMulit',

    props: {
        opts: {},
        value: {

        }
    },

    data() {
        return {
            previews: [],
        };
    },

    mounted() {
        // 监听上传事件
        FileAPI.event.on(this.$refs[this.opts.name], 'change', (evt) => {
            // 文件对象 
            var files = FileAPI.getFiles(evt);

            // 不同文件不同处理
            // 如果是图片, 进行base64生成预览图
            files.forEach((file, i) => {
                this.previews.splice(0, 0, {
                    id: null,
                    progress: 0,
                    fileName: file.name,
                    url: '',
                    type: ''
                });

                // 如果是图片, 进行base64生成预览图
                if (/^image/.test(file.type)) {
                    this.previews[i].type = 'image';
                    // i需要函数进行值传递
                    // 后续想办法code美观
                    this.previewBase64(file, i);
                } else {
                    this.previews[i].type = 'file';
                }

                // 上传
                this.upload(file, i);
            });

        });
    },

    methods: {
        /**
         * 生成缩略图
         * file转base64
         * @param  {Object} file      
         * @param  {Number} index 当前上传文件索引
         */
        previewBase64(file, index) {
            FileAPI.Image(file).preview(100).get((err, img) => {
                this.previews[index].url = img.toDataURL();
            });
        },

        /**
         * 上传, 回馈上传进度
         * @param  {Object} file      
         * @param  {Number} index 当前上传文件索引
         */
        upload(file, index) {
            // return new Promise((resolve, reject)=>{
            FileAPI.upload({
                url: '/mock/upload',

                headers: { 'Access-Token': this.$store.state.loginModule.accessToken },

                progress: (evt) => {
                    this.previews[index].progress = Math.floor(evt.loaded / evt.total * 100);
                },

                files: {
                    file: file
                },

                complete: (err, xhr, file, options) => {
                    var data = JSON.parse(xhr.response);
                    console.log(data)
                }
            });
            // });
        },
        /**
         * 删除列表中的文件
         */
        remove(i, id) {
            this.previews.splice(i, 1);
            axios.delete('/mock/success', {
                params: {
                    id
                }
            }).then(response => {
                syslog(1)
            }).catch((error) => {

            });
        }
    }
}
</script>
<style scoped lang=scss>
$h: 100px;
.com-upload-mulit {
    overflow: hidden;
    .input-upload {
        display: none;
    }
    ul.previews {
        border-radius: 4px;
        margin: 15px 0;
        overflow-x: auto;
        overflow-y: hidden;
        border: 1px solid #ddd;
        >li {
            background: #777;
            border-radius: 4px;
            overflow: hidden;
            height: $h;
            width: $h;
            position: relative;
            display: block;
            float: left;
            margin: 5px;
            box-shadow: 1px 2px 3px rgba(0, 0, 0, .1);
            >.mask {
                position: absolute;
                top: 0;
                left: 0;
                z-index: 3;
                width: 100%;
                height: 100%;
            }
            >.remove {
                position: absolute;
                top: 0;
                left: 0;
                background: #444;
                color: #fff;
                border-radius: 0 0 4px 0;
                line-height: 20px;
                height: 20px;
                width: 20px;
                text-align: center;
                z-index: 100;
                font-size: 12px;
            }
            >img {
                width: 100%;
                height: 100%;
                display: block;
                position: absolute;
                top: 0;
                left: 0;
                z-index: 2;
            }
            /*和boot样式冲突*/
            >.progress2 {
                color: #fff;
                font-size: 14px;
                position: absolute;
                bottom: 0;
                z-index: 3;
                height: 16px;
                width: 100%;
                text-align: center;
            }
            >.title {
                word-break: break-all;
                overflow-x: hidden;
                overflow-y: auto;
                padding: 20px 5px;
                color: #fff;
                font-size: 12px;
                position: absolute;
                z-index: 3;
                height: $h - 16px - 20px;
                width: 100%;
                text-align: center;
            }
        }
    }
    .v-enter {
        opacity: 0;
        transform: translateY(-.5rem);
    }
    .v-enter-active {
        transition: all .3s;
    }
    .v-leave-active {
        opacity: 0;
        transition: all .3s;
    }
}
</style>
