import React from "react";
import DatePicker from "../../../build/index";
import { useForm, Controller } from "react-hook-form";

export default function Doc({ translate, language }) {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const example = {
    title: "Example Of Using React Hook Form",
    code: `import React from "react";
import DatePicker from "react-multi-date-picker";
import { useForm, Controller } from "react-hook-form";

export default function Example`,
    jsx: (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="some-name"
          rules={{ required: true }} //optional
          render={({
            field: { onChange, name, value },
            fieldState: { invalid, isDirty }, // optional
            formState: { errors }, // optional, but neccessary if you want to show an error message
          }) => (
            <>
              <DatePicker
                // calendar options
                calendarPosition="bottom-center"
                type="input-icon"
                calendar="persian"
                locale="fa"
                // react hook form needs this
                value={value || ""}
                onChange={(date) => {
                  onChange(date?.isValid ? date : "");
                }}
              />
              {errors && errors[name] && errors[name].type === "required" && (
                // if you want to show an error message
                <span> your error message </span>
              )}
            </>
          )}
        />
        <input type="submit" />
      </form>
    ),
  };

  return [example];
}
