<template>
    <div>
        大组件
        <div v-if="active==1">
            <first1 @obj="getObj"></first1>
        </div>
        <div v-if="active==2">
            <first2></first2>
        </div>
        <div v-if="active==3">
            <first3 :obj="obj"></first3>
        </div>
    </div>
</template>
<script>
    /*
    children-parent-children
    1 子组件获取自己的数据接口，传递给父组件
    2 父组件接收子组件的数据并且保存成自己的
    3 父组件传递自己的数据给其他子组件
    */
    import first1 from "./com/a.vue"
    import first2 from "./com/b.vue"
    import first3 from "./com/c.vue"
    export default{
        data(){
            return{
                active:1,
                obj:''
            }
        },
        components:{
            first1,
            first2,
            first3
        },
        methods:{
            getObj(obj){
                this.obj = obj
            }
        }
    }
</script>
<style>

</style>
