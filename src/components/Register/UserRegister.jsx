import React from 'react';
import { useRegisterMutation } from '../../features/api/userAuth/userAuth'; // Import the useRegisterMutation hook
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate,Link } from 'react-router-dom';

const UserRegister = () => {
  const [register, { isLoading, isError, error }] = useRegisterMutation(); // Destructure the mutation
  const navigate = useNavigate();

  // Regex patterns for validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format validation
  const nameRegex = /^[a-zA-Z\s]{2,30}$/; // Name should be 2 to 30 characters long and only contain letters and spaces
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/; // Password must be at least 8 characters long and contain at least one letter, one number, and one special character

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target); // Create FormData object from the form
    const values = {
      name: formData.get('name'),
      userEmail: formData.get('email'),
      password: formData.get('password'),
    };

    // Validate inputs
    if (!nameRegex.test(values.name)) {
      toast.error('Name must be 2-30 characters long and contain only letters and spaces.');
      return;
    }

    if (!emailRegex.test(values.userEmail)) {
      toast.error('Invalid email format.');
      return;
    }

    if (!passwordRegex.test(values.password)) {
      toast.error('Password must be at least 8 characters long, contain at least one letter, one number, and one special character.');
      return;
    }

    try {
      const response = await register(values).unwrap();
      toast.success(response.message);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      console.log(err);
      
      toast.error(err.message);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://www.icore.net.in/wp-content/uploads/2021/02/icore_logo-1a.svg"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Register
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                Name
              </label>
              <div className="mt-2">
                <input
                  name="name"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>

              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading} // Disable button while loading
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {isLoading ? 'Registering...' : 'Register'} {/* Change button text while loading */}
              </button>
            </div>
          </form>
          <p className="mt-10 text-center text-sm text-gray-500">
          Are you already Account{' '}
            <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Login
            </Link>
          </p>


        </div>
      </div>
    </>
  );
};

export default UserRegister;