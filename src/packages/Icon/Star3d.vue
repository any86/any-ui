<template>
<svg v-on="$listeners" v-bind="$attrs" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" :style="{width: `${size}px`, height: `${size}px`}">
    <defs>
        <linearGradient x1="50%" y1="0%" x2="50%" y2="97.3649747%" id="linearGradient-1">
            <stop stop-color="#FFFB91" offset="0%"></stop>
            <stop stop-color="#FFD55D" offset="90.6923794%"></stop>
            <stop stop-color="#FFD259" offset="100%"></stop>
        </linearGradient>
        <linearGradient x1="50%" y1="0%" x2="50%" y2="92.9107666%" id="linearGradient-2">
            <stop stop-color="#FFA922" offset="0%"></stop>
            <stop stop-color="#EA6E03" offset="100%"></stop>
        </linearGradient>
        <path d="M10,14 L6.19445406,16.0006939 C5.95003177,16.1291943 5.64771819,16.035221 5.51921778,15.7907988 C5.46804825,15.6934685 5.45039091,15.5819845 5.46897933,15.4736057 L6.19577393,11.236068 L3.1170226,8.23502713 C2.91928081,8.04227652 2.91523465,7.72571989 3.10798526,7.5279781 C3.18473956,7.44923628 3.28531077,7.39799269 3.39412928,7.38218044 L7.64885899,6.76393202 L9.55163196,2.90849288 C9.67384311,2.66086605 9.97365603,2.55919655 10.2212829,2.68140769 C10.3198892,2.73007281 10.3997029,2.80988657 10.448368,2.90849288 L12.351141,6.76393202 L16.6058707,7.38218044 C16.8791431,7.42188925 17.0684839,7.67561067 17.0287751,7.9488831 C17.0129628,8.05770162 16.9617192,8.15827282 16.8829774,8.23502713 L13.8042261,11.236068 L14.5310207,15.4736057 C14.5777012,15.7457739 14.3949073,16.0042518 14.122739,16.0509324 C14.0143602,16.0695208 13.9028762,16.0518634 13.8055459,16.0006939 L10,14 Z" id="path-3"></path>
        <filter x="-12.5%" y="-12.5%" width="125.0%" height="125.0%" filterUnits="objectBoundingBox" id="filter-4">
            <feGaussianBlur stdDeviation="0.5" in="SourceAlpha" result="shadowBlurInner1"></feGaussianBlur>
            <feOffset dx="0" dy="-1" in="shadowBlurInner1" result="shadowOffsetInner1"></feOffset>
            <feComposite in="shadowOffsetInner1" in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="shadowInnerInner1"></feComposite>
            <feColorMatrix values="0 0 0 0 0.960784314   0 0 0 0 0.603921569   0 0 0 0 0.133333333  0 0 0 0.7 0" type="matrix" in="shadowInnerInner1" result="shadowMatrixInner1"></feColorMatrix>
            <feGaussianBlur stdDeviation="0.5" in="SourceAlpha" result="shadowBlurInner2"></feGaussianBlur>
            <feOffset dx="0" dy="1" in="shadowBlurInner2" result="shadowOffsetInner2"></feOffset>
            <feComposite in="shadowOffsetInner2" in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="shadowInnerInner2"></feComposite>
            <feColorMatrix values="0 0 0 0 1   0 0 0 0 1   0 0 0 0 0.792156863  0 0 0 1 0" type="matrix" in="shadowInnerInner2" result="shadowMatrixInner2"></feColorMatrix>
            <feMerge>
                <feMergeNode in="shadowMatrixInner1"></feMergeNode>
                <feMergeNode in="shadowMatrixInner2"></feMergeNode>
            </feMerge>
        </filter>
    </defs>
    <g id="Star-/-Full" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="Star">
            <use fill="url(#linearGradient-1)" fill-rule="evenodd" xlink:href="#path-3"></use>
            <use fill="black" fill-opacity="1" filter="url(#filter-4)" xlink:href="#path-3"></use>
            <path stroke="url(#linearGradient-2)" stroke-width="1" d="M10,14.5648879 L6.42712462,16.4432596 C5.93828004,16.7002604 5.33365288,16.5123139 5.07665207,16.0234693 C4.974313,15.8288088 4.93899833,15.6058408 4.97617517,15.3890831 L5.65853365,11.4106279 L2.76801675,8.59307031 C2.37253317,8.2075691 2.36444087,7.57445583 2.74994208,7.17897225 C2.90345068,7.02148862 3.10459309,6.91900144 3.32223012,6.88737693 L7.31682623,6.30692814 L9.10326392,2.68721002 C9.34768622,2.19195636 9.94731205,1.98861736 10.4425657,2.23303965 C10.6397783,2.33036989 10.7994058,2.48999741 10.8967361,2.68721002 L12.6831738,6.30692814 L16.6777699,6.88737693 C17.2243147,6.96679455 17.6029962,7.4742374 17.5235786,8.02078226 C17.4919541,8.23841929 17.3894669,8.4395617 17.2319833,8.59307031 L14.3414664,11.4106279 L15.0238248,15.3890831 C15.1171858,15.9334196 14.751598,16.4503755 14.2072616,16.5437365 C13.9905039,16.5809134 13.7675359,16.5455987 13.5728754,16.4432596 L10,14.5648879 Z"></path>
        </g>
    </g>
</svg>
</template>

<script>
export default {
    name: 'AtomIconStar',

    props: {
        size: {
            default: 48
        },

        status: {
            type: Number,
            default: 1
        }
    }
};
</script>