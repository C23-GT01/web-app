import HomeLayout from "../components/Layouts/HomeLayouts"


const ErrorPage = () => {

  return (
    <HomeLayout  nodiv>
      <div className="w-full h-[100vh] flex justify-center items-center">
        <h1 className="font-inter text-7xl text-[#BBB]">404 | Not Found</h1>
      </div>
    </HomeLayout>
  )

}

export default ErrorPage;