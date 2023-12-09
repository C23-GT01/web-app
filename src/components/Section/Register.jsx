import React, { useState } from 'react';

const Register = ({ move }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <div className="max-w-md mx-auto p-4 ">
      <form onSubmit={handleSubmit} className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        <div className="mb-4 sm:col-span-2 ">
          <label htmlFor="username" className="block font-semibold mb-1 ">Fullname</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange} 
            className="w-full border rounded-md py-2 px-3"
            autoComplete="off"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="username" className="block font-semibold mb-1">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            className="w-full border rounded-md py-2 px-3"
            autoComplete="off"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="username" className="block font-semibold mb-1">Email</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            className="w-full border rounded-md py-2 px-3"
            autoComplete="off"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block font-semibold mb-1">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            className="w-full border rounded-md py-2 px-3"
            autoComplete="off"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block font-semibold mb-1">Confirm Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            className="w-full border rounded-md py-2 px-3"
            autoComplete="off"
            required
          />
        </div>
        <button type="submit" className="bg-[#BBB] text-white py-2 px-4 rounded-md w-full mt-2 hover:bg-[#886345] sm:col-span-2">
          Register
        </button>

        <h2 onClick={move} className='text-sm text-[#BBB] font-inter mt-4 text-center hover:text-[#886345] sm:col-span-2'>Sudah Punya Akun? Login</h2>
      </form>
    </div>

  );
};

export default Register;