import Main from "../../components/Main";
import LoginWelcome from "./LoginWelcome";
import LoginForm from "./LoginForm";

const LoginPage = () => {
  return (
    <Main>
      <div className="flex flex-col justify-around p-12 md:flex-row">
        <LoginWelcome />
        <LoginForm />
      </div>
    </Main>
  );
};

export default LoginPage;
