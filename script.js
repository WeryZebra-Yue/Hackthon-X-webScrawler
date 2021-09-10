let req = new XMLHttpRequest();
req.open("GET","https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=71a7a69bc8a74c3181be2e06814ee95a")
req.send();
req.onload = () =>{
    // console.log(req)
    if(req.status == 200){
       let response = JSON.parse(req.response);
         console.log(Math.ceil(response.totalResults/20))
         Query('.hello').style.minHeight = "none!important"
       for (const [key, value] of Object.entries(response.articles)) {
        Converting(value)
      }
      
    }
    else{
        // console.log(req)
    }
 
}
const Query = (Q) =>{
    return document.querySelector(Q)
}
let ham = Query('.ham');
let Navi = Query('.navi');
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
    console.log(value)
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
        a.classList.add('post')
        a.href = href;
        
        a.append(titles,img,desc)
        Query('.hello').append(a)
    }

}
