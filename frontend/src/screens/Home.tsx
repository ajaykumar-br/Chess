import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const Home = () => {
    const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="">
        <img src="images/showcase.png" alt="" />
      </div>
      <div className="h-screen flex justify-center items-center w-[30%] mx-6">
        <Button
          onClick={() => {
            navigate("game");
          }}
        >
          Play Online
        </Button>
      </div>
    </div>
  );
}

export default Home