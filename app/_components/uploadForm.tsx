"use client";
import { Formik, Form, ErrorMessage } from "formik";
import Image from "next/image";
import * as Yup from "yup";
import { uploadImg } from "../actions";
import { toast } from "react-toastify";

interface Prop {
  onSuccess: (url: string) => void;
  validate: () => boolean;
}
const UploadForm = (props: Prop) => {
  const { onSuccess, validate } = props;

  return (
    <Formik
      initialValues={{
        avatar: "",
        avatarPreview: "",
        success: false,
      }}
      validationSchema={Yup.object().shape({
        avatar: Yup.string().required(),
        avatarPreview: Yup.string().required(),
      })}
      onSubmit={async ({ avatar }, { setSubmitting, setFieldValue }) => {
        if (!validate()) return;
        const id = toast.loading("encoding...");
        try {
          const reader = new FileReader();
          let baseString = "";
          reader.onloadend = async function () {
            baseString = reader.result as string;
            const res = await uploadImg(baseString);
            if (!res?.url) return;
            toast.update(id, { type: "success", isLoading: false });
            onSuccess(res.url);
            setFieldValue("avatarPreview", res.url);
            setFieldValue("success", true);
          };
          // @ts-ignore
          reader.readAsDataURL(avatar);
        } catch (err) {
          toast.update(id, { type: "error", isLoading: false });
          console.log(err);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({
        values: { avatarPreview, success },
        handleSubmit,
        setFieldValue,
        isSubmitting,
      }) => (
        <Form onSubmit={handleSubmit} encType="multipart/form-data">
          <div>
            {avatarPreview ? (
              <Image width={600} height={600} src={avatarPreview} alt="test" />
            ) : (
              <label htmlFor="avatar">
                <input
                  className="file-input"
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
            )}
            <ErrorMessage name="avatar" />
          </div>
          {!success && (
            <button
              className="btn btn-neutral"
              disabled={isSubmitting || !avatarPreview}
              type="submit"
            >
              {isSubmitting ? "encoding....." : "encode"}
            </button>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default UploadForm;
