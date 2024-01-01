import React from 'react'
import './Chatwithcsv.css'
import { useState, useEffect} from 'react';
import axios from "axios";

const Chatwithcsv = () => {

  const [result, setResult] = useState()
  const [question, setQuestion] = useState()
  const [file, setFile] = useState()


  const handleQuestionChange = (event) => {
    setQuestion(event.target.value)
  }

  const handleFileChange = (event) => {
    setFile(event.target.files[0])
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const formData = new FormData()

    if (file) {
      formData.append('file', file)
      console.log('got file')
    }
    if (question) {
      formData.append('question', question)
      console.log('got question')
    }

    fetch('/predict', {
      method: "POST",
      formData
    })
      .then((response) => response.json())
      .then((data) => {
        setResult(data.result)
        console.log(data)
      })
      .catch((error) => {
      console.error("Error", error)
    })
  
  }


  return (
    <div>
      <div className="container">
        <div className='header-container'>
            <p>Chat with your document</p>
        </div>
        <div className='main-content'>
            <div className='form-container'>
                <form 
                // onSubmit={handleSubmit} 
                action='/predict'
                className="form-content" 
                method="post" encType="multipart/form-data">
                  <div className='inner-container'>

                  <div className='csv_file'>
                    <label name="file" htmlFor="file">
                      Upload CSV file:
                    </label>
                    <br></br><br></br>
                    <input
                      type="file"
                      id="file"
                      name="file"
                      accept=".csv"
                      onChange={handleFileChange}
                      className="mb-3"
                    />
                    </div>

                    <div className='question_div'> 
                      <label htmlFor="question">
                        Question:
                      </label>
                      <input
                      name="question"
                      id="question"
                      type="text"
                      value={question}
                      onChange={handleQuestionChange}
                      placeholder="Ask your question here"
                    />
                    <button
                    name='submit'
                    type="submit"
                    disabled={!file || !question}
                  >
                    Submit
                  </button>
                    </div>
                  
                  </div>
                </form>
                <p>Result: 
                  {result}
                </p>
              </div>
          </div>
      </div>
    </div>
  )
}

export default Chatwithcsv

// import { response } from "express";
// import { useState } from "react";

// export default function Test() {
//   const [result, setResult] = useState()
//   const [question, setQuestion] = useState()
//   const [file, setFile] = useState()

//   const handleQuestionChange = (event: any) => {
//     setQuestion(event.target.value)
//   }

//   const handleFileChange = (event: any) => {
//     setFile(event.target.files[0])
//   }

//   const handleSubmit = (event: any) => {
//     event.preventDefault()

//     const formData = new FormData()

//     if (file) {
//       formData.append('file', file)
//     }
//     if (question) {
//       formData.append('question', question)
//     }

//     fetch('http://127.0.0.1:5000/predict', {
//       method: "POST",
//       body: formData
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         setResult(data.result)
//       })
//       .catch((error) => {
//       console.error("Error", error)
//     })
//   }


//   return (
//     <div className="max-w-md mx-auto my-8 p-4 bg-gray-400 rounded-lg shadow-lg">
//       <form onSubmit={handleSubmit} className="mb-4">
//         <label
//           className="block mb-2 font-bold text-gray-700"
//           htmlFor="question"
//         >
//           Question:
//         </label>
//         <input
//           className="appearance-none border rounded w-full py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           id="question"
//           type="text"
//           value={question}
//           onChange={handleQuestionChange}
//           placeholder="Ask your question here"
//         />
//         <label className="block mb-2 font-bold text-gray-700" htmlFor="file">
//           Upload CSV file:
//         </label>
//         <input
//           type="file"
//           id="file"
//           name="file"
//           accept=".csv"
//           onChange={handleFileChange}
//           className="mb-3"
//         />
//         <button
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//           type="submit"
//           disabled={!file || !question}
//         >
//           Submit
//         </button>
//       </form>
//       <p className="text-gray-700 font-bold">Result: {result}</p>
//     </div>
//   );
// }