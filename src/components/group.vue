<template>
    <div class="group">
        <div class="header">
            <div class="head_bg">
                <span class="icon"></span>
            </div>
            <p class="group_name">比特圈子</p>
            <div class="group_item">
                <span class="group_items">动态2.2W</span>
                <span class="group_items">点赞2.2W</span>
                <span class="group_items">评论2.2W</span>
                <span class="group_items">成员2.2W</span>
            </div>
        </div>
        <div class="group_desc">
            <p class="group_title">社群介绍</p>
            <p class="group_info"> 现在在使用 Comment 的时候，可以传入 onDeleteComment 和 index 两个参数。index 用来标志这个评论在列表的下标，这样点击删除按钮的时候我们才能知道你点击的是哪个评论，才能知道怎么从列表数据中删除。用户点击删除会调用 handleDeleteComment ，它会调用从上层传入的 props. onDeleteComment 函数告知上一层组件删除的消息，并且把评论下标传出去。现在修改 src/CommentList.js 让它把这两个参数传进 </p>
        </div>
        <sharefooter></sharefooter>
    </div>
</template>

<script>
import sharefooter from './module/sharefooter.vue'

export default {
    data(){
        return{

        }
    },
    components:{
        sharefooter
    }
}
</script>

<style lang="scss" scoped>
.group{
    .header{
        width: 100%;
        height: 500px;
        background: #fff;
        .head_bg{
            width: 100%;
            height: 200px;
            position: relative;
            background: #cccccc;
            .icon{
                position: absolute;
                width: 100px;
                height: 100px;
                background: #999;
                left: 50%;
                bottom: -30px;
                margin-left: -50px;
            }
        }
        .group_name{
            text-align: center;
            padding-top: 40px;
        }
        .group_item{
            display: flex;
            padding: 0 80px;
            align-items: center;
            justify-content: space-between;
            .group_items{
                padding-top: 100px;
                width: 120px;
                text-align: center;
            }
        }
    }
    .group_desc{
        width: 100%;
        margin-top: 20px;
        background: #fff;
        .group_title{
            padding: 20px;
            border-bottom: 1px solid #cccccc;
        }
        .group_info{
            padding: 20px;
        }
    }
}
</style>
