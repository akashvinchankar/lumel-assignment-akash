import { useState } from "react";
import "./App.css";
import HierarchicalTable from "./components/HierarchicalTable";

const initialData = [
  {
    id: "electronics",
    label: "Electronics",
    value: 1500, //this value needs to be calculated from the children values (800+700)
    children: [
      { id: "phones", label: "Phones", value: 800 },
      { id: "laptops", label: "Laptops", value: 700 },
    ],
  },
  {
    id: "furniture",
    label: "Furniture",
    value: 1000, //this value needs to be calculated from the children values (300+700)
    children: [
      { id: "tables", label: "Tables", value: 300 },
      { id: "chairs", label: "Chairs", value: 700 },
    ],
  },
];

function App() {
  const [data, setData] = useState(initialData);

  return (
    <div className="App">
      <h1>Hierarchical Table</h1>
      <HierarchicalTable data={data} setData={setData} />
    </div>
  );
}

export default App;
