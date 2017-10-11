const _hasAttrs = $attrs => {
    // vue >= 2.4.4
    return undefined != $attrs && 0 < $attrs.length;
};
export {_hasAttrs};
