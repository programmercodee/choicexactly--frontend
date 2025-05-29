import { Link, Outlet } from "react-router-dom";

const styles = `
  .welcome-section {
    position: relative;
    overflow: hidden;
    background: linear-gradient(135deg, #3b82f6, #60a5fa, #93c5fd);
    animation: gradientShift 8s ease infinite;
  }

  .welcome-section::before {
    content: '👕';
    position: absolute;
    font-size: 300px;
    opacity: 0.1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: float 6s ease-in-out infinite;
  }

  .welcome-section::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
    animation: pulse 4s ease-in-out infinite alternate;
  }

  .welcome-content {
    position: relative;
    z-index: 1;
    animation: slideIn 1s ease-out;
  }

  .welcome-title {
    position: relative;
    display: inline-block;
  }

  .welcome-title::after {
    content: '✨';
    position: absolute;
    right: -40px;
    top: -20px;
    font-size: 24px;
    animation: sparkle 2s ease-in-out infinite;
  }

  .welcome-title::before {
    content: '✨';
    position: absolute;
    left: -40px;
    bottom: -20px;
    font-size: 24px;
    animation: sparkle 2s ease-in-out infinite 1s;
  }

  .floating-icons {
    position: absolute;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  .floating-icon {
    position: absolute;
    font-size: 24px;
    opacity: 0.2;
    animation: floatIcon 8s ease-in-out infinite;
  }

  .floating-icon:nth-child(1) { top: 20%; left: 20%; animation-delay: 0s; }
  .floating-icon:nth-child(2) { top: 30%; right: 25%; animation-delay: -2s; }
  .floating-icon:nth-child(3) { bottom: 25%; left: 30%; animation-delay: -4s; }
  .floating-icon:nth-child(4) { bottom: 35%; right: 20%; animation-delay: -6s; }

  .welcome-subtitle {
    opacity: 0;
    animation: fadeIn 1s ease-out forwards;
    animation-delay: 0.5s;
    margin-top: 1rem;
    font-size: 1.2rem;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  @keyframes float {
    0%, 100% { transform: translate(-50%, -50%) rotate(0deg); }
    50% { transform: translate(-50%, -50%) rotate(10deg) scale(1.1); }
  }

  @keyframes pulse {
    0% { opacity: 0.5; transform: scale(1); }
    100% { opacity: 0.7; transform: scale(1.1); }
  }

  @keyframes slideIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes sparkle {
    0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.8; }
    50% { transform: scale(1.2) rotate(180deg); opacity: 1; }
  }

  @keyframes floatIcon {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(180deg); }
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .welcome-button {
    margin-top: 2rem;
    padding: 0.75rem 1.5rem;
    background: rgba(255, 255, 255, 0.2);
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 9999px;
    color: white;
    font-weight: 600;
    transition: all 0.3s ease;
    opacity: 0;
    animation: fadeIn 1s ease-out forwards;
    animation-delay: 1s;
  }

  .welcome-button:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

function AuthLayout() {
  return (
    <>
      <style>{styles}</style>
      <div className="flex min-h-screen w-full">
        <div className="hidden lg:flex items-center justify-center welcome-section w-1/2 px-12">
          <div className="floating-icons">
            <div className="floating-icon">👕</div>
            <div className="floating-icon">🎨</div>
            <div className="floating-icon">✨</div>
            <div className="floating-icon">🌟</div>
          </div>
          <div className="max-w-md space-y-6 text-center text-primary-foreground welcome-content">
            <h1 className="text-4xl font-extrabold tracking-tight welcome-title">
              Welcome to ChoiceXactly
            </h1>
            <p className="welcome-subtitle">
              Your Style, Your Choice, Your Story
            </p>
            <Link to='/shop/home'>
              <button className="welcome-button">
                Explore Collection
              </button>
            </Link>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default AuthLayout;
