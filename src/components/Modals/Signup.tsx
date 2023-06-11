import { authModalState } from '@/atoms/authModalAtom'
import { auth } from '@/firebase/firebaseConfig'
import React, { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';

type Props = {}

const Signup = (props: Props) => {
  const setAuthModal = useSetRecoilState(authModalState);
  const router = useRouter();
  const [inputs, setInputs] = React.useState({ email: '', displayName: '', password: '' })
  const [
    createUserWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useCreateUserWithEmailAndPassword(auth);

  const handleLogin = () => {
    setAuthModal((prev) => ({ ...prev, isOpen: true, type: 'login' }))
  }

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setInputs((prev) => ({ ...prev, [name]: value }))
  }

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password)
      if (!newUser) return;
      setAuthModal((prev) => ({ ...prev, isOpen: false, type: 'login' }))
      router.push('/');
    } catch (error: any) {
      alert(error.message)
    }
  }

  useEffect(() => {
    if (error) {
      alert(error.message)
    }
  }, [error])



  return (
    <form className="space-y-6 px-6 py-4" onSubmit={handleRegister}>
      <h3 className="text-xl font-medium text-white">Register to LeetCode</h3>
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
          placeholder="Email"
          value={inputs.email}
          onChange={handleChangeInput}
        />
      </div>
      <div>
        <label
          htmlFor="displayName"
          className="text-sm font-medium block mb-2 text-gray-300"
        >
          Display Name
        </label>
        <input
          type="text"
          name="displayName"
          id="displayName"
          required
          className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
          bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
          placeholder="Display Name"
          value={inputs.displayName}
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
          placeholder="Password"
          value={inputs.password}
          onChange={handleChangeInput}
        />
      </div>
      <button
        type="submit"
        className="w-full text-white focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5
      text-center bg-brand-orange hover:bg-brand-orange-s"
      >
        {loading ? 'Loading...' : 'Register'}
      </button>
      <div className="text-sm font-medium text-gray-300">
        Already have an account? &nbsp;
        <a href="#" className="text-blue-700 hover:underline" onClick={() => handleLogin()}>
          Log In
        </a>
      </div>
    </form>
  )
}

export default Signup