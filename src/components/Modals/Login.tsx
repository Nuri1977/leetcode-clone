import { authModalState } from "@/atoms/authModalAtom";
import { auth } from "@/config/firebase/firebaseConfig";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";

type Props = {};

const Login = (props: Props) => {
  const setAuthModal = useSetRecoilState(authModalState);
  const router = useRouter();
  const [inputs, setInputs] = React.useState({ email: "", password: "" });

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const handleForgotPassword = () => {
    setAuthModal((prev) => ({ ...prev, isOpen: true, type: "forgotPassword" }));
  };
  const handleCreateAccount = () => {
    setAuthModal((prev) => ({ ...prev, isOpen: true, type: "register" }));
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const user = await signInWithEmailAndPassword(
        inputs.email,
        inputs.password
      );
      if (!user) return;
      setAuthModal((prev) => ({ ...prev, isOpen: false, type: "login" }));
      router.push("/");
    } catch (error: any) {
      alert(error.message);
    }
  };

  useEffect(() => {
    if (error) {
      alert(error.message);
    }
  }, [error]);

  return (
    <form className="space-y-6 px-6 py-4" onSubmit={handleFormSubmit}>
      <h3 className="text-xl font-medium text-white">Login to LeetCode</h3>
      <div>
        <label
          htmlFor="email"
          className="text-sm font-medium block mb-2 text-gray-300"
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          required
          className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
            bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
          placeholder="Your email"
          value={inputs.email}
          onChange={handleChangeInput}
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="text-sm font-medium block mb-2 text-gray-300"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          required
          className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
            bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
          placeholder="Your password"
          value={inputs.password}
          onChange={handleChangeInput}
        />
      </div>
      <button
        type="submit"
        className="w-full text-white focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5
        text-center bg-brand-orange hover:bg-brand-orange-s"
      >
        {loading ? "Loading..." : "Login"}
      </button>
      <button
        className="flex w-full justify-end"
        onClick={() => handleForgotPassword()}
      >
        <a
          href="#"
          className="text-sm block text-brand-orange hover:underline w-full text-right"
        >
          Forgot Password?
        </a>
      </button>
      <div className="text-sm font-medium text-gray-300">
        Not Registered?&nbsp;
        <a
          href="#"
          className="text-blue-700 hover:underline"
          onClick={() => handleCreateAccount()}
        >
          Create account
        </a>
      </div>
    </form>
  );
};

export default Login;
