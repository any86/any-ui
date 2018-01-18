export default function (src, {isCrossOrigin = false, onInit = () => { }, onSuccess = () => { }, onError = () => { }, onAbort = () => { } }) {
    const startTime = Date.now();
    let img = new Image();
    img.src = src;
    if(isCrossOrigin) img.crossOrigin = 'anonymous';
    onInit(img);
    img.onload = event => {
        event.width = img.width;
        event.height = img.height;
        event.costTime = Date.now() - startTime;
        onSuccess(event);
        img.null;
    };

    img.onerror = event => {
        event.width = img.width;
        event.height = img.height;
        event.costTime = Date.now() - startTime;
        onError(event);
        img.null;
    };

    img.onabort = event => {
        event.width = img.width;
        event.height = img.height;   
        event.costTime = Date.now() - startTime;
        onAbort(event);
        img.null;
    };
};