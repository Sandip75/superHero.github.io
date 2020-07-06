(function(){

    let favouriteStars = [];
    let favStars = '';
    const containerList = document.getElementById("fav-superhero-list");

    function renderFavPage(){
        containerList.innerHTML = '';
        console.log(favStars.length);
        if(favStars === null || favStars === "null" || favStars.length === 0){
            var a = document.createElement("LI");
            a.innerHTML = `<h1>YOUR WORLD OF SUPERSTARS IS EMPTY. GO PICK SOME<h1>`;
            a.innerHTML += `<button type="submit" class = "goToSearch"> Let Me Pick </button>`
            containerList.appendChild(a);
        }else{
            favouriteStars = favStars.split("!SEPERATOR!");
            console.log(typeof(favouriteStars));
            for(var i = 0 ; i < favouriteStars.length ; i++){
                try{
                    renderFavPageHelper(JSON.parse(favouriteStars[i]) , i);   
                }catch{};            
            }
        }
        return;
    }

    // Render Page with Favorite heroes
    function renderFavPageHelper(superHeroObject,index){
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
    
    function deleteFav(){

    }

   // Click listener
    function clickListner(e){
        // If user clicks to go to home page
        if(e.target.className === "goToSearch"){
            location.href = "index.html";
        }
        else if(e.target.className === "deleteFav"){
            console.log("id is" + e.target.id);
            // traverse whole current favorite star array and remove chosen obj to delete
            var i = -1;
            favouriteStars = favouriteStars.filter(function(elem){
                i += 1;

                return i != e.target.id;

            });
            // set new value for favStar string
            if(favouriteStars.length == 0){
                favStars = '';

            }else{
                favStars = '';
                favouriteStars.filter(function(elem){
                    favStars += elem + "!SEPERATOR!";
                });
            }
            localStorage.setItem("GetSessionData",favStars);
            renderFavPage();
        }
    }
    // Initialize all necessary functions and variables
    function initialize(){
        //localStorage.setItem("GetSessionData","");
         favStars = localStorage.getItem("GetSessionData");
         document.addEventListener('click',clickListner);
         renderFavPage();
    }

    initialize();
})();