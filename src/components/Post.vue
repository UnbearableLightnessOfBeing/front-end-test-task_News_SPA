<template>
  <div class="post" :class="{raised: ratingRaised, fallen: ratingFell, faded: faded}">
      <div class="left flow">
        <!-- <div><strong>ID:</strong>{{post.id}}</div> -->
        <div><strong>Ссылка: </strong>{{post.link}}</div>
        <div><strong>Заголовок: </strong>{{post.title}}</div>
        <div><strong>Описание: </strong>{{post.overview}}</div>
        <div><strong>Текст: </strong>{{post.text}}</div>
        <div><strong>Рейтинг: </strong>{{post.rating}}     
        <strong class="points fs-500" v-if="(storedRating - previousRating) >= 0 && ((storedRating - previousRating) != storedRating)">   +</strong>
        <strong class="points fs-500" v-if="(storedRating - previousRating) != storedRating">{{storedRating - previousRating}}</strong></div>
        <div class="page-indicator" v-if="postPosition % 3 == 0">
            <div  v-page-intersection="pageAlert"></div>
        </div>
      </div>
      <div class="right flex">
         <button class="btn top" @click="removePost">
            <h1 >
                <font-awesome-icon :icon="['fas', 'xmark']" />
            </h1>
         </button>
        <router-link  :to="{name: 'PostDetails', params: {link: post.link}}">
            <button class="btn bottom">Подробнее...</button>
        </router-link>
      </div>
  </div>
</template>

<script>
export default {
    props: ['post'],
    data() {
        return {
            ratingRaised: false,
            ratingFell: false,
            faded: false,
            storedRating: null,
            previousRating:null,
            postPosition: null
        }
    },
    computed: {
        getSnippet(){
            return this.post.text.substring(0,150) + '...';
        },
        rating: {
            get() {
                return this.post.rating;
            }
        }
    },
    methods: {
        removePost(){
            this.$emit('remove', this.post);
        },
        pageAlert(){
            // console.log('page '+ this.postPosition / 3 + ' intersected');
            console.log( Math.ceil(this.postPosition / 3));
            this.$emit('pageIntersected', Math.ceil(this.postPosition / 3));
        }
    },
    watch: {
        rating(){
             this.faded = false;
            if(this.storedRating < this.post.rating){
                this.ratingFell = false;
                this.ratingRaised = true;
            }
            else if(this.storedRating > this.post.rating){
                this.ratingRaised = false;
                this.ratingFell = true;
            }
            this.previousRating = this.storedRating
            this.storedRating = this.post.rating;
            setTimeout(() => {
                this.faded = true;
            }, 3000);
        }
    },
    mounted() {
        // this.previousRating = this.storedRating
        this.storedRating = this.post.rating;
        this.postPosition = this.post.link.substring(39);
    }
}
</script>

<style scoped>
.post{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    /* width: 80%; */
    box-sizing: border-box;
    text-align: start;
    padding: 1rem;
    border: 5px solid  var(--clr-gray-700);
    margin-top: 1rem;
    margin-inline: 3rem;
    transition: all 0.5s ease-in-out;
    border-radius: 1rem;
}
.right{
    /* width: 10%; */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* width: 15%; */
}
.left {
    /* width:15%; */
}
.btn{
    align-self: center;
    justify-self: center;
    /* width: 6.5rem !important; */
    margin-left: 0.5rem;
}
.top{
   max-width: 3rem;
   /* justify-self: flex-end; */
   align-self: flex-end;
   border: none;
   background: none;
   font-weight: 900;
   color: gray;
   transition: 0.3s ease-in-out;
}
.top:hover {
    cursor: pointer;
    transform: scale(1.2);
    color: black;
}
a{
    align-self: center;
    justify-self: center;
}
.fallen{
    border-color: var(--clr-bright-red);
    box-shadow: 0px 0px 15px var(--clr-bright-red);
    background-color: rgba(150,0,0,0.25);
}
.raised{
    border-color: var(--clr-bright-green);
    box-shadow: 0px 0px 15px var(--clr-bright-green);
    background-color: rgba(0,150,0,0.25);
}
.raised.faded{
    border-color: var(--clr-dull-green);
    box-shadow: none;
}
.fallen.faded{
    border-color: var(--clr-dull-red);
    box-shadow: none;
}

.points{
    opacity: 0.5;
}

.page-indicator {
    height: 1px;
    background: black;
    margin:0;
}
</style>