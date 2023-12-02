import React from 'react'

function Header() {
  return (
<header className="header-area">
  <div className="navbar-area">
    <div className="container relative">
      <div className="row">
        <div className="w-full">
          <nav className="flex items-center justify-between navbar navbar-expand-lg">
            <a className="mr-4 navbar-brand" href="index.html">
              <img src="assets/images/logo.svg" alt="Logo" />
            </a>
            <button
              className="block navbar-toggler focus:outline-none lg:hidden"
              type="button"
              data-toggle="collapse"
              data-target="#navbarOne"
              aria-controls="navbarOne"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="toggler-icon" />
              <span className="toggler-icon" />
              <span className="toggler-icon" />
            </button>
            <div
              className="absolute left-0 z-20 hidden w-full px-5 py-3 duration-300 bg-white shadow lg:w-auto collapse navbar-collapse lg:block top-100 mt-full lg:static lg:bg-transparent lg:shadow-none"
              id="navbarOne"
            >
              <ul
                id="nav"
                className="items-center content-start mr-auto lg:justify-end navbar-nav lg:flex"
              >
                <li className="nav-item active">
                  <a className="page-scroll" href="#home">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="page-scroll" href="#features">
                    Features
                  </a>
                </li>
                <li className="nav-item">
                  <a className="page-scroll" href="#about">
                    About
                  </a>
                </li>
                <li className="nav-item">
                  <a className="page-scroll" href="#facts">
                    Why
                  </a>
                </li>
                <li className="nav-item">
                  <a className="page-scroll" href="#team">
                    Team
                  </a>
                </li>
                <li className="nav-item">
                  <a className="page-scroll" href="#blog">
                    Blog
                  </a>
                </li>
              </ul>
            </div>{" "}
            {/* navbar collapse */}
            <div className="absolute right-0 hidden mt-2 mr-24 navbar-btn sm:inline-block lg:mt-0 lg:static lg:mr-0">
              <a
                className="main-btn gradient-btn"
                data-scroll-nav={0}
                href="#"
                rel="nofollow"
              >
                Download Now
              </a>
            </div>
          </nav>{" "}
          {/* navbar */}
        </div>
      </div>{" "}
      {/* row */}
    </div>{" "}
    {/* container */}
  </div>{" "}
  {/* navbar area */}
  <div
    id="home"
    className="header-hero"
    style={{ backgroundImage: "url(assets/images/banner-bg.svg)" }}
  >
    <div className="container">
      <div className="justify-center row">
        <div className="w-full lg:w-2/3">
          <div className="pt-32 mb-12 text-center lg:pt-48 header-hero-content">
            <h3
              className="text-4xl font-light leading-tight text-white header-sub-title wow fadeInUp"
              data-wow-duration="1.3s"
              data-wow-delay="0.2s"
            >
              Basic - SaaS Landing Page
            </h3>
            <h2
              className="mb-3 text-4xl font-bold text-white header-title wow fadeInUp"
              data-wow-duration="1.3s"
              data-wow-delay="0.5s"
            >
              Kickstart Your SaaS or App Site
            </h2>
            <p
              className="mb-8 text-white text wow fadeInUp"
              data-wow-duration="1.3s"
              data-wow-delay="0.8s"
            >
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor
            </p>
            <a
              href="#"
              className="main-btn gradient-btn gradient-btn-2 wow fadeInUp"
              data-wow-duration="1.3s"
              data-wow-delay="1.1s"
            >
              Get Started
            </a>
          </div>{" "}
          {/* header hero content */}
        </div>
      </div>{" "}
      {/* row */}
      <div className="justify-center row">
        <div className="w-full lg:w-2/3">
          <div
            className="text-center header-hero-image wow fadeIn"
            data-wow-duration="1.3s"
            data-wow-delay="1.4s"
          >
            <img src="assets/images/header-hero.png" alt="hero" />
          </div>{" "}
          {/* header hero image */}
        </div>
      </div>{" "}
      {/* row */}
    </div>{" "}
    {/* container */}
    <div id="particles-1" className="particles" />
  </div>{" "}
  {/* header hero */}
</header>
  )
}

export default Header