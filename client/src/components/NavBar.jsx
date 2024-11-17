import React from 'react';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, MapPin, Users, Filter, Search, Plus } from 'lucide-react';

// Navigation Component
const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    return (
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-blue-600">EventBooking</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {isLoggedIn ? (
                <>
                  <Button variant="ghost">Dashboard</Button>
                  <Button variant="ghost">My Events</Button>
                  <Button variant="ghost" onClick={() => setIsLoggedIn(false)}>Logout</Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" onClick={() => setIsLoggedIn(true)}>Login</Button>
                  <Button>Sign Up</Button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    );
  };