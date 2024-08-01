interface IFormInputProps {
  type: string;
  placeholder: string;
  required: boolean;
  errors: string[]; //  에러는 여러 개일 수 있으니 배열 형식
}

export default function FormInput({
  type,
  placeholder,
  required,
  errors,
}: IFormInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <input
        className="bg-transparent rounded-md w-full h-10 focus:outline-none ring-1 focus:ring-4 transition ring-neutral-200 focus:ring-orange-500 border-none placeholder:text-neutral-400"
        type={type}
        placeholder={placeholder}
        required={required}
      />
      {errors.map((error, index) => (
        <span key={index} className="text-red-500 font-medium">
          {error}
        </span>
      ))}
    </div>
  );
}

//  여기서 커스텀할 수 있어야 하는 부분은 input의 type이다. placeholder, required, 에러도 마찬가지다. 이 모든 걸 props으로 가져온다.
