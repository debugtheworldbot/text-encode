"use client";
import { Formik, Form, ErrorMessage } from "formik";
import Image from "next/image";
import * as Yup from "yup";
import { uploadImg } from "../actions";
import { toast } from "react-toastify";

interface Prop {
  onSuccess: (url: string) => void;
  onFail?: () => void;
}
const UploadForm = (props: Prop) => {
  const { onSuccess } = props;

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
        const id = toast.loading("uploading...");
        try {
          const reader = new FileReader();
          let baseString = "";
          reader.onloadend = async function() {
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
            {avatarPreview && (
              <Image width={200} height={200} src={avatarPreview} alt="test" />
            )}
            <label htmlFor="avatar">
              {!avatarPreview && (
                <div className="border shadow mb-4 cursor-pointer">
                  select secret image
                </div>
              )}
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
          {!success && (
            <button
              className="border shadow"
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? "Uploading....." : "upload"}
            </button>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default UploadForm;
