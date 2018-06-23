// Storage Controller

// Tweet Controller
const TweetCtrl = (function () {
  // Tweet Constructor
  const Tweet = function (id, creator, work, url, statement) {
    this.id = id;
    this.creator = creator;
    this.work = work;
    this.url = url;
    this.statement = statement;
    // this.thisOne = thisifyOne(this.statement);
  }

  // Data Structure / State
  const data = {
    tweets: [],
    currentTweet: null,
    totalWork: 0
  }

  // Public Methods
  return {
    getTweets: function () {
      return data.tweets;
    },
    addTweet: function (creator, work, url, statement) {
      let ID;
      // Create id
      if (data.tweets.length > 0) {
        ID = data.tweets[data.tweets.length - 1].id + 1;
      } else {
        ID = 0;
      }
      statement = thisify();

      // Create hashtags      
      function thisify() {
        let str1 = statement;
        let str2 = statement;
        let acronym, nextWord;

        str1 = str1.toLowerCase().split(' ');
        for (var i = 0; i < str1.length; i++) {
          str1[i] = str1[i].charAt(0).toUpperCase() + str1[i].slice(1);
        }

        words = str2.split(' ');
        acronym = "";
        index = 0
        while (index < words.length) {
          nextWord = words[index];
          acronym = acronym + nextWord.charAt(0);
          index = index + 1;
        }
        
        return '#' + str1.join('') + ' ' + '#' + acronym.toUpperCase();

      };

      // thisTwo = this.thisifyTwo(statement)

      // Create new tweet
      newTweet = new Tweet(ID, creator, work, url, statement);

      // Add to tweets array
      data.tweets.push(newTweet);

      return newTweet;
    },
    logData: function () {
      return data;
    }
  }
})();

// UI Controller
const UICtrl = (function () {
  const UISelectors = {
    tweetList: '#tweet-list',
    addBtn: '.add-btn',
    tweetCreatorInput: '#creator',
    tweetWorkInput: '#work',
    tweetURLInput: '#url',
    tweetStatementInput: '#statement'
  }

  // Public Methods
  return {
    populateTweetList: function (tweets) {
      let html = '';
      tweets.forEach(function (tweet) {
        html += `        
        <div class="collection-item">

        </div>
        `;
      });

      // Insert list tweets
      document.querySelector(UISelectors.tweetList).innerHTML = html;
    },
    getTweetInput: function () {
      return {
        creator: document.querySelector(UISelectors.tweetCreatorInput).value,
        work: document.querySelector(UISelectors.tweetWorkInput).value,
        url: document.querySelector(UISelectors.tweetURLInput).value,
        statement: document.querySelector(UISelectors.tweetStatementInput).value,
      }
    },
    addListTweet: function (tweet) {

      // Show list
      document.querySelector(UISelectors.tweetList).style.display = 'block';

      // Create div element
      const div = document.createElement('div');
      // Add class
      div.classCreator = 'collection-tweet card';

      let text = `${tweet.creator} - ${tweet.work}`
      let hashtags = tweet.statement.replace(/#/g,'').replace(/ /g,',');

      // TODO: Figure out line breaks
      // TODO: Maybe append tweet button in separate template
      // TODO: Encode whole uri?

      // Add html
      div.innerHTML = `
      <div class="card-body">
      ${tweet.creator} - ${tweet.work}
      <br><br>
      ${tweet.statement}
      <br>
      ${tweet.url}      
      <a href="https://twitter.com/intent/tweet?text=${text}&hashtags=${hashtags}"  class="twitter-share-button" data-size="large">Tweet</a>
      </div>
      `;
      
      console.log(hashtags);
      console.log();

      // Insert tweet
      document.querySelector(UISelectors.tweetList).insertAdjacentElement('beforeend', div)
    },
    clearInput: function () {
      document.querySelector(UISelectors.tweetCreatorInput).value = '';
      document.querySelector(UISelectors.tweetWorkInput).value = '';
      document.querySelector(UISelectors.tweetURLInput).value = '';
      document.querySelector(UISelectors.tweetStatementInput).value = '';
    },
    hideList() {
      document.querySelector(UISelectors.tweetList).style.display = 'none';
    },
    getSelectors: function () {
      return UISelectors;
    }
  }
})();

// App Controller
const App = (function (TweetCtrl, UICtrl) {
  // Load event listeners
  const loadEventListeners = function () {
    // Get UI Selectors
    const UISelectors = UICtrl.getSelectors();

    // Add tweet event
    document.querySelector(UISelectors.addBtn).addEventListener('click', tweetAddSubmit);
  }

  // Add tweet submit
  const tweetAddSubmit = function (e) {
    // Get form input from UI Controller
    const input = UICtrl.getTweetInput();

    // Check for inputs
    if (input.creator !== '' && input.work !== '' && input.url !== '' && input.statement !== '') {

      // Add tweet
      const newTweet = TweetCtrl.addTweet(input.creator, input.work, input.url, input.statement);

      // Add tweet to UI list
      UICtrl.addListTweet(newTweet);

      // Clear fields
      UICtrl.clearInput();
    }
    e.preventDefault();
  }

  // Public methods
  return {
    init: function () {
      // Fetch tweets from data structure
      const tweets = TweetCtrl.getTweets();

      // check if any tweets
      if (tweets.length === 0) {
        UICtrl.hideList();
      } else {
        // Populate list with tweets
        UICtrl.populateTweetList(tweets);
      }

      // Load event listeners
      loadEventListeners();
    }
  }

})(TweetCtrl, UICtrl);

// Initilize App
App.init();