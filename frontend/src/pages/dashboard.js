import { useEffect, useState } from "react";
import { supabase } from "../supabaseclient";
import { useNavigate, Link } from "react-router-dom";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [babies, setBabies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserAndBabies = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        navigate("/");
      } else {
        setUser(data.user);

        // 🔥 Fetch babies
        const { data: babiesData, error } = await supabase
          .from("babies")
          .select("*")
          .eq("user_id", data.user.id);

        if (error) {
          console.log(error);
        } else {
          setBabies(babiesData);
        }
      }
    };

    getUserAndBabies();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* 🔹 Top Bar */}
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow mb-6">
        <h2 className="text-xl font-bold">Dashboard 👶</h2>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* 🔹 Main Content */}
      {user && (
        <div className="bg-white p-6 rounded-2xl shadow-md">

          <p className="text-gray-700 mb-4">
            Welcome, <span className="font-semibold">{user.email}</span>
          </p>

          {/* 🔹 Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <Link
              to="/add-baby"
              className="bg-blue-500 text-white p-6 rounded-xl text-center hover:bg-blue-600 transition"
            >
              ➕ Add Baby
            </Link>

            <div className="bg-gray-200 p-6 rounded-xl text-center">
              📊 Baby Data (Coming Soon)
            </div>

          </div>

          {/* 🔥 Babies Section */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">Your Babies 👶</h3>

            {babies.length === 0 ? (
              <p className="text-gray-500">No babies added yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {babies.map((baby) => (
                  <div
                    key={baby.id}
                    className="bg-gray-50 p-4 rounded-xl shadow border"
                  >
                    <h4 className="text-xl font-bold">{baby.name}</h4>

                    <p className="text-gray-600">
                      Birth Type: {baby.birth_type || "N/A"}
                    </p>

                    <p className="text-gray-600">
                      Weight: {baby.weight || "N/A"} kg
                    </p>

                    <p className="text-gray-600">
                      DOB: {baby.dob || "N/A"}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
}