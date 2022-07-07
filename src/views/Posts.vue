<template>
  <div class="posts">
    <SettingForm @reset="resetSettings" :loading="postsAreLoading"></SettingForm>
    <post-list v-if="postsToSee.length" :posts="postsToSee" @remove="removePost"></post-list>
    <h1 v-if="!postsToSee.length">Пусто</h1>
    <h1 v-if="postsAreAdditionallyLoading">ЗАГРУЗКА...</h1>
     <div v-intersection="loadMorePosts" class="observer"></div>
    <h3 class="invisible">{{page}}</h3>
   
  </div>
</template>

<script>

import axios from 'axios';
import PostList from '../components/PostList.vue';
import SettingForm from '../components/SettingForm.vue';



export default {

  components: {
    PostList, SettingForm,
  },

  data() {
    return {
      posts: [],
      deletedPosts: [],
      requestInterval: 10000,
      postsAreLoading: false,
      postsAreAdditionallyLoading: false,
      intervalID: null,
      page: 0,
      limit: 3,
      totalPages: null,

    }
  },

  mounted() {
    // this.fetchPosts();
    // this.deletedPosts = sessionStorage.getItem('deletedPosts') ? sessionStorage.getItem('deletedPosts') : [];
    if(sessionStorage.getItem('deletedPosts')){
      this.deletedPosts = JSON.parse(sessionStorage.getItem('deletedPosts'));
      sessionStorage.removeItem('deletedPosts');
    }
    // this.page = sessionStorage.getItem('page') ? sessionStorage.getItem('page') : 0;
    // sessionStorage.removeItem('page');
    // this.totalPages = sessionStorage.getItem('totalPages') ? sessionStorage.getItem('totalPages') : 0;
    // sessionStorage.removeItem('totalPages');
    console.log(this.deletedPosts);
    this.refreshData(this.fetchPosts);
  },

  unmounted(){
    clearInterval(this.intervalID);
    sessionStorage.setItem('deletedPosts', JSON.stringify(this.deletedPosts));
    // sessionStorage.setItem('page', this.page);
    // sessionStorage.setItem('totalPages', this.totalPages);
  },
  computed: {
    postsToSee(){
      // return this.posts.filter(post => {
      //   for(let i = 0; i < this.deletedPosts.length; i++){
      //     if(post.title == this.deletedPosts[i]){
      //       return false;
      //     }
      //   }
      //   return true;
      // });
      return this.checkForDeleted(this.posts);
    }
  },

  methods: {
    checkForDeleted(array){
      return array.filter(post => {
        for(let i = 0; i < this.deletedPosts.length; i++){
          if(post.title == this.deletedPosts[i]){
            return false;
          }
        }
        return true;
      });
    },
    fetchPosts: async function() {
      
        try {
          if(!this.postsAreAdditionallyLoading){
            this.postsAreLoading = true;
            const response = await axios.get('http://localhost/WebScraping/api/posts');
            console.log(response.data);
            // this.totalPages = Math.ceil(response.data.length / this.limit);
            const checkedArray = this.checkForDeleted(response.data);
            console.log(checkedArray);
            this.posts = checkedArray.slice(0, this.page * this.limit);
            this.totalPages = Math.ceil(this.postsToSee.length / this.limit);
            this.postsAreLoading = false;
          }
         
      } catch (error) {
        alert(error);
      }
    },
    refreshData(funcToRetrieveData){
      clearInterval(this.intervalID);
      this.intervalID = setInterval(funcToRetrieveData, this.requestInterval);
    },
    removePost(post){
        this.deletedPosts.push(post.title);
        console.log(this.deletedPosts);
    },
    loadMorePosts: async function(){
       try {
          if(!this.postsAreLoading && this.page < this.totalPages || this.totalPages === null){
            this.postsAreLoading = true;
            this.postsAreAdditionallyLoading = true;
            this.page++;
            const response = await axios.get('http://localhost/WebScraping/api/posts');
            // console.log(response.data);
            const checkedArray = this.checkForDeleted(response.data);
            this.totalPages = Math.ceil(checkedArray.length / this.limit);
            // this.totalPages = Math.ceil(this.postsToSee.length / this.limit);
            const newRequests = checkedArray.slice(this.page * this.limit - this.limit, this.page * this.limit);
            this.posts = [...this.posts, ...newRequests];
            
            this.postsAreLoading = false;
            this.postsAreAdditionallyLoading = false;
          }
      } catch (error) {
        alert(error);
      }
    },
    resetSettings(postNumbers, interval) {
      clearInterval(this.intervalID);
      this.posts = [];
      this.limit = postNumbers;
      this.requestInterval = interval * 1000;
      this.page = 0;
      this.refreshData(this.fetchPosts);
    }
  },
  

}
</script>

<style scoped>
.observer{
  height: 0px;
  /* background: teal; */
}
.invisible {
  opacity: 0.0;
}
</style>
