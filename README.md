# Simple helper to decide what food to eat
This is a simple Node.js project to decide what to eat for lunch or dinner. It's a REST API that supports:
1. Getting / adding to list of food options stored in the MongoDB instance via GET / POST "/food-options"
2. Checking for / deleting a particular food option entry based on the name (capitalization matters) in the MongoDB instance via GET / POST "/food-options/:name"
3. Getting a randomized decision for food via GET "/food-options/decision"