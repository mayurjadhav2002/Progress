import React from 'react'

function Testimonial() {
  return (
<section id="testimonial" className="testimonial-area pt-120">
  <div className="container">
    <div className="justify-center row">
      <div className="w-full lg:w-2/3">
        <div className="pb-10 text-center section-title">
          <div className="m-auto line" />
          <h3 className="title">
            Users sharing<span> their experience</span>
          </h3>
        </div>{" "}
        {/* section title */}
      </div>
    </div>{" "}
    {/* row */}
    <div
      className="row testimonial-active wow fadeInUpBig"
      data-wow-duration="1s"
      data-wow-delay="0.8s"
    >
      <div className="w-full lg:w-1/3">
        <div className="single-testimonial">
          <div className="flex items-center justify-between mb-6">
            <div className="quota">
              <i className="text-4xl duration-300 lni lni-quotation text-theme-color" />
            </div>
            <div className="star">
              <ul className="flex">
                <li>
                  <i className="lni lni-star-filled text-theme-color-2" />
                </li>
                <li>
                  <i className="lni lni-star-filled text-theme-color-2" />
                </li>
                <li>
                  <i className="lni lni-star-filled text-theme-color-2" />
                </li>
                <li>
                  <i className="lni lni-star-filled text-theme-color-2" />
                </li>
                <li>
                  <i className="lni lni-star-filled text-theme-color-2" />
                </li>
              </ul>
            </div>
          </div>
          <div className="mb-8">
            <p>
              Lorem ipsum dolor sit amet,consetetur sadipscing elitr, seddiam
              nonu eirmod tempor invidunt labore.Lorem ipsum dolor sit
              amet,consetetur sadipscing elitr, seddiam nonu.
            </p>
          </div>
          <div className="flex items-center testimonial-author">
            <div className="relative author-image">
              <img
                className="shape"
                src="assets/images/textimonial-shape.svg"
                alt="shape"
              />
              <img
                className="author"
                src="assets/images/author-1.png"
                alt="author"
              />
            </div>
            <div className="author-content media-body">
              <h6 className="mb-1 text-xl font-bold text-gray-900">
                Jenny Deo
              </h6>
              <p>CEO, SpaceX</p>
            </div>
          </div>
        </div>{" "}
        {/* single testimonial */}
      </div>
      <div className="col-lg-4">
        <div className="single-testimonial">
          <div className="flex items-center justify-between mb-6">
            <div className="quota">
              <i className="text-4xl duration-300 lni lni-quotation text-theme-color" />
            </div>
            <div className="star">
              <ul className="flex">
                <li>
                  <i className="lni lni-star-filled text-theme-color-2" />
                </li>
                <li>
                  <i className="lni lni-star-filled text-theme-color-2" />
                </li>
                <li>
                  <i className="lni lni-star-filled text-theme-color-2" />
                </li>
                <li>
                  <i className="lni lni-star-filled text-theme-color-2" />
                </li>
                <li>
                  <i className="lni lni-star-filled text-theme-color-2" />
                </li>
              </ul>
            </div>
          </div>
          <div className="mb-8">
            <p>
              Lorem ipsum dolor sit amet,consetetur sadipscing elitr, seddiam
              nonu eirmod tempor invidunt labore.Lorem ipsum dolor sit
              amet,consetetur sadipscing elitr, seddiam nonu.
            </p>
          </div>
          <div className="flex items-center testimonial-author">
            <div className="relative author-image">
              <img
                className="shape"
                src="assets/images/textimonial-shape.svg"
                alt="shape"
              />
              <img
                className="author"
                src="assets/images/author-2.png"
                alt="author"
              />
            </div>
            <div className="author-content media-body">
              <h6 className="mb-1 text-xl font-bold text-gray-900">
                Marjin Otte
              </h6>
              <p>UX Specialist, Yoast</p>
            </div>
          </div>
        </div>{" "}
        {/* single testimonial */}
      </div>
      <div className="col-lg-4">
        <div className="single-testimonial">
          <div className="flex items-center justify-between mb-6">
            <div className="quota">
              <i className="text-4xl duration-300 lni lni-quotation text-theme-color" />
            </div>
            <div className="star">
              <ul className="flex">
                <li>
                  <i className="lni lni-star-filled text-theme-color-2" />
                </li>
                <li>
                  <i className="lni lni-star-filled text-theme-color-2" />
                </li>
                <li>
                  <i className="lni lni-star-filled text-theme-color-2" />
                </li>
                <li>
                  <i className="lni lni-star-filled text-theme-color-2" />
                </li>
                <li>
                  <i className="lni lni-star-filled text-theme-color-2" />
                </li>
              </ul>
            </div>
          </div>
          <div className="mb-8">
            <p>
              Lorem ipsum dolor sit amet,consetetur sadipscing elitr, seddiam
              nonu eirmod tempor invidunt labore.Lorem ipsum dolor sit
              amet,consetetur sadipscing elitr, seddiam nonu.
            </p>
          </div>
          <div className="flex items-center testimonial-author">
            <div className="relative author-image">
              <img
                className="shape"
                src="assets/images/textimonial-shape.svg"
                alt="shape"
              />
              <img
                className="author"
                src="assets/images/author-3.png"
                alt="author"
              />
            </div>
            <div className="author-content media-body">
              <h6 className="mb-1 text-xl font-bold text-gray-900">
                David Smith
              </h6>
              <p>CTO, Alphabet</p>
            </div>
          </div>
        </div>{" "}
        {/* single testimonial */}
      </div>
      <div className="col-lg-4">
        <div className="single-testimonial">
          <div className="flex items-center justify-between mb-6">
            <div className="quota">
              <i className="text-4xl duration-300 lni lni-quotation text-theme-color" />
            </div>
            <div className="star">
              <ul className="flex">
                <li>
                  <i className="lni lni-star-filled text-theme-color-2" />
                </li>
                <li>
                  <i className="lni lni-star-filled text-theme-color-2" />
                </li>
                <li>
                  <i className="lni lni-star-filled text-theme-color-2" />
                </li>
                <li>
                  <i className="lni lni-star-filled text-theme-color-2" />
                </li>
                <li>
                  <i className="lni lni-star-filled text-theme-color-2" />
                </li>
              </ul>
            </div>
          </div>
          <div className="mb-8">
            <p>
              Lorem ipsum dolor sit amet,consetetur sadipscing elitr, seddiam
              nonu eirmod tempor invidunt labore.Lorem ipsum dolor sit
              amet,consetetur sadipscing elitr, seddiam nonu.
            </p>
          </div>
          <div className="flex items-center testimonial-author">
            <div className="relative author-image">
              <img
                className="shape"
                src="assets/images/textimonial-shape.svg"
                alt="shape"
              />
              <img
                className="author"
                src="assets/images/author-2.png"
                alt="author"
              />
            </div>
            <div className="author-content media-body">
              <h6 className="mb-1 text-xl font-bold text-gray-900">
                Fajar Siddiq
              </h6>
              <p>COO, MakerFlix</p>
            </div>
          </div>
        </div>{" "}
        {/* single testimonial */}
      </div>
    </div>{" "}
    {/* row */}
  </div>{" "}
  {/* container */}
</section>
  )
}

export default Testimonial