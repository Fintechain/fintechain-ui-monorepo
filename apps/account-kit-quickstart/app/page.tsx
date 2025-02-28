"use client";

import {
  useAuthModal,
  useLogout,
  useSignerStatus,
  useUser
} from "@account-kit/react";
import { useEffect } from "react";
import ThemeSwitch from "@/frontend/themeswitch";
import AccountComponent from "@/backend/accountcomponent";

export default function Home() {
  const user = useUser();
  const { openAuthModal } = useAuthModal();
  const signerStatus = useSignerStatus();
  const isAuthenticating = signerStatus.isInitializing;
  const { logout } = useLogout();

  useEffect(() => {
    if (isAuthenticating) {
      openAuthModal();
    }
  }, [openAuthModal, isAuthenticating]);

  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-4 justify-center text-center">
      {signerStatus.isInitializing ? (
        <>Loading...</>
      ) : user ? (
        <div className="flex flex-col gap-4 p-4 w-full max-w-xl">
          <div className="flex flex-col text-2xl font-bold">
            <ThemeSwitch />
            <p className="text-xl font-bold">Success!</p>
          </div>
          
          <p>Logged in as {user.email ?? user.address}</p>
          
          {/* Account Component that displays smart account info */}
          <AccountComponent />
          
          <button className="btn btn-primary mt-6" onClick={() => logout()}>
            Log out
          </button>
        </div>
      ) : (
        <button className="btn btn-primary" onClick={openAuthModal}>
          Login
        </button>
      )}
    </main>
  );
}