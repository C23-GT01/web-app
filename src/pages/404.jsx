import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div>
      <p>Your request page is {error.status} {error.statusText || error.message}</p>
    </div>
  )

}

export default ErrorPage