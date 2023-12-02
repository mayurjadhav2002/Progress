import React from 'react'

function Team() {
  return (
<section id="team" className="team-area pt-120">
  <div className="container">
    <div className="justify-center row">
      <div className="w-full lg:w-2/3">
        <div className="pb-8 text-center section-title">
          <div className="m-auto line" />
          <h3 className="title">
            <span>Meet Our</span> Creative Team Members
          </h3>
        </div>{" "}
        {/* section title */}
      </div>
    </div>{" "}
    {/* row */}
    <div className="justify-center row">
      <div className="w-full sm:w-2/3 lg:w-1/3">
        <div
          className="mt-8 text-center single-team wow fadeIn"
          data-wow-duration="1s"
          data-wow-delay="0.2s"
        >
          <div className="relative team-image">
            <img className="w-full" src="assets/images/team-1.png" alt="Team" />
            <div className="team-social">
              <ul>
                <li>
                  <a href="javascript:void(0)">
                    <i className="lni lni-facebook-filled" />
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <i className="lni lni-twitter-filled" />
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <i className="lni lni-instagram-filled" />
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <i className="lni lni-linkedin-original" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="p-8">
            <h5 className="mb-1 text-xl font-bold text-gray-900">
              Isabela Moreira
            </h5>
            <p>Founder and CEO</p>
          </div>
        </div>{" "}
        {/* single team */}
      </div>
      <div className="w-full sm:w-2/3 lg:w-1/3">
        <div
          className="mt-8 text-center single-team wow fadeIn"
          data-wow-duration="1s"
          data-wow-delay="0.5s"
        >
          <div className="relative team-image">
            <img className="w-full" src="assets/images/team-2.png" alt="Team" />
            <div className="team-social">
              <ul>
                <li>
                  <a href="javascript:void(0)">
                    <i className="lni lni-facebook-filled" />
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <i className="lni lni-twitter-filled" />
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <i className="lni lni-instagram-filled" />
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <i className="lni lni-linkedin-original" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="p-8">
            <h5 className="mb-1 text-xl font-bold text-gray-900">Elon Musk</h5>
            <p>Sr. Software Engineer</p>
          </div>
        </div>{" "}
        {/* single team */}
      </div>
      <div className="w-full sm:w-2/3 lg:w-1/3">
        <div
          className="mt-8 text-center single-team wow fadeIn"
          data-wow-duration="1s"
          data-wow-delay="0.8s"
        >
          <div className="relative team-image">
            <img className="w-full" src="assets/images/team-3.png" alt="Team" />
            <div className="team-social">
              <ul>
                <li>
                  <a href="javascript:void(0)">
                    <i className="lni lni-facebook-filled" />
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <i className="lni lni-twitter-filled" />
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <i className="lni lni-instagram-filled" />
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <i className="lni lni-linkedin-original" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="p-8">
            <h5 className="mb-1 text-xl font-bold text-gray-900">
              Fiona Smith
            </h5>
            <p>Business Development Manager</p>
          </div>
        </div>{" "}
        {/* single team */}
      </div>
    </div>{" "}
    {/* row */}
  </div>{" "}
  {/* container */}
</section>
  )
}

export default Team