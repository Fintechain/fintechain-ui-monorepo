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
    <main className="flex min-h-screen flex-col items-center p-24 gap-4 justify-center text-center"
    style={{ 
      backgroundColor: "#0c2d48"
     }}>
      {signerStatus.isInitializing ? (
        <div style={{ color: "#fff"}}>Loading...</div>
      ) : user ? (
        <div className="container-page flex flex-col gap-4 p-4 w-full max-w-xl"
                style={{ color: "#0c2d48", 
                  backgroundColor: "#b1d4e0",
                  border: "1px solid #2e8bc0", 
                  borderRadius: "0.6rem"
                 }}>
          <div className="flex flex-col text-2xl font-bold">
            {/* <ThemeSwitch /> */}
            <h3 className="text-xl font-bold" style={{ fontSize: "18px" }}>Success!</h3>
            <div>
              <p style={{ fontSize: "15px" }}>Logged in as</p>
              <span style={
                { textDecoration: "oblique", 
                  fontSize: "20px", 
                  padding: "0.3rem 0.6rem 0.3rem 0.6rem"
                }}>{user.email ?? user.address}</span>
            </div>
          </div>
          
          {/* Account Component that displays smart account info */}
          <AccountComponent />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
          <button style={
                  {
                    color: "#fff",
                    fontSize: "15px",
                    backgroundColor: "#0c2d48",
                    border: "1px solid #fff",
                    borderRadius: "0.25rem",
                    padding: "0.3rem 0.6rem 0.3rem 0.6rem",
                    width: "30%"
                  }} onClick={() => logout()}>
            Log out
          </button>

          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4 p-4 w-full max-w-xl"
        style={{ 
          display: "flex", 
          alignItems: "center",
          justifyContent: "center"
        }}>
          <h1 style={{ color: "white", 
                  fontSize: "3rem",
                  fontStyle: "oblique"
                 }}>ABSTRACT PHILOSOPHER</h1>
            <button className="btn btn-primary" onClick={openAuthModal} style={
                  {
                    color: "#fff",
                    fontSize: "15px",
                    backgroundColor: "#0c2d48",
                    border: "1px solid #fff",
                    borderRadius: "0.25rem",
                    padding: "0.3rem 0.6rem 0.3rem 0.6rem",
                    margin: "0.3rem 0.6rem 0.3rem 0.6rem"
                  }}>
            Login
          </button>
        </div>
        
      )}
    </main>
  );
}