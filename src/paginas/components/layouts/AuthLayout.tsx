import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <main className="flex-1 w-full max-w-md">
        <Outlet /> {/* Aquí se renderiza login o registro */}
      </main>
    </div>
  );
}
