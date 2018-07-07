// Storage Controller
// const StorageCtrl = (function() {

// })();

// Tweet Controller
const TweetCtrl = (function() {

    // Tweet constructor
    const Tweet = function(id, creator, work, url, statement) {
        this.creator = creator;
        this.work = work;
        this.url = url;
        this.statement = statement;
    }

    // Data Structure / State
    const data = {
        tweets: [
            {id: 0, creator: 'creator1', work: 'work1', url: 'https://youtu.be/gM-n2iF36CU', 
            statement: 'this is a test 1'},
            {id: 0, creator: 'creator2', work: 'work2', url: 'https://youtu.be/gM-n2iF36CU', statement: 'this is a test 2'},
            {id: 0, creator: 'creator3', work: 'work3', url: 'https://youtu.be/gM-n2iF36CU', statement: 'this is a test 3'}
        ],
        currentTweet: null
    }

    // Public Methods
    return {
        getTweets: function() {
            return data.tweets;
        },
        logData: function(){
            return data;
        }
    }


})();

// UI Controller
const UICtrl = (function() {
    const UISelectors = {
        tweetList: '#tweet-list'
    }

    // Public Methods
    return {
        populateTweetList: function (tweets) {
            let html = '';
            tweets.forEach(function (tweet) {
              html += `
                <li class="collection-item" id="item-0">
                <strong>${tweet.creator} - </strong>
                <em>${tweet.work}</em>
                <a href="#" class="secondary-content">
                  <i class="edit-item fa fa-pencil"></i>
                </a>
              </li>`;

              
            });

            // Insert tweet list
            document.querySelector(UISelectors.tweetList).innerHTML = html;


        }

    }

})();

// App Controller
const App = (function(TweetCtrl,UICtrl) {

    // Public Methods
    return {
        init: function() {
            console.log('Initializing app...');

            // Fetch tweets from data structure
            const tweets = TweetCtrl.getTweets();

            // Populate list with tweets
            UICtrl.populateTweetList(tweets);

            
        }
    }
    


})(TweetCtrl,UICtrl);

// Initialize Appp
App.init();