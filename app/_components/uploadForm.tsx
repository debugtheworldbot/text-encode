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
        <Form
          className="flex flex-col"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="border border-white/10 rounded-2xl mt-1 overflow-hidden">
            {avatarPreview ? (
              <Image width={600} height={600} src={avatarPreview} alt="test" />
            ) : (
              <label
                htmlFor="avatar"
                className="block w-full h-full text-white/50 text-center cursor-pointer py-12 "
              >
                <div className="flex items-center justify-center">
                  <Image
                    src="/add.svg"
                    width={25}
                    height={25}
                    className="mr-2"
                    alt="upload"
                  />
                  选择要合成的图片
                </div>
                <input
                  className="hidden w-full h-full"
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
              className="btn glass bg-slate-100/80 rounded-2xl mt-4 py-2"
              disabled={isSubmitting || !avatarPreview}
              type="submit"
            >
              {isSubmitting ? "合成中..." : "合成"}
            </button>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default UploadForm;
