(function(){

    let result = [];
    let favStars = '';
    const containerList = document.getElementById("result-superhero-list");

    function renderFavPage(){
        containerList.innerHTML = '';
        
            var superHeroObject = JSON.parse(favStars);
            var a = document.createElement("LI");
        //console.log(superHeroObject.image.url);
        a.innerHTML = `<div data-index="${index}"><img src ="${superHeroObject.image.url}" class="imageForHero">
                          <button type="submit" class = "deleteFav" id=${index}>Remove ${superHeroObject.appearance.gender === 'Male'?'him':'her'} from my team</button>
                          <p><strong>${superHeroObject.name}</strong></p>
                          <p><strong>Is a hero:  ${superHeroObject.biography.alignment === 'good' ? 'Yeaah' : 'Naaah'}</strong></p>
                          <p><strong>gender:  ${superHeroObject.appearance.gender}</strong></p>
                         </div> `;
        //console.log(a);
        containerList.appendChild(a);
        }

    

    // Render Page with Favorite heroes
    

   // Click listener
    
    // Initialize all necessary functions and variables
    function initialize(){
        //localStorage.setItem("GetSessionData","");
         favStars = localStorage.getItem("GetSearchData");
         renderFavPage();
         localStorage.setItem("GetSearchData",'');
    }

    initialize();
})();