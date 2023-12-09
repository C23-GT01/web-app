import React, { useState } from 'react';
import axios from 'axios';
import Loading from '../Elements/Loading';

const Login = ({ move }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const loginData = {
        username,
        password
      };


      const response = await axios.post('https://c23-gt01-01.et.r.appspot.com/authentications', loginData);

      const accessToken = response.data.data.accessToken;
      const refreshToken = response.data.data.refreshToken;


      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      alert(response.data.message);
      move('Account')

    } catch (error) {
      console.error('Error:', error);
      alert(error.response.data.message)
    } finally {
      setLoading(false); // Mengubah state loading menjadi false setelah proses selesai, baik berhasil maupun gagal
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 ">
      {loading ? (
        <div className="loading-indicator">
          <Loading />
          <h1 className='text-sm font-inter mt-1 text-center'>Sedang Login</h1>
        </div>
      ) : (
        <form onSubmit={handleLogin}>
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
          <button type="submit" className="bg-[#BBB] text-white py-2 px-4 rounded-md w-full mt-2 hover:bg-[#886345]">
            Login
          </button>

          <h2 onClick={() => move('Register')} className='text-sm text-[#BBB]  font-inter mt-4 text-center hover:text-[#886345]'>Belum punya akun? Daftar</h2>
        </form>
      )}
    </div>

  );
};

export default Login;