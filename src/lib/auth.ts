import { Locale } from "@/lib/definitions";

export interface User {
    id: string;
    name: string;
    email: string;
    userType: "JOB_SEEKER" | "COMPANY";
    onboardingCompleted: boolean;
    stripeCustomerId?: string;
    sessions?: Session[];
    // Job Seeker specific
    about?: string;
    // Company specific
    companyName?: string;
    website?: string;
    location?: string;
}

export interface Session {
    id: string;
    userId: string;
    token: string;
    createdAt: string;
    expiresAt: string;
    isActive: boolean;
}

export interface AuthResponse {
    success: boolean;
    token?: string;
    user?: User;
    message?: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    name: string;
    email: string;
    password: string;
    userType: "JOB_SEEKER" | "COMPANY";
    about?: string;
    companyName?: string;
    website?: string;
    location?: string;
}

const API_BASE_URL = "https://issi-dashboard-payloadcms.vercel.app/api";

class AuthService {
    private tokenKey = "auth_token";
    private userKey = "auth_user";

    // Token management
    getToken(): string | null {
        if (typeof window === "undefined") return null;
        return localStorage.getItem(this.tokenKey);
    }

    setToken(token: string): void {
        if (typeof window === "undefined") return;
        localStorage.setItem(this.tokenKey, token);
    }

    removeToken(): void {
        if (typeof window === "undefined") return;
        localStorage.removeItem(this.tokenKey);
    }

    // User management
    getUser(): User | null {
        if (typeof window === "undefined") return null;
        const userStr = localStorage.getItem(this.userKey);
        if (!userStr) return null;
        try {
            return JSON.parse(userStr);
        } catch {
            return null;
        }
    }

    setUser(user: User): void {
        if (typeof window === "undefined") return;
        localStorage.setItem(this.userKey, JSON.stringify(user));
    }

    removeUser(): void {
        if (typeof window === "undefined") return;
        localStorage.removeItem(this.userKey);
    }

    // Authentication methods
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
            });

            const data = await response.json();

            if (!response.ok) {
                return {
                    success: false,
                    message: data.message || "Login failed",
                };
            }

            if (data.token && data.user) {
                this.setToken(data.token);
                this.setUser(data.user);
                return {
                    success: true,
                    token: data.token,
                    user: data.user,
                };
            }

            return {
                success: false,
                message: "Invalid response from server",
            };
        } catch (error) {
            return {
                success: false,
                message: error instanceof Error ? error.message : "Network error",
            };
        }
    }

    async register(data: RegisterData): Promise<AuthResponse> {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const data_ = await response.json();

            if (!response.ok) {
                return {
                    success: false,
                    message: data_.message || "Registration failed",
                };
            }

            if (data_.token && data_.user) {
                this.setToken(data_.token);
                this.setUser(data_.user);
                return {
                    success: true,
                    token: data_.token,
                    user: data_.user,
                };
            }

            return {
                success: false,
                message: "Invalid response from server",
            };
        } catch (error) {
            return {
                success: false,
                message: error instanceof Error ? error.message : "Network error",
            };
        }
    }

    async logout(): Promise<void> {
        this.removeToken();
        this.removeUser();
    }

    // Session validation
    async validateSession(): Promise<boolean> {
        const token = this.getToken();
        if (!token) return false;

        try {
            const response = await fetch(`${API_BASE_URL}/auth/validate`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            return response.ok;
        } catch {
            return false;
        }
    }

    // Check if user is authenticated
    isAuthenticated(): boolean {
        return !!this.getToken() && !!this.getUser();
    }

    // Get user type
    getUserType(): "JOB_SEEKER" | "COMPANY" | null {
        const user = this.getUser();
        return user?.userType || null;
    }

    // Check if onboarding is completed
    isOnboardingCompleted(): boolean {
        const user = this.getUser();
        return user?.onboardingCompleted || false;
    }
}

// Export singleton instance
export const authService = new AuthService();

// Utility functions for routing
export const getDashboardRoute = (userType: "JOB_SEEKER" | "COMPANY", lang: Locale): string => {
    switch (userType) {
        case "JOB_SEEKER":
            return `/${lang}/jobs`;
        case "COMPANY":
            return `/${lang}/jobs/manage`;
        default:
            return `/${lang}`;
    }
};

export const getProfileRoute = (userType: "JOB_SEEKER" | "COMPANY", lang: Locale): string => {
    switch (userType) {
        case "JOB_SEEKER":
            return `/${lang}/profile`;
        case "COMPANY":
            return `/${lang}/company/profile`;
        default:
            return `/${lang}`;
    }
};

// Hook for authentication state (to be used in components)
export const useAuth = () => {
    return {
        user: authService.getUser(),
        token: authService.getToken(),
        isAuthenticated: authService.isAuthenticated(),
        userType: authService.getUserType(),
        isOnboardingCompleted: authService.isOnboardingCompleted(),
        login: authService.login.bind(authService),
        register: authService.register.bind(authService),
        logout: authService.logout.bind(authService),
        validateSession: authService.validateSession.bind(authService),
    };
};
