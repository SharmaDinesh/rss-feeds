# News update detection (frontend)

## Task description

At Isentia, we are all about media monitoring. A lot of media currently is hosted online, and as a company we want to know when content changes, so that we can quickly react to this. Your task is to write a webpage in Angular that shows news changes as they happen.

Many online news websites offer an RSS feed that makes it easy to track the latest updates. For example, the BBC has http://feeds.bbci.co.uk/news/rss.xml , or SMH has https://www.smh.com.au/rss/feed.xml . Searching for "<name> rss feed" gives links for the site of your choice. Typically a dedicated RSS reader is used to visualise the feeds, but in this task we will read and parse the RSS feeds directly.

Your page should poll the various RSS feeds regularly to check for updates. You should then display the content of all the items in each feed. Most importantly, you should show when something was changed, to make it clear when a new item was added or when an existing item was updated or removed. Keep a history of old content. As a user, I want to be able to take a break from monitoring the news and be able to come back to the page later to see what happened while I was away. (The page stays open. You don't need to use webworkers.)

Your page should also allow the user to add any random RSS feed link in a free text input. This new feed should then also be tracked, with the content displayed and updates visualised, just like the default feeds. You can assume that any feed added by the user follows the structure of the example feeds given above. There are items, with titles, descriptions, pubDates and links. Consider failure scenarios and do not crash the page if a user enters nonsense, or a feed that doesn't follow the rules.

## Technical specifications

Your program must be written in Angular 2 or higher, but you can choose the specific version. You are encouraged to use the most recent Angular version that you are comfortable with.

You must use ngrx.

Your code must have unittests (Jest or an alternative of your choice). Without unittests there is no way to verify that your solution actually works, and thus we will assume that it does not. However, you do not need 100% coverage. Your unittests should give confidence that the essential features are working, that is enough.

You are free to use any other libraries that make your life easier. For example an xml parser, a UI framework, etc.

Keep the UI simple and clean. This task is not about the UI. 


## Evaluation

Your solution will be judged on the following criteria:

- completeness of the solution
- clear code architecture
- readability of the code
- clear instructions on how to run your solution
- unittests
- documentation
- use of git

Bonus:

- use of directives
- use of dependency injection (e.g. forwardRef, provider, ...)
- lazy loading

## Submission

Host your repository online (e.g. on github), make sure that it is public so that we can see it, and tell us the URL.
