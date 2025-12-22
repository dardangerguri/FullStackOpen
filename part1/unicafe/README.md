# Unicafe

The Unicafe application is a feedback collection system for a cafe. Users can provide feedback by selecting "Good", "Neutral", or "Bad". The app then displays statistics based on the feedback received, including the total number of feedback entries, the average score, and the percentage of positive feedback.

<img src="https://github.com/dardangerguri/FullStackOpen/blob/main/project-media/Part1-Unicafe.gif" alt="Unicafe" width="1000" height="500"/>

## 🧠 How It Works

The application uses React's `useState` hook to manage feedback counts:
- `good`: Count of positive feedback,
- `neutral`: Count of neutral feedback,
- `bad`: Count of negative feedback.

**Calculations performed:**
- **Total**: `good + neutral + bad`,
- **Average**: Weighted feedback score,
- **Positive %**: `(good / total) * 100`.

Event handlers update the state when users click feedback buttons.

## ⚙️ Run

To run the project:

``` bash
	npm install
	npm run dev
```

---