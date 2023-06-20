import { Form, Formik } from "formik";
import * as Yup from "yup";
import FormikInput from "../../../components/Input";
import ImagePicker from "./ImagePicker";
import SubmitButton from "./SubmitButton";
import TextArea from "./TextArea";

export const creationValidationSchema = Yup.object().shape({
  name: Yup.string().required("Must enter a name"),
  description: Yup.string().required("Must enter a description"),
  image: Yup.mixed().test("is_defined", "Must select an image", (value) =>
    Boolean(value)
  ),
});

const CreationForm = ({ onSubmit }) => {
  const initialValues = { name: "", description: "" };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={creationValidationSchema}
      validateOnBlur={false}
      validateOnChange={false}
      validateOnMount={false}
      onSubmit={onSubmit}
    >
      <Form className="flex sm:flex-col">
        <ImagePicker name="image" className="mr-4" />
        <div className="flex w-64 flex-col space-y-1  sm:w-full">
          <FormikInput name="name" placeholder="Name..." />
          <TextArea name="description" placeholder="Description..." />
          <SubmitButton />
        </div>
      </Form>
    </Formik>
  );
};

export default CreationForm;
