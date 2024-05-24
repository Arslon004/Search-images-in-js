const searchForm=document.querySelector("form");
const searchInput=document.querySelector(".search-input");
const imagesContainer=document.querySelector(".images-container");
const loadMoreBtn=document.querySelector(".loadMoreBtn");

let page=1

const accessKey=`Qinv-t07YtquTtxC9kDusdbPjIUZUNObdGneakC99Mk`;

//function to fetch images using UNSPLASH API
const fetchImages=async (query, pageNo)=>{
  try{
  if(pageNo===1){
    imagesContainer.innerHTML="";
  }
  const url=`https://api.unsplash.com/search/photos/?query=${query}&per_page=28&page=${pageNo}&client_id=${accessKey}`

  const response=await fetch(url);
    let data=await response.json();
    if(data.results.length>0){
      data.results.forEach((photo)=>{
        let imageElament=document.createElement("div");
        imageElament.classList.add("imageDiv")
        imageElament.innerHTML = `<img src="${photo.urls.regular}">`;

        //creating overlay

        const overlayElement=document.createElement("div");
        overlayElement.classList.add("overlay");
          //Creating overlay text
        let overlayText=document.createElement("h3");
        overlayText.innerHTML= `${photo.alt_description}`;

        overlayElement.appendChild(overlayText);
        imageElament.appendChild(overlayElement);
        imagesContainer.appendChild(imageElament)
      })
    }else{
      imagesContainer.innerHTML=`<h2>No image found.</h2>`
      if(loadMoreBtn.style.display==="block"){
        loadMoreBtn.style.display="none";
      }
    }
  }
  catch(error){
    imagesContainer.innerHTML=`<h2>Failed to fetch images. Please try again.</h2>`
    if(loadMoreBtn.style.display==="block"){
      loadMoreBtn.style.display="none";
    }
  }
}

//Adding Event Listener to search form
searchForm.addEventListener('submit',(e)=>{
  e.preventDefault();
  const inputText=searchInput.value.trim();
  if(inputText !== ""){
   page=1
    fetchImages(inputText, page);
  }else{
    imagesContainer.innerHTML=`<h2>Please enter a search query.</h2>`
  }
})

//Adding Event Listener to loadMoreBtn
loadMoreBtn.addEventListener('click',()=>{
  fetchImages(searchInput.value.trim(), ++page);
})