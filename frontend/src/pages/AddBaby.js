import { useState, useEffect } from "react";
import { supabase } from "../supabaseclient";
import { useNavigate } from "react-router-dom";

export default function AddBaby() {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [weight, setWeight] = useState("");
  const [birthType, setBirthType] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        navigate("/");
      } else {
        setUser(data.user);
      }
    };

    getUser();
  }, [navigate]);

  const handleAddBaby = async () => {
    const { error } = await supabase.from("babies").insert([
      {
        name: name,
        dob: dob,
        birth_weight: weight,
        birth_type: birthType,
        user_id: user.id,
      },
    ]);

    if (error) {
      alert(error.message);
    } else {
      alert("Baby added successfully!");
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        
        <h2 className="text-2xl font-bold text-center mb-6">
          Add Baby 👶
        </h2>

        <input
        placeholder="Baby Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
  type="date"
  value={dob}
  onChange={(e) => setDob(e.target.value)}
  className="w-full p-3 mb-4 border rounded-lg"
/>

        <input
  placeholder="Birth Weight (kg)"
  value={weight}
  onChange={(e) => setWeight(e.target.value)}
  className="w-full p-3 mb-4 border rounded-lg"
/>

        <select
  value={birthType}
  onChange={(e) => setBirthType(e.target.value)}
  className="w-full p-3 mb-4 border rounded-lg"
>
  <option value="">Select Birth Type</option>
  <option value="full-term">Full Term</option>
  <option value="premature">Premature</option>
</select>

        <button
  onClick={handleAddBaby}
  className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
>
  Add Baby
</button>

      </div>
    </div>
  );
}