# Thisin' That

This a little application to help me store, format, and submit Twitter share URLS. I used this project to practice implementing the MVC design pattern in vanilla JavaScript.

What it does is collect information about something I want to share:

* creator - the person, usually an artist, responsible for the
* work - the name the work is known by
* url - a location where the work can be experienced
* "this" statement - a statement starting with "this" that somehow describes the work or my perception of the work

This data is then used to construct a URL which can be used to open and populate a Twitter compose window.

### Here's an example template string used to create a URL: 

https://twitter.com/intent/tweet?text=Chica%20Libre%20-%20Popcorn%20Andino%0A%0A&hashtags=ThisSongMakesMeHungry,TSMMH&url=https://youtu.be/JqcaqOnrems

### This URL opens a Twitter compose window with the following info populated:
--------
Chica Libre - Popcorn Andino

 https://youtu.be/JqcaqOnrems #ThisSongMakesMeHungry #TSMMH
 
 --------
 
 
^ What's strange is that a space gets prepended to the URL. It also doesn't seem possible to reorder the url and hashtags. Ideally the hashtags would be on their own line. 



