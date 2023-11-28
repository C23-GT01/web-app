import AuthLayouts from "../components/Layouts/AuthLayouts"
import FormLogin from "../components/Fragments/FormLogin"

const LoginPage = () => {
  return (
    <AuthLayouts type="Login">
      <FormLogin />
    </AuthLayouts>
  )

}

export default LoginPage