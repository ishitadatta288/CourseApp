import React, { useEffect, useState } from "react";
import logo from "../../public/logo.png";
import { Link, Links } from "react-router-dom";
import { FaFacebook, FaTruck } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../utils/utils.js";

function Home() {
  const [courses, setCourses] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
  const token = localStorage.getItem("token");
  setIsLoggedIn(!!token);
}, []);

  
  const handleLogout = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/user/logout`, {
        withCredentials: true,
      });
      toast.success(response.data.message);
      localStorage.removeItem("token");
      setIsLoggedIn(false);
    } catch (error) {
      console.log("Error in logging out", error);
      toast.error(error.response.data.error || "Error in logging out");
    }
  };
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/course/courses`, {
          withCredentials: true,
        });
        console.log(response.data.courses);
        setCourses(response.data.courses);
      } catch (error) {
        console.log("Error in fetchCourses", error);
      }
    };
    fetchCourses();
  }, []);

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className=" min-h-screen w-full bg-gradient-to-r from-black to-blue-950">
      <div className=" text-white container mx-auto">
        {/* header */}
        <header className=" flex items-center justify-between p-8">
          <div className=" flex items-center space-x-2">
            <img className=" h-10 w-10 rounded-full" src={logo} alt="" />
            <h1 className="text-2xl text-orange-500 font-bold">Edulocity</h1>
          </div>
          <div className=" space-x-4">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className=" bg-transparent text-white py-2 px-4 border border-white rounded"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to={"/login"}
                  className="bg-transparent text-white text-xs md:text-lg md:py-2 md:px-4 p-2 border border-white rounded"
                >
                  Login
                </Link>
                <Link
                  to={"/signup"}
                  className="bg-transparent text-white text-xs md:text-lg md:py-2 md:px-4 p-2 border border-white rounded"
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        </header>

        {/* main section */}
        <section className=" text-center py-20">
          <h1 className=" text-4xl font-semibold text-orange-500">Edulocity</h1>

          <br />
          <p className=" text-gray-500 ">
            {" "}
            Sharpen your skills with vourses crafted by experts.
          </p>
          <div className=" space-x-4 mt-8">
            <Link
              to={"/courses"}
              className=" bg-green-500 text-white rounded py-3 px-6 font-semibold hover:bg-white duration-300 hover:text-black"
            >
              Explore courses
            </Link>
            <Link
              to={
                "https://www.coursera.org/?msockid=1db8640ee6846666353d7648e7366750"
              }
              className=" bg-white text-black rounded py-3 px-6 font-semibold hover:bg-green-500 duration-300 hover:text-white"
            >
              Course Videos
            </Link>
          </div>
        </section>

        <section>
          <Slider {...settings}>
            {courses.map((course) => (
              <div key={course._id} className=" p-4">
                <div className=" relative flex-shrink-0 w-92 transition-transform duration-300 transform hover:scale-105">
                  <div className=" bg-gray-900 rounded-lg overflow-hidden">
                    <img
                      className=" h-36 w-full object-contain"
                      src={course.image?.url}
                      alt=""
                    />
                    <div className=" p-10 text-center">
                      <h2 className=" text-xl font-bold text-white">
                        {course.title}
                      </h2>
                      <Link
                        to={"/courses"}
                        className=" inline-block mt-8 bg-orange-500 text-white py-2 px-5 rounded-full hover:bg-blue-500 duration-300"
                      >
                        Enroll Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </section>

        <hr className=" my-10" />
        {/* Footer */}

        <footer className="">
          <div className=" grid grid-cols-1 md:grid-cols-3">
            <div className=" flex flex-col items-center md:items-start">
              <div className=" flex items-center space-x-2">
                <img className=" h-10 w-10 rounded-full" src={logo} alt="" />
                <h1 className="text-2xl text-orange-500 font-bold">
                  Edulocity
                </h1>
              </div>
              <div className=" mt-3 ml-2 md:ml-8 ">
                <p className=" mb-2">Follow us</p>
                <div className=" flex space-x-4">
                  <a href="">
                    <FaFacebook className=" text-2xl hover:text-blue-500" />
                  </a>
                  <a href="">
                    <FaInstagram className=" text-2xl hover:text-pink-600" />
                  </a>
                  <a href="">
                    <FaXTwitter className="text-2xl hover:text-blue-400" />
                  </a>
                </div>
              </div>
            </div>

            <div className=" items-center flex flex-col">
              <h3 className=" text-lg font-semibold mb-4"> Connects</h3>
              <ul className="space-y-2 text-gray-400">
                <li className=" hover:text-white cursor-pointer duration-300">
                  Youtube
                </li>
                <li className=" hover:text-white cursor-pointer duration-300">
                  Telegram
                </li>
                <li className=" hover:text-white cursor-pointer duration-300">
                  Github
                </li>
              </ul>
            </div>
            <div className=" items-center flex flex-col">
              <h3 className=" text-lg font-semibold mb-4 px-2">
                {" "}
                Copyrights &#169; 2025
              </h3>
              <ul className=" space-y-2 text-gray-400">
                <li className=" hover:text-white cursor-pointer duration-300">
                  Terms & Conditions
                </li>
                <li className=" hover:text-white cursor-pointer duration-300">
                  Privacy Policy
                </li>
                <li className=" hover:text-white cursor-pointer duration-300">
                  {" "}
                  Refund & Cancellation
                </li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Home;
