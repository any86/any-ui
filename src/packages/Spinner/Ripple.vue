<script>
export default {
    name: 'AtomSpinnerRipple',
    
    functional: true,
    
    render(h, context){
        return h('i', {
            class: ['atom-spinner-ripple', `atom-spinner-ripple--${context.props.type}`]
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