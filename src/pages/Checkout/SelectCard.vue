<template>
    <section class="row-select-card">
        <header>SELECT CARD</header>
        <main>
            <ul>
                <li>Card 1 or Card 2 or Card 3</li>
                <li class="active">Card 2</li>
                <li>Card 3</li>
            </ul>
        </main>
    </section>
</template>
<script>
export default {
    name: 'SelectCard',

    props: {
        dataSource: {
            type: Array
        }
    }
}
</script>
<style lang="scss" scoped>
@import '../../scss/theme.scss';
.row-select-card {
    background: $lightest;
    >header {
        font-size: $big;
        color: $dark;
        padding: 3*$gutter;
        padding-bottom: 0;
    }
    >main {
        width: 100%;
        overflow-x: scroll;
        overflow-y: hidden;
        >ul {
            display: flex;
            padding: $gutter * 3;
            align-items: center;
            li {
                background: $background;
                height: 2rem;
                text-align: center;
                flex: 1 0 45%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: $gutter * 3;
                border-radius: $borderRadius;
                border: 1px solid $lighter;
                font-size: $bigger;
                // word-wrap: break-word;
                &.active {
                    border: 1px solid $danger;
                }
            }
        }
    }
}
</style>
