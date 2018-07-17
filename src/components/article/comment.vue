<template>
  <div class="comment">
      <span class="title">评论</span>
      <ul>
          <li v-for="item in data" :key="item.id">
              <p class="comment_head">
                  <img class="avaimg" :src="item.avatar" alt="">
                  <span class="nick_name">{{item.nick_name}}</span>
                  <span>{{item.total_like}}<img src="../../assets/images/like.png"></span>
              </p>
              <span class="comment_content">{{item.content}}</span>
              <span class="comment_time">{{item.created_at}}</span>
          </li>
         <p v-show="nomore" class="nomore">没有更多</p>
      </ul> 
  </div>
</template>

<script>
import scroll from '../../assets/api/scroll.js'
export default {
  data() {
    return {
      page: 2,
      oldpage: "",
      apicomment: this.common.path + "api/comment/lists",
      nomore: false
    };
  },
  props: ["data", "id"],
  methods: {
    getlist: function() {
      if (this.page == this.oldpage) {
        return false;
      }
      this.oldpage = this.page;
      this.$http
        .get(this.apicomment + "?article_id=" + this.id + "&page=" + this.page)
        .then(function(response) {
          if (response.data.data.comments.data.length == 0) {
            this.nomore = true;
            return false
          }
          for (var i = 0; i < response.data.data.comments.data.length; i++) {
            this.data.push(response.data.data.comments.data[i]);
          }
          this.page++;
        })
        .catch(function(response) {
          console.log(response);
        });
    }
  },
  mounted() {
    scroll.refresh(this.getlist);
  }
};
</script>

<style>
.comment{
    padding-bottom: 1.333333rem;
}
.comment .title {
  font-size: 0.4rem;
  color: #666;
  padding: 0.266667rem;
}
.comment ul li {
  padding: 0.266667rem;
}
.comment_head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #999;
}
.comment_head img.avaimg {
  width: 0.666667rem;
  height: 0.666667rem;
  border-radius: 100%;
}
.comment_head .nick_name {
  flex-grow: 1;
  padding-left: 0.266667rem;
}
.comment_head span {
  font-size: 0.373333rem;
}
.comment_head span img {
  width: 0.4rem;
  height: 0.4rem;
  padding-left: 0.266667rem;
}
.comment_content {
  display: block;
  padding: 0.266667rem;
  padding-left: 0.666667rem;
  font-size: 0.4rem;
  color: #333;
  line-height: 0.5rem;
}
.comment_time {
  display: block;
  margin-left: 0.666667rem;
  border-bottom: 1px solid #f5f5f5;
  padding: 0.266667rem 0;
  font-size: 0.32rem !important;
  color: #999;
}
.nomore{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 0.8rem;
    font-size: 0.4rem;
    color: #999; 
}
</style>
