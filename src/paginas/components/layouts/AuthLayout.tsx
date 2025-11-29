
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <Outlet /> {/* Aquí se renderizarán LoginPage y UserRegister */}
    </div>
  );
};

export default AuthLayout;
