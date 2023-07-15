import { LockClosedIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { useState } from "react";
import Cookie from "universal-cookie";

const cookie = new Cookie();

export default function Auth({ children }) {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const login = async (e) => {
    e.preventDefault();
    await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/auth/jwt/create/`, {
      method: "POST",
      body: JSON.stringify({ username: username, password: password }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 400) {
          throw "authentication failed";
        } else if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        const options = { path: "/" };
        cookie.set("access_token", data.access, options);
      });
  };
  return (
    <>
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          class="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
          Sign in to your account
        </h2>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form class="mt-8 space-y-6" action="#" method="POST">
          <div>
            <div className="rounded-md shadow-sm -space-y-px">
              <input
                name="username"
                type="text"
                autocomplete="username"
                required
                placeholder="Username"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <div class="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autocomplete="current-password"
                required
                placeholder="Password"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>
            <div class="flex items-center justify-center">
              <div class="text-sm">
                <span class="cursor-pointer font-medium text-white hover:text-indigo-500">
                  change mode?
                </span>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
