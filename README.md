# My thoughts about a coding assignments in general

From my experience the coding style and the adopted best practices in modern JS are all about personal or team preferences. This is because the javascript programming language is super flexible, so different patterns and practices can be used from other more strict languages.

This often leads to subjective evaluation which can be the main reason why the result from the same coding assignment can be validated as the best one in the company X and the worst one in the company Y.

Also the companies which has their own products are not hiring people to do green-field projects but to jump into an already running project. Accordingly to this fact it is more important to test the developers flexibility about the technologies and their refactoring skills rather then let them make a green field example application.

## When I would ask for a test?

The only reasonable time when we should do a coding assignment is when we already did the technical interview and we are still not completely sure about the coding skills of the candidate.

## What kind of assignment I am suggesting to use if needed?

- ask the candidate to implement a special functionality for your application which can be black-boxed
- prepare a simple app which has some code smells and let him to refactor or make a code review
- ask the candidate to make a pull request (e.g. resolve some public issue) for one of the open source tools which the company is using
- do a ~2 hour pair programming with your senior dev

# My chosen solutions for the assignment

To prove my opinion described above I prepared two different solutions and I also described another two ones.

You can find the coded ones in corresponding folders:

- solution-one
  - poor typescript usage just to benefit from the basic functionality for ease the development
  - keeping functionalities together in file until it is comfortable to work with
  - server side rendering
  - API call functions in centralized folder
  - no data storing
  - no tests
- solution-two
  - decent typing
  - error boundary for the whole app
  - strongly hook based architecture
  - API call functions in separated folders next to their usage
  - no data storing
  - test coverage for pages

As the prepared ones also the described ones are based on team agreements from different companies where I worked. This includes the store/context usage, the main folders structure and also the strong hooks usage.

_PS: The first one is obviously the poorest solution, where the company had a limited budged and time for development. The fourth one would be the best fit as I describe it in next sections._

# How to start the apps

In the main folder just run `docker-compose up`. There are prepared Dockerfiles for every solution. Further information is available in corresponding folders.

# Main techstack and decisions

- React.js
- Next.js
- Material UI
- Axios
- Final form
- Typescript

## Why Next.js?

- build in development tools
- typescript support
- routing out of the box
- SSR

## Why Typescript?

Typescript helps during the development even if you use poor typing. Also there is a less change to implement bugs.

## Tests

To correctly test your frontend application you should avoid testing implementation details. This will help you to test your application as the user would use it. On the end of the day you do not care about how it is implemented, but if it is working correctly from the users perspective.

The further solutions I would consider is testing the API calls and implementing a visualization library for shared components (e.g. storybook).

To decide to test the API calls I would need more information about how the API is tested on BE side as well as a testing server where I can do destructive tests (clearing the DB, seeding it with test data, creating/updating/deleting the data).

The usage of a visualization library depends on the amount of shared components and also if those components would be used in different teams as well.

In other hand from business perspective this project is an MVP, which has to be done quickly and it has a low budget. Good senior developers should understand the business as good as the coding practices. Thats why I think that with the consideration of the business requirements it would also be a right decision to skip the testing or do only a very critical testing to save time.

## Test issues

- Issue with the material-ui DataGrid: [link](https://github.com/mui-org/material-ui-x/issues/1151)
- Inconsistency between hooks rendering while testing the user profile and edit page - unfortunately I did not found a proper solution in a reasonable time for this

## Central store or context

From business perspective the data in this application can change anytime. To show to our users up to date data, for the prepared solutions I decided to not use a store to keep the app as simple as possible. This causes that every time there is an API request when you go from page to page. In next sections I am also describing another solution which would save some of those API requests.

## Pagination in user profile done on FE side

As the API responses are completely different by the data we want to show on FE side, this was a good decision to keep the code simple as possible. This reduces the complexity of the data loading for that page. If the application would be developed further, the first thing which I would suggest is to rewrite the BE API first or introduce a frontend API or frontend store (described below).

## The third and fourth solution which I had no time do develop

To prove my opinion about the coding assignments I wanted to originally develop all 4 solutions, but as I have no more time, at least I describe them.

### Third solution - Frontend API

There should be a huge emphasis on co-operation between the FE and BE developers to accomplish the best possible API design for the frontend. As in this example the design is really bad according to the pages we want to develop. As a third solution I would introduce a frontend API. This would be a Node.js server which would consume the data from the original API and it would restructure it for more confident work on FE.

### Fourth solution - Store/Context

In the fourth solution I would introduce a central store or the usage of React context to save the API data on client side. From my point of view accordingly to BE API we have prepared and the pages we have to develop this solution would be the best fit.

It would save the loaded data on the leaderboard to the store - the users stats and their profile data. By this we would avoid to call the same API when moving on the users profile page. So on the profile page there would be only 2 API calls, one for the against user and one for the users games. Same would apply to the profile editing. So by moving from profile to edit page we would not need to do a new API call for the users data.

_PS: I think this is the solution you are expecting, as this is the best fit for the prepared API_

# Found issues in API

- no check for invalid query params
- bug in the documentation of the Leaderboard API
- different naming for the same thing (memberId vs userId)
- Error stratus 422 not documented
- too big limit or no limit for length of fields (edit user)
