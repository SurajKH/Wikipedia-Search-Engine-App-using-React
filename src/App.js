import React from 'react';
import './App.css';
import { useState } from 'react';

function App() {

  //react states
  const [search,setSearch]=useState("");
  const [results,setResults]=useState([]);
  const [searchinfo,setSearchInfo]=useState({});

  const handleSearch=async e =>
  {
     e.preventDefault();
     //now we need consider the search result

     if(search === '')
     return;
     //know we basically consider the wikipedia api
     const endpoint=`https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=15&srsearch=${search}`;

     //fetch api
     const response = await fetch(endpoint);

     //we basically get back the response object.
     console.log(response);

     const json=await response.json();
     console.log(json);
     
     //search results
     setResults(json.query.search);
     setSearchInfo(json.query.searchinfo);


  }

  return (
    <div className="App">
        <header>
            <h1>WikiPedia Search Engine</h1>
            <form className='search-box' onSubmit={handleSearch}>
              <input type="search" placeholder='What are you looking for(Enter the text) '
              value={search}
              onChange={e => setSearch(e.target.value)}
              >
               </input>
               </form>
               {/* dynamic data rendering */}
              {(searchinfo.totalhits) ? <p>Available Search Results:{searchinfo.totalhits}</p>:
              <p></p>}
              </header>
               <div className="results">
               {
                 results.map((result,i) =>
                 {
                   const url=`https://en.wikipedia.org/?curid=${result.pageid}`;

                   return(
                    <div className="result" key={i}>
                  <h3>{result.title}</h3>
                  <p className="searchmatch" dangerouslySetInnerHTML={{
                    __html:result.snippet}}>
                    
                  </p>
                  when we click on the Read More it should take us to the required wikipedia page
                  <a href={url} target="_blank">Read More...</a>
                 </div>
             
                   )
                 }
                 )
               }
               </div>
    </div>
  );
}

export default App;
