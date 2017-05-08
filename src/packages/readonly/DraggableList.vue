<template>
    <div class="drap-wrap">
        <div class="col-md-12 drag-h1" v-html="opts.dragName"></div>
        <h4 class="col-md-12 drag-h4">{{opts.dragTitle}}</h4>
        <div class="col-md-6">
            <div class="drag-head">
                <div class="drag-title">{{opts.titleList}}</div>
                <div class="drag-tags">
                    <span
                            v-for="(tag,index) in opts.tags"
                            @click="tabChange(index)"
                            class="tag"
                            :class="{current:active==index}">{{tag}}</span>
                    <div class="search-btn">
                        <input class="drag-query" v-model="query" placeholder="搜索"/>
                    </div>
                </div>
            </div>
            <draggable
                    class="list-group over-flow-scroll pt-1"
                    element="div"
                    v-model="list"
                    :options="dragOptions"
                    :move="onMove"
                    @start="isDragging=true"
                    @end="isDragging=false" >
                <transition-group
                        type="transition"
                        class="list-group"
                        :name="'flip-list'" tag="ul">
                    <li class="list-group-item" v-show="element.type==active" v-for="element in computedList" :key="element.id">
                        <div class="drag-contain">
                            <h5>
                                <i :class="element.fixed? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'"
                                   @click=" element.fixed=! element.fixed" aria-hidden="true"></i>
                            {{element.name}}
                            </h5>
                            <p class="drag-detail" v-html="element.detail"></p>
                        </div>
                    </li>
                </transition-group>
            </draggable>
        </div>

        <div class="col-md-6">
            <div class="drag-head-new">
                <div class="drag-title">{{opts.titleList2}}</div>
                <div class="drag-tags">
                    <div class="line-left"></div><div class="line-right"></div>
                    {{opts.list2Name}}
                </div>
            </div>
            <draggable class="over-flow-scroll" element="div" v-model="list2" :options="dragOptions" :move="onMove">
                <transition-group name="no" type="transition" class="list-group" tag="ul" ref='myUl'>
                    <li class="list-group-item" v-for="(element,index) in list2" :key="element.id">
                        <div class="drag-contain-new" style="position: relative">
                            <h5>
                                <i :class="element.fixed? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'"
                                   @click=" element.fixed=! element.fixed" aria-hidden="true"></i>
                                {{element.name}}
                            </h5>
                            <p class="drag-detail" v-html="element.detail"></p>
                            <textarea placeholder="请填写考核标准" v-model="element.textAreaVal"></textarea>
                            <div>设置权重：<input class="drag-ipt-s" type="text" v-model="element.iptVal">%</div>
                            <span class="close-btn" @click="removeItem(index,element)">
                                <i class="fa fa-times" aria-hidden="true"></i>
                            </span>
                        </div>
                    </li>
                </transition-group>
            </draggable>
        </div>
        <div class="wrap-drag-btn">
            <v-button @click="submit" :disabled="btnSubmit.disabled" :loading="btnSubmit.loading" :icon="'check'" :type="'primary'">{{btnSubmit.text}}</v-button>
        </div>
    </div>
</template>

<script>
    import draggable from 'vuedraggable';
    import VButton from '../../components/form/Button';
    export default {
        name: 'DraggableList',
        components: {
            draggable,
            VButton,
        },
        data () {
            return {
                query: '',
                active:0,
                list:[],
                list2:[],
                url:"",
                userId:"",
                isDragging: false,
                delayedDragging:false,
                btnSubmit: {
                    disabled: false,
                    loading: false,
                    text: '确定'
                }
            }
        },
        props:{
          value:{
              type:Array
          },
            opts:{
                type:Object
            }
        },
        mounted: function() {
            this.list = this.opts.list;
            this.list2 = this.opts.list2;
            this.url=this.opts.url;
            this.userId=this.opts.userId;
        },
        methods:{
            /**
             * 提交
             */
            submit() {
                this.btnSubmit.disabled = true;
                this.btnSubmit.loading = true;
                this.btnSubmit.text = '处理中...';

                //post url后端提供
                axios.post(this.url, qs.stringify(
                    {
                        "list":this.list2,
                        "uId":this.userId,
                    }

                ))
                    .then((response) => {
                        this.btnSubmit.disabled = false;
                        this.btnSubmit.loading = false;
                        this.btnSubmit.text = '确定';

                        this.$alert(response.data.message)
                    })
                    .catch((error) => {
                        syslog(error);
                    });
            },
            removeItem(idx,el){
               this.list2.splice(idx,1);
               this.list.push(el);
            },
            tabChange(i){
                this.active=i;
            },
            onMove ({relatedContext, draggedContext}) {
                const relatedElement = relatedContext.element;
                const draggedElement = draggedContext.element;
                return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
            },
        },
        computed: {
            dragOptions () {
                return  {
                    animation: 0,
                    group: 'description',
                    ghostClass: 'ghost',
                    scroll: true,
                    scrollSensitivity: 30,
                };
            },
            listString(){
                return JSON.stringify(this.list, null, 2);
            },
            list2String(){
                return JSON.stringify(this.list2, null, 2);
            },
            computedList: function () {
                var vm = this;
                return this.list.filter(function (element) {
                    return element.name.indexOf(vm.query) !== -1
                })
            }
        },
        watch: {
            isDragging (newValue) {
                if (newValue){
                    this.delayedDragging= true
                    return
                }
                this.$nextTick( () =>{
                    this.delayedDragging =false
                })
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
    .no-move {
        transition: transform 0.5s;
    }

    .ghost {
        opacity: .5;
        background: #C8EBFB;
    }

    .list-group {
        min-height: 20px;
    }
    .over-flow-scroll{
        height: 416px;
        overflow-y: auto;
    }
    .pt-1{
        position: relative;
        top:-1px;
    }

    .list-group-item {
        cursor: move;
        padding: 0 !important;
    }

    .list-group-item i{
        cursor: pointer;
    }
    .drag-title{
        font-size: 16px;
        padding: 5px 0;
        color: #999;
    }
    .drag-contain{
        padding: 10px 20px;
        background: #f8f8f8;
        &:hover{
            background: #eee;
        }
        h5{
            font-size: 16px;
            color: #5a5a5a;
            margin-bottom: 5px;
            i{ font-size: 12px !important;}
        }
        .drag-detail{
            font-size: 14px;
            color: #a5a5a5;
        }
    }
    .drag-contain-new{
        padding: 10px 20px;
        background: #fff;
        h5{
            font-size: 16px;
            color: #5a5a5a;
            margin-bottom: 5px;
            i{
                font-size: 12px !important;
                &.fa-anchor{ color: #00AA88}
            }
        }
        textarea{
            width: 100%;
            height: 80px;
            border: 1px solid #cdcdcd;
            padding: 5px;
            margin-top: 20px;
            margin-bottom: 5px;
            resize: none;
            font-size: 14px;
            line-height: 22px;
        }
        .drag-detail{
            font-size: 14px;
            color: #a5a5a5;
        }
        .drag-ipt-s{
            width: 70px;
            height: 30px;
            line-height: 30px;
            padding: 0 4px;
            border: 1px solid #cdcdcd;
        }
    }

    .drag-head{
        border: 1px solid #cdcdcd;
        .drag-title{
            text-align: center;
            line-height: 40px;
            border-bottom: 1px dashed #cdcdcd;
        }
        .drag-tags{
            padding: 10px 10px 0 10px;
            .tag{
                display: inline-block;
                padding: 5px 8px;
                margin-right: 5px;
                cursor: pointer;
                margin-bottom: 5px;
                font-size: 12px;
                color: #5a5a5a;
                background: #fff;
                transition: all .1s ease-in-out;
                user-select: none;
                border-radius: 4px;
                &:hover{
                    background: #bbb;
                    border-radius: 4px;
                    color: #fff;
                }
            }
        }
        .current{
            background: #bbb !important;
            color: #fff !important;
        }
    }
    .drag-head-new{
        border: 1px solid #cdcdcd;
        border-bottom: none;
        .drag-title{
            text-align: center;
            line-height: 40px;
            color: #14bb9d;
        }
        .drag-tags{
            position: relative;
            background: #14bb9d;
            color: #fff;
            line-height: 40px;
            padding-left: 20px;
            .line-left{
                width: 1px;
                height: 40px;
                background: #14bb9d;
                position: absolute;
                left: -1px;
                top: 0;
            }
            .line-right{
                width: 1px;
                height: 40px;
                background: #14bb9d;
                position: absolute;
                right: -1px;
                top: 0;
            }
        }
    }
    .drag-h4{
        font-size: 16px;
        text-align: left;
        color: #999;
        padding-top: 10px;
        padding-bottom: 10px;
    }
    .drag-h1{
        padding-top: 10px;
        font-size: 18px;
        text-align: center;
        color: #999;
        font-weight: bold;
        .name{
            color: #656565;
            margin: 0 6px;
        }
        .month{
            margin-left: 4px;
        }
    }
    .close-btn{
        display: block;
        width: 26px;
        height: 26px;
        position: absolute;
        right: 10px;
        top: 10px;
        cursor: pointer;
        font-size: 14px;
        color: #fff;
        text-align: center;
        line-height: 26px;
        border-radius: 15px;
        background: rgba(0,0,0,0.2);
        transform:rotate(0deg);
        transition: all .3s ease-in-out;
        &:hover{
            background: rgba(0,0,0,0.5);
            transform:rotate(-90deg);
        }
    }
    .drap-wrap{
        overflow: hidden;
    }
    .wrap-drag-btn{
        clear: both;
        text-align: center;
        margin-bottom: 40px;
        a{
            background: #14bb9d !important;
            border: 1px solid #14bb9d !important;
        }
    }
    .drag-btn{
        font-size: 14px;
        background: #14bb9d;
        color: #fff;
        height: 40px;
        width: 100px;
        transition: opacity .3s;
        &:hover{
            opacity: .8;
        }
    }
    .search-btn{
        position: relative;
        padding-bottom: 10px;
        .drag-query{
            border: 1px solid #cdcdcd;
            height: 24px;
            line-height: 24px;
            width: 150px;
            border-radius: 4px;
            padding: 0 5px;
            font-size: 12px;
        }
        .fa{
            position: absolute;
            left: 0;
            top:2px;
            font-size: 14px;
            color: #ddd;
            user-select: none;
        }
    }

</style>
