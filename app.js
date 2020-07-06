
(function(){
    // initializing necessary variables.

    const inputBox =  document.getElementById('superName');
    const containerList = document.getElementById('superhero-list');
    const toastContainer = document.getElementById('toast');
    const ApiURL = "https://superheroapi.com/api.php/";
    const accessToken = "3079344578769197/";
    let resultArr = [];

    let favStars = localStorage.getItem("GetSessionData");

    // Process the characters typed by user. Auto complete suggestions  backbone
    function getUserInput(e){
       const superHeroName = e.target.value;
       // Remove drop down if user removes all characters
       if(!superHeroName){
           //console.log("empty");
           removeDropDown();
           return;
       }
       hitSuperHeroAPIForName(superHeroName);      
       
    }

   // remove the child that contains previous suggestions 
    function removeDropDown(){
       containerList.innerHTML = '';
    }

    // Render drop down fresh using elements in array
    function renderDropDown(superHeroObject , index){
      var a = document.createElement("LI");
      //console.log(superHeroObject.image.url);
      a.innerHTML = `<div data-index="${index}"><img src ="${superHeroObject.image.url}" class="imageForHero">
                        <button type="submit" class = "addFav" id=${index}>I Like ${superHeroObject.appearance.gender === 'Male'?'him':'her'}</button>
                        <p><strong>${superHeroObject.name}</strong></p>
                        <p><strong>Is a hero:  ${superHeroObject.biography.alignment === 'good' ? 'Yeaah' : 'Naaah'}</strong></p>
                        <p><strong>gender:  ${superHeroObject.appearance.gender}</strong></p>
                       </div> `;
      //console.log(a);
      containerList.appendChild(a);
      //a.setAttribute("id", thisval.id + "dropDownContainer");
      //a.setAttribute("class", "dropDownContainer");
      //thisval.parentNode.appendChild(a);

      
    }
   
    // function to hit the API to get info according to name
    function hitSuperHeroAPIForName(superHeroName){
        const methodName = "search/";
        const urlForName = ApiURL + accessToken + methodName + superHeroName;
        var xhrRequest = new XMLHttpRequest();
        xhrRequest.onload = function(){
            var APIResponse = JSON.parse(xhrRequest.response);
            fillResultArray(APIResponse.results);
           // resultArr.filter(function(item){ console.log(item)});
        }
        xhrRequest.onerror = function(){
            removeDropDown();
        }
        xhrRequest.open('GET',urlForName);
        xhrRequest.send();
    }

    // fUNCTION TO pICK EACH OBJECT IN RESPONSE AND RENDER AFTER PREVIOUS ELEMENTS ARE REMOVED

    function fillResultArray(resultArray){
        // handle the case if returned object is empty or undefined (user input did not match any superhero name)
        if(typeof(resultArray) === "undefined"){
            removeDropDown();
            return;
        }
        resultArr = resultArray;
        removeDropDown();
        for(var i = 0 ; i < resultArr.length ; i++){
            renderDropDown(resultArr[i] , i);
            
        }
    }
// Function to continously mobitor each click 
    function clickListner(e){
        if (e.target.className === 'addFav') {
            // Check if star already present;
            if(favStars === null || favStars === "null"){
                console.log(favStars);
                favStars = JSON.stringify(resultArr[e.target.id]) + "!SEPERATOR!";
                localStorage.setItem("GetSessionData", favStars );
                showToast('success','Now We know you like em');
                return;
            }
            //console.log(favStars);
            //var containsStar = JSON.parse(favStars);
            containsStar = favStars.split("!SEPERATOR!");
            console.log(typeof(containsStar));
                  containsStar = containsStar.filter(function(obj){
                      
                      try{
                        var ob = JSON.parse(obj)
                        return ob.id === resultArr[e.target.id].id;
                      }catch{resultArr[e.target.id].id}
                  });
            if(containsStar !== "null" && containsStar.length >= 1){
                showToast('neutral','Yeah we know you like em');
                return;
            }

            favStars += JSON.stringify(resultArr[e.target.id]) + "!SEPERATOR!";
            localStorage.setItem("GetSessionData", favStars );
            //if(favStars.length == 0){
            //    favStars += JSON.stringify(resultArr[e.target.id]);
           // }else{
                //favStars += "!SEPERATOR!" + JSON.stringify(resultArr[e.target.id]);

            //}

            showToast('success','Now We know you like em');
        }
        else if(e.target.id === 'show-fav'){

            window.open(
                `superHero.html`,
                  '_blank' 
            )

            
        }
        else if(e.target.id === 'searchInfo'){
            console.log(e.target.className);
            location.href = "result.html";
            
            localStorage.setItem("GetSearchData",JSON.stringify(resultArr[e.target.className]));
            
        }
        return;
    }
   

    // Function to render Saved SuperHero Page

    // Function defining various messages to be displayed in different conditions 
    function showToast(type, message){
        if (type === 'error') {
            toastContainer.classList.remove('toast-success');
            toastContainer.classList.remove('toast-neutral');
            toastContainer.classList.add('toast-error');
          } else if (type === 'success') {
            toastContainer.classList.remove('toast-error');
            toastContainer.classList.remove('toast-neutral');
            toastContainer.classList.add('toast-success');
          }
          else if (type === 'neutral') {
            toastContainer.classList.remove('toast-error');
            toastContainer.classList.remove('toast-success');
            toastContainer.classList.add('toast-neutral');
          }
          toastContainer.style.display = 'block';
          toastContainer.innerText = message;
        
          setTimeout(() => {
            toastContainer.style.display = 'none';
          }, 1000)
        
    }
    
    // Bind input box to track for any change. Starting Code for whole page
    function initializer(){
        console.log("new page");
        document.addEventListener('click',clickListner);
        //  Avoid Eror in case visiting a page with no input id element  
        if(inputBox !== null ){
            inputBox.addEventListener('keyup',getUserInput);
        }
        //localStorage.setItem("GetSessionData",null);
       // console.log(localStorage.getItem("GetSessionData"));
    }
    initializer();
})();
