<template>
    <div class="zuzhixinxi">
        组织信息
        <el-button @click="next">下一步123</el-button>
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
                this.$store.dispatch('active',this.active+1)

                var first = {
                    name:'组织信息'
                }
                this.$store.dispatch('stepObj',first)
            }
        }
    }
</script>
<style>

</style>
