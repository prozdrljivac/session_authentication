import { Button } from "../components";

export function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-4">
      <h1 className="text-3xl font-bold">Welcome to the Home Page</h1>
      <p className="text-lg text-gray-500">This is a simple home page.</p>
      <Button className="text-black" text="Logout" />
    </div>
  );
}
