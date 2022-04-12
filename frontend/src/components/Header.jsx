import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'

function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  
  const onLogout = () => {
      dispatch(logout())
      dispatch(reset())
      navigate('/')
  }

  return (
    <header className='flex justify-between items-center pb-3'>
        <div className='items-center'>
            
            <Link to='/'>
                <h1 className="text-3xl font-bold text-sky-900 text-left">Task Tracker</h1>
                <h1 className="text-3xl font-bold text-sky-900 text-left">{ user ? user && "(" + user.name + ")" : '' }</h1>
            </Link>
        </div>
        <ul className='flex'>
            {user ? (
                <li>
                    <button 
                        className="
                        items-center
                        py-1
                        px-4
                        border border-transparent
                        text-md
                        font-bold
                        rounded-md
                        text-white
                        bg-red-600
                        hover:bg-red-700
                        focus:ring-2 focus:ring-offset-2 focus:ring-red-600
                        inline-block
                        flex
                        " 
                    onClick={onLogout}>
                        <FaSignOutAlt /> Logout
                    </button>
                </li>
            ) : (
            <>
                <li className='px-5'>
                    <Link to='/login'>
                        <FaSignInAlt /> Login
                    </Link>
                </li>
                <li>
                    <Link to='/register'>
                        <FaUser /> Register
                    </Link>
                </li>
            </>
            )}
        </ul>
    </header>
  )
}

export default Header