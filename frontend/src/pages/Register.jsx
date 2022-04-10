import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { register, reset } from '../features/auth/authSlice'
import { FaUser } from 'react-icons/fa'
import Spinner from '../components/Spinner'

function Register() {
  const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      password2: ''
  })

  const { name, email, password, password2 } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector
  (
      (state) => state.auth
  )

  useEffect(() => {
    if(isError) {
        toast.error(message)
    }

    //check also user if logged or register, user will include token and stuff then redirected
    if(isSuccess || user) {
        navigate('/')
    }

    dispatch(reset())

  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
        ...prevState,
        //button state name = button state value
        [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e) => {
      e.preventDefault()

      if(password !== password2) {
          toast.error('Passwords do not match')
      } else {
          const userData = {
              name, 
              email, 
              password
          }

          dispatch(register(userData))
      }
  }

  if(isLoading) {
    return <Spinner />
  }
  
  return (
    <>
        <section className="heading">
            <h1 className='flex items-center justify-center'>
                <FaUser /> Register
            </h1>
            <p>Please create an account</p>
        </section>
        <section className='form md:pt-32 md:pb-36'>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <input 
                        required
                        type="text" 
                        className="form-control" 
                        id="name" 
                        name="name" 
                        value={name} 
                        placeholder="Enter your name" 
                        onChange={onChange} 
                    />
                </div>
                <div className="form-group">
                    <input 
                        required
                        type="email" 
                        className="form-control" 
                        id="email" 
                        name="email" 
                        value={email} 
                        placeholder="Enter your email" 
                        onChange={onChange} 
                    />
                </div>
                <div className="form-group">
                    <input 
                        required
                        type="password" 
                        className="form-control" 
                        id="password" 
                        name="password" 
                        value={password} 
                        placeholder="Enter password" 
                        onChange={onChange} 
                    />
                </div>
                <div className="form-group">
                    <input 
                        required
                        type="password" 
                        className="form-control" 
                        id="password2" 
                        name="password2" 
                        value={password2} 
                        placeholder="Confirm password" 
                        onChange={onChange} 
                    />
                </div>
                <div className="form-group">
                    <button type="submit" 
                        className='
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
                        w-full
                        '
                    >Submit</button>
                </div>
            </form>
        </section>
    </>
  )
}

export default Register