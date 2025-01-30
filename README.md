server folder is for json-server
property_listing is for frontend
code is in master branch

steps
git clone https://github.com/aachal-16/deutNet.git

steps to follow for server folder
1) npm install json-server
2)json-server --watch db.json --port 5000
server will be up and running

steps to follow for property_listing
1)npm install
2)npm start

Pages -
HomePage
Property Detail Page

TechStack used -
For frontend: React.js
Styling: Bootstrap
Routing: React Router
Custom Hook: useProperties (Used custom hook for data fetch and other filter operation so that we can reuse that code )
Backend: Mocked API (running on http://localhost:5000/properties)

Features -
Search Bar: search properties by title or location
Location Filter: Dropdown for filter properties by location.
Price Filter: Dropdown for filter properties by price range.
Property Cards: Displays property details like title, location, short description, and price in a card format.
SearchDebouncing : The search bar implements debouncing to delay API calls and reduce the number of api-requests.
Routing: Users can click on a property card to view  information on a separate property detail page.

