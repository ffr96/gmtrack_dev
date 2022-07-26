import Input from "components/Input/Input";
import Button from "components/Elements/Button";
import { useInput } from "components/Input/useInput";
import { useLoginMutation } from "state/services/serverAPI";

const LoginForm = () => {
  const [username, setUsername] = useInput();
  const [password, setPassword] = useInput();
  const [login] = useLoginMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void login({ username, password });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-end">
      <h3 className="mb-6 w-full text-center text-2xl">Login</h3>
      <Input
        id="login-username"
        name="Username"
        value={username}
        required
        onChange={({ target }) => setUsername(target.value)}
        placeholder="Username"
      />
      <Input
        id="login-password"
        name="Password"
        value={password}
        placeholder="Password"
        required
        onChange={({ target }) => setPassword(target.value)}
        type="password"
      />
      <Button type="submit" action="SEND" id="login-submit">
        Send
      </Button>
    </form>
  );
};

export default LoginForm;
