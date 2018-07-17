<template>
    <div class="sugar-detail">
        <img :src="detail.img" class="sugar-hear" alt="">
        <div class="content" v-html="detail.introduction">
        </div>
        <div class="sugar-footer">
            <section>
                <span>{{detail.name}}</span>
                <span>{{detail.price}}糖果</span>
            </section>
            <span class="sugar-btn" :class="disable?'disable':'undisable'">{{btnstatus}}</span>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            id: this.$route.params.id,
            detail: '',
            disable: false,
            btnstatus: '糖果不足'
        }
    },
    mounted(){
        this.getDetail();
    },
    methods:{
        getDetail: function(){
            this.$ajax.get('api/gift/show/'+this.id,{},response => {
                if (response.data.code == 200) {
                    this.detail = response.data.data
                    var obj = {
                        title: response.data.data.share_title,
                        des: response.data.data.share_content,
                        img: response.data.data.share_icon,
                        shareUrl: this.common.Url+'index.html#/sugarShare/'+this.id
                    }
                    this.common.hashare(obj);
                    this.common.changeTitle( this.detail.name);
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.sugar-detail{
    .sugar-hear{
        width: 100%;
        height: auto;
        padding-bottom: 10px;
    }
    .content{
        padding: 20px;
        background: #ffffff;
        padding-bottom: 120px;
        img{
            max-width: 100%;
            height: auto;
            margin: auto;
        }
    }
    .sugar-footer{
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #f0f0f0;
        section{
            padding-left: 40px;
            span{
                display: block;
                font-size: 24px;
            }
            span:nth-child(1){
                color: #000;
                padding-bottom: 12px;
            }
            span:nth-child(2){
                color: #d81e06;
            }
        }
        .sugar-btn{
            width: 180px;
            height:50px;
            border-radius: 6px;
            font-size: 24px;
            color: #ffffff;
            text-align: center;
            line-height: 50px;
            margin-right: 20px;
        }
        .disable{
            background: #d81e06;
        }
        .undisable{
            background: #cccccc;
        }
    }
}
</style>

