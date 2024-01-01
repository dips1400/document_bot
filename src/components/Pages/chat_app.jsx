import React, { useState } from "react";
import logo from './logo.svg';
import './App.css';
import CSVSelector from "./CSVSelector";

function App() {
  const [data, setData] = useState([]);
  const [fileData, setFileData] = useState();
  const [answer, setAnswer] = useState();
  const headers = data[0];
  const rows = data.slice(1);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // This function will be called whenever the input value changes
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const submitAnalyse = () =>{
    setIsLoading(true);
    let formdata = new FormData();
        formdata.append("csv_file", fileData, "sales_data_sample (1).csv");
        formdata.append("query", inputValue);

    let requestOptions = {
          method: 'POST',
          body: formdata,
          redirect: 'follow'
        };

        fetch("http://127.0.0.1:5000/chat_csv", requestOptions)
          .then(response => response.json())
          .then(result => {
            setIsLoading(false);
            setAnswer(result.answer)
          })
          .catch(error => console.log('error', error));
  }


  return (
   <>
   
<div className="container mt-5">
      <div className="row">
        <div className="col-lg-12">
          <label className="form-label">Upload a CSV data File</label>
          <div className="input-group mb-3">
       
         <CSVSelector   className="form-control" setFileData={setFileData} onChange={(_data) => setData(_data)} />

            
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter your query"
              value={inputValue}
              onChange={handleInputChange}
            />
           {!isLoading ? <button
              className="btn btn-primary mt-2"
              onClick={submitAnalyse}
            >
              Analyse
            </button>
            :
            <p>
              Analysing... Please wait
            </p>
            }
          </div>
          <div className="alert alert-info" role="alert">
            {answer}
          </div>
        </div>
        <div className="col-lg-12 mt-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">CSV Preview</h2>
          <table className="table table-striped table-hover table-responsive">
            <thead>
              <tr>
                {headers?.map((header, i) => (
                  <th key={i}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows?.map((rowData, i) => {
                return (
                  <tr key={i}>
                    {rowData?.map((data, j) => {
                      return <td key={j}>{data}</td>;
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
     
    </div>

   
   </>
  );
}

export default App;