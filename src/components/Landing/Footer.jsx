import React from 'react'

function Footer() {
  return (
    <footer id="footer" className="relative z-10 footer-area pt-120">
    <div className="footer-bg" style={{backgroundImage: 'url(assets/images/footer-bg.svg)'}} />
    <div className="container">
      <div className="px-6 pt-10 pb-20 mb-12 bg-white rounded-lg shadow-xl md:px-12 subscribe-area wow fadeIn" data-wow-duration="1s" data-wow-delay="0.5s">
        <div className="row">
          <div className="w-full lg:w-1/2">
            <div className="lg:mt-12 subscribe-content">
              <h2 className="text-2xl font-bold sm:text-4xl subscribe-title">
                Subscribe Our Newsletter 
                <span className="block font-normal">get reguler updates</span>
              </h2>
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="mt-12 subscribe-form">
              <form action="#" className="relative focus:outline-none">
                <input type="email" placeholder="Enter eamil" className="w-full py-4 pl-6 pr-40 duration-300 border-2 rounded focus:border-theme-color focus:outline-none" />
                <button className="main-btn gradient-btn">Subscribe</button>
              </form>
            </div>
          </div>
        </div> {/* row */}
      </div> {/* subscribe area */}
      <div className="footer-widget pb-120">
        <div className="row">
          <div className="w-4/5 md:w-3/5 lg:w-2/6">
            <div className="mt-12 footer-about wow fadeIn" data-wow-duration="1s" data-wow-delay="0.2s">
              <a className="inline-block mb-8 logo" href="index.html">
                <img src="assets/images/logo.svg" alt="logo" className="w-40" />
              </a>
              <p className="pb-10 pr-10 leading-snug text-white">Lorem ipsum dolor sit amet consetetur sadipscing elitr, sederfs diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam.</p>
              <ul className="flex footer-social">
                <li><a href="javascript:void(0)"><i className="lni lni-facebook-filled" /></a></li>
                <li><a href="javascript:void(0)"><i className="lni lni-twitter-filled" /></a></li>
                <li><a href="javascript:void(0)"><i className="lni lni-instagram-filled" /></a></li>
                <li><a href="javascript:void(0)"><i className="lni lni-linkedin-original" /></a></li>
              </ul>
            </div> {/* footer about */}
          </div>
          <div className="w-4/5 sm:w-2/3 md:w-3/5 lg:w-2/6">
            <div className="row">
              <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2">
                <div className="mt-12 link-wrapper wow fadeIn" data-wow-duration="1s" data-wow-delay="0.4s">
                  <div className="footer-title">
                    <h4 className="mb-8 text-2xl font-bold text-white">Quick Link</h4>
                  </div>
                  <ul className="link">
                    <li><a href="javascript:void(0)">Road Map</a></li>
                    <li><a href="javascript:void(0)">Privacy Policy</a></li>
                    <li><a href="javascript:void(0)">Refund Policy</a></li>
                    <li><a href="javascript:void(0)">Terms of Service</a></li>
                    <li><a href="javascript:void(0)">Pricing</a></li>
                  </ul>
                </div> {/* footer wrapper */}
              </div>
              <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2">
                <div className="mt-12 link-wrapper wow fadeIn" data-wow-duration="1s" data-wow-delay="0.6s">
                  <div className="footer-title">
                    <h4 className="mb-8 text-2xl font-bold text-white">Resources</h4>
                  </div>
                  <ul className="link">
                    <li><a href="javascript:void(0)">Home</a></li>
                    <li><a href="javascript:void(0)">Page</a></li>
                    <li><a href="javascript:void(0)">Portfolio</a></li>
                    <li><a href="javascript:void(0)">Blog</a></li>
                    <li><a href="javascript:void(0)">Contact</a></li>
                  </ul>
                </div> {/* footer wrapper */}
              </div>
            </div>
          </div>
          <div className="w-4/5 sm:w-1/3 md:w-2/5 lg:w-2/6">
            <div className="mt-12 footer-contact wow fadeIn" data-wow-duration="1s" data-wow-delay="0.8s">
              <div className="footer-title">
                <h4 className="mb-8 text-2xl font-bold text-white">Contact Us</h4>
              </div>
              <ul className="contact">
                <li>+809272561823</li>
                <li>info@gmail.com</li>
                <li>www.yourweb.com</li>
                <li>123 Stree New York City , United <br /> States Of America 750.</li>
              </ul>
            </div> {/* footer contact */}
          </div>
        </div> {/* row */}
      </div> {/* footer widget */}
      <div className="py-8 border-t border-gray-200 footer-copyright">
        <p className="text-white">
          Template by <a className="duration-300 hover:text-theme-color-2" href="https://tailwindtemplates.co" rel="nofollow" target="_blank">TailwindTemplates</a> and
          <a className="duration-300 hover:text-theme-color-2" href="https://uideck.com" rel="nofollow" target="_blank">UIdeck</a>
        </p>
      </div> {/* footer copyright */}
    </div> {/* container */}
    <div id="particles-2" className="particles" />
  </footer>
    )
}

export default Footer