const Dashboard = ({ data, logoumkm }) => {
  return (
    <div className="w-full  py-6  rounded-md mt-2  sm:col-span-2 flex gap-4">
      <img src={(data && data.image) ? data.image : logoumkm}
        className="rounded-full h-24 w-24"
        alt="Image Prfile" />
      <div className="flex flex-col justify-between w-full">
        <div>
          <h1 className="font-inter text-2xl">{data.fullname}</h1>
          <h1 className="font-inter text-xl">{data.username}</h1>
          <h1 className="font-inter text-xl">{data.email}</h1>
        </div>
      </div>
    </div >
  );
};
 
export default Dashboard;