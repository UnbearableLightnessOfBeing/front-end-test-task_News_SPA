export default{
    mounted(element, binding){
        console.log(element, binding);
        const options = {
        rootMargin: '50%',
        threshold: 1.0
        }
        const callback = (entries, observer) => {
            if(entries[0].isIntersecting){
                binding.value();
                console.log('intersected');
            }  
        };
        const observer = new IntersectionObserver(callback, options);
        observer.observe(element);
    },
    name: 'page-intersection'
}