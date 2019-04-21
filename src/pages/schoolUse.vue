<template>
    <div>

        <pre>
            vue城市选择器插件
            1 安装
                npm install vue-region-picker china-area-data --save-dev
            2 使用
                html
                <p>{{htmlTest}}</p>
                js
                import Vue from 'vue'
                import RegionPicker from 'vue-region-picker'
                import CHINA_REGION from 'china-area-data'
                Vue.use(RegionPicker, {
                    region: CHINA_REGION,
                    vueVersion: 2
                })
                export default{
                    data () {
                        return {
                            region: {
                                province:'山西',
                                city:'运城',
                                district:'闻喜'
                            }
                        }
                    },
                    methods:{
                        change(d){
                            console.log(d.province,d.city,d.district)
                        }
                    }
                }
            3 文档
                github https://github.com/QingWei-Li/vue-region-picker
            4 注意版本问题
                这里是2.0版本vue的使用方式，不要引用成1.0的版本
        </pre>
        {{getData}}

        <region-picker
            :province="region.province"
            :city="region.city"
            :district="region.district"
            @onchange="change"
        >
        </region-picker>
        <ul>
            <li>你选择的省:{{region.province}}</li>
            <li>你选择的市:{{region.city}}</li>
            <li>你选择的县:{{region.district}}</li>
        </ul>
    </div>
</template>
<script>
    import Vue from 'vue'
    import RegionPicker from 'vue-region-picker'
    import CHINA_REGION from 'china-area-data'

    Vue.use(RegionPicker, {
        region: CHINA_REGION,
        vueVersion: 2
    })
    export default{

        data () {
            return {
                htmlTest: `
                    <region-picker
                        :province="region.province"
                        :city="region.city"
                        :district="region.district"
                        @onchange="change"
                    >
                    </region-picker>
                `,
                region: {
                    province: '山西',
                    city: '运城',
                    district: '闻喜'
                }
            }
        },
        methods: {
            change(d){
                this.region.province = d.province;
                this.region.city = d.city;
                this.region.district = d.district;
            }
        },
        //只要修改就触发
        computed: {
            getData(){
                return {
                    province: this.region.province,
                    city: this.region.city,
                    district: this.region.district,
                }
            },
        },
        //类似于事件中触发 只要修改就触发
        watch: {
            region: {
                handler(d){
                    this.region.province = d.province;
                    this.region.city = d.city;
                    this.region.district = d.district;
                    console.log(this.region.province, this.region.city, this.region.district)
                },
                deep: true
            }
        },
        //只触发一次
        mounted(){
            console.log(this.region.province, this.region.city, this.region.district)
        }
    }
</script>
<style>

</style>
