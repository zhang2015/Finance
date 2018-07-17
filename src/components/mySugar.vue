<template>
    <div class="mysugar">
        <div class="mySugarHead">
            <p>糖果<br>{{coin}}</p>
        </div>
        <div class="detail-list">
            <p class="title">糖果明细</p>
            <ul>
                <li v-for="item in data" :key="item.id">
                    <p>{{item.trade_type}}</p>
                    <p>
                        <span>{{item.created_at}}</span>
                        <span v-if="item.flow_type == 1">+{{item.value}}糖果</span>
                        <span v-else :class="{green:item.flow_type == 2}">-{{item.value}}糖果</span>
                    </p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import scroll from '../assets/api/scroll.js'
export default {
    data(){
        return{
            data:[],
            page:1,
            reped:false,
            coin:'',
            // token: 'Bearer ' + this.common.getCookie('token')
            token: this.common.token
        }
    },
    mounted(){
        this.userInfo();
        this.getList();
        scroll.refresh(this.getList);
        this.common.changeTitle('我的糖果');
    },
    methods:{
        getList: function(){
            if(this.reped){
                return false
            }
            this.reped = true;
            this.$http.get(this.common.path+'api/mall/coin_record',{headers:{'Authorization':this.token}}).then(function(response){
                if (response.data.code == 200) {
                    if (!response.data.data.data[0]) {
                        return false
                    }else{
                        this.data = this.data.concat(response.data.data.data);
                        this.page++;
                        this.reped = false;
                    }
                }
            })
        },
        userInfo: function(){
            this.$http.get(this.common.path+'api/user',{headers:{'Authorization':this.token}}).then(function(response){
                if (response.data.code == 200) {
                    this.coin = response.data.data.coin;
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.mysugar{
    .mySugarHead{
        padding: 68px 0;
        background: #ffffff;
        margin-bottom: 10px;
        p{
            display: flex;
            justify-content: center;
            align-items: center;
            width: 190px;
            height: 190px;
            margin: auto;
            border-radius: 100%;
            background: #ed2814;
            color: #ffffff;
            font-size: 30px;
            text-align: center;
            line-height: 40px;
        }
    }
    .detail-list{
        background: #ffffff;
        .title{
            font-size: 30px;
            color: #000000;
            text-align: center;
            padding-top: 40px;
            padding-bottom: 20px;
        }
        ul{
            padding: 0 20px;
            li{
                padding-top: 20px;
                padding-bottom: 24px;
                border-bottom: 1px solid #cccccc;
                p:nth-child(1){
                    font-size: 30px;
                    color: #333333;
                    padding-bottom: 18px;
                }
                p:nth-child(2){
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    span:nth-child(1){
                        font-size: 26px;
                        color: #999999;
                    }
                    span:nth-child(2){
                        font-size: 30px;
                        color: #e20419;
                    }
                    span:nth-child(2).green{
                        color: green;
                    }
                }
                
            }
        }
    }
}
</style>

