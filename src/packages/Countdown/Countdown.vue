<script>
export default {
    name: 'Countdown',

    props: {
        value: {
            type: [Number, String],
            default: 108000
        }
    },

    render(createElement) {
        var text = [];
        if (0 < this.day) {
            text.push(this.day + 'd: ');
        }
        text.push(this.hour + 'h: ');
        text.push(this.minute + 'm: ');
        text.push(this.seconds + 's ');
        return createElement('p', text.join(''));
    },

    data() {
        return { day: 0, hour: 0, minute: 0, seconds: 0, time: 0 };
    },

    created() {
        this.time = this.value;
        this.cale();
    },

    mounted() {
        setInterval(() => {
            this.time--;
            this.cale();
        }, 1000);
    },

    methods: {
        cale() {
            this.day = Math.floor(this.time / 60 / 60 / 24);
            this.hour = Math.floor(this.time / 60 / 60 % 24);
            this.minute = Math.floor(this.time / 60 % 60);
            this.seconds = this.time % 60;
        }
    }
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
p {
    color: $danger;
}
</style>
