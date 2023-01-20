import { useEffect } from "react";

import HtmlExampleSection from "../components/HtmlExampleSection";
import CssExampleSection from "../components/CssExampleSection";
import JavascriptExampleSection from "../components/JavascriptExampleSection";
import ReactExampleSection from "../components/ReactExampleSection";
import MainHeaderSection from "../components/MainHeaderSection";
import NodeExampleSection from "../components/NodeExampleSection";

function Home(props) {
  const { progress } = props;
  progress(0);

  useEffect(() => {
    document.title = "Futurisers.com";
    // document.body.style = "background: #fff !important";
    progress(100);
  }, [progress]);

  return (
    <>
      <main>
        <MainHeaderSection />
        <HtmlExampleSection />
        <CssExampleSection />
        <JavascriptExampleSection />
        <NodeExampleSection />
        <ReactExampleSection />
      </main>
    </>
  );
}

export default Home;
