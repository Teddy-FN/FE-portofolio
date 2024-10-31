import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const socialMedia = [
  {
    icon: <FaGithub />,
    path: "",
  },
  {
    icon: <FaLinkedin />,
    path: "",
  },
];

const Social = ({ containerStyles, iconStyles }) => {
  return (
    <div className={containerStyles}>
      {socialMedia.map((items, index) => {
        return (
          <Link key={index} href={items.path} className={iconStyles}>
            {items.icon}
          </Link>
        );
      })}
    </div>
  );
};

export default Social;
