<template>
    <ScrollView class="page-search">
        <header>
            <i class="button-back" @click="$router.back()"></i>
            <v-input v-model="keyword" @keyup="search" :placeholder="placeholder" class="input"></v-input>
        </header>
        <main>
            <section v-if="0 < keywords.length">
                <div class="title">
                    <span>Search History</span>
                    <i @click="emptyAll" class="icon-delete"></i>
                </div>
                <ul>
                    <li v-for="keyword in keywords" :key="keyword" @click="$router.push({path: '/list', query: {keyword}})">{{keyword}}</li>
                </ul>
            </section>
    
            <section>
                <div class="title">
                    <span>Explore</span>
                </div>
                <ul>
                    <li v-for="n in 10" :key="n">{{n}}dsfdsfxx</li>
                </ul>
            </section>
        </main>
    </ScrollView>
</template>
<script>
import Store from 'store';
import VInput from '@/packages/Input/Input'
export default {
    name: 'Search',

    data() {
        return {
            keywords: [],
            keyword: '',
            placeholder: 'please !'
        };
    },

    mounted() {
        this.keywords = Store.get('keywords');
    },

    methods: {
        search(e) {
            if (13 == e.keyCode) {
                var keywords = Store.get('keywords');
                if (undefined == keywords) {
                    keywords = [];
                }
                keywords.push(this.keyword);
                Store.set('keywords', keywords);
                this.$router.push({ path: '/list', query: { keyword: this.keyword } });
            }
        },

        emptyAll() {
            Store.remove('keywords');
            this.keywords = [];
        }
    },

    components: {
        VInput
    }
}

</script>
<style scoped lang="scss">
@import '../scss/theme.scss';
.page-search {
    header {
        background: $background;
        padding: $gutter * 3 $gutter * 3 $gutter * 3 0;
        border-bottom: 1px solid $lightest;
        display: flex;
        .button-back {
            background: url('../assets/back.svg');
            background-size: 100%;
            height: $gutter*8;
            width: $gutter*8;
            display: block;
        }
        .input {
            flex: 1;
            background: $lightest;
            padding-left: $gutter * 3;
            border-radius: $borderRadius;
        }
    }

    main {
        padding: 3 * $gutter;
        section {
            .title {
                padding: 3*$gutter 0;
                display: flex;
                span {
                    flex: 1;
                    font-size: $bigger;
                }
                i.icon-delete {
                    display: block;
                    width: .4rem;
                    height: .4rem;
                    background: url('../assets/delete.svg') center center no-repeat;
                    background-size: 100%;
                }
            }
            >ul {
                >li {
                    font-size: $big;
                    color: $darker;
                    background: $lightest;
                    border-radius: .6rem;
                    display: inline-block;
                    padding: $gutter*1.5 $gutter * 3;
                    margin-right: $gutter * 3;
                    margin-bottom: $gutter * 3;
                }
            }
        }
    }
}
</style>
