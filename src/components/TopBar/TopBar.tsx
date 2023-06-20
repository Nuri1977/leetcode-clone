"use client";
import Link from "next/link";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BsList } from "react-icons/bs";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/config/firebase/firebaseConfig";
import LogoutButton from "../Buttons/LogoutButton";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";
import Timer from "../Timer/Timer";
import { Problem } from "@/interfaces/problems";
import { problemsPaths as problems } from "@/utils/problems";
import { useParams, useRouter } from "next/navigation";

type Props = {
  problemPage?: boolean;
};

const TopBar = ({ problemPage }: Props) => {
  const [user, loading, error] = useAuthState(auth);
  const setAuthModal = useSetRecoilState(authModalState);
  const params = useParams();
  const router = useRouter();

  const handleProblemChange = (isForward: boolean) => {
    const { order } = problems[params.pid as string] as Problem;
    const direction = isForward ? 1 : -1;
    const nextProblemOrder = order + direction;
    const nextProblemKey = Object.keys(problems).find(
      (key) => problems[key].order === nextProblemOrder
    );

    if (isForward && !nextProblemKey) {
      const firstProblemKey = Object.keys(problems).find(
        (key) => problems[key].order === 1
      );
      router.push(`/problems/${firstProblemKey}`);
    } else if (!isForward && !nextProblemKey) {
      const lastProblemKey = Object.keys(problems).find(
        (key) => problems[key].order === Object.keys(problems).length
      );
      router.push(`/problems/${lastProblemKey}`);
    } else {
      router.push(`/problems/${nextProblemKey}`);
    }
  };

  return (
    <nav className="relative flex h-[50px] w-full shrink-0 items-center px-5 bg-dark-layer-1 text-dark-gray-7">
      <div
        className={`flex w-full items-center justify-between ${
          !problemPage ? "max-w-[1200px] mx-auto" : ""
        }`}
      >
        <Link href="/" className="h-[22px] flex-1">
          <Image src="/logo-full.png" alt="Logo" height={100} width={100} />
        </Link>
        {problemPage && (
          <div className="flex items-center gap-4 flex-1 justify-center">
            <div className="flex items-center justify-center rounded bg-dark-fill-3 hover:bg-dark-fill-2 h-8 w-8 cursor-pointer">
              <FaChevronLeft onClick={() => handleProblemChange(false)} />
            </div>
            <Link
              href="/"
              className="flex items-center gap-2 font-medium max-w-[170px] text-dark-gray-8 cursor-pointer"
            >
              <div>
                <BsList />
              </div>
              <p>Problem List</p>
            </Link>
            <div className="flex items-center justify-center rounded bg-dark-fill-3 hover:bg-dark-fill-2 h-8 w-8 cursor-pointer">
              <FaChevronRight onClick={() => handleProblemChange(true)} />
            </div>
          </div>
        )}

        <div className="flex items-center space-x-4 flex-1 justify-end">
          <div>
            <a
              href="https://nuri-lacka.netlify.app/"
              target="_blank"
              rel="noreferrer"
              className="bg-dark-fill-3 py-1.5 px-3 cursor-pointer roundedc"
            >
              Premium
            </a>
          </div>
          {!user ? (
            <Link
              href="/auth"
              onClick={() =>
                setAuthModal({
                  isOpen: true,
                  type: "login",
                })
              }
            >
              <button className="bg-dark-fill-3 py-1 px-2 cursor-pointer rounded ">
                Sign In
              </button>
            </Link>
          ) : (
            <>
              {problemPage && <Timer />}
              <div className="cursor-pointer group relative">
                <Image
                  src="/avatar.png"
                  alt="avatar"
                  width={32}
                  height={32}
                  className="rounded-full h-8 w-8"
                />
                <div className="absolute top-10 left-2/4 -translate-x-2/4 mx-auto bg-dark-layer-1 text-brand-orange p-2 rounded shadow-lg z-40 group-hover:scale-100 scale-0 transition-all duration-300 ease-in-out">
                  <p className="text-sm">{user.email}</p>
                </div>
              </div>
            </>
          )}
        </div>
        {user && <LogoutButton />}
      </div>
    </nav>
  );
};

export default TopBar;
