
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { User, CreditCard, Shield, AlertTriangle } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const Profile = () => {
  const navigate = useNavigate();
  
  const [profileData, setProfileData] = useState({
    name: "John Smith",
    email: "john.smith@example.com",
    age: "25",
    state: "California",
    country: "USA",
    paymentMethod: "Credit Card",
  });
  
  const [notificationPreferences, setNotificationPreferences] = useState({
    emailUpdates: true,
    upcomingClasses: true,
    newFeatures: false,
    promotions: false,
  });
  
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };
  
  const handleNotificationChange = (name: string, value: boolean) => {
    setNotificationPreferences({
      ...notificationPreferences,
      [name]: value,
    });
  };
  
  const handleAddPaymentMethod = () => {
    toast({
      title: "Payment method added",
      description: "Your new payment method has been added successfully."
    });
  };
  
  const handleChangePassword = () => {
    toast({
      title: "Password changed",
      description: "Your password has been changed successfully."
    });
  };
  
  const handleSignOutAllDevices = () => {
    toast({
      title: "Signed out from all devices",
      description: "You have been signed out from all devices. Redirecting to login..."
    });
    
    // In a real app, we would redirect to login after a timeout
    setTimeout(() => {
      // navigate("/login");
    }, 5000);
  };
  
  const handleDeactivateAccount = () => {
    const confirm = window.confirm(
      "Are you sure you want to deactivate your account? You will lose access to all your classes and progress."
    );
    
    if (confirm) {
      toast({
        title: "Account deactivated",
        description: "Your account has been deactivated.",
        variant: "destructive",
      });
      
      // In a real app, we would redirect to login after account deactivation
      setTimeout(() => {
        // navigate("/login");
      }, 5000);
    }
  };
  
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Profile</h1>
      
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full md:w-[400px] grid-cols-3">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        
        {/* Profile Details Tab */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Details</CardTitle>
              <CardDescription>
                Update your profile information here. Accurate information is required for offline classes.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-center mb-6">
                <div className="h-24 w-24 rounded-full bg-[#8A5BB7] flex items-center justify-center text-white text-2xl">
                  <User className="h-12 w-12" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={profileData.name}
                    onChange={handleProfileChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={profileData.email}
                    onChange={handleProfileChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    name="age"
                    type="number"
                    value={profileData.age}
                    onChange={handleProfileChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    name="state"
                    value={profileData.state}
                    onChange={handleProfileChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    name="country"
                    value={profileData.country}
                    onChange={handleProfileChange}
                  />
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <h3 className="text-lg font-medium mb-4">Payment Method</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <CreditCard className="mr-2 h-5 w-5 text-[#8A5BB7]" />
                    <span>{profileData.paymentMethod}</span>
                  </div>
                  <Button onClick={handleAddPaymentMethod} variant="outline">
                    Add New Method
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button className="bg-[#8A5BB7] hover:bg-[#8A5BB7]/90">
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Notification Preferences Tab */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose what notifications you want to receive.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-updates">Email Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive emails about your account activity.
                    </p>
                  </div>
                  <Switch
                    id="email-updates"
                    checked={notificationPreferences.emailUpdates}
                    onCheckedChange={(checked) =>
                      handleNotificationChange("emailUpdates", checked)
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="upcoming-classes">Upcoming Classes</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified before your scheduled classes.
                    </p>
                  </div>
                  <Switch
                    id="upcoming-classes"
                    checked={notificationPreferences.upcomingClasses}
                    onCheckedChange={(checked) =>
                      handleNotificationChange("upcomingClasses", checked)
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="new-features">New Features</Label>
                    <p className="text-sm text-muted-foreground">
                      Learn about new features and improvements.
                    </p>
                  </div>
                  <Switch
                    id="new-features"
                    checked={notificationPreferences.newFeatures}
                    onCheckedChange={(checked) =>
                      handleNotificationChange("newFeatures", checked)
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="promotions">Promotions</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive emails about promotions and discounts.
                    </p>
                  </div>
                  <Switch
                    id="promotions"
                    checked={notificationPreferences.promotions}
                    onCheckedChange={(checked) =>
                      handleNotificationChange("promotions", checked)
                    }
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button className="bg-[#8A5BB7] hover:bg-[#8A5BB7]/90">
                Save Preferences
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Security Details Tab */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Details</CardTitle>
              <CardDescription>
                Manage your password and account security.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-base font-medium">Password</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                  </div>
                  <Button 
                    onClick={handleChangePassword}
                    className="mt-2 bg-[#8A5BB7] hover:bg-[#8A5BB7]/90"
                  >
                    Update Password
                  </Button>
                </div>
                
                <div className="pt-4 border-t">
                  <h3 className="text-base font-medium mb-2">Active Sessions</h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between pb-2 border-b">
                      <div>
                        <p className="font-medium">New York, USA</p>
                        <p className="text-sm text-gray-500">Chrome on Windows</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Current</Badge>
                    </div>
                    <div className="flex justify-between pb-2 border-b">
                      <div>
                        <p className="font-medium">San Francisco, USA</p>
                        <p className="text-sm text-gray-500">Safari on macOS</p>
                      </div>
                      <Badge className="bg-gray-100 text-gray-800">Active</Badge>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={handleSignOutAllDevices}
                    className="w-full"
                  >
                    <Shield className="mr-2 h-4 w-4" />
                    Sign Out From All Devices
                  </Button>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col">
              <div className="w-full pt-4 border-t">
                <div className="space-y-2">
                  <h3 className="text-base font-medium text-red-600">Danger Zone</h3>
                  <p className="text-sm text-muted-foreground">
                    Once you deactivate your account, you will lose access to all your classes and progress.
                  </p>
                  <Button 
                    variant="destructive" 
                    onClick={handleDeactivateAccount}
                    className="w-full"
                  >
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    Deactivate Account
                  </Button>
                </div>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

// Helper Badge component for this page
const Badge = ({ className, children }: { className?: string, children: React.ReactNode }) => {
  return (
    <span className={`px-2 py-1 text-xs rounded-full ${className}`}>
      {children}
    </span>
  );
};

export default Profile;
