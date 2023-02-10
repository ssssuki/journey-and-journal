import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import Navbar from "../components/Navbar";
import CreatePost from "../components/CreatePost";

export default function CreatePage() {
  return (
    <div>
      <Parallax pages={1}>
        <ParallaxLayer
          style={{
            backgroundImage: "url(../images/parallax_1.png)",
            backgroundSize: "cover",
          }}
        ></ParallaxLayer>
        <ParallaxLayer
          style={{
            backgroundImage: "url(../images/parallax_3.png)",
            backgroundSize: "cover",
          }}
        ></ParallaxLayer>
        <ParallaxLayer>
          <Navbar />
          <CreatePost />
        </ParallaxLayer>
      </Parallax>
    </div>
  );
}
