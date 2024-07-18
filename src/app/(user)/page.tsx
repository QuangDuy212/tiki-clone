import MainHome from "src/components/Home/main.home";
import { callFetchCategory } from "src/services/api";


const Home = async () => {

  const categories = await callFetchCategory()


  return (
    <>
      <MainHome
        categories={categories?.data ?? []}
      />
    </>
  );
}
export default Home;
