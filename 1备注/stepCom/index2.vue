<template>
    <div class="zuzhixinxi">
        csr
        <el-button @click="next">下一步</el-button>

        {{JSON.stringify(stepObj)}}
    </div>
</template>
<script>
    import { mapGetters } from "vuex"
    export default{
        props:['stepArrLength'],
        computed:{
            ...mapGetters(['active']),
            stepObj(){
                return this.$store.getters.stepObj
            }
        },
        methods:{
            next(){
                console.log(this.active);
                if(this.active<this.stepArrLength-1){
                    this.$store.dispatch('active',this.active+1)
                    //window.sessionStorage.setItem('active',this.active)
                }

                var two = {
                    age:'域名验证'
                }

                 // this.$store.dispatch('stepObj',{...this.stepObj,...two})
                this.$store.dispatch('stepObj',Object.assign(this.stepObj,two))
            }
        }
    }
</script>
<style>

</style>
