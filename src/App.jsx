import axios from "axios";
import { Input } from "postcss";
import { useEffect, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";

function App() {
  const apiURL = "http://localhost:3002" || import.meta.env.API_URL;

  const [prompt, setPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState([]);
  const [aiProcessing, setAiProcessing] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setAiProcessing(!aiProcessing);
    // console.log(prompt)
    // alert(apiURL);
    try {
      const response = await axios.post(`${apiURL}/generate-todo`, {
        input: prompt,
      });
      // console.log(response);

      if (response.status === 200) {
        const todo = response.data.response;
        setAiResponse(todo);
        console.log(todo);
      } else {
        console.log("error occurred!");
      }

      // console.log(response.data.response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // console.log(aiResponse);
    setAiProcessing(!aiProcessing);
  }, [aiResponse]);

  return (
    <div className="font-mono bg-gray-50 w-screen h-screen m-0 text-black">
      <div className="w-fit mx-auto p-10">
        <div>
          <h1 className="text-black font-bold text-3xl">✨ My AI TO-DO help</h1>
        </div>

        <div className="mt-5">
          {/* prompt sending form */}
          <form
            className="flex flex-row items-center gap-2"
            onSubmit={handleFormSubmit}
          >
            {/* text area for prompt */}
            <textarea
              className="textarea textarea-bordered bg-transparent text-gray-700 w-full h-fit"
              placeholder="Enter your prompt"
              onChange={(e) => setPrompt(e.target.value)}
            ></textarea>
            {/* send button */}
            {aiProcessing ? (
              <span className="loading loading-infinity"></span>
            ) : (
              <button className="btn btn-active btn-default">
                <AiOutlineSend />
              </button>
            )}
          </form>
        </div>

        {/* To do table */}
        <div>
          <h2>My TODOs</h2>
          <div className="overflow-x-auto w-fit">
            <table className="table text-black">
              {/* head */}
              <thead className="text-black">
                <tr>
                  <th></th>
                  <th>Task</th>
                  <th>Description</th>
                  <th>Due Date</th>
                </tr>
              </thead>
              <tbody>
                {aiResponse.map((item, index) => {
                  return (
                    <tr key={index}>
                      {/* <th>{index + 1}</th> */}
                      <td>
                        <label className="label cursor-pointer flex flex-row gap-4">
                          <span className="label-text">Done</span>
                          <input
                            type="checkbox"
                            defaultChecked={false}
                            className="checkbox"
                          />
                        </label>
                      </td>
                      <td>{item.title}</td>
                      <td>{item.description}</td>
                      <td>{item.due_date}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
