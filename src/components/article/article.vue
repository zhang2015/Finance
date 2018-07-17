<template>
  <div class="article">
      <div class="video" v-if="data.article.type == 2">
        <video controls :poster="data.article.cover_url">
          <source :src="data.article.video_url" type="video/mp4">
        </video>
      </div>
      <p class="article_title">{{data.article.title}}</p>
      <div class="article_info">
          <img :src="data.article.avatar" alt="">
          <span>{{data.article.nick_name}}</span>
          <span>{{data.article.created_month}}</span>
          <span>{{data.article.viewed_time}}阅读</span>          
      </div>
      <div  v-if="data.article.type == 1" class="article_content" v-html="data.article.content"></div>
      <div  v-else class="article_content_video" v-html="data.article.subtitle"></div>
      <comment :data="commentdata.data" :id="id"></comment>
      <sharefooter :sharedata="sharedata"></sharefooter>
  </div>
</template>

<script>
import comment from "./comment";
import sharefooter from "../module/sharefooter";
export default {
  data() {
    return {
      articleapi: this.common.path + "api/article/detail",
      readapi: this.common.path + "api/article/click",
      id: this.$route.params.id,
      data: {
        article: {}
      },
      commentdata: "",
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
      .get(_this.articleapi + "?article_id=" + _this.id)
      .then(function(response) {
        _this.data = response.data.data;
        _this.sharedata.title = _this.data.article.title;
      _this.sharedata.desc = _this.data.article.subtitle;
      _this.sharedata.img = _this.data.article.cover_url;
      _this.sharedata.iosOpenLink='type=open_article&article_id='+_this.$route.params.id+'&article_type='+_this.data.article.type;
      _this.sharedata.andOpenLink='open_article?article_id='+_this.$route.params.id+'&article_type='+_this.data.article.type
        _this.commentdata = response.data.data.comments;
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
  color: #000 !important;
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
