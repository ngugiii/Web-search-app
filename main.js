const search = document.querySelector("input");
const form = document.querySelector("form");
const searchResults = document.querySelector(".results");
const errorMsg = document.querySelector(".alert");
const line  = document.querySelector("hr");

const apiURL =
  "https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=";

  form.addEventListener("submit",(e)=>{
    e.preventDefault();

    const searchValue = search.value;
    if(searchValue===""){
      errorMessage("Search Cannot Be Empty please Enter a search term");
    }
    else{
      getResult(searchValue);
    }    
  })

  function errorMessage(msg){
    errorMsg.style.display="block";
    line.style.display="block";
    errorMsg.innerHTML=msg;
  }

  async function getResult(searchVal){
    const response = await fetch(apiURL + searchVal);
    const results = await response.json();

    if(results.query.search.length==0){
      return errorMessage("Invalid Search. Please Enter a valid Search Term")
    }
    else{
      displayResults(results);
    }
  }

  function displayResults(results){
    line.style.display="block";
    let output="";
    results.query.search.forEach((result)=>{
      let resultURL = `https://en.wikipedia.org/?curid=${result.pageid}`;
      output+=
      `
      <div class="result">
            <a href="${result.title}" class="name" target="_blank" rel="noopener">${result.title}</a>
            <br>
            <a href=${resultURL} class="link" target="_blank" rel="noopener">${resultURL}</a>
            <p class="desc">${result.snippet}</p>
          </div>

      
      `;
      searchResults.innerHTML=output;
    })

  }