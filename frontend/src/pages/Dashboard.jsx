import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import GoalForm from '../components/GoalForm'
import Spinner from '../components/Spinner'
import { getGoals, reset } from '../features/goals/goalSlice'
import GoalItem from '../components/GoalItem'
import ReactPaginate from 'react-paginate'
import 'flowbite';

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { goals, setGoals, isLoading, isError, message } = useSelector((state) => state.goals)

  const [ pageNumber, setPageNumber ] = useState(0)

  const goalsPerPage = 9
  const pagesVisited = pageNumber * goalsPerPage


  let displayedGoals=0;
  const displayGoals = goals
    .slice(pagesVisited, pagesVisited + goalsPerPage)
    .map((goal) => {
      displayedGoals++;
      return (
        <GoalItem key={goal._id} goal={goal} />
      )
    })

  const pageCount = Math.ceil(goals.length / goalsPerPage)

  const changePage = ({selected}) => {
    setPageNumber(selected)
  }

  useEffect(() => {

    if(isError) {
      console.log(message)
    }

    if(!user) {
      navigate('/login')
    }

    dispatch(getGoals())

    return () => {
      dispatch(reset())
    }

  }, [user, navigate, isError, message, dispatch])

  if(isLoading) {
    return <Spinner />
  }

  return (
    <section className="">
      <div className='teststylecontent '>
        <div className="heading">
          <h1>Task Dashboard </h1>
        </div>
        <div className='flex flex-col md:flex-row md:flex pb-1 items-center justify-between px-2 space-y-4 md:space-y-0'>
            <GoalForm />
            <ReactPaginate 
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={"paginationBttns"}
                    previousLinkClassName={"previousBttn"}
                    nextLinkClassName={"nextBttn"}
                    disabledClassName={"paginationDisabled"}
                    activeClassName={"paginationActive"}
                  />
        </div>
        <div className="w-full">
          <div className=''>
            <div className="">
              { goals.length > 0 ? ( 
                <>
                  <div className="w-full text-left rounded-md p-3 grid grid-cols-1 gap-3 sm:grid-cols-1 md:grid-cols-3 text-sm md:text-sm ">
                    {displayGoals}
                  </div>

                </>
              ) : (<h3 className='py-14'>You have not set any goals</h3>) }
            </div>

            <div className={displayedGoals < 3 ? 'md:pb-96 md:mb-36 py-10' : 'py-10'}>
            </div>
          </div>  
        </div>
      </div>
    </section>
  )
}

export default Dashboard