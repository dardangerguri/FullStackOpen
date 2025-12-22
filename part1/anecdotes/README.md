# Anecdotes

The Anecdotes application is a simple React app that displays a random anecdote each time the user clicks the "next anecdote" button. Users can also vote for their favorite anecdotes, and the app will display the anecdote with the most votes.

<img src="https://github.com/dardangerguri/FullStackOpen/blob/main/project-media/Part1-Anecdote.gif" alt="Anecdote" width="1000" height="500"/>

## 🧠 How It Works

The application uses React's `useState` hook to manage:
- The currently displayed anecdote,
- Vote counts for each anecdote.

**Core functionality:**
- Move to the next anecdote when the "next anecdote" button is clicked,
- Increment votes for the selected anecdote,
- Display the anecdote with the highest number of votes.

State updates trigger re-renders, keeping the UI in sync with user actions.

## ⚙️ Run

To run the project:

``` bash
	npm install
	npm run dev
```

---