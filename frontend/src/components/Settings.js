import React, { useState } from "react";
import { User, Bell, Shield, Palette } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { useToast } from "../hooks/use-toast";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";

const Settings = () => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();
  const [preferences, setPreferences] = useState({
    defaultImageStyle: "photorealistic",
    autoSaveDrafts: true,
    emailNotifications: true,
    darkMode: theme === "dark"
  });

  const handlePreferenceChange = (key, value) => {
    setPreferences({
      ...preferences,
      [key]: value
    });

    if (key === "darkMode") {
      toggleTheme();
    }

    toast({
      title: "✅ Settings Updated",
      description: "Your preferences have been saved.",
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Manage your account preferences and application settings
        </p>
      </div>

      {/* Account Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="w-5 h-5" />
            <span>Account Information</span>
          </CardTitle>
          <CardDescription>
            Your account details and profile information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                value={user?.name || ""}
                placeholder="Enter your full name"
                readOnly
                className="bg-gray-50 dark:bg-gray-800"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={user?.email || ""}
                placeholder="Enter your email"
                readOnly
                className="bg-gray-50 dark:bg-gray-800"
              />
            </div>
          </div>
          <Button variant="outline" className="mt-4">
            Update Profile
          </Button>
        </CardContent>
      </Card>

      {/* App Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Palette className="w-5 h-5" />
            <span>Application Preferences</span>
          </CardTitle>
          <CardDescription>
            Customize your Contentify AI experience
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base">Default Image Style</Label>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Choose your preferred image generation style
              </p>
            </div>
            <select 
              value={preferences.defaultImageStyle}
              onChange={(e) => handlePreferenceChange("defaultImageStyle", e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="photorealistic">Photorealistic</option>
              <option value="artistic">Artistic</option>
              <option value="minimalist">Minimalist</option>
              <option value="vibrant">Vibrant</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base">Theme</Label>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Choose between light and dark mode
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => handlePreferenceChange("darkMode", !preferences.darkMode)}
              className="flex items-center space-x-2"
            >
              {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base">Auto-save Drafts</Label>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Automatically save your work in progress
              </p>
            </div>
            <input
              type="checkbox"
              checked={preferences.autoSaveDrafts}
              onChange={(e) => handlePreferenceChange("autoSaveDrafts", e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="w-5 h-5" />
            <span>Notifications</span>
          </CardTitle>
          <CardDescription>
            Choose what notifications you want to receive
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base">Email Notifications</Label>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Get notified when scheduled posts are published
              </p>
            </div>
            <input
              type="checkbox"
              checked={preferences.emailNotifications}
              onChange={(e) => handlePreferenceChange("emailNotifications", e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base">Push Notifications</Label>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Receive push notifications for important updates
              </p>
            </div>
            <input
              type="checkbox"
              defaultChecked={false}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
          </div>
        </CardContent>
      </Card>

      {/* Privacy & Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5" />
            <span>Privacy & Security</span>
          </CardTitle>
          <CardDescription>
            Manage your privacy and security settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <Button variant="outline" className="w-full md:w-auto">
              Change Password
            </Button>
            <Button variant="outline" className="w-full md:w-auto">
              Download My Data
            </Button>
            <Button variant="outline" className="w-full md:w-auto text-red-600 hover:text-red-700">
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;