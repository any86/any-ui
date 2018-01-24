export default function(src, {
    isCrossOrigin = false,
    onInit = () => {},
    onSuccess = () => {},
    onError = () => {},
    onAbort = () => {}
}) {
    const startTime = Date.now();
    let img = new Image();
    if (isCrossOrigin) img.crossOrigin = 'anonymous';
    img.src = src;
    onInit(img);
    img.onload = event => {
        event.img = img;
        event.width = img.width;
        event.height = img.height;
        event.costTime = Date.now() - startTime;
        onSuccess(event);
        img.null;
    };

    img.onerror = event => {
        event.img = img;
        event.width = img.width;
        event.height = img.height;
        event.costTime = Date.now() - startTime;
        onError(event);
        img.null;
    };

    img.onabort = event => {
        event.img = img;
        event.width = img.width;
        event.height = img.height;
        event.costTime = Date.now() - startTime;
        onAbort(event);
        img.null;
    };
};