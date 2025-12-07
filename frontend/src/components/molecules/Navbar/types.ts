export interface NavbarProps {
    user: {
        id: string;
        username: string;
        email: string;
    };
    onLogout: () => void;
}
