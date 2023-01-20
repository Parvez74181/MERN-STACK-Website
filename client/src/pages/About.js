import React, { useEffect } from "react";

function About(props) {
  const { progress } = props;
  progress(0);

  useEffect(() => {
    document.title = "Abot | Futurisers";
    progress(100);
  }, [progress]);

  let contents = document.querySelectorAll("#about div");
  if (contents.length > 0) {
    contents.forEach(
      (content) => {
        let observer = new IntersectionObserver((entries) => {
          let entry = entries[0];
          if (entry.isIntersecting) entry.target.classList.add("active");
          else entry.target.classList.remove("active");
        });
        observer.observe(content);
      },
      { threshold: 1.0 }
    );
  }
  return (
    <>
      <main>
        <section id="about">
          <h2 className="h1">About Our Website</h2>
          <div className="">
            {/* greetings */}
            <div className="greetings row">
              <p className="col">
                Welcome to our website, the premier destination for learning to
                code in Bangla! Our website is completely free and provides a
                wealth of resources for anyone looking to learn or improve their
                coding skills in the Bangla language.
              </p>
              <h1 className="col fs-1">Greetings!</h1>
            </div>
            {/* purpose */}
            <div className="purpose row">
              <h1 className="col-5 fs-1">Purpose!</h1>
              <p className="col-5">
                Our website is designed to be user-friendly and accessible to
                everyone, regardless of their prior experience with coding. Our
                lessons are clear and concise, and we offer a variety of
                interactive exercises and projects to help you apply what you've
                learned and build real-world skills.
              </p>
            </div>
            <div className="goal row">
              <p className="col">
                We are committed to making our website the best place to learn
                to code in Bangla, and we are constantly updating and improving
                our content to ensure that it is current, accurate, and
                relevant. So join us today and start your journey towards
                becoming a proficient coder in Bangla!
              </p>
              <h1 className="col fs-1">Our Goal!</h1>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default About;
