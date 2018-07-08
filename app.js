// Storage Controller
// const StorageCtrl = (function() {

// })();

// Tweet Controller
const TweetCtrl = (function () {

    // Tweet constructor
    const Tweet = function (id, creator, work, url, statement) {
        this.creator = creator;
        this.work = work;
        this.url = url;
        this.statement = statement;
    }

    // Data Structure / State
    const data = {
        tweets: [{
                id: 0,
                creator: 'creator1',
                work: 'work1',
                url: 'https://youtu.be/gM-n2iF36CU',
                statement: 'this is a test 1'
            },
            {
                id: 1,
                creator: 'creator2',
                work: 'work2',
                url: 'https://youtu.be/gM-n2iF36CU',
                statement: 'this is a test 2'
            },
            {
                id: 0,
                creator: 'creator3',
                work: 'work3',
                url: 'https://youtu.be/gM-n2iF36CU',
                statement: 'this is a test 3'
            }
        ],
        currentTweet: null
    }

    // Public Methods
    return {
        getTweets: function () {
            return data.tweets;
        },
        addTweet: function (creator, work, url, statement) {
            // Create id
            if (data.tweets.length > 0) {
                ID = data.tweets[data.tweets.length - 1].id + 1;
            } else {
                ID = 0
            }

            // Create new Tweet
            const newTweet = new Tweet(ID, creator, work, url, statement);

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
        updateBtn: '.update-btn',
        deleteBtn: '.update-btn',
        tweetCreatorInput: '#creator',
        tweetWorkInput: '#work',
        tweetURLInput: '#url',
        tweetStatementInput: '#statement',
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
        },

        getTweetInput: function () {
            return {
                creator: document.querySelector(UISelectors.tweetCreatorInput).value,
                work: document.querySelector(UISelectors.tweetWorkInput).value,
                url: document.querySelector(UISelectors.tweetURLInput).value,
                statement: document.querySelector(UISelectors.tweetStatementInput).value
            }
        },
        addTweetToList: function (tweet) {
            // Show the list
            document.querySelector(UISelectors.tweetList).style.display = 'block';

            // Create li element
            const li = document.createElement('LI');

            // Add class
            li.className = 'collection-item';

            // Add id
            li.id = `tweet-${tweet.id}`;

            // Add html
            li.innerHTML = `<li id="item-0">
            <strong>${tweet.creator} - </strong>
            <em>${tweet.work}</em>
            <a href="#" class="secondary-content">
              <i class="edit-item fa fa-pencil"></i>
            </a>
          </li>`;

            // Insert tweet to list
            document.querySelector(UISelectors.tweetList).insertAdjacentElement('beforeend', li);
        },
        // Clear fields
        clearInput: function () {
            document.querySelector(UISelectors.tweetCreatorInput).value = '';
            document.querySelector(UISelectors.tweetWorkInput).value = '';
            document.querySelector(UISelectors.tweetURLInput).value = '';
            document.querySelector(UISelectors.tweetStatementInput).value = '';
        },
        hideList: function () {
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
    const loadEventlisteners = function () {;

        // Get UI Selectors
        const UISelectors = UICtrl.getSelectors();

        // Send tweet event
        document
            .querySelector(UISelectors.addBtn)
            .addEventListener("click", submitTweet);
    };


    // Submit Tweet
    const submitTweet = function (e) {

        // Get form input from UI Controller
        const input = UICtrl.getTweetInput();

        // Check for inputs
        // TODO: Add better validation with messaging
        if (
            input.creator !== "" &&
            input.work !== "" &&
            input.url !== "" &&
            input.statement !== ""
        ) {
            // Add tweet
            const newTweet = TweetCtrl.addTweet(
                input.creator,
                input.work,
                input.url,
                input.statement
            );

            // Add tweet to UI list
            UICtrl.addTweetToList(newTweet);
            console.log(123);


            // Clear fields
            UICtrl.clearInput();
        }
        e.preventDefault();
    };

    // Public Methods
    return {
        init: function () {
            console.log('Initializing app...');

            // Fetch tweets from data structure
            const tweets = TweetCtrl.getTweets();

            // Check if any tweets
            if (tweets.length === 0) {
                UICtrl.hideList();
            } else {
                // Populate list with tweets
                UICtrl.populateTweetList(tweets);
            }

            // Load event listeners
            loadEventlisteners();

        }
    }


})(TweetCtrl, UICtrl);

// Initialize Appp
App.init();