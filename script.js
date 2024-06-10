// getting all the html Elements
const userInput= document.getElementById("username");
const getDetailsButton = document.getElementById("getDetails")
const profile = document.getElementById("profile");
const repo = document.getElementById("repo");

// getting username from input and using async function to fetch  the details from github
getDetailsButton.addEventListener("click",async()=>{
    const userName = userInput.value
    // console.log(userName);
    // using the github api to fetch the profile details from the server 
    // since we are going to fetch from api we are changing to async function and will be using await keyword to handling 
    const res = await fetch(`https://api.github.com/users/${userName}`);
    // since it will be in readdle stream we are using .json
    const data = await res.json();
    // console.log(data);
    getDetails(data)
    getrepo(userName)
});

// diplaying the profile details after getting the usename

function getDetails(data){
// console.log(data); 
// displaying the profile details in the card
profile.innerHTML=`
<div class ="card">
<div class ="card-img">
<img src=${data.avatar_url} alt=${data.name}>
</div>
<div class ="card-body">
<div class ="card-title">${data.name}</div>
<div class ="card-subHeading">${data.login}</div>
<div calss ="card-text">
<p>${data.bio}</p>
<p><i class="fa-solid fa-user-group" style="color: #B197FC;"></i> ${data.followers}followers. ${data.following} Following </p>
<p><i class="fa-solid fa-location-crosshairs"></i>${data.location}</p>
<button>
<a href=${data.html_url} target="_blank">visit profile </a>
</button> 
</div>
</div>
</div>
`
}

// get the username and passing to another api respository details 

 async function getrepo(userName){
    // console.log(userName);
    const result = await fetch(`https://api.github.com/users/${userName}/repos`)
    // console.log(result);
    const respository =await result.json();
    // console.log(respository);
    for(let i=0;i<respository.length;i++){
        repo.innerHTML +=`
        <div class="card">
        <div class="card-body">
        <div class="card-title">${respository[i].name}</div>
        <div class="card-subHeading">${respository[i].language}</div>
        <button>
        <a href=${respository[i].html_url} target="_blank">visit profile </a>
        </button> 
        </div>
        </div>
        </div>
        `
    }


}
