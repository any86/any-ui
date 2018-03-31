const ua = navigator.userAgent;
export const isAndroid = ua.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
export const isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
export default {
    isAndroid,
    isiOS
};