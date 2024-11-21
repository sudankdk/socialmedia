import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import { follow_user, get_user_profile_data } from "../api/EndPoint";
import { SERVER_URL } from "../Constants/Constants";

const UserProfile = () => {
  // const { user_name } = useParams();
  const get_username_from_url = () => {
    const url_split = window.location.pathname.split("/");
    return url_split[url_split.length - 1];
  };

  const [username, setUsername] = useState(get_username_from_url());
  useEffect(() => {
    setUsername(get_username_from_url());
  }, []);

  return (
    <div className="flex w-full min-h-screen bg-gray-100">
      <div className="pl-16 m-5 w-full">
        <UserDetails username={username} />
      </div>
    </div>
  );
};

const UserDetails = ({ username }) => {
  const [loading, setLoading] = useState(true);
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  const [isOurProfile, setIsOurProfile] = useState(false);
  const [following, setFollowing] = useState(false);

  const handleFollow = async () => {
    const data = await follow_user(username);
    console.log("yo ho data", data);
    if (data.now_following) {
      setFollowerCount(followingCount + 1);
      setFollowing(true);
    } else {
      setFollowerCount(followingCount - 1);
      setFollowing(false);
    }
  };

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const data = await get_user_profile_data(username);

        setBio(data.bio);
        setProfileImage(data.profile_image);
        setFollowerCount(data.follower_count);
        setFollowingCount(data.following_count);

        setIsOurProfile(data.is_our_profile);
        setFollowing(data.following);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchdata();
  }, [username]);

  return (
    <div className="flex flex-col items-start">
      <h1 className="text-3xl font-semibold mb-4">@{username}</h1>

      {/* Profile photo and follower/following section */}
      <div className="flex items-center mb-4">
        <img
          src={loading ? "-" : `${SERVER_URL}${profileImage}`}
          alt={`${username}'s profile`}
          className="w-36 h-36 rounded-full object-cover shadow-md mr-6"
        />

        <div className="flex space-x-6">
          <div>
            <p className="text-xl font-semibold">Followers</p>
            <p className="text-lg text-gray-700">
              {loading ? "-" : followerCount}
            </p>
          </div>
          <div>
            <p className="text-xl font-semibold">Following</p>
            <p className="text-lg text-gray-700">
              {loading ? "-" : followingCount}
            </p>
          </div>
        </div>
      </div>

      <p className="text-lg text-gray-600 mt-6 mb-4">{loading ? "-" : bio}</p>
      {isOurProfile ? (
        <button className="w-24 bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Edit
        </button>
      ) : (
        <button
          className="w-24 bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleFollow}
        >
          {following ? "Unfollow" : "Follow"}
        </button>
      )}
    </div>
  );
};

export default UserProfile;
