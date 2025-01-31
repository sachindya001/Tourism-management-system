import { Button, Text, Img } from "./";
import PropTypes from "prop-types";

export default function UserProfile({
  userImage = "images/img_reveraton_27_1.png",
  userName = "Reveraton",
  userDescription = (
    <>
      Lorem ipsum dolor sit amet,
      <br />
      consectetur adipisicing elit.
    </>
  ),
  viewButtonText = "View",
  ...props
}) {
  return (
    <div
      {...props}
      className={`${props.className} flex flex-col items-center w-[20%] mdw-full`}
    >
      <div className="self-stretch">
        <div className="relative h-[294px] content-center">
          <Img
            src={userImage}
            alt="Product Image"
            className="w-auto h-[294px] w-full flex-1 rounded-tl-[20px] rounded-tr-[20px] object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 m-auto flex flex-1 flex-col items-center gap-1.5 rounded-tl-[20px] rounded-tr-[20px] bg-white-0">
            <Text
              size="textlg"
              as="p"
              className="text-[20px] font-normal text-black-900"
            >
              {userName}
            </Text>
            <Text
              size="textxs"
              as="p"
              className="mb-11 text-[12px] font-normal leading-[15px] text-gray-500"
            >
              {userDescription}
            </Text>
          </div>
        </div>
      </div>
      <Button
        shape="round"
        className="relative z-[2] mt-[-18px] mr-3.5 mt-[-24px] self-stretch rounded-[12px] px-[34px] sm:px-5"
      >
        {viewButtonText}
      </Button>
    </div>
  );
}

UserProfile.propTypes = {
  userImage: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  userDescription: PropTypes.node.isRequired,
  viewButtonText: PropTypes.string.isRequired,
  className: PropTypes.string,
};
