import React, { useState } from "react";

const Modal = () => {
    let curr = new Date()
    let defdate = curr.toISOString().substr(0,10)

    const [formData, setFormData] = useState({
    site: '',
    text: '',
    date: defdate,
    description: ''
    })

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
      }
    
      const onSubmit = e => {
          e.preventDefault()
    
          //alert(site + " " + text + " " + date + " " + description)
    
          //dispatch(createGoal({text}))
      }

    const { site, text, date, description } = formData
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button
        className="bg-blue-200 text-black active:bg-blue-500 
      font-bold px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Fill Details
      </button>
      {showModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-3xl font=semibold">General Info</h3>
                  <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="text-black opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full">
                      x
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">

                <form className="flex flex-col items-center w-full" onSubmit={onSubmit}>
                <div className=" rounded-md p-3 grid grid-cols-1 gap-3 sm:grid-cols-1 md:grid-cols-2 text-sm md:text-sm bg-zinc-50">
                    <div className="w-full rounded-lg flex flex-col">
                        <div className="w-full p-4 bg-zinc-50 rounded-t-lg">
                            <label className="text-left block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2" >
                                Site
                            </label>
                            <select required name='site' id='site' value={site} onChange={onChange} className="w-full py-2 px-3 text-gray-700 border leading-tight text-xl border-gray-300 rounded-md shadow-sm focus:ring-rose-500 focus:border-rose-500">
                                <option></option>
                                <option>CMS</option>
                                <option>CDM</option>
                                <option>CRM</option>
                                <option>QUALITY</option>
                                <option>MANAGER DASHBOARD</option>
                                <option>CORPORATE SITE</option>
                                <option>REDBOARD</option>
                                <option>DATABASE</option>
                                <option>SERVER</option>
                                <option>CRON</option>
                                <option>ALL SITES</option>
                            </select>
                        </div>
                        <div className="w-full p-4 bg-zinc-50">
                            <label className="text-left block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2" >
                                Title
                            </label>
                            <input className="w-full py-2 px-3 text-gray-700 leading-tight text-xl border border-gray-300 rounded-md shadow-sm" required type='text' name='text' id='text' value={text} onChange={onChange} /> 
                        </div>
                        <div className="w-full p-4 bg-zinc-50 rounded-b-lg">
                            <label className="text-left block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2" >
                                Date
                            </label>
                            <input className="w-full py-2 px-3 text-gray-700 leading-tight text-xl border border-gray-300 rounded-md shadow-sm" required type="date" value={date} name='date' id='date' onChange={onChange} /> 
                        </div>
                    </div>
                    <div className="w-full bg-zinc-50 p-4 flex flex-col rounded-lg">
                        <label className="text-left block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2" >
                            Description
                        </label>
                        <textarea  name='description' id='description' value={description} onChange={onChange} className="w-full h-64 px-3 py-2 text-base border border-gray-300 rounded-md shadow-sm" ></textarea>
                    </div>
                </div>
                <div className="flex w-full justify-center w-full pt-5">
                    <button 
                        className="
                        items-center
                        w-1/3
                        py-2
                        px-4
                        border border-transparent
                        text-sm
                        rounded-md
                        text-white
                        bg-sky-500
                        hover:bg-sky-600
                        focus:ring-2 focus:ring-offset-2 focus:ring-sky-500
                        inline-block
                        " 
                        type="submit"
                    >
                        Add Task
                    </button>
                </div>
            </form>

                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Modal;