### 0.4: New note diagram

```mermaid
sequenceDiagram
	participant browser
	participant server

	browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
	Note right of browser: User types a note and clicks "Save".
	activate server
	server-->browser: Status Code: 302 Found
	Note left of server: The 302 is a URL redirect. Therefore, server asks the browser to do a new HTTP GET request to /notes.
	deactivate server


	browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
	activate server
	server--> browser: HTML document
	deactivate server


	browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
	activate server
	server-->>browser: the css file (main.css)
	deactivate server


	browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
	activate server
	server-->>browser: the JavaScript file (main.js)
	deactivate server
	Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server.


	browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
	activate server
	server-->>browser: [{ "content": "HTML is easy", "date": "2019-05-23" }, ... ]
	deactivate server
	Note right of browser: The browser executes the callback function that renders the notes.
