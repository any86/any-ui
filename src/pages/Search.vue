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

    // mounted() {
    //     this.keywords = Store.get('keywords') || [];
    //     this.$loading.close();
    // },

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
        padding: $gutter $gutter $gutter 0;
        border-bottom: 1px solid $lightest;
        display: flex;
        align-items: center;
        .button-back {
            background: url('../assets/back.svg');
            background-size: 100%;
            height: $gutter*2;
            width: $gutter*2;
            display: block;
        }
        .input {
            flex: 1;
            background: $lightest;
            padding-left: $gutter;
            border-radius: $borderRadius;
        }
    }

    main {
        padding: $gutter;
        section {
            .title {
                padding: $gutter 0;
                display: flex;
                span {
                    flex: 1;
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

                    color: $darker;
                    background: $lightest;
                    border-radius: .6rem;
                    display: inline-block;
                    padding: $gutter/2 $gutter;
                    margin-right: $gutter;
                    margin-bottom: $gutter;
                }
            }
        }
    }
}
</style>
