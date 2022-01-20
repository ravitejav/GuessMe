export interface AuthProps {
  type: "LOGIN" | "REGISTER";
  onSubmit: (formData: any) => void;
  changeOp: () => void;
  verifyUserName: (username: string) => void;
}
