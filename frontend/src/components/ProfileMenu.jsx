import { Menu, Avatar } from "@mantine/core";
import PropTypes from "prop-types";

const ProfileMenu = ({ user, logout }) => {
  return (
    <div>
      <Menu>
        <Menu.Target>
          <Avatar src={user?.picture} alt="userimage" radius={"xl"} />
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item>Bookings</Menu.Item>
          <Menu.Label>Applications</Menu.Label>
          <Menu.Label>Go Back</Menu.Label>
          <Menu.Item
            onClick={() => {
              localStorage.clear();
              logout();
            }}
            color="red"
          >
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
};

ProfileMenu.propTypes = {
  user: PropTypes.shape({
    picture: PropTypes.string,
  }).isRequired,
  logout: PropTypes.func.isRequired,
};

export default ProfileMenu;
