import React, { useEffect, useState } from "react";
import supabase from "../../../createClient";
import Header from "../auth/Header";
import Footer from "../auth/Footer";
import { Button } from "../ui/button";

const AdminDashboard = () => {
  const [view, setView] = useState("users");

  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDegree, setSelectedDegree] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [sortOption, setSortOption] = useState("");

  const [volunteers, setVolunteers] = useState([]);
  const [userLoading, setUserLoading] = useState(false);

  const [announcementStats, setAnnouncementStats] = useState([]);
  const [announcementLoading, setAnnouncementLoading] = useState(false);

  const degrees = ["High School", "CO-OP", "Undergraduate"];
  const genders = ["male", "female"];

  useEffect(() => {
    const fetchCities = async () => {
      const { data, error } = await supabase.from("cities").select("id, name");
      if (!error) setCities(data);
    };

    fetchCities();
  }, []);

  const fetchVolunteers = async () => {
    setUserLoading(true);
  
    let query = supabase
      .from("users")
      .select(`
        id, fname, lname, email, degree, gender, city, volunteer_hours,
        cities ( name ),
        applications:applications_user_id_fkey ( confirmed )
      `)
      .eq("level", 1); // only volunteers
  
    if (selectedDegree) query = query.eq("degree", selectedDegree);
    if (selectedCity) query = query.eq("city", selectedCity);
    if (selectedGender) query = query.eq("gender", selectedGender);
  
    const { data, error } = await query;
  
    if (!error && data) {
        const formatted = data.map((user) => {
            const confirmedAppsCount = Array.isArray(user.applications)
              ? user.applications.filter((a) => a?.confirmed).length
              : 0;
          
            return {
              id: user.id,
              name: `${user.fname} ${user.lname}`,
              email: user.email,
              city: user.cities?.name || "N/A",
              degree: user.degree,
              gender: user.gender,
              hours: user.volunteer_hours || 0,
              opportunities: confirmedAppsCount,
            };
          });
          
  
      if (sortOption === "most_hours") formatted.sort((a, b) => b.hours - a.hours);
      else if (sortOption === "least_hours") formatted.sort((a, b) => a.hours - b.hours);
      else if (sortOption === "most_opportunities") formatted.sort((a, b) => b.opportunities - a.opportunities);
  
      setVolunteers(formatted);
    }
  
    setUserLoading(false);
  };
  
  

  const fetchAnnouncements = async () => {
    setAnnouncementLoading(true);

    let query = supabase
      .from("announcements")
      .select(`
        id, title, degree, organization_id,
        users:users!announcements_organization_id_fkey (
          fname, lname
        )
      `);

    if (selectedDegree) query = query.filter("degree", "eq", selectedDegree);

    const { data, error } = await query;

    if (!error && data) {
      const stats = [];

      for (const a of data) {
        const { count } = await supabase
          .from("applications")
          .select("*", { count: "exact", head: true })
          .eq("announcement_id", a.id);

        stats.push({
          id: a.id,
          title: a.title,
          degree: a.degree,
          org: `${a.users?.fname || "Unknown"} ${a.users?.lname || ""}`,
          applicantCount: count || 0,
        });
      }

      if (sortOption === "most_applicants") stats.sort((a, b) => b.applicantCount - a.applicantCount);
      else if (sortOption === "least_applicants") stats.sort((a, b) => a.applicantCount - b.applicantCount);

      setAnnouncementStats(stats);
    }

    setAnnouncementLoading(false);
  };

  const handleApplyFilters = () => {
    if (view === "users") fetchVolunteers();
    else if (view === "announcements") fetchAnnouncements();
  };

  const renderSortOptions = () => {
    if (view === "users") {
      return (
        <>
          <option value="">No Sorting</option>
          <option value="most_hours">Most Hours</option>
          <option value="least_hours">Least Hours</option>
          <option value="most_opportunities">Most Opportunities</option>
        </>
      );
    } else {
      return (
        <>
          <option value="">No Sorting</option>
          <option value="most_applicants">Most Applicants</option>
          <option value="least_applicants">Least Applicants</option>
        </>
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <main className="flex-1 max-w-6xl mx-auto p-6 w-full">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>

        <div className="flex gap-4 mb-6">
          <Button variant={view === "users" ? "default" : "outline"} onClick={() => setView("users")}>
            User Analytics
          </Button>
          <Button variant={view === "announcements" ? "default" : "outline"} onClick={() => setView("announcements")}>
            Announcements & Applications
          </Button>
        </div>

        <div className="flex flex-wrap gap-4 mb-6">
          <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} className="border px-3 py-2 rounded text-sm">
            <option value="">All Cities</option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>{city.name}</option>
            ))}
          </select>

          <select value={selectedDegree} onChange={(e) => setSelectedDegree(e.target.value)} className="border px-3 py-2 rounded text-sm">
            <option value="">All Degrees</option>
            {degrees.map((deg) => (
              <option key={deg} value={deg}>{deg}</option>
            ))}
          </select>

          <select value={selectedGender} onChange={(e) => setSelectedGender(e.target.value)} className="border px-3 py-2 rounded text-sm" disabled={view !== "users"}>
            <option value="">All Genders</option>
            {genders.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>

          <select value={sortOption} onChange={(e) => setSortOption(e.target.value)} className="border px-3 py-2 rounded text-sm">
            {renderSortOptions()}
          </select>

          <Button onClick={handleApplyFilters} className="bg-blue-600 text-white px-4">Apply Filters</Button>
        </div>

        {view === "users" && (
          <div>
            {userLoading ? (
              <p>Loading...</p>
            ) : volunteers.length === 0 ? (
              <p>No results found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border rounded">
                  <thead className="bg-gray-100 text-left">
                    <tr>
                      <th className="px-4 py-2 border-b">Name</th>
                      <th className="px-4 py-2 border-b">Email</th>
                      <th className="px-4 py-2 border-b">City</th>
                      <th className="px-4 py-2 border-b">Degree</th>
                      <th className="px-4 py-2 border-b">Gender</th>
                      <th className="px-4 py-2 border-b">Hours</th>
                      <th className="px-4 py-2 border-b">Opportunities</th>
                    </tr>
                  </thead>
                  <tbody>
                    {volunteers.map((v, idx) => (
                      <tr key={idx}>
                        <td className="px-4 py-2 border-b">{v.name}</td>
                        <td className="px-4 py-2 border-b">{v.email}</td>
                        <td className="px-4 py-2 border-b">{v.city}</td>
                        <td className="px-4 py-2 border-b">{v.degree}</td>
                        <td className="px-4 py-2 border-b">{v.gender}</td>
                        <td className="px-4 py-2 border-b">{v.hours}</td>
                        <td className="px-4 py-2 border-b">{v.opportunities}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {view === "announcements" && (
          <div>
            {announcementLoading ? (
              <p>Loading...</p>
            ) : announcementStats.length === 0 ? (
              <p>No announcements found.</p>
            ) : (
              <table className="w-full bg-white border rounded overflow-hidden">
                <thead className="bg-gray-100 text-left">
                  <tr>
                    <th className="px-4 py-2 border-b">Title</th>
                    <th className="px-4 py-2 border-b">Degree</th>
                    <th className="px-4 py-2 border-b">Applicants</th>
                    <th className="px-4 py-2 border-b">Organization</th>
                  </tr>
                </thead>
                <tbody>
                  {announcementStats.map((a) => (
                    <tr key={a.id}>
                      <td className="px-4 py-2 border-b">{a.title}</td>
                      <td className="px-4 py-2 border-b">{a.degree}</td>
                      <td className="px-4 py-2 border-b">{a.applicantCount}</td>
                      <td className="px-4 py-2 border-b">{a.org}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
