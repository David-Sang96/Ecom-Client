import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa6";

import * as React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const PasswordInput = ({
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) => {
  const [show, setShow] = React.useState(false);

  return (
    <div className="relative">
      <Input type={show ? "text" : "password"} {...props} />
      <Button
        variant={"ghost"}
        type="button"
        size={"sm"}
        disabled={props.value === "" || props.disabled}
        onClick={() => setShow((prev) => !prev)}
        className="absolute top-0.5 right-0 cursor-pointer hover:bg-transparent"
      >
        {show ? (
          <FaRegEyeSlash aria-hidden="true" className="size-5" />
        ) : (
          <FaRegEye aria-hidden="true" className="size-5" />
        )}
        <span className="sr-only">
          {show ? "Hide password" : "Show password"}
        </span>
      </Button>
    </div>
  );
};

export default PasswordInput;
