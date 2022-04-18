import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createGoal } from '../features/goals/goalSlice'
import Swal from 'sweetalert2'
import { FaWindowClose } from 'react-icons/fa'

function GoalForm() {
  const [showModal, setShowModal] = useState(false);

  let curr = new Date()
  let defdate = curr.toISOString().substr(0,10)

  const [formData, setFormData] = useState({
    site: '',
    text: '',
    date: defdate,
    description: ''
  })

  const { site, text, date, description } = formData

  const dispatch = useDispatch()

  const onChange = (e) => {
    setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value
    }))
  }

  const onSubmit = e => {
      e.preventDefault()

      const goalData = {
        site, 
        text, 
        date,
        description
      }

      dispatch(createGoal(goalData))
  }

  const addTask = () => {

  }

  return (
    <>
      <button
        className="
        items-center
        py-2
        px-4
        border border-transparent
        text-md
        font-bold
        rounded-md
        text-white
        bg-blue-800
        hover:bg-blue-900
        focus:ring-2 focus:ring-offset-2 focus:ring-blue-800
        inline-block
        " 
        type="button"
        onClick={() => setShowModal(true)}
      >
        Add Task
      </button>
      {showModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-auto overflow-y-auto fixed pt-64 md:pt-0 inset-0 z-50 outline-none focus:outline-none">
            <div className=" w-auto my-6 mx-auto max-w-3xl ">
              <div className="border-0 rounded-lg shadow-lg   flex flex-col w-full  outline-none focus:outline-none">
                <div className="flex items-start bg-blue-900 justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-3xl font=semibold text-gray-200">Task Details</h3>
                  <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="text-red-600 text-2xl">
                        <FaWindowClose />
                    </span>
                  </button>
                </div>
                <form className="bg-zinc-50 " onSubmit={onSubmit}>
                <div className="bg-zinc-50 p-6 flex-auto ">
                    <div className="flex flex-col  items-center  rounded-md p-3 grid grid-cols-1 gap-3 sm:grid-cols-1 md:grid-cols-2 text-sm md:text-sm bg-zinc-50">
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
                </div>
                <div className="flex items-center space-x-2 justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button 
                        className="
                        items-center
                        py-3
                        px-6
                        font-bold
                        border border-transparent
                        text-sm
                        rounded-md
                        text-white
                        bg-emerald-500
                        hover:bg-emerald-600
                        focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500
                        inline-block
                        " 
                        type="submit"
                    >
                    Submit
                  </button>
                  <button 
                        className="
                        items-center
                        py-3
                        px-6
                        font-bold
                        border border-transparent
                        text-sm
                        rounded-md
                        text-white
                        bg-red-600
                        hover:bg-red-700
                        focus:ring-2 focus:ring-offset-2 focus:ring-red-600
                        inline-block
                        " 
                        type="button"
                        onClick={() => setShowModal(false)}
                    >
                        Close
                    </button>
                </div>
                </form>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  )
}

export default GoalForm