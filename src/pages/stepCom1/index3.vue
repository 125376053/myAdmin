<template>
    <div class="zuzhixinxi">
        域名验证
        <el-button @click="next">下一步</el-button>
    </div>
</template>
<script>
    import { mapGetters } from "vuex"
    export default{
        props:['stepArrLength'],
        computed:{
            ...mapGetters(['active'])
        },
        methods:{
            next(){
                console.log(this.active);
                if(this.active<this.stepArrLength-1){
                    this.$store.dispatch('active',this.active+1)
                    window.sessionStorage.setItem('active',this.active)
                }
            }
        }
    }
</script>
<style>

</style>
