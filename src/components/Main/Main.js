import Promo from "../Promo/Promo";
import AboutProject from "../AboutProject/AboutProject";
import Technologies from "../Technologies/Technologies";
import AboutMe from "../AboutMe/AboutMe";

export default function Main() {
  return (
    <main className="main">
      <Promo />
      <AboutProject />
      <Technologies />
      <AboutMe />
    </main>
  );
}
