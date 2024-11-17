import React from 'react';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, MapPin, Users, Filter, Search, Plus } from 'lucide-react';

// Event Card Component
const EventCard = ({ event }) => {
    return (
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <img 
            src="/api/placeholder/400/200"
            alt={event.title}
            className="rounded-t-lg h-48 w-full object-cover"
          />
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <CardTitle>{event.title}</CardTitle>
            <CardDescription>{event.description}</CardDescription>
            
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="h-4 w-4 mr-2" />
              <span>{event.date}</span>
            </div>
            
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-2" />
              <span>{event.time}</span>
            </div>
            
            <div className="flex items-center text-sm text-gray-500">
              <MapPin className="h-4 w-4 mr-2" />
              <span>{event.location}</span>
            </div>
            
            <div className="flex items-center text-sm text-gray-500">
              <Users className="h-4 w-4 mr-2" />
              <span>{event.capacity} spots available</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <span className="text-lg font-bold">${event.price}</span>
          <Button>Book Now</Button>
        </CardFooter>
      </Card>
    );
  };