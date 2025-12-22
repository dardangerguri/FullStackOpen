# Part 0 - Fundamentals of Web apps

This part covers the fundamental concepts of how web applications work, and focuses on how different types web apps communicate over HTTP. Below are explanations of the sequence diagrams that illustrate different web applications structure.

## 0.4: New Note Diagram

This diagram illustrates the process of creating a new note in a traditional web applications.

#### Steps
	1. POST Request: The browser sends a POST request with the note content.
	2. Server Processing: The server creates a new note and redirects the browser to the /notes page.
	3. Page Reload: The browser reloads the page and fetches the HTML, CSS, and JS files.
	4. Data Fetching: The browser fetches the JSON data containing the notes and renders them on the page.

## 0.5: Single Page App Diagram

This diagram demonstrates how a Single Page Application (SPA) works.

#### Steps
	1. Initial Load: The browser requests and receives the HTML, CSS, and JS files.
	2. Data Fetching: The JavaScript fetches the JSON data containing the notes.
	3. DOM Update: The notes are dynamically rendered on the page without a full reload.


## 0.6: New Note in Single Page App Diagram

This diagram shows the process of adding a new note in a Single Page Application.

#### Steps
	1. Form Submission: The user submits the form, and the DOM is updated with the new note.
	2. POST Request: The browser sends a POST request with the note data to the server.
	3. Server Response: The server confirms the creation of the note with a 201 Created status.
	4. Confirmation: The browser receives the confirmation, and the note is displayed without a page reload.

---