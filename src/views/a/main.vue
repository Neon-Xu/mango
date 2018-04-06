<style scoped>
    .dfwe{margin: 43px; display: flex;}
</style>
<template>
    <div>
        <h1>aaa</h1>
        <div><img src="../../images/test.jpg" alt=""></div>
        <a href="/#/b">tob</a>
        <Icon type="checkmark" />
        <Select v-model="model1" style="width:200px">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                cityList: [
                    {
                        value: 'New York',
                        label: 'New York'
                    },
                    {
                        value: 'London',
                        label: 'London'
                    },
                    {
                        value: 'Sydney',
                        label: 'Sydney'
                    },
                    {
                        value: 'Ottawa',
                        label: 'Ottawa'
                    },
                    {
                        value: 'Paris',
                        label: 'Paris'
                    },
                    {
                        value: 'Canberra',
                        label: 'Canberra'
                    }
                ],
                model1: ''
            }
        },
        mounted () {
        },
        beforeDestroy () {
        },
        methods: {
        }
    }
</script>