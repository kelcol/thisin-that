// Tweet Controller
const TweetCtrl = (function () {
    const Tweet = function (creator, work, url, statement) {
        this.creator = creator;
        this.work = work;
        this.url = url;
        this.statement = statement;
    };

    // Public Methods
    return {
        makeTweet: function (creator, work, url, statement) {

            statement = thisify();

            // Create hashtags
            function thisify() {
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
            }

            // Create new tweet
            newTweet = new Tweet(creator, work, url, statement);

            return newTweet;
        }

    }

})();


// UI Controller
const UICtrl = (function () {
    const UISelectors = {
        tweetBtn: "#twt-btn",
        tweetCreatorInput: "#creator",
        tweetWorkInput: "#work",
        tweetURLInput: "#url",
        tweetStatementInput: "#statement"
    };

    // Public Methods
    return {
        // Get input
        getTweetInput: function () {
            return {
                creator: document.querySelector(UISelectors.tweetCreatorInput).value,
                work: document.querySelector(UISelectors.tweetWorkInput).value,
                url: document.querySelector(UISelectors.tweetURLInput).value,
                statement: document.querySelector(UISelectors.tweetStatementInput).value
            }
        },

        // create Tweet link
        createTweetLink: function () {
            let textParam = `${newTweet.creator} - ${newTweet.work}`;
            let urlParam = newTweet.url;
            let hashtagsParam = newTweet.statement;
            let tweetURL = `https://twitter.com/intent/tweet?text=${textParam}&hashtags=${hashtagsParam}&url=${urlParam}`;

            // TODO: Add to href attr of share button
            console.log(tweetURL)
        },


        // Clear input
        clearInput: function () {
            document.querySelector(UISelectors.tweetCreatorInput).value = "";
            document.querySelector(UISelectors.tweetWorkInput).value = "";
            document.querySelector(UISelectors.tweetURLInput).value = "";
            document.querySelector(UISelectors.tweetStatementInput).value = "";
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

        // Send tweet event
        document
            .querySelector(UISelectors.tweetBtn)
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
            const newTweet = TweetCtrl.makeTweet(
                input.creator,
                input.work,
                input.url,
                input.statement
            );

            // Tweet link
            UICtrl.createTweetLink(newTweet);

            // Clear fields
            UICtrl.clearInput();
        }
        e.preventDefault();
    };

    // Public methods
    return {
        init: function () {
            loadEventListeners();
        }
    };
})(TweetCtrl, UICtrl);

// Initilize App
App.init();