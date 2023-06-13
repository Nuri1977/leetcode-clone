import { auth } from "@/config/firebase/firebaseConfig";
import React from "react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";

type Props = {};

const ResetPassword = (props: Props) => {
  const [sendPasswordResetEmail, sending, errorSendMail] =
    useSendPasswordResetEmail(auth);
  const [email, setEmail] = React.useState("");

  const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(email);
      if (errorSendMail) return;
      toast.success("Check your email for further instructions", {
        position: "top-center",
        autoClose: 5000,
      });
    } catch (error: any) {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 5000,
      });
    }
  };

  React.useEffect(() => {
    if (errorSendMail) {
      toast.error(errorSendMail.message, {
        position: "top-center",
        autoClose: 5000,
      });
    }
  }, [errorSendMail]);

  return (
    <form
      className="space-y-6 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8"
      onSubmit={handleForm}
    >
      <h3 className="text-xl font-medium  text-white">Reset Password</h3>
      <p className="text-sm text-white ">
        Forgotten your password? Enter your e-mail address below, and we&apos;ll
        send you an e-mail allowing you to reset it.
      </p>
      <div>
        <label
          htmlFor="email"
          className="text-sm font-medium block mb-2 text-gray-300"
        >
          Your email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
          placeholder="name@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className={`w-full text-white  focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                bg-brand-orange hover:bg-brand-orange-s `}
      >
        {sending ? "Sending" : "Reset Password"}
      </button>
    </form>
  );
};

export default ResetPassword;
