import { loginElements, signupElements } from "./ApiConstants";

export const extractFormData = (form: HTMLFormElement): any => {
    const formData = new FormData(form);
    return generateBody(formData, false);
}
const generateBody = (formData: FormData, forLogin: boolean) => {
    const requests = forLogin ? loginElements : signupElements;
    return requests.reduce(
      (body , element) => ({
        ...body,
        [element]: formData.get(element),
      }), {});
  };