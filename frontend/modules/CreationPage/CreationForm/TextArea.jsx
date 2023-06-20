import classNames from "classnames";
import { useField } from "formik";

const TextArea = (props) => {
  const [, { error, value }, { setValue }] = useField(props.name);

  return (
    <textarea
      className={classNames(
        "flex-grow resize-none rounded border px-2 py-4 mb-2 border border-[#000] bg-inherit sm:h-full sm:pb-10",
        {
          "border-black-300": !error,
          "border-red-500": error,
        }
      )}
      placeholder="description"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      {...props}
    />
  );
};

export default TextArea;
