export default{
    // path:'http://lscj.api.test.cnwan.com/',
    // Url: 'http://lscj.api.test.cnwan.com#/',
    // path: 'http://finance.adobesun.com/',
    // Url: 'http://finance.adobesun.com#/',
    path: 'http://'+window.location.host+'/',
    Url: 'http://'+window.location.host+'#/',
    token:'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjI1LCJpc3MiOiJodHRwOi8vZmluYW5jZS5hZG9iZXN1bi5jb20vYXBpL2xvZ2luL2xvZ2luIiwiaWF0IjoxNTMwNTEyNDMyLCJleHAiOjE4OTA1MTI0MzIsIm5iZiI6MTUzMDUxMjQzMiwianRpIjoiMU4xck1rWGtmbDg5NEpyaCJ9.jxZfiElJGPK9JIZnj-zWdLUKcp7_KlJaumOtr1UhqcE',
    toPage(url) { //跳转链接
        if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
            var data = {
                type: 'toProductDetail',
                url: url
            };
            window.webkit.messageHandlers.OC_Manager.postMessage(data);
        }
        if (navigator.userAgent.match(/android/i)) {
            window.android.toProductDetail(url);
        }
    },
    hashare(obj) { //有分享
        if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
            var data = {
                title: obj.title,
                des: obj.des,
                img: obj.img,
                shareUrl: obj.shareUrl,
                type: 'toHashare'
            };
            window.webkit.messageHandlers.OC_Manager.postMessage(data);
        }
        if (navigator.userAgent.match(/android/i)) {
            window.android.toHashare(obj.title, obj.des, obj.img, obj.shareUrl);
        }
    },
    changeTitle(data){
        document.title = data;
    },
    getCookie(name){
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg)){
            return unescape(arr[2])
        }else{
            return null;
        }
    }  
}