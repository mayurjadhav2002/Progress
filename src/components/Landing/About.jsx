import React from 'react'

function About() {
  return (
<>
  <section id="about" className="relative pt-20 about-area">
    <div className="container">
      <div className="row">
        <div className="w-full lg:w-1/2">
          <div
            className="mx-4 mt-12 about-content wow fadeInLeftBig"
            data-wow-duration="1s"
            data-wow-delay="0.5s"
          >
            <div className="mb-4 section-title">
              <div className="line" />
              <h3 className="title">
                Quick &amp; Easy <span>to Use Tailwind Template</span>
              </h3>
            </div>{" "}
            {/* section title */}
            <p className="mb-8">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, seiam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
              sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
              amet, consetetur sadipscing.
            </p>
            <a href="javascript:void(0)" className="main-btn gradient-btn">
              Try it Free
            </a>
          </div>{" "}
          {/* about content */}
        </div>
        <div className="w-full lg:w-1/2">
          <div
            className="mx-4 mt-12 text-center about-image wow fadeInRightBig"
            data-wow-duration="1s"
            data-wow-delay="0.5s"
          >
            <img src="assets/images/about1.svg" alt="about" />
          </div>{" "}
          {/* about image */}
        </div>
      </div>{" "}
      {/* row */}
    </div>{" "}
    {/* container */}
    <div className="about-shape-1">
      <img src="assets/images/about-shape-1.svg" alt="shape" />
    </div>
  </section>
  <section className="relative pt-20 about-area">
    <div className="about-shape-2">
      <img src="assets/images/about-shape-2.svg" alt="shape" />
    </div>
    <div className="container">
      <div className="row">
        <div className="w-full lg:w-1/2 lg:order-last">
          <div
            className="mx-4 mt-12 about-content wow fadeInLeftBig"
            data-wow-duration="1s"
            data-wow-delay="0.5s"
          >
            <div className="mb-4 section-title">
              <div className="line" />
              <h3 className="title">
                Modern design <span> with Essential Features</span>
              </h3>
            </div>{" "}
            {/* section title */}
            <p className="mb-8">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, seiam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
              sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
              amet, consetetur sadipscing.
            </p>
            <a href="javascript:void(0)" className="main-btn gradient-btn">
              Try it Free
            </a>
          </div>{" "}
          {/* about content */}
        </div>
        <div className="w-full lg:w-1/2 lg:order-first">
          <div
            className="mx-4 mt-12 text-center about-image wow fadeInRightBig"
            data-wow-duration="1s"
            data-wow-delay="0.5s"
          >
            <img src="assets/images/about2.svg" alt="about" />
          </div>{" "}
          {/* about image */}
        </div>
      </div>{" "}
      {/* row */}
    </div>{" "}
    {/* container */}
  </section>
  {/*====== ABOUT PART START ======*/}
  <section className="relative pt-20 about-area">
    <div className="container">
      <div className="row">
        <div className="w-full lg:w-1/2">
          <div
            className="mx-4 mt-12 about-content wow fadeInLeftBig"
            data-wow-duration="1s"
            data-wow-delay="0.5s"
          >
            <div className="mb-4 section-title">
              <div className="line" />
              <h3 className="title">
                <span>Crafted for</span> SaaS, App and Software Landing Page
              </h3>
            </div>{" "}
            {/* section title */}
            <p className="mb-8">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, seiam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
              sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
              amet, consetetur sadipscing.
            </p>
            <a href="javascript:void(0)" className="main-btn gradient-btn">
              Try it Free
            </a>
          </div>{" "}
          {/* about content */}
        </div>
        <div className="w-full lg:w-1/2">
          <div
            className="mx-4 mt-12 text-center about-image wow fadeInRightBig"
            data-wow-duration="1s"
            data-wow-delay="0.5s"
          >
            <img src="assets/images/about3.svg" alt="about" />
          </div>{" "}
          {/* about image */}
        </div>
      </div>{" "}
      {/* row */}
    </div>{" "}
    {/* container */}
    <div className="about-shape-1">
      <img src="assets/images/about-shape-1.svg" alt="shape" />
    </div>
  </section>
</>
  )
}

export default About