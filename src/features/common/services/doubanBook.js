/*
author_name: "李鸿君"
id: "35044776"
pic: "https://img9.doubanio.com/view/subject/s/public/s33729645.jpg"
title: "大话软件工程——需求分析与软件设计"
type: "b"
url: "https://book.douban.com/subject/35044776/"
year: "2020"
 */
export const search = (keyword = '9787302544425') => new Promise((resolve, reject) =>
    uni.request({
        url: 'https://book.douban.com/j/subject_suggest',
        data: {
            q: keyword
        },
        header: {
            "content-type": "text/html"
        },
        success: (res) => resolve(res.data),
        fail: reject
    }
))