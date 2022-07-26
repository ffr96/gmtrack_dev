import { useAppDispatch } from "state/reduxHooks";

import Input from "components/Input/Input";
import Button from "components/Elements/Button";
import { useInput } from "components/Input/useInput";
import { submitRegister } from "async/submitRegister";

const RegisterForm = () => {
  const [username, setUsername] = useInput();
  const [password, setPassword] = useInput();
  const [email, setEmail] = useInput();
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void submitRegister(username, password, email, dispatch);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-end">
      <h3 className="mb-6 w-full text-center text-2xl">Register</h3>
      <Input
        id="register-username"
        name="Username"
        value={username}
        required
        onChange={({ target }) => setUsername(target.value)}
        placeholder="Username"
      />
      <Input
        id="register-password"
        name="Password"
        value={password}
        placeholder="Password"
        required
        onChange={({ target }) => setPassword(target.value)}
        type="password"
      />
      <Input
        id="register-email"
        name="Email"
        value={email}
        placeholder="Email"
        required
        onChange={({ target }) => setEmail(target.value)}
        type="email"
      />
      <Button type="submit" action="SEND" id="register-submit">
        Send
      </Button>
    </form>
  );
};

export default RegisterForm;
