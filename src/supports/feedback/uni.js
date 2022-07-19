export const $toast = (msg, options = {}) => {
    uni.showToast({
        title: msg,
        duration: 2000,
        //mask: true,
        ...options
    })
    return () => uni.hideToast();
}

export const $alert = (title, content = '', options = {}) => {
    if(typeof content === 'object') {
        Object.assign(options, content)
        content = ''
    }
    return uni.showModal({
        title,
        content,
        showCancel: false,
        ...options
    });
}

export const $confirm = (title, content = '', options = {}) => {
    if(typeof content === 'object') {
        Object.assign(options, content)
        content = ''
    }
    return uni.showModal({
        title,
        content,
        ...options
    });
}

export const $prompt = (title, content = '', options = {}) => {
    if(typeof content === 'object') {
        Object.assign(options, content)
        content = ''
    }
    return uni.showModal({
        title,
        content,
        editable: true,
        ...options
    });
}

export const $loading = (title = '加载中', options) => {
    uni.showLoading({
        title,
        ...options
    });
    return () => uni.hideLoading();
}

export default {
    $toast,
    $alert,
    $confirm,
    $prompt,
    $loading
}
