import { useState } from "react";
import { Button } from "../ui/button";
import { FieldDescription, FieldLabel, Field, FieldGroup } from "../ui/field";
import { Input } from "../ui/input";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import { authService } from "../../features/auth/services/auth.service";

function ForgetPassword() {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setIsSent(false);
      if (!email) {
        toast.error("Please fill in the details");
      }
      await authService.forgotPassword({ email });
      toast.success("Reset link has been sent to your email");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
      setIsSent(true);
    }
  };
  return (
    <div className="w-full max-w-md flex flex-col">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="fieldgroup-email">Email</FieldLabel>
          <Input
            id="fieldgroup-email"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
          <FieldDescription>
            We&apos;ll send a reset link to this email address.
          </FieldDescription>
        </Field>
        <Field orientation="horizontal">
          <Button type="reset" variant="outline">
            <Link to="/auth/login">Back</Link>
          </Button>
          <Button type="submit" onClick={handleSubmit} disabled={loading}>
            {loading ? (
              <span>
                <Spinner />
              </span>
            ) : isSent ? (
              "Sent"
            ) : (
              "Submit"
            )}
          </Button>
        </Field>
      </FieldGroup>
    </div>
  );
}

export default ForgetPassword;
