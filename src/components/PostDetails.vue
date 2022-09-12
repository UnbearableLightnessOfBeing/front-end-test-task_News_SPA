<template>
  <div v-if="post" class="details flow">
      <br><hr><br>
      <h2><span>Заголовок</span>: {{post.title}}</h2>
      <br><hr><br>
      <div v-if="post.overview">
        <h2><span>Описание</span>: {{post.overview}}</h2>
        <br><hr><br>
      </div>
      <h3><span>Текст новости</span>: {{post.text}}</h3>
      <div v-if="post.picture">
        <br><hr><br>
        <h3 ><span>Картинка</span>:</h3>
      </div>
      <img :src="post.picture">
      <br><hr><br>
      <h3><span>Рейтинг</span>: {{post.rating}}</h3>
      <br><hr><br>
  </div>
</template>

<script>

import axios from 'axios';

export default {
    props: ['link'],
    data(){
        return{
            link: this.$route.params.link,
            post: null
        }
    },
    mounted(){
        this.fetchPost();
    },
    methods: {
        fetchPost: async function() {
      
            try {
                this.postsAreLoading = true;
                const response = await axios.get(`${this.link}`);
                // console.log(response.data[0].text);
                this.post = response.data[0];
            } catch (error) {
                alert(error);
            }
        }
    }
}
</script>

<style scoped>
span{
    color: #297c57;
    font-size: var(--font-500);
}
.details{
    text-align: start;
    padding-inline: 4rem;
    margin-bottom: 1rem;
}
</style>