import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getPlace } from "../../api";
import Container from "../../components/conteiner";
import Loader from "../../components/loader";
import Error from "../../components/error.tsx";
import Buttons from "./Buttons.tsx";
import Rating from "../../components/card/Rating.tsx";
import Features from "./Features.tsx";
import Status from "../../components/card/Status.tsx";

const Detail = () => {
  const { id } = useParams();

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["place"],
    queryFn: () => getPlace(id as string),
  });

  return (
    <Container designs="max-w-[700px]">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Error info={error.message} retry={refetch} />
      ) : (
        data && (
          <div>
            <Buttons />

            <div className="flex justify-between">
              <h1 className="text-3xl font-bold">{data.name}</h1>
              <Rating point={data.rating} expand />
            </div>

            <p>{data.description}</p>
            <img src={data.image_url} className="rounded-lg" />

            <Features arr={data.amenities} />

            <div className="flex justify-between gap-2 items-center mt-5 ">
              <p className="text-xl font-semibold">
                ${data.price_per_night}
                <span>/gece</span>
              </p>

              <Status availability={data.availability} expand />
            </div>
          </div>
        )
      )}
    </Container>
  );
};

export default Detail;
