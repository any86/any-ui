<template>
    <svg :class="['star-'+type]" v-on="$listeners" width="22px" height="20px" viewBox="0 0 22 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g v-if="'full' === type" transform="translate(-2.000000, -3.000000)" fill="#FF9500">
                <polygon points="13 19.5 6.53436222 22.8991869 7.76918916 15.6995935 2.53837832 10.6008131 9.76718111 9.55040653 13 3 16.2328189 9.55040653 23.4616217 10.6008131 18.2308108 15.6995935 19.4656378 22.8991869"></polygon>
            </g>

            <g v-else transform="translate(-2.000000, -3.000000)" stroke="#FF9500">
                <path d="M18.8015723,21.9851792 L17.6935706,15.5250335 L22.3871411,10.949933 L15.9007861,10.0074104 L13,4.12977573 L10.0992139,10.0074104 L3.61285889,10.949933 L8.30642945,15.5250335 L7.19842774,21.9851792 L13,18.9351121 L18.8015723,21.9851792 Z" id="Star"></path>
            </g>
        </g>
    </svg>
</template>

<script>
export default {
    name: 'AtomStar',


    props: {
        type: {
            type: String,
            default: 'full',
            validator(type){
                return -1 !== ['full', 'empty'].indexOf(type);
            }
        }
    }
};
</script>
<style lang="scss">
@import '../../scss/variables.scss';
</style>
