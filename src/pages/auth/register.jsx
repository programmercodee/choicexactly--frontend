import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { registerFormControls } from "@/config";
import { registerUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Playfair+Display:wght@700&display=swap');

  .register-container {
    font-family: 'Poppins', sans-serif;
  }

  .register-title {
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

  .register-subtitle {
    font-size: 1.1rem;
    color: #4b5563;
    font-weight: 500;
  }

  .login-link {
    font-weight: 600;
    color: #3b82f6;
    transition: all 0.3s ease;
    position: relative;
  }

  .login-link:hover {
    color: #1e40af;
  }

  .login-link::after {
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

  .login-link:hover::after {
    transform: scaleX(1);
    transform-origin: left;
  }
`;

const initialState = {
  userName: "",
  email: "",
  password: "",
};

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
        navigate("/auth/login");
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  }

  console.log(formData);

  return (
    <>
      <style>{styles}</style>
      <div className="register-container">
        <div className="mx-auto w-full max-w-md space-y-6">
          <div className="text-center">
            <h1 className="register-title">
              Create new account
            </h1>
            <p className="register-subtitle">
              Already have an account
              <Link
                className="font-medium ml-2 login-link"
                to="/auth/login"
              >
                Login
              </Link>
            </p>
          </div>
          <CommonForm
            formControls={registerFormControls}
            buttonText={"Sign Up"}
            formData={formData}
            setFormData={setFormData}
            onSubmit={onSubmit}
          />
        </div>
      </div>
    </>
  );
}

export default AuthRegister;
