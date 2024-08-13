import React from "react";
import styles from "./Form.module.scss";
import { useForm } from "react-hook-form";

function Form({ title, getDataForm, firebaseError }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
  });
  // console.log(useForm());
  console.log(errors);

  const onSubmit = ({ email, password }) => {
    getDataForm(email, password);
    reset();
  };

  //   userEmail, userPassword는 유효성 검사를 하는 역할
  const userEmail = {
    required: "필수 필드입니다.",
  };

  const userPassword = {
    requierd: "필수 필드입니다.",
    minLength: {
      value: 6,
      message: "최소 6자 입니다.",
    },
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input
          type="email"
          placeholder="Email"
          {...register("email", userEmail)}
        />
        {errors?.email && (
          <div className={styles.form_error}>
            <span>{errors.email.message}</span>
          </div>
        )}
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          {...register("password", userPassword)}
        />
        {errors?.password && (
          <div className={styles.form_error}>
            <span>{errors.password.message}</span>
          </div>
        )}
      </div>
      <button>{title}</button>
      {firebaseError && <span className={styles.form_error}></span>}
    </form>
  );
}

export default Form;