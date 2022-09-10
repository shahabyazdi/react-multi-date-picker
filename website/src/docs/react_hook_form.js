import React, { useState } from "react";
import DatePicker from "../../../build/index";
import { useForm, Controller } from "react-hook-form";

export default function Doc({ translate, language, otherProps }) {
  const { control, handleSubmit } = useForm();
  const [submittedDate, setSubmittedDate] = useState();

  const onSubmit = ({ date }) => {
    setSubmittedDate(date);
  };

  const online_example = {
    title: "Online Example",
    jsx: (
      <p>
        An online example of using the date picker is available in the code
        sandbox, which you can see it{" "}
        <a
          href="https://codesandbox.io/s/ecstatic-scott-iuzuqr?file=/src/App.js"
          target="_blank"
        >
          here
        </a>
        .
      </p>
    ),
  };

  const example = {
    title: "Example Of Using React Hook Form",
    code: `import React, { useState } from "react";
import DatePicker from "react-multi-date-picker";
import { useForm, Controller } from "react-hook-form";

export default function Example() {
  const { control, handleSubmit } = useForm();
  const [submittedDate, setSubmittedDate] = useState();

  const onSubmit = ({ date }) => {
    setSubmittedDate(date);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="date"
          rules={{ required: true }} //optional
          render={({
            field: { onChange, name, value },
            fieldState: { invalid, isDirty }, //optional
            formState: { errors }, //optional, but necessary if you want to show an error message
          }) => (
            <>
              <DatePicker
                value={value || ""}
                onChange={(date) => {
                  onChange(date?.isValid ? date : "");
                }}
                format={language === "en" ? "MM/DD/YYYY" : "YYYY/MM/DD"}
              ${
                language === "en"
                  ? "/>"
                  : `  calendar="persian"
                locale="fa"
                calendarPosition="bottom-right"
              />`
              }
              {errors && errors[name] && errors[name].type === "required" && (
                //if you want to show an error message
                <span>your error message !</span>
              )}
            </>
          )}
        />
        <input type="submit" />
      </form>
      <p>${translate("Submitted Date: ")} {submittedDate?.format?.("${
      language === "en" ? "MMMM D YYYY" : "D MMMM YYYY"
    }")}</p>
    </>
  )
}`,
    jsx: (
      <>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="date"
            rules={{ required: true }} //optional
            render={({
              field: { onChange, name, value },
              fieldState: { invalid, isDirty }, // optional
              formState: { errors }, //optional, but necessary if you want to show an error message
            }) => (
              <>
                <DatePicker
                  //react hook form needs this
                  value={value || ""}
                  onChange={(date) => {
                    onChange(date?.isValid ? date : "");
                  }}
                  format={language === "en" ? "MM/DD/YYYY" : "YYYY/MM/DD"}
                  {...otherProps}
                />
                {errors && errors[name] && errors[name].type === "required" && (
                  //if you want to show an error message
                  <span>your error message !</span>
                )}
              </>
            )}
          />
          <input type="submit" />
        </form>
        <p>
          {translate("Submitted Date: ")}
          {submittedDate?.format?.(
            language === "en" ? "MMMM D YYYY" : "D MMMM YYYY"
          )}
        </p>
      </>
    ),
  };

  return [online_example, example];
}
