const toggoleSpinner=displayStyle=>{
    document.getElementById('spinner').style.display=displayStyle;
}
const searchBook =()=>{
    const searchField=document.getElementById('search-field');
    //displaying Spinner
    toggoleSpinner('block');

    const searchText=searchField.value;
     
    //(Clearing Data)
    searchField.value='';
   
    if(searchText===''){
        document.getElementById('errors').innerText='Please Write Valid Book Name'
    }
    else{
         //Loading Data (creating a dainamic url with template string)
    const url=`https://openlibrary.org/search.json?q=${searchText}
    `;
    console.log(url);
    fetch(url)
    .then(res=>res.json())
    .then(data=>displaySearchResult(data))
    }
}

const displaySearchResult =data=>{
    // console.log(docs);
    const bookAmount=data.numFound;
    // console.log(bookAmount)
    const bookQuantity=document.getElementById('book-Quantity')
    bookQuantity.classList.add('text-center','text-red-600','fs-4','fw-bold');
    const searchResult=document.getElementById('search-result');
    searchResult.textContent='';
    const docs=data.docs;
    if(docs.length===0){
        bookQuantity.innerText='No Result Found!'
    }
    else{
        bookQuantity.innerText=`Total ${bookAmount} Items Found!!`;
    }
    docs.forEach(doc=>{
        // console.log(doc);

        const div=document.createElement('div');
        div.classList.add('col');
        div.innerHTML=`
        <div class="col">
        <div class="card h-100 m-4">
            <img height='450px' width="250px" src="https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg" class="card-img-top rounded mx-auto d-block" alt="...">
            <div class="card-body">
              <h5 class="card-title"> ${doc.title}</h5>
              <p class="card-text">Books Information:</p>
              <h5 class="author-name">Author: <span class="text-secondary">${doc.author_name}</span> </h5>
              <h5 class="first-publish">First Publish Year: <span class="text-secondary">${doc.first_publish_year}</span> </h5>
            </div>
          </div>
          </div>
        `;
        searchResult.appendChild(div);
    });
    toggoleSpinner('none');
    // toggoleSpinner('none');
}
