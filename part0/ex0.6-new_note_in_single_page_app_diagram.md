### 0.6: New note in Single page app diagram

```mermaid
sequenceDiagram
	participant browser
	participant server

	browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
	Note right of browser: User types a note and clicks "Save". The browser sends the note data in JSON format.
	activate server
	server-->browser: Status Code: 201 Created
    deactivate server
	Note right of browser: The browser re-renders the note list without reloading the page.