import MainHome from "src/components/Home/main.home";
import { sendRequest } from "src/utils/api";


const Home = async () => {

  const categories = await sendRequest<IRes<string[]>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/database/category`,
    method: "GET",
  })


  return (
    <>
      <MainHome
        categories={categories?.data ?? []}
      />
    </>
  );
}
export default Home;
