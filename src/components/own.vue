<template>
    <div>
        {{data}}
        cookie:{{cook}}
    </div>
</template>

<script>
export default {
    data(){
        return{
            data:'',
            cook:''
        }
    },
    mounted(){
        this.gettoken();
        this.getCookie("token");
    },
    methods:{
        gettoken:function(){
            var url = window.location.href;

var req = new XMLHttpRequest();
req.open('HEAD', url, false);
req.send(null);
var headers = req.getAllResponseHeaders();

//Show alert with response headers.
// alert(headers);
this.data = headers

        },
        getCookie: function(name)
{
var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
if(arr=document.cookie.match(reg))
// alert(unescape(arr[2]));
this.cook = unescape(arr[2])
else
return null;
}
    }
}
</script>

<style>

</style>
