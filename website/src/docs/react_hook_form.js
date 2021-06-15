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
         {errors &&
            errors[name] &&
            errors[name].type === "required" && (
               <span> {your error message} </span>
            )
         }
      </>
   )}
/>
