<template>
  <div class="sharefooter">
      <img src="../../assets/images/open.png" class="openApp" @click="openapp">
      <div class="weixinbox" v-show="showeixinbox">
        <img src="../../assets/images/openit.png" alt="">
        <p>点击右上角，<br />在浏览器打开</p>
      </div>
  </div>
</template>

<script>
import wx from "weixin-js-sdk";

export default {
  data() {
    return {
      showeixinbox: false
    };
  },
  props: ["sharedata"],
  mounted() {
    var _this = this;
    setTimeout(function() {
      _this.weixin();
    }, 1000);
  },
  created() {
  },
  updated(){
    this.sharedatas = this.sharedata
  },
  methods: {
    weixin() {
      var _this = this;
      this.$http
        .post(this.common.path + "wechat/share/weixin.php", {
          shareUrl: "/" + window.location.search + window.location.hash
        })
        .then(function(response) {
          var data = response.data;
          data = eval("(" + data + ")");
          var title = _this.sharedata.title;
          var link = window.location.href;
          var imgUrl = _this.sharedata.img;
          var desc = _this.sharedata.desc;
          //注册接口
          wx.config({
            debug: false,
            appId: data.appId,
            timestamp: data.timestamp,
            nonceStr: data.nonceStr,
            signature: data.signature,
            jsApiList: [
              "onMenuShareTimeline",
              "onMenuShareAppMessage",
              "onMenuShareQQ",
              "onMenuShareWeibo"
            ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });
          // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在 页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready 函数中。
          wx.ready(function() {
            // 获取"分享到朋友圈"按钮点击状态及自定义分享内容接口
            wx.onMenuShareTimeline({
              title: title, // 分享标题
              link: link,
              imgUrl: imgUrl // 分享图标
            });

            // 获取"分享给朋友"按钮点击状态及自定义分享内容接口
            wx.onMenuShareAppMessage({
              title: title, // 分享标题
              desc: desc, // 分享描述
              link: link,
              imgUrl: imgUrl, // 分享图标
              type: "link" // 分享类型,music、video或link，不填默认为link
            });

            //获取"分享到QQ"按钮点击状态及自定义分享内容接口
            wx.onMenuShareQQ({
              title: title, // 分享标题
              desc: desc, // 分享描述
              link: link, // 分享链接
              imgUrl: imgUrl // 分享图标
            });

            //获取"分享到腾讯微博"按钮点击状态及自定义分享内容接口
            wx.onMenuShareWeibo({
              title: title, // 分享标题
              desc: desc, // 分享描述
              link: link, // 分享链接
              imgUrl: imgUrl // 分享图标
            });

            //获取"分享到QQ空间"按钮点击状态及自定义分享内容接口
            wx.onMenuShareQZone({
              title: title, // 分享标题
              desc: desc, // 分享描述
              link: link, // 分享链接
              imgUrl: imgUrl // 分享图标
            });
          });
        })
        .catch(function(response) {
          console.log(response);
        });
    },
    openapp() {
      if (this.isWeiXin()) {
        this.showeixinbox = true;
      } else {
        if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
          if (this.isWeiBo() || this.isQQ()) {
            this.showeixinbox = true;
          } else {
            window.location.href =
              "com.ZWChain.webApp://xchuang?" + this.sharedata.iosOpenLink; //ios app协议
            window.setTimeout(function() {
              window.location.href = "http://lscj.api.cnwan.com/download/index.html";
            }, 2000);
          }
        }
        if (navigator.userAgent.match(/android/i)) {
          window.location.href =
            "launch://finance/start/" + this.sharedata.andOpenLink; //android app协议
          window.setTimeout(function() {
            window.location.href = "http://lscj.api.cnwan.com/download/index.html"; //android 下载地址
          }, 2000);
        }
      }
    },
    isWeiXin() {
      var ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
      } else {
        return false;
      }
    },

    isWeiBo() {
      var ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/WeiBo/i) == "weibo") {
        return true;
      } else {
        return false;
      }
    },
    isQQ() {
      var ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/QQ/i) == "qq") {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style>
.sharefooter {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1.866667rem;
  background-image: url("../../assets/images/sharefbg.png");
  background-position: center;
  background-size: cover;
}
.sharefooter .openApp {
  width: 2.96rem;
  height: 0.96rem;
  padding-right: 0.4rem;
}
.weixinbox {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9;
}
.weixinbox img {
  position: absolute;
  width: 2.666667rem;
  height: 4rem;
  right: 0;
  top: 0;
}
.weixinbox p {
  padding-top: 30%;
  text-align: center;
  font-size: 0.533333rem;
  color: #ffffff;
  background: transparent !important;
}
</style>
