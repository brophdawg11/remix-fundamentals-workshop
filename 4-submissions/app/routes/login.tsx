import { Form } from "@remix-run/react";

// 💡 You can use this method to validate if the login is correct
import { validateEmailAndPassword } from "../data/api";

export default function Component() {
  return (
    <Form method="post" className="m-auto mt-10 w-[50%]">
      <p className="mb-6 text-center">Please login to continue</p>
      <div className="mb-6">
        {/* 💡 Add your email/password inputs and a submit button  here */}
      </div>
    </Form>
  );
}
