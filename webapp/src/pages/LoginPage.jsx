import api from "../api";
import { Button, Input } from "../components";

export function LoginPage() {
  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    const response = await api.auth.login(data);
    console.log(response);
    // Check where is session stored
    // Redirect to home page
    // Add error handling
    // Add loading state
    // Add Logout functionality
    form.reset();
  }
  return (
    <main className="bg-gray-50 dark:bg-gray-900">
      <section className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Log in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <Input
                label="Email"
                type="email"
                name="email"
                id="email"
                placeholder="Your Email"
                required
              />
              <Input
                label="Password"
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                required
              />
              <Button text="Log in" type="submit" />
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
