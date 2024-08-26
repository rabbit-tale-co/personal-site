import {
	useEffect,
	useState,
	useContext,
	createContext,
	type ReactNode,
} from "react";
import { useRouter } from "next/router";
import { bunnyLog } from "bunny-log";
import { toast } from "sonner";
import jwt from "jsonwebtoken";
import { setCookie, parseCookies, destroyCookie } from "nookies";

// Define the User interface
interface User {
	identifier: string;
	token: string; // JWT or session token for authenticated requests
}

type AuthStatus = "loading" | "error" | "success";

// Define the AuthContextType interface
type AuthContextType = {
	user: User | null;
	status: AuthStatus;
	login: (identifier: string, password: string) => Promise<User | null>;
	logout: () => void;
	error: string | null;
};

// Create the AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [status, setStatus] = useState<AuthStatus>("loading");
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();

	// Initialize the auth state
	useEffect(() => {
		const cookies = parseCookies();
		const token = cookies.token;
		const identifier = cookies.identifier;

		if (token && identifier) {
			try {
				const decodedToken = jwt.decode(token) as { exp: number };
				if (decodedToken.exp * 1000 > Date.now()) {
					setUser({ identifier, token });
					setStatus("success");
				} else {
					// Token is expired
					destroyCookie(null, "token");
					destroyCookie(null, "identifier");
					setStatus("error");
				}
			} catch (err) {
				console.error("Token validation error:", err);
				destroyCookie(null, "token");
				destroyCookie(null, "identifier");
				setStatus("error");
			}
		} else {
			setStatus("error");
		}
	}, []);

	// Login function
	const login = async (
		identifier: string,
		password: string,
	): Promise<User | null> => {
		setStatus("loading");
		setError(null);

		try {
			const response = await fetch("/api/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ identifier, password }),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || "Failed to login");
			}

			const { token } = data;

			// Store user information and token in state and cookies
			const userData: User = { identifier, token };
			setUser(userData);
			setCookie(null, "token", token, {
				maxAge: 3600,
				path: "/",
			});
			setCookie(null, "identifier", identifier, {
				maxAge: 3600,
				path: "/",
			});

			setStatus("success");
			return userData;
		} catch (err: any) {
			bunnyLog.error("Login failed:", err);
			setError(err.message || "Failed to login");
			setStatus("error");
			toast.error(err.message || "Failed to login"); // Display toast on error
			return null;
		}
	};

	// Logout function
	const logout = () => {
		setUser(null);
		destroyCookie(null, "token");
		destroyCookie(null, "identifier");
		router.push("/login");
	};

	return (
		<AuthContext.Provider value={{ user, status, login, logout, error }}>
			{children}
		</AuthContext.Provider>
	);
};

// Custom hook to use the AuthContext
export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
