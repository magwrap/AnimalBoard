export interface AuthButtonProps {
  loginCredentials: {
    email: string;
    password: string;
    error: boolean;
    errorMessage: string;
    showPassword: boolean;
  };
  setLoginCredentials: React.Dispatch<
    React.SetStateAction<{
      email: string;
      password: string;
      error: boolean;
      errorMessage: string;
      showPassword: boolean;
    }>
  >;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
