<template>
    <!-- <svg v-on="$listeners" v-bind="$attrs" viewBox="0 0 22 20" :style="{width: `${size}px`, height: `${size}px`}" class="atom-icon-star"
     version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g transform="translate(-2.000000, -3.000000)" fill="#FF9500">
                <polygon points="13 19.5 6.53436222 22.8991869 7.76918916 15.6995935 2.53837832 10.6008131 9.76718111 9.55040653 13 3 16.2328189 9.55040653 23.4616217 10.6008131 18.2308108 15.6995935 19.4656378 22.8991869"></polygon>
            </g>
        </g>
    </svg>
     -->

    <svg v-on="$listeners" v-bind="$attrs" viewBox="0 0 26 26" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
    :style="{width: `${size}px`, height: `${size}px`}" class="atom-icon-star">
        <defs>
            <linearGradient x1="23.2080357%" y1="12.3826214%" x2="44.3781072%" y2="62.3868075%" id="linearGradient-1">
                <stop stop-color="#FFD338" offset="0%"></stop>
                <stop stop-color="#FF9500" offset="100%"></stop>
            </linearGradient>
            <polygon id="path-2" points="13 19.5 6.53436222 22.8991869 7.76918916 15.6995935 2.53837832 10.6008131 9.76718111 9.55040653 13 3 16.2328189 9.55040653 23.4616217 10.6008131 18.2308108 15.6995935 19.4656378 22.8991869"></polygon>
            <linearGradient x1="27.7018229%" y1="44.3766276%" x2="79.0327592%" y2="87.3379794%" id="linearGradient-4">
                <stop stop-color="#FFAB14" offset="0%"></stop>
                <stop stop-color="#FF4467" offset="100%"></stop>
            </linearGradient>
        </defs>
        <g id="Graphics-/-Base-Icons-/-Common-/-Star" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <mask id="mask-3" fill="white">
                <use xlink:href="#path-2"></use>
            </mask>
            <use id="Star" fill="url(#linearGradient-1)" xlink:href="#path-2"></use>
            <path d="M11,12 C15,10 19.6666667,8 25,6 L25,0 L25,25 L1,25 C3.66666667,18.3333333 7,14 11,12 Z" id="Rectangle" fill="url(#linearGradient-4)" mask="url(#mask-3)"></path>
        </g>
    </svg>
</template>

<script>
export default {
    name: 'AtomIconStar',

    props: {
        size: {
            default: 48
        }
    }
};
</script>