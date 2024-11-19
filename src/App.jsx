import { AiOutlineSend } from "react-icons/ai";

function App() {
  return (
    <div className="font-mono bg-gray-50 w-screen h-screen m-0 text-black">
      <div className="w-fit mx-auto p-10">
        <div>
          <h1 className="text-black font-bold text-3xl">My AI TO-DO help</h1>
        </div>

        <div className="mt-5">
          {/* prompt sending form */}
          <form
            className="flex flex-row items-center gap-2"
            onSubmit={handleFormSubmit}
          >
            {/* text area for prompt */}
            <textarea
              className="textarea textarea-bordered bg-transparent text-gray-700"
              placeholder="Enter your prompt"
            ></textarea>
            {/* send button */}
            <button className="btn btn-active btn-default">
              <AiOutlineSend />
            </button>
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
                {/* row 1 */}
                <tr>
                  <th>1</th>
                  <td>Cy Ganderton</td>
                  <td>Quality Control Specialist</td>
                  <td>Blue</td>
                </tr>
                {/* row 2 */}
                <tr>
                  <th>2</th>
                  <td>Hart Hagerty</td>
                  <td>Desktop Support Technician</td>
                  <td>Purple</td>
                </tr>
                {/* row 3 */}
                <tr>
                  <th>3</th>
                  <td>Brice Swyre</td>
                  <td>Tax Accountant</td>
                  <td>Red</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
