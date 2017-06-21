<template>
    <div class="component-drawer">
        <span class="sidebar">
            
        </span>
        <span>
            
        </span>
    </div>
</template>
<script>
export default {
    name: 'Drawer',

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
                headers: {
                    'Access-Token': this.$store.state.loginModule.accessToken
                },

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
.component-upload {
    overflow: hidden;
    .input-upload {
        display: none;
    }
    ul.previews {}
}
</style>
