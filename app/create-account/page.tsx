import FormButton from "@/components/form-btn";
import FormInput from "@/components/form-input";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function CreateAccount() {
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Fill in the form below to join!</h2>
      </div>
      <form className="flex flex-col gap-3">
        <FormInput required placeholder="Username" type="text" errors={[]} />
        <FormInput required placeholder="Email" type="email" errors={[]} />
        <FormInput
          required
          placeholder="Password"
          type="password"
          errors={[]}
        />
        <FormInput
          required
          placeholder="Confirm Password"
          type="password"
          errors={[]}
        />
        <FormButton loading={false} text="Create Account" />
      </form>
      <div className="w-full h-px bg-neutral-500" />
      <div>
        <Link
          className="primary-btn flex h-10 items-center justify-center gap-3"
          href="/sms"
        >
          <span>
            <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6" />
          </span>
          <span>Sign Up with SMS</span>
        </Link>
      </div>
    </div>
  );
}
