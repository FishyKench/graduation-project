import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { supabase } from "../../lib/supabase";

const PasswordChangeForm = () => {
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (passwords.new !== passwords.confirm) {
      setError("New passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: passwords.new,
      });

      if (error) throw error;

      setSuccess("Password updated successfully");
      setPasswords({ current: "", new: "", confirm: "" });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
          {error}
        </div>
      )}
      {success && (
        <div className="p-3 text-sm text-green-500 bg-green-50 rounded-md">
          {success}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Current Password
        </label>
        <Input
          type="password"
          name="current"
          value={passwords.current}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          New Password
        </label>
        <Input
          type="password"
          name="new"
          value={passwords.new}
          onChange={handleChange}
          required
          minLength={8}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Confirm New Password
        </label>
        <Input
          type="password"
          name="confirm"
          value={passwords.confirm}
          onChange={handleChange}
          required
          minLength={8}
        />
      </div>

      <Button
        type="submit"
        variant="outline"
        className="w-full"
        disabled={loading}
      >
        {loading ? "Updating..." : "Update Password"}
      </Button>
    </form>
  );
};

export default PasswordChangeForm;
