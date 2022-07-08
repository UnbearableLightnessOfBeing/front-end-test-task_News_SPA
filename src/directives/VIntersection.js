
export default{
    mounted(element, binding){
        console.log(element, binding);
        const options = {
        rootMargin: '0px',
        threshold: 1.0
        }
        const callback = (entries, observer) => {
            if(entries[0].isIntersecting){
                binding.value();
                // console.log('intersected'); 
            }  
        };
        const observer = new IntersectionObserver(callback, options);
        observer.observe(element);
    },
    name: 'intersection'
}