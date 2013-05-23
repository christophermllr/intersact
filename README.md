intersact
=========

Modern web app for cross-referencing movie and TV show cast lists to find an actor or actress.  Built during Future Insights Live 2013 in Las Vegas, NV.


Presentation
=========

##Introductions
- Chicago Hot Dogs - “Red Hot and Snappy”
- ECs @ WMP
- Chicago-based business/tech consulting
- Today we started brainstorming this afternoon out by the pool on break.
	- Charity application
	- OCR bill pay apps
- Scope was too large, start with something really basic
- Had the idea a year or so ago but never had time to truly build it.

##Background
- Have you ever been in a conversation with someone that goes something like this: 
	- “Ahh what was that guy in that one movie?” 
	- “I know he was in Indepedence Day”
	- “Oh, he was also in Bad Boys.”
- We wanted to build an app to help solve this issue.
- Now we can utilize IMDb to cross-reference the cast lists and find the correct actor using - IntersAct (Intersection of Actors).

##Solution
- Pick two movies (typeahead) and see a list of people in both movies.
- Started with some rough mockups using Paper on iPad down by the pool.
- Found an old copy of IMDb (only movies before year 2000) and ported some of the tables into MySQL.
- Decided on the interface and went about creating the backend API in Node and the front end to consume that API (mobile-first!)
- We use a custom web framework called [ClementineJS], written by Kevin available on GitHub, on the front end.

##DEMO

[https://github.com/brew20k/orangeui]
