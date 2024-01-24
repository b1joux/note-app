# note-app

Simple backend for a note-taking application using TypeScript, Node.js, and Express

To run application run the ff. command:

> npm start

host: http://localhost:3000

To use the APIs you can import Notes.postman_collection.json in Postman

GET note (/notes) - gets all notes available
GET note by id (notes/:id) - gets note by id, replace :id with the generated id

POST note (/notes) - creates a note and returns the generated id
create note body sample:
```json
{
"title": "HELLO",
"body": "WORLD"
}
```

PUT note (/notes/:id) - updates an existing note, replace :id with the generated id
update note body samples:
```json
{
"title": "HELLO",
"body": "WORLD"
}

{
"title": "HELLO WORLD"
}

{
"body": "HELLO WORLD"
}
```
DELETE note (/notes/:id) - deletes an existing note, replace :id with the generated id
