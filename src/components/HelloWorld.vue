<template>
  <div class="sugar">
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="str in banner" :key="str.id" :style="{ backgroundImage: 'url(' + str.pic + ')' }"></div>
        </div>
        <div class="swiper-pagination"></div>
    </div>
    <div class="sugar-list">
      <span @click="routePath()">全部</span>
      <img src="../assets/images/more.png" alt="">
    </div>
    <div class="sugar-recommend">
      <div class="sugars" v-for="item in gift" :key="item.id" @click="pathToDetail(item.id,item.type)">
        <img :src="item.img" alt="">
        <section>
          <span>{{item.en_name}}</span>
          <!-- <span>还差99999糖果兑换</span> -->
        </section>
        <p>{{item.name}}</p>
        <p>{{item.price}}糖果</p>
      </div>
    </div>
    <div class="activity-list">
      <div class="title">
        <span>最新活动</span>
      </div>
      <div class="activitys" v-for="item in activity" :key="item.id">
        <img :src="item.pic" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
import scroll from '../assets/api/scroll.js'

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      banner:[],
      gift:[],
      activity:[],
      page:1,
      reqed:false
    }
  },
  mounted() {
            this.init();
            this.getActivityList();
            scroll.refresh(this.getActivityList);
            this.common.changeTitle('糖果');
  },
  updated(){
    this.newswiper()
  },
  methods:{
    newswiper: function(){
      var swiper = new Swiper('.swiper-container', {
                autoplay: true,
                pagination: {
                  el: '.swiper-pagination',
                },
                loop: true
            });
    },
    getActivityList: function(){
      if(this.reqed){
        return false;
      }
      this.reqed = true;
      this.$ajax.get('api/gift/activity', {
          "page": this.page
      }, response => {
        if (response.data.code == 200) {
          if (!response.data.data.data[0]) {
            return false;
          } else {
            this.activity = this.activity.concat(response.data.data.data);
            this.page++;
            this.reqed = false;
          }
        }
      });
    },
    init: function(){
      this.$ajax.get('api/gift',{},response => {
        if (response.data.code == 200) {
          this.banner = response.data.data.banners;
          this.gift = response.data.data.gift;
        }
      })
    },
    pathTo:function(path){
      // location.href = path;
      this.common.toPage(path)
    },
    routePath:function(){
      // this.$router.push({ path: path })
      this.common.toPage('/index.html#/sugarList')
    },
    pathToDetail: function(id,type){
      // this.$router.push({ name: 'sugarDetail', params: { id: id }})
      this.common.toPage('/index.html#/sugarDetail/'+id+'/'+type)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../assets/css/sugar.scss';
.sugar {
  .swiper-container {
        width: 100%;
        height: 375px;
        .swiper-wrapper {
            width: 100%;
            height: 100%;
        }
        .swiper-slide {
            background-position: center;
            background-size: cover;
            width: 100%;
            height: 100%;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .swiper-pagination-bullet {
            width:0.833rem;
            height: 0.833rem;
            display: inline-block;
            background: #7c5e53;
        }
  }
  .sugar-list{
    display: flex;
    width: 100%;
    height: 106px;
    align-items: center;
    justify-content: flex-end;
    background: #ffffff;
    span{
      font-size: 30px;
      color: #999999;
    }
    img{
      width: 21px;
      height: 35px;
      padding-right: 20px;
      padding-left: 16px;
    }
  }
  .activity-list{
    background: #ffffff;
    .title{
      display: flex;
      width: 100%;
      height: 98px;
      justify-content: flex-start;
      align-items: center;
      span{
        font-size: 30px;
        color: #000;
        padding-left: 24px;
      }
    }
    .activitys{
      width: 710px;
      height: 300px;
      margin: auto;
      padding-bottom: 20px;
      img{
        width: 100%;
        height: 100%;
        border-radius: 10px;
      }
    }
  }
}
</style>
