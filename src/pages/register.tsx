import { registerUser } from "@/ApiClient/Auth";
import { useRouter } from "next/router";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import React, { useState } from "react";

const Register: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agb, setAgb] = useState(false);
  const [newsletter, setNewsletter] = useState(false);
  const [showAgbModal, setShowAgbModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!username.trim()) {
      setErrorMessage("Bitte geben Sie einen Benutzernamen ein.");
      return;
    }
    if (!firstName.trim()) {
      setErrorMessage("Bitte geben Sie Ihren Vornamen ein.");
      return;
    }
    if (!lastName.trim()) {
      setErrorMessage("Bitte geben Sie Ihren Nachnamen ein.");
      return;
    }
    if (!email.trim()) {
      setErrorMessage("Bitte geben Sie eine E-Mail-Adresse ein.");
      return;
    }
    // Simple email regex for validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMessage("Bitte geben Sie eine gültige E-Mail-Adresse ein.");
      return;
    }
    if (!password) {
      setErrorMessage("Bitte geben Sie ein Passwort ein.");
      return;
    }
    if (password.length < 6) {
      setErrorMessage("Das Passwort muss mindestens 6 Zeichen lang sein.");
      return;
    }
    if (!agb) {
      setErrorMessage("Bitte akzeptieren Sie die AGB's.");
      return;
    }

    try {
      const result = await registerUser({
        username,
        firstName,
        lastName,
        email,
        password,
        newsletter,
      });

      setSuccessMessage("Registrierung erfolgreich!");
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } catch (error: any) {
      setErrorMessage(`Registrierung fehlgeschlagen: ${error.message}`);
    }
  };

  return (
    <>
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontFamily: "'Indie Flower', cursive, sans-serif",
          padding: "20px 40px",
          paddingBottom: "20px",
        }}
      >
        <div style={{ fontSize: "1.5rem", fontWeight: 600, letterSpacing: 1 }}>
          Hoop2Work
        </div>
        <div className="absolute top-4 left-1/2 -translate-x-1/2 min-w-[220px] max-w-[320px] z-[1000] flex flex-col items-center gap-2">
          {successMessage && (
            <Alert className="py-1.5 px-4 rounded-lg text-sm min-w-[180px] max-w-[320px] shadow-md">
              <Terminal className="h-4 w-4" />
              <AlertTitle className="text-base">Success</AlertTitle>
              <AlertDescription>{successMessage}</AlertDescription>
            </Alert>
          )}
          {errorMessage && (
            <Alert
              variant="destructive"
              className="py-1.5 px-4 rounded-lg text-sm min-w-[180px] max-w-[320px] shadow-md"
            >
              <Terminal className="h-4 w-4" />
              <AlertTitle className="text-base">Error</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}
        </div>
      </nav>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
        }}
      >
        <div
          style={{
            width: 320,
            padding: 24,
            borderRadius: 18,
            border: "2px solid #222",
            boxShadow: "2px 2px 0 #222",
            background: "#fff",
            fontFamily: "'Comic Sans MS', 'Comic Sans', cursive",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "start",
            }}
          >
            <div>
              <h1
                style={{
                  margin: 0,
                  fontWeight: 700,
                  fontSize: 32,
                  fontFamily: "'Comic Sans MS', 'Comic Sans', cursive",
                }}
              >
                Registration
              </h1>
              <div
                style={{
                  fontSize: 20,
                  marginBottom: 18,
                  marginTop: 2,
                }}
              >
                Full text
              </div>
            </div>
            <button
              aria-label="Close"
              style={{
                background: "none",
                border: "none",
                fontSize: 30,
                cursor: "pointer",
                marginTop: 4,
              }}
              onClick={() => router.push("/")}
            >
              ×
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <input
              style={inputStyle}
              type="text"
              name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />
            <input
              style={inputStyle}
              type="text"
              name="firstname"
              placeholder="Firstname"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              autoComplete="given-name"
            />
            <input
              style={inputStyle}
              type="text"
              name="lastname"
              placeholder="Lastname"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              autoComplete="family-name"
            />
            <input
              style={inputStyle}
              type="email"
              name="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
            <input
              style={inputStyle}
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />

            <div
              style={{ display: "flex", alignItems: "center", margin: "8px 0" }}
            >
              <input
                type="checkbox"
                name="agb"
                checked={!!agb}
                onChange={(e) => setAgb(e.target.checked)}
                style={{ width: 20, height: 20, marginRight: 8 }}
                id="agb"
              />
              <label
                htmlFor="agb"
                style={{
                  fontSize: 16,
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  setShowAgbModal(true);
                }}
              >
                AGB&apos;s
              </label>
            </div>
            <div
              style={{ display: "flex", alignItems: "center", margin: "8px 0" }}
            >
              <input
                type="checkbox"
                name="newsletter"
                checked={!!newsletter}
                onChange={(e) => setNewsletter(e.target.checked)}
                style={{ width: 20, height: 20, marginRight: 8 }}
                id="newsletter"
              />
              <label htmlFor="newsletter" style={{ fontSize: 16 }}>
                NEW&apos;s letter
              </label>
            </div>
            {showAgbModal && (
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100vw",
                  height: "100vh",
                  background: "rgba(0,0,0,0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 1000,
                }}
              >
                <div
                  style={{
                    position: "relative",
                    background: "#fff",
                    padding: 32,
                    borderRadius: 12,
                    maxWidth: 400,
                    boxShadow: "2px 2px 10px #222",
                  }}
                >
                  <button
                    style={{
                      position: "absolute",
                      top: 12,
                      right: 16,
                      background: "none",
                      border: "none",
                      fontSize: 28,
                      cursor: "pointer",
                      color: "#222",
                    }}
                    aria-label="Schließen"
                    onClick={() => setShowAgbModal(false)}
                  >
                    ×
                  </button>
                  <h2>AGB&apos;s</h2>
                  <div style={{ marginBottom: 20 }}>
                    {/* Hier die AGBs einfügen */}
                    <p>Hier stehen die Allgemeinen Geschäftsbedingungen...</p>
                  </div>
                  <button
                    style={{
                      padding: "8px 16px",
                      borderRadius: 6,
                      border: "1.5px solid #bdbdbd",
                      background: "#bfe1ff",
                      fontFamily: "'Comic Sans MS', 'Comic Sans', cursive",
                      cursor: "pointer",
                      marginTop: 24,
                      width: "100%",
                    }}
                    onClick={() => {
                      setAgb(true);
                      setShowAgbModal(false);
                    }}
                  >
                    AGB&apos;s akzeptieren
                  </button>
                </div>
              </div>
            )}
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "8px 0",
                borderRadius: 8,
                border: "2px solid #222",
                background: "#bfe1ff",
                color: "#222",
                fontSize: 20,
                fontFamily: "'Comic Sans MS', 'Comic Sans', cursive",
                fontWeight: 400,
                cursor: "pointer",
                marginBottom: 10,
                boxShadow: "1px 1px 0 #222",
              }}
            >
              Submit
            </button>
            <button
              type="button"
              style={{
                width: "100%",
                padding: "8px 0",
                borderRadius: 8,
                border: "2px solid #222",
                background: "#f7b3b3",
                color: "#222",
                fontSize: 20,
                fontFamily: "'Comic Sans MS', 'Comic Sans', cursive",
                fontWeight: 400,
                cursor: "pointer",
                marginBottom: 10,
                boxShadow: "1px 1px 0 #222",
              }}
              onClick={() => router.push("/login")}
            >
              Zurück
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "6px 10px",
  margin: "6px 0",
  borderRadius: 6,
  border: "1.5px solid #bdbdbd",
  fontSize: 16,
  fontFamily: "'Comic Sans MS', 'Comic Sans', cursive",
  boxSizing: "border-box",
};

export default Register;
