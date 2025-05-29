import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { loginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Playfair+Display:wght@700&display=swap');

  .login-container {
    font-family: 'Poppins', sans-serif;
  }

  .login-title {
    font-family: 'Playfair Display', serif;
    font-size: 2.5rem;
    font-weight: 700;
    color: #1e40af;
    letter-spacing: -0.02em;
    margin-bottom: 1.5rem;
    background: linear-gradient(to right, #1e40af, #3b82f6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .login-subtitle {
    font-size: 1.1rem;
    color: #4b5563;
    font-weight: 500;
  }

  .register-link {
    font-weight: 600;
    color: #3b82f6;
    transition: all 0.3s ease;
    position: relative;
  }

  .register-link:hover {
    color: #1e40af;
  }

  .register-link::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: -2px;
    left: 0;
    background: linear-gradient(to right, #3b82f6, #1e40af);
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.3s ease;
  }

  .register-link:hover::after {
    transform: scaleX(1);
    transform-origin: left;
  }

  .home-button {
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    letter-spacing: 0.02em;
    transition: all 0.3s ease;
    background: linear-gradient(135deg, #1e40af, #3b82f6);
    color: white;
    border: none;
    box-shadow: 0 2px 8px rgba(59, 130, 246, 0.2);
  }

  .home-button:hover {
    background: linear-gradient(135deg, #1e3a8a, #2563eb);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  }
`;

const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();

    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  }

  return (
    <>
      <style>{styles}</style>
      <div className="login-container">
        <div>
          <Link to='/shop/home'>
            <Button className="absolute top-5 right-10 home-button">
              Go To Products
            </Button>
          </Link>
        </div>
        <div className="mx-auto w-full max-w-md space-y-6 relative">
          <div className="text-center">
            <h1 className="login-title">
              Sign in to your account
            </h1>
            <p className="login-subtitle">
              Don't have an account
              <Link
                className="font-medium ml-2 register-link"
                to="/auth/register"
              >
                Register
              </Link>
            </p>
          </div>
          <CommonForm
            formControls={loginFormControls}
            buttonText={"Sign In"}
            formData={formData}
            setFormData={setFormData}
            onSubmit={onSubmit}
          />
        </div>
      </div>
    </>
  );
}

export default AuthLogin;
