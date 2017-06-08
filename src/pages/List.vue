<template>
    <div class="page-list">
        <!-- <Spinner v-if="-1 == status" style="margin-top:20%;">loading</Spinner> -->
        <!-- 页面 -->
        <VPopup from="up" v-model="isPopupShow">
            <template v-if="0 == popupIndex">
                <h2 slot="header">Please Pickup trend</h2>
                <v-list-item>
                    <v-radio v-model="trend" :selfValue="1">time</v-radio>
                </v-list-item>
                <v-list-item>
                    <v-radio v-model="trend" :selfValue="2">sale</v-radio>
                </v-list-item>
                <v-list-item>
                    <v-radio v-model="trend" :selfValue="3">store</v-radio>
                </v-list-item>
                <v-list-item>
                    <v-radio v-model="trend" :selfValue="4">age</v-radio>
                </v-list-item>
                <v-list-item>
                    <v-switch v-model="bool">remember</v-switch>
                </v-list-item>
            </template>
            <h2 v-else-if="1 == popupIndex" slot="header">Please Pickup trend</h2>
            <h2 v-else-if="2 == popupIndex" slot="header">Please Pickup sort</h2>
        </VPopup>
        <ul class="bar">
            <li @click="showPopup(0)">trend</li>
            <li @click="showPopup(1)">category</li>
            <li @click="showPopup(2)">sort</li>
        </ul>
        <ScrollView ref="scroll" @bottom-out="getMore">
            <ul class="list">
                <li v-for="item in list.data">
                    <VLazyLoad class="img" :element="$refs.scroll.$el" :src="item.img" width="3rem" height="3rem"></VLazyLoad>
                    <h5 align="center">{{item.title}}</h5>
                    <h6 align="center"><span>$</span>{{item.price}}</h6>
                </li>
            </ul>
            <Spinner v-if="-1 == list.status" style="margin:30px auto;"></Spinner>
            <p v-else-if="0 == list.status" class="empty">there is nothing</p>
        </ScrollView>
    </div>
</template>
<script>
import VPopup from '@/packages/Dialog/Popup'
import Spinner from '@/packages/Spinner/Spinner.vue'
import VLazyLoad from '@/packages/LazyLoad/LazyLoad'
import VList from '@/packages/List/List.vue'
import VListItem from '@/packages/List/ListItem.vue'
import VSwitch from '@/packages/Switch/Switch.vue'
import VRadio from '@/packages/Radio/Radio.vue'


export default {
    name: 'List',

    data() {
        return {
            trend: 2,
            bool: true,
            status: -1,
            isLoading: false,
            popupIndex: -1,
            isPopupShow: false,
            list: {
                status: -1,
                data: []
            },
            page: 1,
            limit: 10,
        };
    },

    mounted() {
        this.getList(this.page, this.limit, this.trend).then(data => {
            this.list.status = data.status;
            if (1 == data.status) {
                this.list.data.push(...data.data);
            }
        });
    },

    methods: {
        showPopup(index) {
            this.popupIndex = index;
            this.isPopupShow = true;
        },

        getList(page, limit, trend) {
            return new Promise((resolve, reject) => {
                if (0 != this.list.status && !this.isLoading) {
                    this.list.status = -1;
                    this.isLoading = true;
                    this.$axios.get('./mock/imgs', {
                        params: {
                            page,
                            limit,
                            trend
                        }
                    }).then(response => {
                        this.isLoading = false;
                        resolve(response.data);
                    }).catch(error => {
                        reject(error);
                    });
                }
            });
        },

        getMore() {
            this.page++;
            this.getList(this.page, this.limit, this.trend).then(data => {
                this.list.status = data.status;
                if (1 == data.status) {
                    this.list.data.push(...data.data);
                }
            });
        }
    },

    watch: {
        trend() {
            this.isPopupShow = false;
            this.list.data = [];
            this.list.status = -1;
            this.getList(this.page, this.limit, this.trend).then(data => {
                this.list.status = data.status;
                if (1 == data.status) {
                    this.list.data = data.data;
                }
            });
        }
    },

    components: {
        VList,
        VListItem,
        Spinner,
        VLazyLoad,
        VPopup,
        VRadio,
        VSwitch
    }
}
</script>
<style scoped lang="scss">
@import '../scss/theme.scss';
.page-list {
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    .bar {
        height: .8rem;
        width: 100%;
        display: flex;
        >li {
            flex: 1;
            font-size: $big;
            line-height: .8rem;
            text-align: center;
            border-color: $lightest;
            border-style: solid;
            border-width: 1px 1px 1px 0;
            &:last-child {
                border-right-width: 0;
            }
        }
    }
    ul.list {
        flex: 1;
        display: flex;
        flex-flow: row wrap;
        >li {
            flex: 0 0 50%;
            >.img {
                width: 100%;
                display: flex;
                margin: auto;
            }
        }
    }
    .empty {
        text-align: center;
        font-size: .3rem;
        color: $light;
        margin: 30px auto;
    }
}
</style>
