# **bruin-bites**
## *UCLA food review and data visualization app for CS35L Spring 2022*
Contributors:
Edward Hwang | Henry Wang | Derek Jiang | Jordan Lin | Jonah Kim

## Purpose

Bruin Bites is a website that allows UCLA students to more easily connect with their friends through food! Right off the bat, a new user can use the website to view what each restaurant/take-out option is serving, view their respective ratings, and even make them themselves. However, if a user wants to become more involved, they can make their own user profile that will give the user their own distinct flair and track their activity/contributions to the website. This includes displaying a quick description of themselves, their favorite places to eat, and the ratings they have written. To add onto the user experience, the website also has night mode!

## Usage

Before doing any of the following steps, please install [Node.js](https://nodejs.org/en/) to be able to run commands from the Node Package Manager (npm). 

You may also need to install [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git). 

To build the website, please run the following commands in the specified order. 

```
git clone https://github.com/35L-sleepy-tamagos/bruin-bites.git
cd bruin-bites/bites-frontend/
npm install
npm start
```

These commands are expected to be run in a Linux/Unix shell. 

**Note**: `git clone https://github.com/35L-sleepy-tamagos/bruin-bites.git` only needs to be run once; it should create a directory in the current directory called `bruin-bites/`. 

**Further Note**: `npm install` only needs to be run once after cloning the repository. 

Our program uses the following packages. The program may behave unexpectedly with different versions of the packages. 

```
├── @react-google-maps/api@2.11.9
├── @testing-library/jest-dom@5.16.4
├── @testing-library/react@13.1.1
├── @testing-library/user-event@13.5.0
├── bootstrap@5.1.3
├── firebase@9.8.1
├── formik@2.2.9
├── normalize.css@8.0.1
├── react-bootstrap@2.3.1
├── react-dom@18.1.0
├── react-icons@4.3.1
├── react-router-dom@6.3.0
├── react-scripts@5.0.1
├── react-select@5.3.2
├── react@18.1.0
├── styled-components@5.3.5
└── web-vitals@2.1.4
```

## Display Dynamic Data

As a user sends in a review, changes their profile picture, modifies a filter, and many more options, the front end will update to reflect their changes. Almost every page on our website has some amount of dynamic data: 
> Dining Frequency on the Map
>
> Inputting and Filtering through reviews
>
> Updating the User Bio, Picture, Dining History, etc.

## Uploading Data to the Backend

Displaying the dynamic data is dependent on a user's ability to input into forms and select options from a dropdown. To this aim, users are able to create an account and log into the account by sending data to our backend servers, modify their user details by changing their favorite dining places, personalizing their page by setting a profile picture, and of course, sending in reviews by inputting into different fields. 

## Meaningfully Search through Server-Side Data

Reviews can be sorted based on the time the review was posted or filtered based on the dining hall reviewed or the rating given. Beyond that, the user details are searched through to determine which dining halls they went to, what profile image they have selected, and when their last meal was. 

## At Least 3 Other Distinct Features
1. Frontend utility and beauty features like a persistent countdown until the next meal period and a toggle for dark mode. 
2. Buttons to redirect to UCLA's menu pages and an included embedded menu page in dining hall specific pages. 
3. User Account that can be personalized with a user's favorite dining halls, a short bio about themselves, and a profile picture. Beyond that, the profile also shows a user's posted reviews and logs their completely dining history. 
4. A map page which shows where the dining halls are and also uses circles whose radii are proportional to the frequency at which a user noted that they ate at that dining hall. 
5. Animations on hovering and clicking buttons. 
6. A method for users to mark that they had ate at a dining hall without needing to leave a review. Not everyone will have time to post a full review, but may want to have their history recorded. This allows for that. 
7. Additional options in the review field like a dropdown to specify a dining hall and a rating selector. These options are later used for filtering. 

## Recap of Features

Menu Viewing | User Heat Map | Viewing/Posting Reviews with Filters | Creating User Profile | Viewing Other User Profiles 

<img width="1111" alt="image" src="https://user-images.githubusercontent.com/68207907/171960961-c28771bb-1a6b-4014-b15e-aaa5fb25dc72.png">

If you want the API Keys for the Database, [Contact Us!](mailto:henrywang3@g.ucla.edu)
