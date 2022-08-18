import { useAppDispatch } from "../../state/reduxHooks";
import { submitLogin } from "../../async/submitLogin";

import Input from "../../components/Input/Input";
import Button from "../../components/Button";
import { useInput } from "../../components/Input/useInput";

const RegisterForm = () => {
  const [username, setUsername] = useInput();
  const [password, setPassword] = useInput();
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void submitLogin(username, password, dispatch);
  };

  return (
    <div>
      <h3 className="mb-6 text-center text-2xl">Register</h3>
      <form onSubmit={handleSubmit} className="flex flex-col items-end">
        <Input
          name="Username"
          value={username}
          required
          onChange={({ target }) => setUsername(target.value)}
          placeholder="Username"
        />
        <Input
          name="Password"
          value={password}
          placeholder="Password"
          required
          onChange={({ target }) => setPassword(target.value)}
          type="password"
        />
        <Button type="submit" action="SEND">
          Send
        </Button>
      </form>
    </div>
  );
};

export default RegisterForm;
