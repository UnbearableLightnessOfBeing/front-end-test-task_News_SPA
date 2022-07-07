<template>
  <div class="form flex">
    <h3>Кол-во постов: </h3>
    <input type="text" :placeholder="postNumber" v-model="postNumber">
    <h3>Интервал запросов (сек.): </h3>
    <input type="text" :placeholder="interval" v-model="interval">
    <button @click="setPerferences" :disabled="loading"><h3>Применить</h3></button>
  </div>
</template>

<script>
export default {
    props: ['loading'],
    data() {
        return {
            postNumber: 3,
            interval: 10,
        }
    },
    mounted(){
        this.postNumber = sessionStorage.getItem('postNumber')? sessionStorage.getItem('postNumber') : 3;
        this.interval = sessionStorage.getItem('interval')? sessionStorage.getItem('interval') : 10;
        sessionStorage.removeItem('postNumber');
        sessionStorage.removeItem('interval');
        this.setPerferences();
    },
    methods: {
        setPerferences() {
            if(Number.isInteger(Number(this.postNumber)) && Number(this.postNumber) > 2 &&
                Number.isInteger(Number(this.interval)) && Number(this.interval) > 0){
                this.$emit('reset', this.postNumber, this.interval);
            }
            else{
                alert('Пожалуйста, укажите целые числа и число постов больше 2.');
            }
            
        }
    },
    unmounted(){
        sessionStorage.setItem('postNumber', this.postNumber);
        sessionStorage.setItem('interval', this.interval);
    }
}
</script>

<style scoped>
    .form { 
        justify-content: center;
    }
</style>