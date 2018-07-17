<template>
    <div class="dynamic">
        <div class="top"><img src="../assets/images/logo.png" alt=""></div>
        <div class="header-box">
            <div class="header">
                <img :src="data.avatar" alt="">
                <div>
                    <p><span class="edit-name">{{data.nick_name}}</span><span class="edit-sex" :class="data.gender == 1?'edit-man':'edit-woman'"></span></p>
                    <p><span>{{data.human_time}}</span><span>{{data.total_reads}}阅读</span></p>
                </div>
            </div>
            <p class="content-txt">{{data.content_view}}</p>
            <div class="content-img">
                <span v-for="str in list" :key="str.id" :style="{ backgroundImage: 'url(' + str.pic + ')' }"></span>
            </div>
            <div class="like">
                <span class="like-title">赞：</span>
                <div class="likes">
                    <img v-for="item in likes" :key="item.id" :src="item.avatar" alt="">
                </div>
                <img src="../assets/images/liked.png" class="liked-icon" alt="">
                <span class="like-num">{{data.total_like}}</span>
            </div>
        </div>
        <div class="comments-box">
            <p class="comment-title">全部评论 （共{{data.total_comments}}条）</p>
            <ul>
                <li v-for="item in comment" :key="item.id">
                    <span class="name">{{item.nick_name}}:</span>
                    <span>{{item.content}}</span>
                </li>
            </ul>
        </div>
        <sharefooter></sharefooter>
    </div>
</template>

<script>
import sharefooter from './module/sharefooter.vue'

export default {
    data(){
        return{
            id: this.$route.params.id,
            data:'',
            list:'',
            likes:'',
            comment:''
        }
    },
    mounted(){
        this.getContent();
        this.getComment();
    },
    methods:{
        getContent: function(){
            this.$ajax.get('api/circle/detail',{
                'circle_id':this.id
            },response => {
                if (response.data.code == 200) {
                    this.data = response.data.data;
                    this.list = response.data.data.pictures;
                    this.likes = response.data.data.likes;
                    this.common.changeTitle( this.data.content);
                }
            })
        },
        getComment: function(){
            this.$ajax.get('api/comment/circle_comment_list',{
                'circle_id':this.id,
                'page':1
            },response => {
                if (response.data.code == 200) {
                    this.comment = response.data.data.data;
                }
            })
        }
    },
    components:{
        sharefooter
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/dynamic.scss';
</style>
