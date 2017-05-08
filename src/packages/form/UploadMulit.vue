<template>
    <div class="com-upload-mulit">
        <!-- 按钮 -->
        <label class="btn btn-default" :ref="opts.name">
            {{opts.text}}
            <input name="upload" class="input-upload" type="file" multiple>
        </label>
        <!-- 预览 -->
        <ul name="previews" class="previews" v-show="0 < previews.length">
            <li v-for="(preview, i) in previews" :key="preview.id">
                <div v-if="1 == preview.status || undefined == preview.status" class="preview-item preview-item-success">
                    <!-- 删除按钮 -->
                    <span v-if="-1 != [100, undefined].indexOf(preview.progress)" @click="remove(i, preview.id)" class="remove fa fa-remove"></span>
                    <span class="mask" :style="{background: 'rgba(0,0,0, ' + (100 - preview.progress) / 100 + ')'}">
                    </span>
                    <p v-if="100 > preview.progress && '' != preview.progress" class="progress2">{{preview.progress}}%</p>
                    <a target="_new" :href="preview.url" class="title">{{preview.fileName}}</a>
                    <img v-if="'image' == preview.type" :src="preview.cover">
                </div>
                <div v-else class="preview-item preview-item-error">
                    <!-- 删除按钮 -->
                    <span v-if="-1 != [100, undefined].indexOf(preview.progress)" @click="remove(i, preview.id)" class="remove fa fa-remove"></span>
                    <p>上传失败</p>
                    <a class="btn-retry" @click="retry(i)">重试</a>
                </div>
            </li>
        </ul>
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
            default () {
                return [];
            }
        }
    },

    data() {
        return {
            previews: []
        };
    },

    mounted() {
        this.previews = null == this.opts.value ? [] : JSON.parse(JSON.stringify(this.opts.value));

        if (null == this.value) {
            this.$emit('input', []);
        }

        // 监听上传事件
        FileAPI.event.on(this.$refs[this.opts.name], 'change', (evt) => {
            var files = FileAPI.getFiles(evt);

            // 遍历文件,进行文件类型判断
            files.forEach(file => {
                // 初始化一个文件
                // 创建块作用域,  防止循环覆盖值
                let preview = {
                    id: '',
                    cover: '', // 缩略图
                    progress: 0, // 进度条
                    fileName: file.name, // 文件名
                    type: 'file', // 文件类型
                    url: '', // 上传后的资源地址
                    file: file,
                    status: 1
                };

                // 如果是图片, 转base64
                if (/^image/.test(file.type)) {
                    preview.type = 'image';

                    // 转base64, 作为cover
                    this.file2base64(file).then(base64 => {
                        preview.cover = base64;
                        this.upload(file, base64, progress => {
                            preview.progress = progress;
                        }, response => {
                            preview.status = response.status;
                            if (1 == response.status) {
                                preview.url = response.data.url;
                                preview.id = response.data.id;
                            }
                        });
                    })

                } else {
                    this.upload(file, '', progress => {
                        preview.progress = progress;
                    }, response => {
                        preview.status = response.status;
                        if (1 == response.status) {
                            preview.url = response.data.url;
                            preview.id = response.data.id;
                        }
                    });
                }
                this.previews.push(preview);
            });
        });
    },

    destroyed() {
        this.previews = null;
    },

    methods: {
        /**
         * 重新上传
         * @param  {Number} index 当前操作预览索引
         */
        retry(index) {
            var preview = this.previews[index];
            this.upload(preview.file, preview.cover, progress => {
                preview.status = 1;
                preview.progress = progress;
            }, response => {
                preview.status = response.status;
                if (1 == response.status) {
                    preview.url = response.data.url;
                    preview.id = response.data.id;
                }
            });
        },

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
        upload(file, cover = '', progress = () => {}, done = () => {}) {
            FileAPI.upload({
                url: this.opts.url.upload,
                // 未来会解耦
                headers: { 'Access-Token': this.$store.state.loginModule.accessToken },

                data: {
                    cover,
                    ...this.$route.query
                },

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
        /**
         * 删除列表中的文件
         * @param  {Number} index 当前预览索引
         * @param  {Number} id    预览对应的文件id
         */
        remove(index, id) {
            axios.delete(this.opts.url.del, {
                params: {
                    id
                }
            }).then(response => {
                this.previews.splice(index, 1);
            }).catch((error) => {
                syslog(error);
            });
        }
    },

    watch: {
        previews(value) {
            this.$emit('input', value);
        }
    }
}
</script>
<style scoped lang="scss">
$h: 100px;
.com-upload-mulit {
    overflow: hidden;
    .input-upload {
        display: none;
    }
    ul.previews {
        border-radius: 4px;
        margin: 15px 0;
        padding: 10px;
        overflow-x: auto;
        overflow-y: hidden;
        border: 1px solid #ddd;
        >li {
            transition: all .3s;
            background: #444;
            border-radius: 4px;
            height: $h;
            width: $h;
            display: inline-block;
            vertical-align: top;
            margin: 5px;
            box-shadow: 1px 2px 3px rgba(0, 0, 0, .1);
            .preview-item {
                position: relative;
                width: 100%;
                height: 100%;
                .remove {
                    position: absolute;
                    top: -6px;
                    right: -6px;
                    background: rgba(#e4685f, 1);
                    color: #fff;
                    border-radius: 100%;
                    line-height: 20px;
                    height: 20px;
                    width: 20px;
                    text-align: center;
                    z-index: 100;
                    font-size: 12px;
                    transition: all .2s ease-in-out;
                    &:hover {
                        transform: rotate(90deg);
                        cursor: pointer;
                        background: rgba(#98261d, 1);
                    }
                }
                >.mask {
                    position: absolute;
                    top: 0;
                    left: 0;
                    z-index: 3;
                    width: 100%;
                    height: 100%;
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
                    text-shadow: 1px 2px 30px #000;
                    &:hover {
                        cursor: pointer;
                    }
                }
            }
            // 成功
            .preview-item-success {}
            // 失败
            .preview-item-error {
                p {
                    padding: 15px 0;
                    color: #ccc;
                    text-align: center;
                    font-size: 16px;
                }
                .btn-retry {
                    margin-top: 15px;
                    color: #fff;
                    text-align: center;
                    display: block;
                    letter-spacing: 1px;
                    &:hover {
                        cursor: pointer;
                    }
                }
            }
        }
    }
}
</style>
