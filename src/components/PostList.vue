<template>
  <h2>Cписок постов</h2>
  <TransitionGroup name="postsList">
    <div class="postlist">
        <TransitionGroup name="postsList" tag="ul">
            <Post v-for="post in posts" :key="post.link" :post="post" @remove="removePost"></Post>
        </TransitionGroup>
    </div>
  </TransitionGroup>
</template>

<script>

import Post from '../components/Post.vue';
export default {

props: ['posts'],
components: {Post},

methods: {
    removePost(post){
        this.$emit('remove', post);
    }
}

}
</script>

<style scoped>
h2{
    color: teal;
    font-size: 1.5rem;
}
.postsList-move, /* apply transition to moving elements */
.postsList-enter-active,
.postsList-leave-active {
  transition: all 0.5s ease;
}

.postsList-enter-from,
.postsList-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.postsList-leave-active {
  position: absolute;
}
</style>