'use client'
import React, { useEffect } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar/Navbar";
import AuthModal from "@/components/Modals/AuthModal";
import { useRecoilValue } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebaseConfig";
import { useRouter } from "next/navigation";

type Props = {};

const AuthPage = (props: Props) => {
  const authModal = useRecoilValue(authModalState);
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  const [pageLoading, setPageLoading] = React.useState(true);

  useEffect(() => {
    if (user) {
      router.push("/");
    }
    if (!loading && !user) {
      setPageLoading(false);
    }
  }, [loading, router, user])

  if (pageLoading) return null;

  return (
    <div className="bg-gradient-to-b from-gray-600 to-black h-screen relative ">
      <div className="max-w-7xl mx-auto">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-5rem)] pointer-events-none select-none">
          <Image src="/hero.png" alt="hero" width={500} height={300} />
        </div>
      </div>
      {authModal.isOpen && <AuthModal />}
    </div>
  );
};

export default AuthPage;
