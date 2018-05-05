<template>
    <main class="simulator">
        <header class="simulator__header-bar">
            <div class="bar__operator">中国移动</div>
            <div class="bar__time">19:01:30</div>
            <div class="bar__battery">86%</div>
        </header>
        <section class="simulator__url">
            <input type="text">
        </section>
        <iframe :src="src" scrolling="auto" frameborder="0" height="580" width="320" class="simulator__preview"></iframe>
    </main>
</template>
<script>
export default {
    name: 'Preview',

    props: {
        src: {
            type: String,
            default: 'https://383514580.github.io/atom/#/index'
        }
    }
};
</script>
<style lang="scss" scoped>
.simulator {
    background: #fff;
    position: fixed;
    top: 150px;
    right: 50px;
    border: 1px solid #eee;
    overflow: hidden;
    box-shadow: 1px 2px 10px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    &__header-bar {
        padding: 5px;
        display: flex;
        align-items: center;
        > .bar {
            &__operator {
                flex:1;
                font-size: 12px;
            }

            &__time {
                flex:1;
                font-size: 12px;
            }

            &__battery{
                width:40px;
                font-size: 12px;
                justify-self: center;
                text-align: center;
                background: #ccc;color:#fff;
                position: relative;
            }
        }
    }

    &__url {
        padding: 5px;
        margin: 0 5px;
        background: #eee;
        input {
            border: 0;
            background: transparent;
            outline: none;
            padding: 2px 5px;
        }
    }

    &__preview {
        margin-top: 5px;
        border-top: 1px solid #eee;
    }
}
</style>
