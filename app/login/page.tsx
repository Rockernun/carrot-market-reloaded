import FormButton from "@/components/form-btn";
import FormInput from "@/components/form-input";
import SocialLogin from "@/components/social-login";

export default function LogIn() {
  const handleForm = async (data: FormData) => {
    "use server";
    console.log(data.get("email"), data.get("password")); //  form에서 입력된 데이터를 가져올 수 있다.
    console.log("I'm in the Server!");
  };
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Log in with email and password</h2>
      </div>
      <form action={handleForm} className="flex flex-col gap-3">
        <FormInput
          name="email"
          required={false}
          placeholder="Email"
          type="email"
          errors={[]}
        />
        <FormInput
          name="password"
          required={false}
          placeholder="Password"
          type="password"
          errors={[]}
        />
        <FormButton loading={false} text="Log in" />
        <SocialLogin />
      </form>
    </div>
  );
}
