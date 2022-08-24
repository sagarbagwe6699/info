function welcome_screen(){
    // window.scrollTo(0, 0)
    document.getElementById('w-s').style.opacity = '0'
    document.getElementById('w-s').style.animation = 'ss 1s 1'
    setTimeout(() => {
        document.getElementById('w-s').style.display = 'none'
    }, 1000)
    scrollTrigger('.my-card')
    scrollTrigger('.card')
    scrollTrigger('.skillbar')
    scrollTrigger('.my-card-blue')
}