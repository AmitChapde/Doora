import { useState } from "react";
import { Button } from "../ui/button";
import { FieldDescription, FieldLabel, Field, FieldGroup } from "../ui/field";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@radix-ui/react-tooltip";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isSent, setIsSent] = useState(false);

  const handleReset = () => {
    if (!password || !confirm) {
      toast.error("Please fill in the details");
      return;
    }
    if (password !== confirm) {
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);
    setIsSent(false);
    // Add API call here to reset password
  };
  return (
    <TooltipProvider>
      <div className="flex flex-col justify-center items-center min-h-screen">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Reset your Password</CardTitle>
            <CardDescription>Please enter your new password</CardDescription>
            <CardAction></CardAction>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label
                    htmlFor="password"
                    className="leading-7[&:not(:first-child)]:mt-6"
                  >
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      placeholder="Password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setPassword(e.target.value)
                      }
                      className="pr-10"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.preventDefault();
                        setShowPassword(!showPassword);
                      }}
                    >
                      <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                        className="text-sm"
                      />
                    </button>
                  </div>
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                  </div>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      placeholder="Confirm Password"
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      value={confirm}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setConfirm(e.target.value)
                      }
                      className="pr-10"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.preventDefault();
                        setShowConfirmPassword(!showConfirmPassword);
                      }}
                    >
                      <FontAwesomeIcon
                        icon={showConfirmPassword ? faEyeSlash : faEye}
                        className="text-sm"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full" onClick={handleReset}>
              Reset Password
            </Button>
          </CardFooter>
        </Card>
      </div>
    </TooltipProvider>
  );
}
export default ResetPassword;
