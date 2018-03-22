<script>
export default {
    name: 'AtomSpinnerRipple',
    
    // 函数组件不会主动支撑组件上定义的class值
    // functional: true,
    
    render(h){
        return h('i', {
            class: ['atom-spinner-ripple', `atom-spinner-ripple--${this.type}`]
        })
    },

    props: {
        type: {
            type: String,
            default: 'primary'
        }
    }
};
</script>