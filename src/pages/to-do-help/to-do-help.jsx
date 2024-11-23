import React from "react";

import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineSend, AiOutlineThunderbolt } from "react-icons/ai";

const ToDoHelp = () => {
  const apiURL = "http://localhost:3002" || import.meta.env.API_URL;

  const [prompt, setPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState([]);
  const [aiProcessing, setAiProcessing] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setAiProcessing(true);
    try {
      const response = await axios.post(`${apiURL}/generate-todo`, {
        input: prompt,
      });

      console.log(response);

      // if (response.status === 200) {
      const todo = response.data.response;
      setAiResponse(todo);
      console.log(todo);
      setAiProcessing(false); // Important: Ensure loading stops on error

      // } else {
      //   console.log("error occurred!");
      // }
    } catch (error) {
      console.error(error);
      setAiProcessing(false); // Important: Ensure loading stops on error
    }
  };

  return (
    <div className="font-mono min-h-screen m-0 dark:text-gray-100 text-black flex flex-col">
      <div className="flex-grow">
        <div className="w-fit mx-auto p-10">
          <div>
            <h1 className="text-black dark:text-gray-100 font-bold text-3xl flex flex-row items-center gap-2">
              <img src="/icon.png" alt="logo" width={50} />
              My TODOs help
            </h1>
          </div>

          <div className="mt-5">
            {/* prompt sending form */}
            <form
              className="flex flex-row items-center gap-2"
              onSubmit={handleFormSubmit}
            >
              {/* text area for prompt */}
              <textarea
                className="textarea textarea-bordered bg-transparent dark:text-gray-50 text-gray-700 w-full h-fit"
                placeholder="Enter your prompt"
                onChange={(e) => setPrompt(e.target.value)}
              ></textarea>
              {/* send button */}
              {aiProcessing ? (
                <span className="loading loading-infinity"></span>
              ) : (
                <button
                  className="btn btn-active btn-default"
                  // onClick={() => setAiProcessing(true)}
                >
                  <AiOutlineSend />
                </button>
              )}
            </form>
          </div>

          {/* To do table */}
          {aiResponse.length > 0 && (
            <div className="font-sans">
              <h2>My TODOs</h2>
              <div className="overflow-x-auto w-fit">
                <table className="table text-black dark:text-gray-50">
                  {/* head */}
                  <thead className="text-black dark:text-gray-50">
                    <tr className="border-none">
                      <th></th>
                      <th>Task</th>
                      <th>Description</th>
                      <th>Due Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {aiResponse.map((item, index) => {
                      return (
                        <tr
                          key={index}
                          className="border-b-2 border-gray-200 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-900"
                        >
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
                          <td>
                            <input
                              type="text"
                              className="input input-bordered w-full bg-transparent dark:text-gray-50 text-gray-700"
                              value={item.title}
                              onChange={(e) => {
                                const updatedResponse = [...aiResponse];
                                updatedResponse[index].title = e.target.value;
                                setAiResponse(updatedResponse);
                              }}
                            />
                            {/* {item.title} */}
                          </td>
                          <td>
                            <input
                              type="text"
                              className="input input-bordered w-full bg-transparent dark:text-gray-50 text-gray-700"
                              value={item.description}
                              onChange={(e) => {
                                const updatedResponse = [...aiResponse];
                                updatedResponse[index].description =
                                  e.target.value;
                                setAiResponse(updatedResponse);
                              }}
                            />
                            {/* {item.description} */}
                          </td>
                          <td>
                            <input
                              type="text"
                              className="input input-bordered w-full bg-transparent dark:text-gray-50 text-gray-700"
                              value={item.due_date}
                              onChange={(e) => {
                                const updatedResponse = [...aiResponse];
                                updatedResponse[index].due_date =
                                  e.target.value;
                                setAiResponse(updatedResponse);
                              }}
                            />
                            {/* {item.due_date} */}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <button className="btn btn-default">
                  Accept
                  <AiOutlineThunderbolt />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToDoHelp;
