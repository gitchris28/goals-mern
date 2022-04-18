import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteGoal, getCurrentGoal, closeForm, updateGoal } from '../features/goals/goalSlice'
import Swal from 'sweetalert2'
import 'animate.css';
import { FaWindowClose } from 'react-icons/fa'

function GoalItem({ goal }) {
  const dispatch = useDispatch()
  const { showSelectedGoal, currentGoal, isLoading } = useSelector((state) => state.goals)

  let curr = new Date()
  let defdate = curr.toISOString().substr(0,10)

  const [formData, setFormData] = useState({
    site: currentGoal.site,
    text: currentGoal.text,
    date: currentGoal.date,
    description: currentGoal.description,
    _id: currentGoal._id
  })

  const { site, text, date, description, _id } = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value
    }))
  }

  const handleClick1 = (id) => {
    dispatch(getCurrentGoal(id))
  }

  const onSubmit = e => {
    e.preventDefault()

    const goalData = {
      site, 
      text, 
      date,
      description,
      _id
    }

console.log(goalData)

    dispatch(updateGoal(goalData))
}

  const getSiteColor = (site) => {
    let siteColor = ''
    switch (site) {
      case 'CMS':
        siteColor = 'bg-zinc-50 p-10 btnn relative hover:cursor-pointer rounded-lg bg-sky-100'
        break
      case 'NEWCDM':
      case 'CDM':
        siteColor = 'bg-zinc-50 p-10 btnn relative hover:cursor-pointer rounded-lg bg-teal-100'
        break
      case 'CRM':
        siteColor = 'bg-zinc-50 p-10 btnn relative hover:cursor-pointer rounded-lg bg-emerald-100'
        break
      case 'QUALITY':
        siteColor = 'bg-zinc-50 p-10 btnn relative hover:cursor-pointer rounded-lg bg-fuchsia-100'
        break
      case 'REDBOARD':
      case 'MANAGER DASHBOARD':
        siteColor = 'bg-zinc-50 p-10 btnn relative hover:cursor-pointer rounded-lg bg-rose-100'
        break
      default:
        siteColor = 'bg-zinc-50 p-10 btnn relative hover:cursor-pointer rounded-lg bg-lime-100'
    }
    return siteColor
  }

  return (
    <>

    {showSelectedGoal ? ( 
      <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed pt-64 md:pt-0 inset-0 z-50 outline-none focus:outline-none">
            <div className=" w-auto my-6 mx-auto max-w-3xl ">
              <div className="border-0 rounded-lg shadow-lg  flex flex-col w-full  outline-none focus:outline-none">
                <div className="flex items-start bg-blue-900 justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-3xl font=semibold text-gray-200">{currentGoal.text}</h3>
                  <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={() => dispatch(closeForm())}
                  >
                    <span className="text-red-600 text-2xl">
                        <FaWindowClose />
                    </span>
                  </button>
                </div>

                <form className="bg-zinc-50" onSubmit={onSubmit}>
                <div className="bg-zinc-50 p-6 flex-auto">
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
                                <input className="w-full py-2 px-3 text-gray-700 leading-tight text-xl border border-gray-300 rounded-md shadow-sm" required type="date" value={date.substr(0,10)} name='date' id='date' onChange={onChange} /> 
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
                        onClick={() => dispatch(closeForm())}
                    >
                        Close
                    </button>
                </div>
                </form>

              </div>
            </div>
          </div>
      </> 
    ) : null }

<div className={getSiteColor(goal.site)}>
<div className='flex flex-col'>
      <div className='flex items-center justify-between'>
      <span></span>
      <button onClick={() => 
        Swal.fire({
          title: '',
          text: "Are you sure that you want to delete this?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#1e3a8a',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes',
          showClass: {
              popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
          }
        }).then((result) => {
          if (result.isConfirmed) {
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })
            
            dispatch(deleteGoal(goal._id))

            Toast.fire({
              icon: 'success',
              title: 'Entry successfully deleted'
            })
          }
        })
        //dispatch(deleteGoal(goal._id))
      } className="text-red-600 w-fit">
        <FaWindowClose  />
      </button>
      </div>
    <div 
      id={goal._id} 
      onClick={(e) => handleClick1(goal._id)}
    >
        <div className='flex justify-between items-center'>
          <h1 className='text-2xl items-center pb-1'>{goal.site} <span className={goal.text === "asdf" ? 'items-center rounded-lg px-1 text-sm bg-red-600 text-zinc-50' : 'items-center rounded-lg px-1 text-sm bg-green-600 text-zinc-50' }>DONE</span></h1>
          <div className='text-right'>
              { new Date(goal.date).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }
          </div>
        </div>
        <h2 className='text-xl'>{goal.text.substring(0,50)}</h2>

        <span className='text-md'>{goal.description.substring(0, 200)} { goal.description.length > 200 ? "..." : "" }</span>
    </div>
    </div>
    </div>
    </>
  )
}

export default GoalItem