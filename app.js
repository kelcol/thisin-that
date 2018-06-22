
// Add event listener to submit button
document.getElementById('makeTweet').addEventListener('click', getTweet);


// 
function getTweet(e) {

  let TweetMaker = {
    creator: document.getElementById('creator').value,
    work: document.getElementById('work').value,
    url: document.getElementById('url').value,
    thisStatementOne: thisifyOne(),
    thisStatementTwo: thisifyTwo(),
    tweet() {
      return `<ul>
        <li>${this.creator} - ${this.work}</li>
        <br>
        <li>${this.thisStatementOne} ${this.thisStatementTwo}</li>
        <li>${this.url}</li>
      </ul>`
    }
  }

  function thisifyOne() {
    let str = document.getElementById('this-statement').value;
    str = str.toLowerCase().split(' ');
    for (var i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return '#' + str.join('');
  }
  
  function thisifyTwo() {
    let str = document.getElementById('this-statement').value;
    let acronym, nextWord;
    words = str.split(' ');
    acronym = "";
    index = 0
    while (index < words.length) {
      nextWord = words[index];
      acronym = acronym + nextWord.charAt(0);
      index = index + 1;
    }
    return '#' + acronym.toUpperCase();
  }

  let sticky = document.getElementById('sticky');
  sticky.innerHTML = TweetMaker.tweet();

  e.preventDefault();
  document.getElementById("form").reset();
}