(function() {
    let commonData = {
        'val1': '码龄：5年',
        'val2': '文章：312',
        'val3': '粉丝：3654',
        'friendLinks': [{
            'name': 'Khaos',
            'link': 'http://khaos.net.cn/'
        }, {
            'name': '趣星座',
            'link': 'http://www.funxingzuo.top/'
        }, {
            'name': 'USB中文网',
            'link': 'http://www.usbzh.com/'
        }, {
            'name': 'Windows内核开发',
            'link': 'http://www.pnpon.com/'
        }, {
            'name': '硬核开发|硬件工程师家园',
            'link': 'http://www.busrom.com/'
        }, {
            'name': '字节流|软件工程师家园',
            'link': 'http://www.bytekits.com/'
        }, {
            'name': '实用小工具1',
            'link': 'http://www.610i.com/'
        }],
        'latest': [{
            'title': '半导体储存',
            'url': '/blocks/hardware.html#5_3'
        }, {
            'title': '时序电路设计',
            'url': '/blocks/hardware.html#5_2'
        }, {
            'title': 'FPGA原理',
            'url': '/blocks/hardware.html#3_1'
        }, {
            'title': 'PID算法',
            'url': '/blocks/hardware.html#4_0'
        }, {
            'title': 'ARM-GCC实战环境构建',
            'url': '/blocks/hardware.html#2_4'
        }, {
            'title': 'Startup编写',
            'url': '/blocks/hardware.html#2_3'
        }, {
            'title': 'LD链接脚本',
            'url': '/blocks/hardware.html#2_2'
        }, {
            'title': 'PlatformIO',
            'url': '/blocks/hardware.html#2_1'
        }, {
            'title': 'ARM编译器',
            'url': '/blocks/hardware.html#2_0'
        }, {
            'title': 'USB协议介绍',
            'url': '/blocks/hardware.html#5_0'
        }, {
            'title': 'USB设备介绍',
            'url': '/blocks/hardware.html#5_1'
        }, {
            'title': 'USB通信介绍',
            'url': '/blocks/hardware.html#5_2'
        }]
    }

    document.getElementById('common_1').innerText = commonData['val1']
    document.getElementById('common_2').innerText = commonData['val2']
    document.getElementById('common_3').innerText = commonData['val3']

    let node_links = document.getElementById('common_links');
    for (let i = 0; i < commonData['friendLinks'].length; i++) {
        const element = commonData['friendLinks'][i];
        const node = `<li style="color:#0e6efd;"><a style="text-decoration: none;" href="${element['link']}" target="_blank">${element['name']}</a></li>`;
        node_links.innerHTML += node;
    }

    let node_latest = document.getElementById('latestArticles');
    for (let i = 0; i < commonData['latest'].length; i++) {
        const element = commonData['latest'][i];
        const node = `<li><a style="text-decoration: none;" href="${element['url']}" target="_blank">${element['title']}</a></li>`;
        node_latest.innerHTML += node;
    }
})()


function decodeHeaders() {
    const node_content = document.getElementById('contentBody');
    const outline_list = document.getElementById('outline');
    const children = node_content.children;
    outline_list.innerHTML = '';
    FS = ['14', '14', '14', '14', '14', '14'];
    for (const child of children) {
        if (child.nodeName.slice(0, 1) == 'H' || child.nodeName.slice(0, 1) == 'h') {
            var s = child.nodeName.slice(1, 2) - 1;
            outline_list.innerHTML += `<li onclick="document.getElementById('${child.id}').scrollIntoView();"><a style='font-size: ${FS[s]}px;'>${child.innerText}</a></li>`;
        }
    }
}