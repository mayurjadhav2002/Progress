import React from 'react'

function VideoCounter() {
  return (
<section id="facts" className="pt-20 video-counter">
  <div className="container">
    <div className="row">
      <div className="w-full lg:w-1/2">
        <div
          className="relative pb-8 mt-12 video-content wow fadeIn"
          data-wow-duration="1s"
          data-wow-delay="0.5s"
        >
          <img
            className="absolute bottom-0 left-0 -ml-8 dots"
            src="assets/images/dots.svg"
            alt="dots"
          />
          <div className="relative mr-6 rounded-lg shadow-md video-wrapper">
            <div className="video-image">
              <img src="assets/images/video.png" alt="video" />
            </div>
            <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full bg-blue-900 bg-opacity-25 rounded-lg video-icon">
              <a
                href="https://www.youtube.com/watch?v=r44RKWyfcFw"
                className="video-popup"
              >
                <i className="lni lni-play" />
              </a>
            </div>
          </div>{" "}
          {/* video wrapper */}
        </div>{" "}
        {/* video content */}
      </div>
      <div className="w-full lg:w-1/2">
        <div
          className="pl-0 mt-12 counter-wrapper lg:pl-16 wow fadeIn"
          data-wow-duration="1s"
          data-wow-delay="0.8s"
        >
          <div className="counter-content">
            <div className="mb-8 section-title">
              <div className="line" />
              <h3 className="title">
                Cool facts <span> about this app</span>
              </h3>
            </div>{" "}
            {/* section title */}
            <p className="text">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, seiam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua.
            </p>
          </div>{" "}
          {/* counter content */}
          <div className="row no-gutters">
            <div className="flex items-center justify-center single-counter counter-color-1">
              <div className="text-center counter-items">
                <span className="text-2xl font-bold text-white">
                  <span className="counter">125</span>K
                </span>
                <p className="text-white">Downloads</p>
              </div>
            </div>{" "}
            {/* single counter */}
            <div className="flex items-center justify-center single-counter counter-color-2">
              <div className="text-center counter-items">
                <span className="text-2xl font-bold text-white">
                  <span className="counter">87</span>K
                </span>
                <p className="text-white">Active Users</p>
              </div>
            </div>{" "}
            {/* single counter */}
            <div className="flex items-center justify-center single-counter counter-color-3">
              <div className="text-center counter-items">
                <span className="text-2xl font-bold text-white">
                  <span className="counter">4.8</span>
                </span>
                <p className="text-white">User Rating</p>
              </div>
            </div>{" "}
            {/* single counter */}
          </div>{" "}
          {/* row */}
        </div>{" "}
        {/* counter wrapper */}
      </div>
    </div>{" "}
    {/* row */}
  </div>{" "}
  {/* container */}
</section>
  )
}

export default VideoCounter