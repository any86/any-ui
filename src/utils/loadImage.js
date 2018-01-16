export default function (src, {isCrossOrigin = false, onInit = () => { }, onSuccess = () => { }, onError = () => { }, onAbort = () => { } }) {
    const startTime = Date.now();
    let img = new Image();
    img.src = src;
    if(isCrossOrigin) img.crossOrigin = 'anonymous';
    onInit(img);
    img.onload = event => {
        event.costTime = Date.now() - startTime;
        onSuccess(event);
        img.null;
    };

    img.onerror = event => {
        event.costTime = Date.now() - startTime;
        onError(event);
        img.null;
    };

    img.onabort = event => {
        event.costTime = Date.now() - startTime;
        onAbort(event);
        img.null;
    };
};