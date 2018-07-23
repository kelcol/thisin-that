// Storage Controller
const StorageCtrl = (function () {

    // Public Methods
    return {
        storeTweet: function (tweet) {
            let tweets;
            // Check if any tweets in ls
            if (localStorage.getItem('tweets') === null) {
                tweets = [];

                // Push new tweet
                tweets.push(tweet);

                // Set ls - btw ls can only hold strings
                localStorage.setItem('tweets', JSON.stringify(tweets));

            } else {

                // Get what is already in ls
                tweets = JSON.parse(localStorage.getItem('tweets'));

                // Push new tweet
                tweets.push(tweet);

                // Reset ls
                localStorage.setItem('tweets', JSON.stringify(tweets));

            }
        },
        getTweetsFromStorage: function () {
            let tweets;
            if (localStorage.getItem('tweets') === null) {
                tweets = [];
            } else {
                tweets = JSON.parse(localStorage.getItem('tweets'));
            }
            return tweets;
        },
        updateTweetStorage: function (updatedTweet) {
            let tweets = JSON.parse(localStorage.getItem('tweets'));

            tweets.forEach(function (tweet, index) {
                if (updatedTweet.id === tweet.id) {
                    tweets.splice(index, 1, updatedTweet);
                }
            });
            localStorage.setItem('tweets', JSON.stringify(tweets));
        },
        deleteTweetFromStorage: function (id) {
            let tweets = JSON.parse(localStorage.getItem('tweets'));

            tweets.forEach(function (tweet, index) {
                if (id === tweet.id) {
                    tweets.splice(index, 1);
                }
            });
            localStorage.setItem('tweets', JSON.stringify(tweets));
        },
        clearTweetsFromStorage: function () {
            localStorage.removeItem('tweets');
        }
    }
})();




// Tweet Controller
const TweetCtrl = (function () {

    // Tweet constructor
    const Tweet = function (id, creator, work, url, statement) {
        this.id = id;
        this.creator = creator;
        this.work = work;
        this.url = url;
        this.statement = statement;
    }

    const TweetParams = function (creator, work, url, statement) {

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
                id: 2,
                creator: 'creator3',
                work: 'work3',
                url: 'https://youtu.be/gM-n2iF36CU',
                statement: 'this is a test 3'
            }
        ],
        tweets: StorageCtrl.getTweetsFromStorage(),
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
            newTweet = new Tweet(ID, creator, work, url, statement);

            // Add to tweets array
            data.tweets.push(newTweet);

            return newTweet;
        },
        getTweetById: function (id) {
            let found = null;
            // Loop through items
            data.tweets.forEach(function (tweet) {
                if (tweet.id === id) {
                    found = tweet;
                }
            });
            return found;
        },
        updateTweet: function (creator, work, url, statement) {
            // update in data structure

            let found = null;

            data.tweets.forEach(function (tweet) {
                if (tweet.id === data.currentTweet.id) {
                    tweet.creator = creator;
                    tweet.work = work;
                    tweet.url = url;
                    tweet.statement = statement;
                    found = tweet;
                }
            });
            return found;
        },
        deleteTweet: function (id) {
            // Get ids
            ids = data.tweets.map(function (tweet) {
                return tweet.id;
            });

            // Get index
            const index = ids.indexOf(id);

            // Remove tweet 
            data.tweets.splice(index, 1);

        },
        setCurrentTweet: function (tweet) {
            data.currentTweet = tweet;
        },
        getCurrentTweet: function () {
            return data.currentTweet;
        },
        makeHashtagParams: function (statement) {
            let str1 = statement;
            let str2 = statement;
            let acronym, nextWord;

            str1 = str1.toLowerCase().split(" ");
            for (var i = 0; i < str1.length; i++) {
                str1[i] = str1[i].charAt(0).toUpperCase() + str1[i].slice(1);
            }

            words = str2.split(" ");
            acronym = "";
            index = 0;
            while (index < words.length) {
                nextWord = words[index];
                acronym = acronym + nextWord.charAt(0);
                index = index + 1;
            }
            return str1.join("") + "," + acronym.toUpperCase();
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
        listTweets: '#tweet-list li',
        addBtn: '.add-btn',
        updateBtn: '.update-btn',
        deleteBtn: '.delete-btn',
        submitBtn: '.submit-btn',
        backBtn: '.back-btn',
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
                <li class="collection-item" id="tweet-${tweet.id}">
                <strong>${tweet.creator}</strong> - ${tweet.work} <a href="#" class="secondary-content">
                <i class="edit-tweet fa fa-pencil"></i>
              </a>
              `;
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
            li.innerHTML = `
            <strong>${tweet.creator}</strong> - ${tweet.work}
            <a href="#" class="secondary-content">
            <i class="edit-tweet fa fa-pencil"></i>
            </a>
          </li>`;

            // Insert tweet to list
            document.querySelector(UISelectors.tweetList).insertAdjacentElement('beforeend', li);
        },
        updateTweet: function (tweet) {
            let listTweets = document.querySelectorAll(UISelectors.listTweets);

            // turn node list into array
            listTweets = Array.from(listTweets);

            listTweets.forEach(function (listTweet) {
                const tweetID = listTweet.getAttribute('id');

                if (tweetID === `tweet-${tweet.id}`) {
                    document.querySelector(`#${tweetID}`).innerHTML = `
                    <strong>${tweet.creator}</strong> - ${tweet.work}
            <a href="#" class="secondary-content">
            <i class="edit-tweet fa fa-pencil"></i>
            </a>
          </li>`;

                }
            })
        },
        deleteListTweet: function (id) {
            const tweetID = `#tweet-${id}`;
            const tweet = document.querySelector(tweetID);
            tweet.remove();
        },
        // Clear fields
        clearInput: function () {
            document.querySelector(UISelectors.tweetCreatorInput).value = '';
            document.querySelector(UISelectors.tweetWorkInput).value = '';
            document.querySelector(UISelectors.tweetURLInput).value = '';
            document.querySelector(UISelectors.tweetStatementInput).value = '';
        },
        addTweetToForm: function () {
            document.querySelector(UISelectors.tweetCreatorInput).value = TweetCtrl.getCurrentTweet().creator;
            document.querySelector(UISelectors.tweetWorkInput).value = TweetCtrl.getCurrentTweet().work;
            document.querySelector(UISelectors.tweetURLInput).value = TweetCtrl.getCurrentTweet().url;
            document.querySelector(UISelectors.tweetStatementInput).value = TweetCtrl.getCurrentTweet().statement;
            UICtrl.showEditState();
        },
        hideList: function () {
            document.querySelector(UISelectors.tweetList).style.display = 'none';
        },
        clearEditState: function () {
            UICtrl.clearInput();
            document.querySelector(UISelectors.addBtn).style.display = 'inline';
            document.querySelector(UISelectors.updateBtn).style.display = 'none';
            document.querySelector(UISelectors.deleteBtn).style.display = 'none';
            document.querySelector(UISelectors.submitBtn).style.display = 'none';

            document.querySelector(UISelectors.backBtn).style.display = 'none';
        },
        showEditState: function () {
            document.querySelector(UISelectors.updateBtn).style.display = 'inline';
            document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
            document.querySelector(UISelectors.submitBtn).style.display = 'inline';
            document.querySelector(UISelectors.backBtn).style.display = 'inline';
            document.querySelector(UISelectors.addBtn).style.display = 'none';
        },
        openInNewTab: function (url) {
            let win = window.open(url, '_blank');
            win.focus();
        },
        getSelectors: function () {
            return UISelectors;
        }

    }

})();

// App Controller
const App = (function (TweetCtrl, StorageCtrl, UICtrl) {

    // Load event listeners
    const loadEventlisteners = function () {;

        // Get UI Selectors
        const UISelectors = UICtrl.getSelectors();

        // Submit tweet event
        document
            .querySelector(UISelectors.addBtn)
            .addEventListener("click", submitTweet);

        // Disable submit on enter
        document.addEventListener('keypress', function (e) {
            if (e.keyCode === 13 || e.which === 13) {
                e.preventDefault();
                return false;
            }
        })

        // Edit icon click event
        document.querySelector(UISelectors.tweetList).addEventListener('click', tweetEditClick);

        // Update tweet event
        document.querySelector(UISelectors.updateBtn).addEventListener('click', tweetUpdateSubmit);

        // Delete tweet event
        document.querySelector(UISelectors.deleteBtn).addEventListener('click', tweetDeleteSubmit);

        // Update tweet event
        document.querySelector(UISelectors.submitBtn).addEventListener('click', tweetShareSubmit);


        // Back button event
        document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState);

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

            // Store in LS
            StorageCtrl.storeTweet(newTweet);

            // Clear fields
            UICtrl.clearInput();
        }
        e.preventDefault();
    };

    // Click to edit
    const tweetEditClick = function (e) {

        if (e.target.classList.contains('edit-tweet')) {


            // Get list tweet id
            const listId = e.target.parentNode.parentNode.id;

            // Break into an array
            const listIdArr = listId.split('-');

            // Get the actual id
            const id = parseInt(listIdArr[1]);

            // Get tweet
            const tweetToEdit = TweetCtrl.getTweetById(id);

            // Set current tweet
            TweetCtrl.setCurrentTweet(tweetToEdit);

            // Add tweet to form
            UICtrl.addTweetToForm();
        }

        e.preventDefault();
    }


    // Update tweet submit
    const tweetUpdateSubmit = function (e) {

        // Get tweet input
        const input = UICtrl.getTweetInput();

        // Update tweet
        const updatedTweet = TweetCtrl.updateTweet(input.creator, input.work, input.url, input.statement);

        // Update UI
        UICtrl.updateTweet(updatedTweet);

        // Update tweet in LS
        StorageCtrl.updateTweetStorage(updatedTweet);

        UICtrl.clearEditState();

        e.preventDefault();
    }

    // Share tweet submit
    const tweetShareSubmit = function (e) {

        // Get current tweet
        const currentTweet = TweetCtrl.getCurrentTweet();

        let textParam = `${currentTweet.creator} - ${currentTweet.work}`;
        let urlParam = encodeURI(currentTweet.url);
        let hashtagsParam = TweetCtrl.makeHashtagParams(currentTweet.statement);
        let tweetURL = `https://twitter.com/intent/tweet?text=${encodeURI(textParam)}%0A%0A&hashtags=${hashtagsParam}&url=${urlParam}`;

        // TODO: Figure out why currentTweet isn't being removed from 

        // Delete from data structure
        TweetCtrl.deleteTweet(currentTweet.id);

        // Delete from LS
        StorageCtrl.deleteTweetFromStorage(currentTweet.id);

        // Delete from UI
        UICtrl.deleteListTweet(currentTweet.id);

        // Open tweetURL in new tab or popup
        UICtrl.openInNewTab(tweetURL);

        UICtrl.clearEditState();

        console.log(tweetURL);

    }

    // Delete button event
    const tweetDeleteSubmit = function (e) {
        // Get current tweet
        const currentTweet = TweetCtrl.getCurrentTweet();

        // Delete from data structure
        TweetCtrl.deleteTweet(currentTweet.id);

        // Delete from LS
        StorageCtrl.deleteTweetFromStorage(currentTweet.id);

        // Delete from UI
        UICtrl.deleteListTweet(currentTweet.id);
        UICtrl.clearEditState();
    }

    // Public Methods
    return {
        init: function () {
            // Clear edit state / set initial state
            UICtrl.clearEditState();

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


})(TweetCtrl, StorageCtrl, UICtrl);

// Initialize Appp
App.init();