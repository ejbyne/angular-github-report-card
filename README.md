[![Code Climate](https://codeclimate.com/github/ejbyne/angular-github-report-card/badges/gpa.svg)](https://codeclimate.com/github/ejbyne/angular-github-report-card)

# Angular GitHub Report Card

## Summary

In Week 6 at Makers Academy we followed on from our [Ajax Github Report Card](https://github.com/ejbyne/ajax-github-report-card) by creating a more sophisticated version with AngularJS.

The application has the following features:
- Search for a username on GitHub, which results in a request to the GitHub API and all matching usernames being displayed
- Search is updated every time a character is added to the search box
- Once the relevant username has been found, click on the "View Repos" box to view all of the user's repos, together with the total number of commits for each repo and the number of commits made by that user for that repo. This results in further requests to the GitHub API, firstly to retrieve all of the repos and then to retrieve the commit history for each of those repos

This was my first experience of using AngularJS and using the Karma testing framework to test the Angular controller functions.

Please visit [here](https://ang-github-report-card.herokuapp.com) to see the live version of the application.

## Technologies used

- AngularJS
- Bower
- Karma
- Jasmine
- HTML
- CSS
- Sinatra

## Instructions

Clone the repo on your machine:
```
$ git clone https://github.com/ejbyne/angular-github-report-card.git
```

Change into the directory and run the tests:
```
$ cd angular-github-report-card
$ npm test
```

Start the server:
```
$ rackup
```

Visit [http://localhost:9292](http://localhost:9292).
