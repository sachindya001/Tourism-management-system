import { Text, Button, Img } from "../..";
import PropTypes from "prop-types";

export default function Header({ ...props }) {
  return (
    <header
      {...props}
      className={`${props.className} flex justify-center items-end px-6 sm:px-5 bg-gray-50 shadow-xs`}
    >
      <div className="mx-auto mt-2.5 flex w-full max-w-[1280px] items-start justify-between gap-5 md:flex-col">
        <div className="flex w-[64%] items-start justify-between gap-5 self-center md:w-full md:flex-col">
          <div className="relative h-[84px] w-[38%] self-center md:h-auto md:w-full">
            <Text
              size="textxl"
              as="p"
              className="mt-4 font-hanaleifill text-[27px] font-normal text-indigo-300 md:text-[25px] sm:text-[23px]"
            >
              Travel trek{""}
            </Text>
            <Img
              src="images/img_whatsapp_image_2024_03_02.png"
              alt="Whatsapp Image"
              className="absolute bottom-0 left-0 right-0 top-0 m-auto h-[84px] w-full flex-1 object-cover"
            />
          </div>
          <ul className="mt-5 flex flex-wrap gap-[50px]">
            <li>
              <a href="#" className="md:text-[25px] sm:text-[23px]">
                <Text
                  size="textxl"
                  as="p"
                  className="font-cabin text-[27px] font-normal text-gray-500"
                >
                  Home
                </Text>
              </a>
            </li>
            <li>
              <a href="#" className="md:text-[25px] sm:text-[23px]">
                <Text
                  size="textxl"
                  as="p"
                  className="font-cabin text-[27px] font-normal text-gray-500"
                >
                  About
                </Text>
              </a>
            </li>
            <li>
              <a href="#" className="md:text-[25px] sm:text-[23px]">
                <Text
                  size="textxl"
                  as="p"
                  className="font-cabin text-[27px] font-normal text-gray-500"
                >
                  Contact us
                </Text>
              </a>
            </li>
          </ul>
        </div>
        <div className="mt-3.5 flex w-[18%] justify-center gap-3.5 md:w-full">
          <Button
            size="sm"
            shape="round"
            className="min-w-[100px] rounded-[12px] px-3.5 font-cabin"
          >
            Sign In
          </Button>
          <div className="flex w-full justify-center rounded-[12px] bg-blue_gray-100 p-1.5">
            <Text
              size="textxl"
              as="p"
              className="font-cabin text-[27px] font-normal text-white-0 md:text-[25px] sm:text-[23px]"
            >
              Sign up
            </Text>
          </div>
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  className: PropTypes.string,
};
