import { useDispatch } from 'react-redux'
import { deleteGoal } from '../features/goals/goalSlice'
import Swal from 'sweetalert2'
import 'animate.css';
import { FaWindowClose } from 'react-icons/fa'

function GoalItem({ goal }) {
  const dispatch = useDispatch()
  const example = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."

  const alertDiv = (event) => {
    console.log(event.target.dataset.text)
    /*
    Swal.fire({
      title: '<strong>HTML <u>example</u></strong>',
      icon: 'info',
      html:
        'You can use <b>bold text</b>, ' +
        '<a href="//sweetalert2.github.io">links</a> ' +
        'and other HTML tags',
      showCloseButton: true,
      confirmButtonColor: '#3085d6'
    })
    */
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
    <div 
      className={getSiteColor(goal.site)}
      onClick={alertDiv}
      data-text={goal.text}
    >
        <div className='flex justify-between items-center'>
          <h1 className='text-2xl items-center pb-1'>{goal.site} <span className={goal.text === "asdf" ? 'items-center rounded-lg px-1 text-sm bg-red-600 text-zinc-50' : 'items-center rounded-lg px-1 text-sm bg-green-600 text-zinc-50' }>{ goal.text === "Google login" ? 'PENDING' : 'DONE' }</span></h1>
          <div className='text-right'>
              { new Date(goal.date).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }
          </div>
        </div>
        <h2 className='text-xl'>{goal.text.substring(0,50)}</h2>
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
        } className="close text-red-600">
          <FaWindowClose />
        </button>
        <span className='text-md'>{goal.description.substring(0, 200)} { goal.description.length > 200 ? "..." : "" }</span>
    </div>
  )
}

export default GoalItem