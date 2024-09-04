import { Field, Form, Formik } from "formik";

import { initial, inputs } from "../../constants";
import Container from "../../components/conteiner";
import { PlaceData } from "../../types";
import { useMutation } from "@tanstack/react-query";
import { createPlace } from "../../api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Create = () => {
  const navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    mutationFn: (body: PlaceData) => createPlace(body),

    onSuccess: (res) => {
      toast.success("Konalma noktası oluşturuldu");
      navigate(`/place/${res.data.place.id}`);
    },

    onError: (err) => {
      console.log(err);
      toast.error("İşlem başarısız oldu");
    },
  });

  const handleSubmit = (values: PlaceData) => {
    const body = { ...values };

    // "pool,parking,wi-fi,spa" stringi şu şekilde bir diziye dönüştürülür: ["pool", "parking", "wi-fi", "spa"].
    body.amenities = (values.amenities as string).split(",");

    // Api isteği at
    mutate(body);

    navigate("/");
  };

  return (
    <Container>
      <Formik initialValues={initial} onSubmit={handleSubmit}>
        <Form className="max-w-2xl mx-auto grid gap-5">
          {inputs.map((item, key) => (
            <div className="flex flex-col gap-3" key={key}>
              <label className="font-bold">{item.label}</label>
              <Field
                type={item.type || "text"}
                name={item.name}
                className="border py-1 px-4 rounded-md shodow w-full"
              />
            </div>
          ))}

          <button
            className="bg-blue-500 py-2 px-6 text-white font-bold rounded-md transition hover:bg-blue-600"
            type="submit"
            disabled={isPending}
          >
            Gönder
          </button>
        </Form>
      </Formik>
    </Container>
  );
};

export default Create;
