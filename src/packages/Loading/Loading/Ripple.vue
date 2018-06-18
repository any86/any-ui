<script>
export default {
    name: 'AtomLoadingRipple',
    
    // 函数组件不会主动支撑组件上定义的class值
    // functional: true,
    
    render(h){
        return h('i', {
            class: ['atom-loading-ripple', `atom-loading-ripple--${this.theme}`]
        })
    },

    props: {
        theme: {
            type: String,
            default: 'primary'
        }
    }
};
</script>