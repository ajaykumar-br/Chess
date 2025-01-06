import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const Home = () => {
    const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="h-[83%] w-[42%]">
        <img src="chessboard.jpeg" alt="" />
      </div>
      <div className="h-[83%] flex justify-center items-center w-[30%] mx-6 bg-slate-800">
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