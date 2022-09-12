<template>
  <div class="posts">
    <div class="page-counter slider">
      <!-- <page-wrapper :total="totalPages" :currentPage="currentPage"></page-wrapper> -->
    </div>
    <SettingForm @reset="resetSettings" :loading="postsAreLoading"></SettingForm>
    <post-list v-if="postsToSee.length" :posts="postsToSee" @remove="removePost" @pageIntersected="setCurrentPage"></post-list>
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
import PageWrapper from '../components/PageWrapper.vue';



export default {

  components: {
    PostList, SettingForm, PageWrapper
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
      currentPage: 1

    }
  },

  mounted() {
    // this.fetchPosts();
    if(sessionStorage.getItem('deletedPosts')){
      this.deletedPosts = JSON.parse(sessionStorage.getItem('deletedPosts'));
      sessionStorage.removeItem('deletedPosts');
    }
    console.log(this.deletedPosts);
    this.refreshData(this.fetchPosts);
  },

  unmounted(){
    clearInterval(this.intervalID);
    sessionStorage.setItem('deletedPosts', JSON.stringify(this.deletedPosts));
  },
  computed: {
    postsToSee(){
      return this.excludeDeletedPosts(this.posts);
    }
  },

  methods: {
    excludeDeletedPosts(array){
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
            const response = await axios.get('http://localhost/posts');
            // console.log(response.data);
            const checkedArray = this.excludeDeletedPosts(response.data);
            // console.log(checkedArray);
            this.posts = checkedArray.slice(0, this.page * this.limit);
            this.totalPages = Math.ceil(checkedArray.length / this.limit);
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
    },
    setCurrentPage(currentPage){
      this.currentPage = currentPage;
    },
    loadMorePosts: async function(){
       try {
          if(!this.postsAreLoading && this.page < this.totalPages || this.totalPages === null){
            this.postsAreLoading = true;
            this.postsAreAdditionallyLoading = true;
            this.page++;
            const response = await axios.get('http://localhost/posts');
            const checkedArray = this.excludeDeletedPosts(response.data);
            this.totalPages = Math.ceil(checkedArray.length / this.limit);
            const newPosts = checkedArray.slice(this.page * this.limit - this.limit, this.page * this.limit);
            this.posts = [...this.posts, ...newPosts];
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
    },
  },

  watch: {
    currentPage(){
      let element = document.querySelector('.slider');
      // console.log(this.page* 100);
      element.style.transform = 'translateY(' + (this.currentPage - 1) * -50 + 'px)';
    }
  }
  

}
</script>

<style scoped>
.posts {
  width: 97%;
}
.observer {
  height: 0px;
  /* background: teal; */
}
.invisible {
  opacity: 0.0;
}

.page-counter {
  position: fixed;
  left: 95%;
  top: 50%;
  bottom: 0;
  right: 0;
  /* transform: translateY(100px); */
  transition: all 0.5s ease-in-out;
}

/* .asd {
  transform: translateY(-100px);
} */

.slider {
    /* background: lightblue; */
}
</style>
