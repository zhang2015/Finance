<template>
  <div class="article">
      <div class="video">
        <video controls :poster="data.article.cover">
          <source :src="data.article.url" type="video/mp4">
        </video>
      </div>
      <p class="article_title">{{data.article.title}}</p>
      <div class="article_info">
          <img :src="data.article.avatar" alt="">
          <span>{{data.article.nick_name}}</span>
          <span>{{data.article.created_month}}</span>
          <span>{{data.article.click}}阅读</span>          
      </div>
      <comment :id="id"></comment>
      <sharefooter :sharedata="sharedata"></sharefooter>
  </div>
</template>

<script>
import comment from "./commentvideo";
import sharefooter from "../module/sharefooter";
export default {
  data() {
    return {
      articleapi: this.common.path + "api/user_video/detail",
      readapi: this.common.path + "api/article/click",
      id: this.$route.params.id,
      data: {
        article: {}
      },
      hasdata: false,
      sharedata:{
        title: '',
        img: '',
        desc: '',
        iosOpenLink: '',
	      andOpenLink: ''
      }
    };
  },
  mounted() {
    var _this = this;
    this.$http
      .get(_this.articleapi + "?video_id=" + _this.id)
      .then(function(response) {
        _this.data.article = response.data.data.detail;
        _this.sharedata.title = _this.data.article.title;
      _this.sharedata.desc = _this.data.article.sub_title;
      _this.sharedata.img = _this.data.article.cover;
      _this.sharedata.iosOpenLink='type=open_video&video_id='+_this.$route.params.id;
      _this.sharedata.andOpenLink='open_video?video_id='+_this.$route.params.id;
      _this.common.changeTitle( _this.sharedata.title);
      })
      .catch(function(response) {
        console.log(response);
      });
      
  },
  components: {
    comment,
    sharefooter
  },
  watch: {}
};
</script>

<style>
.article{
  position: absolute;
  width: 100%;
  min-height: 100%;
  background: #f0f0f0;
  padding-bottom: 1.333333rem;
}
.article_title {
  font-size: 0.533333rem;
  line-height: 0.6rem;
  padding: 0.266667rem;
  color: #000000 !important;
}
.article_info {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0.266667rem;
  color: #999;
  font-size: 0.346667rem;
}
.article_info img {
  display: block;
  width: 0.533333rem;
  height: 0.533333rem;
  border-radius: 100%;
}
.article_info span {
  padding: 0 0.266667rem;
}
.article_content {
  padding: 0.266667rem;
}
.video video {
  width: 100%;
  height: auto;
}
.article_content_video {
  padding: 0.266667rem;
  font-size: 0.4rem;
  color: #666;
}
.article p{
  background: #f0f0f0 !important;
}
</style>
