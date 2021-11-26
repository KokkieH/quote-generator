var quote, //Stores value of randomly selected quote
    prevQuote, //Stores index of previous quote used
    val, //Stores total length of XML data
    response; //Stores XML data retrieved from API   

function randomNumber(val) { //Generates random value between 0 and length of XML data
  return Math.floor(Math.random() * val);
}

(function() { //Fetches XML data from API and prints random first quote
  var url = "https://www.stands4.com/services/v2/quotes.php?uid=4300&tokenid=19lH18zrhzgpPyED&searchtype=AUTHOR&query=William+Shakespeare";
  var randomQuote = new XMLHttpRequest();
  randomQuote.onreadystatechange = function() {
    if (randomQuote.readyState == 4 && randomQuote.status == 200) {
      response = randomQuote.responseXML;
      val = response.getElementsByTagName('quote').length; //Gets length of XML data for random number generating
      generateQuote(); //Runs function to generate first quote once API call completes
    }
  }
  randomQuote.open("GET", url, true);
  randomQuote.send();
}) ();

function generateQuote() {      
  var random = randomNumber(val);
  if (random === prevQuote && random === quoteList.length-1) { 
    random--;
  } 
  else if (random === prevQuote) {
    random++;
  } //Prevents same quote being shown twice in a row
  
  quote = response.getElementsByTagName('quote')[random].firstChild.data;
  document.getElementById("printQuote").innerHTML = quote;
  
  prevQuote = random; // Saves random number for comparison to avoid repeats
}


