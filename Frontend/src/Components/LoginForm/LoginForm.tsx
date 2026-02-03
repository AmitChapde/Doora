import { Button } from "../ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import logo from "../../assets/logo.png";
import { useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../ui/input-group";
import { Link, useNavigate } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { toast } from "sonner";
import { useAuth } from "../../features/auth/context/AuthContext";
import type { LoginPayload } from "../../api/auth/auth.types";
import { Spinner } from "../ui/spinner";

function LoginForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!email || !password) {
        toast.error("Please fill in all fields");
        setLoading(false);
        return;
      }

      const formData: LoginPayload = { email, password };
      await login(formData);
      toast.success("Welcome back");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error instanceof Error && `Invalid Email or Password`);
      setLoading(false);
    }
  };
  return (
    <form className="w-full max-w-md flex flex-col" onSubmit={handleSubmit}>
      <div className="flex flex-col justify-center items-center mb-6">
        <img src={logo} alt="logo" className="w-20 h-20" />
        <h2 className="text-2xl font-semibold text-gray-800 mt-2">Login</h2>
      </div>

      <div className="flex flex-col gap-4 grow">
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2 relative">
          <Label htmlFor="password">Password</Label>
          <InputGroup>
            <InputGroupInput
              id="password"
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputGroupAddon align="inline-end">
              <Tooltip>
                <TooltipTrigger asChild>
                  <InputGroupButton
                    variant="ghost"
                    aria-label="Toggle password visibility"
                    size="icon-xs"
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                      e.preventDefault();
                      setShowPassword(!showPassword);
                    }}
                  >
                    <FontAwesomeIcon
                      icon={showPassword ? faEyeSlash : faEye}
                      className="text-gray-500"
                    />
                  </InputGroupButton>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{showPassword ? "Hide" : "Show"} password</p>
                </TooltipContent>
              </Tooltip>
            </InputGroupAddon>
          </InputGroup>
        </div>

        <div className="flex justify-end">
          <p className="text-sm text-blue-500 cursor-pointer">
            <Link to="/auth/forget-password">Forgot Password?</Link>
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <Button type="submit" disabled={loading}>
            {loading ? <Spinner /> : "Submit"}
          </Button>
          <Button
            variant="outline"
            className="flex items-center justify-center gap-2 hidden"
          >
            <FontAwesomeIcon icon={faGoogle} style={{ color: "#DB4437" }} />
            Continue with Google
          </Button>
        </div>
      </div>

      <div className="flex justify-center py-4">
        <p className="text-sm">
          Don't have an Account?{" "}
          <Link to="/auth/signup" className="text-blue-500 cursor-pointer">
            Create One
          </Link>
        </p>
      </div>
    </form>
  );
}

export default LoginForm;
