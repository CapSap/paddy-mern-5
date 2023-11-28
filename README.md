# paddy-mern-5
## Description
A click and collect coordination app for a retail store.
This is attempt number 5 at creating this app. 

## Slightly more in-depth description
This app is designed to replace several google sheets which are used to coordinate tasks and data flow between a central ecommerce location and 7 shop front locations. A central location will communicate tasks to stores, stores will take some action and communicate some piece of data back. 

## Tech
MERN stack (MongoDB, Express, React, Node) with Typescript

I wanted to use IBM's carbon UI kit but at the time, they did not support react 18. Instead I'll use tailwind to style the frontend


## How to run
You'll need to have your ip address added to the mongodb database whitelist if you want to interact with it. Otherwise, there is a dummydata file that could be used.

1. clone the repo
2. ```cd frontend && npm i```
3. ```cd backend && npm i```

then either in the frontend folder or backend folder run (this will concurrently run the server and frontend)

4. ```npm run dev```

## Challeneges 
Burnout- this is attempt number 5 of this project. An ongoing challenge for me is to not get overwhelmed, and keep focused on small incremental improvements.

UI Design- The previous system used a table/spreadsheet and I did not want to directly replicate that expereience as in some occasions, some fields will have more text than others. I thought a card design would be better able to handle different sized blocks of text. 

Business Logic - Towards the tail end of the project, I've realised there's some situations that I haven't thought of. 
