export default function (src, { onInit = () => { }, onSuccess = () => { }, onError = () => { }, onAbort = () => { } }) {
    const startTime = Date.now();
    let img = new Image();
    img.src = src;
    image.crossOrigin = 'anonymous';
    onInit(img);
    img.onload = event => {
        const costTime = Date.now() - startTime;
        onSuccess({...event, costTime});
        img.null;
    };

    img.onerror = event => {
        const costTime = Date.now() - startTime;
        onError({...event, costTime});
        img.null;
    };

    img.onabort = event => {
        const costTime = Date.now() - startTime;
        onAbort({...event, costTime});
        img.null;
    };
};