
const Query = (Q) =>{
    return document.querySelector(Q)
}
let ham = Query('.ham');
let Navi = Query('.navigation-selectors-wrapper');
ham.addEventListener("click",()=>{
    if(!Navi.classList.contains('NaviActive')){
        Navi.classList.toggle('NaviActive')
        
    }
    else{
        Navi.classList.add('NaviActiveDown')
       setTimeout(()=>{
        Navi.classList.toggle('NaviActive')
        Navi.classList.remove('NaviActiveDown')
       },500);
        
    }
});
const Converting = (value) =>{
    // let temp = false;
    let title;
    let urltoImage;
    let content;
    let href;
    // console.log(value)
    for (const [keys, values] of Object.entries(value)) {
            
        if(keys ==='title'){
            title = values;
        }
        else if(keys=='urlToImage'){
            urltoImage = values
        }
        else if(keys == 'description'){
            content = values;
        }
        else if(keys == 'url'){
            href = values;
        }
        
    }
    if(urltoImage){
       
        // let mainDiv = document.createElement('div');
        let img = document.createElement('img');
        let desc = document.createElement('desc');
        let titles = document.createElement('span')
        titles.innerHTML = title;
        desc.innerHTML = content;
        img.src = urltoImage;
        let  a = document.createElement('a')
        titles.classList.add('spand')
        desc.classList.add('desc')
        img.classList.add('postImage')
        img.setAttribute('lazyload','true')
        a.classList.add('post')
        a.href = href;
        
        a.append(titles,img,desc)
        Query('.hello').append(a)
    }

}
Query('#search-form').addEventListener('submit',(e)=>{
    e.preventDefault();  
    console.log("S")
    window.location.replace(`?q=${Query('#search-input').value}&language=${Query('#lang').value}`)
    // console.log ();
});
let url = new URL(location.href);
;
let q = url.searchParams.get('q')
// console.log(q)
    let country = url.searchParams.get('country');
    let category = url.searchParams.get('category');
    // let sort = url.searchParams.get('category');
    let lang = url.searchParams.get('language');
    let p = parseInt(url.searchParams.get('p'));
    
    p = p?p:1

try{

   q = q.replace(' ','-');
}
    
catch{

}

// Page Logic
let TotalPages;
let date = new Date();
let newsLink ;
if(p==1){
    Query('.previous').style.opacity = 0.5
}

Query('.PageNumber').innerHTML = p
if(q){

    newsLink =  `https://newsapi.org/v2/everything?q=${q}&apiKey=f8f444fcb36243659b68f63007d6f67f&language=${lang?lang:'en'}&page=${p?p:1}`
}
else{
    newsLink =  `https://newsapi.org/v2/top-headlines?country=us&apiKey=f8f444fcb36243659b68f63007d6f67f&language=${lang?lang:'en'}&page=${p?p:1}`
    
}
const NewsCall = (newsLink)=>{
    
    let req = new XMLHttpRequest();
    req.open("GET",newsLink)
    req.send();
    req.onload = () =>{
        // console.log(req)
        if(req.status == 200){
            let response = JSON.parse(req.response);
            // console.log(Math.ceil())
            TotalPages =  Math.ceil(response.totalResults/20)>5?5:Math.ceil(response.totalResults/20);
            
if(p==TotalPages && TotalPages){
    console.log(TotalPages)
    Query('.next').style.opacity = 0.5
}   
            for (const [key, value] of Object.entries(response.articles)) {
                Converting(value)
            }
            
        }
        // console.log(req)
        else{
        }
        
    }
}

console.log(newsLink)
NewsCall(newsLink)

//Changes from Queries
Query('#lang').value= lang?lang:'en'
let goBtn = Query('.go');
const Go = ()=>{
    // let newUrl = new URL(newsLink);
    // newUrl.searchParams.set('language',);
    goBtn.id = Query('#lang').value;
    goBtn.style.background = "blue"
}
goBtn.addEventListener('click',()=>{
    if(goBtn.id){
        location.replace(`?language=${goBtn.id}&q=${q?q:'Latest'}`)
      
    }
});
Query('.next').addEventListener('click',()=>{

    let newURL = new URL(location.href);
    console.log(p,TotalPages)
    
    if(p<TotalPages){
        p = (p+1)
        newURL.searchParams.set('p',p);
        location.replace(newURL)
    }


})



Query('.previous').addEventListener('click',()=>{

    let newURL = new URL(location.href);
    console.log(p,TotalPages)
    
    if(p>1){
        p = (p-1)
        newURL.searchParams.set('p',p);
        location.replace(newURL)
    }


})
