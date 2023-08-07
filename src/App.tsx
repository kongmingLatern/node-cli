function App() {
  return (
    <button
      onClick={async () => {
        const response = await fetch("http://localhost:5173"); // Change the URL if needed
        const data = await response.json();
        console.log("data", data);
      }}
    >
      getData
    </button>
  );
}

export default App;
