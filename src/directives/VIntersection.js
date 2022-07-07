
export default{
    mounted(element, binding){
        console.log(element, binding);
        const options = {
        rootMargin: '0px',
        threshold: 1.0
        }
        const callback = (entries, observer) => {
            if(entries[0].isIntersecting){
                // if(this.page< this.totalPages){
                //     this.loadMorePosts();
                // }

                binding.value();
                console.log('intersected'); 
            }  
            // setInterval(()=>{
            //     // if(entries[0].boundingClientRect.top > 0){
            //     if(entries[0].isIntersecting){
            //         console.log('inter');
            //     }
            // },2000);
        };
        const observer = new IntersectionObserver(callback, options);
        observer.observe(element);
    },
    name: 'intersection'
}