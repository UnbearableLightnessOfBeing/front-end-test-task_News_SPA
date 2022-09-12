<template>
    <h2 v-for="page in total" :key="page" :class="{active: page == currentPage}">{{page}}</h2>
</template>

<script>
export default {
    props: ['total', 'currentPage'],

    // watch: {
    //     currentPage(){
    //         this.$emit('move');
    //     }
    // },
}
</script>

<style scoped>
.active {
    transform: scale(1.5);
    transition: all 0.3s ease-in-out;
}

h2 {
    transition: all 0.3s ease-in-out;
    height: 50px;
}


</style>