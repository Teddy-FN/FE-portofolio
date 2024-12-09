import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const socialMedia = [
  {
    icon: <FaGithub />,
    path: "https://github.com/Teddy-FN",
  },
  {
    icon: <FaLinkedin />,
    path: "https://www.linkedin.com/in/teddy-ferdian-abrar-amrullah",
  },
];

const Social = ({ containerStyles, iconStyles }) => {
  return (
    <div className={containerStyles}>
      {socialMedia.map((items, index) => {
        return (
          <Link
            key={index}
            href={items.path}
            className={iconStyles}
            target="_blank"
          >
            {items.icon}
          </Link>
        );
      })}
    </div>
  );
};

export default Social;
