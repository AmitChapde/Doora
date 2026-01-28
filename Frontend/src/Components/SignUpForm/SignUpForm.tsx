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
import { useAuth } from "../../features/auth/context/AuthContext";
import type { SignupPayload } from "../../api/auth/auth.types";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";

function SignUpForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!name || !email || !password) {
        toast.error("Please fill in all fields");
        setLoading(false);
        return;
      }

      if (password.length < 6) {
        toast.error("Password must be at least 6 characters long");
        setLoading(false);
        return;
      }

      const formData: SignupPayload = { name, email, password };
      await register(formData);
      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Registration failed. Please try again.",
      );
      setLoading(false);
    }
  };
  return (
    <form className="w-full max-w-md flex flex-col" onSubmit={handleSubmit}>
      <div className="flex flex-col justify-center items-center mb-6">
        <img src={logo} alt="logo" className="w-20 h-20" />
        <h2 className="text-2xl font-semibold text-gray-800 mt-2">
          Create an Account
        </h2>
      </div>

      <div className="flex flex-col gap-4 grow">
        <div className="flex flex-col gap-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

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

        <div className="flex flex-col gap-2">
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

        <div className="flex flex-col gap-2 mt-2">
          <Button type="submit" disabled={loading}>
            {loading ? <Spinner  data-icon="inline-start" /> : "Submit"}
            
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
          Already have an Account?{" "}
          <Link to="/auth/login" className="text-blue-500 cursor-pointer">
            Login
          </Link>
        </p>
      </div>
    </form>
  );
}

export default SignUpForm;
