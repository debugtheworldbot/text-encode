"use client";
import axios from "axios";
import { Formik, Form, ErrorMessage } from "formik";
import Image from "next/image";
import * as Yup from "yup";
import { uploadImg } from "../actions";

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
          const reader = new FileReader();
          let baseString = "";
          reader.onloadend = async function() {
            baseString = reader.result as string;
            const url = await uploadImg(baseString);
            if (!url) return;
            setFieldValue("avatarPreview", url);
          };
          // @ts-ignore
          reader.readAsDataURL(avatar);
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
              <div className="border shadow mb-4 cursor-pointer">
                select secret imgage
              </div>
              <input
                className="hidden"
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
          <button
            className="border shadow"
            disabled={isSubmitting}
            type="submit"
          >
            Upload
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default UploadForm;
