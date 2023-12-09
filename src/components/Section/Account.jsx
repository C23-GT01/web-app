import axios from 'axios';
import { useState } from 'react';
import Loading from '../Elements/Loading';

const Account = ({ move }) => {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    const refreshToken = String(localStorage.getItem('refreshToken'));
    try {
      const response = await axios({
        method: 'delete',
        url: 'https://c23-gt01-01.et.r.appspot.com/authentications',
        data: { refreshToken } // Sertakan data sebagai objek
      });

      console.log(response.data);


      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');

      alert('Logout berhasil!');
      move('Login');

      // alert(response.data.message);
      // move('Account')

    } catch (error) {
      console.error('Error:', error);
      alert('Logout Gagal!');
    } finally {
      setLoading(false); // Mengubah state loading menjadi false setelah proses selesai, baik berhasil maupun gagal
    }



  };

  return (
    <div className="max-w-md mx-auto p-4 ">
      {loading ? (
        <div className="loading-indicator">
          <Loading />
          <h1 className='text-sm font-inter mt-1 text-center'>Sedang Logout</h1>
        </div>
      ) : (
        <div className='grid sm:grid-cols-2 gap-4'>
          <div className="w-full h-32 outline py-2 px-4 rounded-md mt-2 hover:bg-[#886345] sm:col-span-2">
            Dashboard
          </div>
          <div className=" h-32 outline py-2 px-4 rounded-md mt-2 hover:bg-[#886345]">
            Manajemen Bahan Baku
          </div>
          <div className=" h-32 outline py-2 px-4 rounded-md mt-2 hover:bg-[#886345]">
            Manajemen Impact
          </div>
          <div className="h-32 outline py-2 px-4 rounded-md mt-2 hover:bg-[#886345]" onClick={handleLogout}>
            Logout
          </div>
        </div>
      )}

    </div>

  );
};

export default Account;