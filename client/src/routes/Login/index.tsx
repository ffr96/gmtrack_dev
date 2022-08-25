import Main from "components/Main";
import RegisterWelcome from "./RegisterForm";
import WelcomeBanner from "./WelcomeBanner";
import LoginForm from "./LoginForm";

const LoginPage = () => {
  return (
    <Main>
      <div className="flex flex-col items-center">
        <WelcomeBanner />
        <div
          className="mt-32 flex w-full animate-fadeIn flex-col items-center justify-center
         bg-slate-200 md:flex-row"
        >
          <LoginForm />
          <span className="py-40 font-workSans md:px-52">Or</span>
          <RegisterWelcome />
        </div>
      </div>
    </Main>
  );
};

export default LoginPage;
