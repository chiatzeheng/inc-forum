import UserAuthForm from '@/app/components/UserAuthForm'


const SignIn = () => {
  return (
    <div className='container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]'>
      <div className='flex flex-col space-y-2 text-center'>
        <h1 className='text-2xl font-semibold tracking-tight'>Welcome back</h1>
        <p className='text-sm max-w-xs mx-auto'>
            Welcome to the discussion forum. Please login to continue.
        </p>
      </div>
      <UserAuthForm />
    </div>
  )
}

export default SignIn