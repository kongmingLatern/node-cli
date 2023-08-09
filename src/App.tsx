import Draw from "./components/Draw";

function App() {
   
  return (
    <div>
      <button
        onClick={async () => {
          const response = await fetch("http://localhost:5173"); // Change the URL if needed
          const data = await response.json();
          console.log("data", data);
        }}
      >
        getData
      </button>
      <div>
        <h1>项目名称</h1>
        <div>依赖数：</div>
        <Draw />
      </div>
    </div>
  );
}

export default App;
