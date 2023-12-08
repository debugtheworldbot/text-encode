"use client";
import axios from "axios";
import { Formik, Form, ErrorMessage } from "formik";
import Image from "next/image";
import * as Yup from "yup";

const UploadForm = () => {
  return (
    <Formik
      initialValues={{
        avatar: "",
        avatarPreview: "",
      }}
      validationSchema={Yup.object().shape({
        avatar: Yup.string().required(),
        avatarPreview: Yup.string().required(),
      })}
      onSubmit={async ({ avatar }, { setSubmitting, setFieldValue }) => {
        try {
          const formData = new FormData();

          formData.append("file", avatar);

          console.log("uploadllllllll", formData);

          const { data } = await axios.post("/api/upload", formData);

          setFieldValue("avatarPreview", data.url);
        } catch (err) {
          console.log(err);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({
        values: { avatarPreview },
        handleSubmit,
        setFieldValue,
        isSubmitting,
      }) => (
        <Form onSubmit={handleSubmit} encType="multipart/form-data">
          <div>
            {avatarPreview && (
              <Image width={200} height={200} src={avatarPreview} alt="test" />
            )}
            <label htmlFor="avatar">
              <input
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setFieldValue(
                      "avatarPreview",
                      URL.createObjectURL(e.target.files[0]),
                    );
                    setFieldValue("avatar", e.target.files[0]);
                  }
                }}
                type="file"
                accept="image/*"
                id="avatar"
                name="avatar"
              />
            </label>
            <ErrorMessage name="avatar" />
          </div>
          <button disabled={isSubmitting} type="submit">
            Upload
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default UploadForm;
