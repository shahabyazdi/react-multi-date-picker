import React from "react";
import DatePicker from "../../../build/index";
import { useForm, Controller } from "react-hook-form";

export default function Doc({ translate, language }) {
  const { control } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const example = {
    title: "Example Of Using React Hook Form",
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
              // if you want to show an error message
              {errors && errors[name] && errors[name].type === "required" && (
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
