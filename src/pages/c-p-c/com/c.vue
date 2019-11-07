<template>
    <div>
       {{JSON.stringify(obj)}}
    </div>
</template>
<script>
export default{
    data(){
        return{

        }
    },
    props:['obj'],
    mounted(){
        console.log(this.obj);
    }
}
</script>
