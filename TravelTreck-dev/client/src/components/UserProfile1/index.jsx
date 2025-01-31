import { Text, Img } from "./";
import PropTypes from "prop-types";

export default function UserProfile1({
  userImage = "images/img_rectangle_7.png",
  userName = "Safari",
  ...props
}) {
  return (
    <div {...props} className={`${props.className} h-[202px] w-full relative`}>
      <Img
        src={userImage}
        alt="Safari Image"
        className="mx-auto h-[202px] w-full flex-1 rounded-[20px] object-cover"
      />
      <Text
        size="text2xl"
        as="p"
        className="absolute bottom-[9px] left-[31%] m-auto text-[35px] font-normal text-white-a700"
      >
        {userName}
      </Text>
    </div>
  );
}

UserProfile1.propTypes = {
  userImage: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  className: PropTypes.string,
};
