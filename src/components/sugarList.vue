<template>
        <div class="sugar-recommend">
            <div class="sugars" v-for="item in sugarlist" :key="item.id" @click="pathToDetail(item.id,item.type)">
                <img :src="item.img" alt="">
                <section>
                    <span>{{item.en_name}}</span>
                    <!-- <span>还差99999糖果兑换</span> -->
                </section>
                <p>{{item.name}}</p>
                <p>{{item.price}}糖果</p>
            </div>
        </div>
</template>

<script>
import scroll from '../assets/api/scroll.js'

export default {
    data(){
        return{
            sugarlist:[],
            page:1,
            reped:false
        }
    },
    mounted(){
        this.getSugerList();
        scroll.refresh(this.getSugerList);
        this.common.changeTitle('糖果');
    },
    methods:{
        getSugerList: function(){
            if(this.reped){
                return false
            }
            this.reped = true;
            this.$ajax.get('api/gift/list',{
                'page':this.page
            },response => {
                // console.log(response.data.code)
                if (response.data.code == 200) {
                    if (!response.data.data.data[0]) {
                        return false
                    }else{
                        this.sugarlist = this.sugarlist.concat(response.data.data.data);
                        this.page++;
                        this.reped = false;
                    }
                }
            })
        },
        pathToDetail: function(id,type){
            this.$router.push({ name: 'sugarDetail', params: { id: id ,type: type}})
            // this.common.toPage('/index.html#/sugarDetail/'+id+'/'+type)
        }
    }
};
</script>

<style lang="scss" scoped>
@import '../assets/css/sugar.scss';
.sugar-recommend{
    padding-top: 20px;
    margin-bottom: 0; 
}
</style>
