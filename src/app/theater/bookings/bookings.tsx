"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Eye, Search, Download, RefreshCw } from "lucide-react";

export function BookingManagement() {
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const bookings = [
    {
      id: "BK001",
      customer: "John Doe",
      email: "john@example.com",
      movie: "The Dark Knight",
      showtime: "Today 2:00 PM",
      hall: "Hall A",
      seats: ["A1", "A2"],
      amount: 24,
      status: "confirmed",
      paymentMethod: "Credit Card",
      bookingDate: "2024-01-15 10:30 AM",
    },
    {
      id: "BK002",
      customer: "Jane Smith",
      email: "jane@example.com",
      movie: "Inception",
      showtime: "Today 5:30 PM",
      hall: "Hall B",
      seats: ["B5", "B6"],
      amount: 36,
      status: "confirmed",
      paymentMethod: "PayPal",
      bookingDate: "2024-01-15 11:15 AM",
    },
    {
      id: "BK003",
      customer: "Mike Johnson",
      email: "mike@example.com",
      movie: "Interstellar",
      showtime: "Tomorrow 7:00 PM",
      hall: "Hall C",
      seats: ["C3"],
      amount: 25,
      status: "pending",
      paymentMethod: "Credit Card",
      bookingDate: "2024-01-15 12:00 PM",
    },
    {
      id: "BK004",
      customer: "Sarah Wilson",
      email: "sarah@example.com",
      movie: "The Avengers",
      showtime: "Today 8:00 PM",
      hall: "Hall A",
      seats: ["D1", "D2", "D3"],
      amount: 36,
      status: "cancelled",
      paymentMethod: "Credit Card",
      bookingDate: "2024-01-15 09:45 AM",
    },
  ];

  const handleViewDetails = (booking: any) => {
    setSelectedBooking(booking);
    setIsDialogOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex space-x-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by customer, email, or booking ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.map((booking) => (
          <Card key={booking.id} className="p-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="flex items-center space-x-4">
                    <h3 className="font-semibold">{booking.id}</h3>
                    <Badge className={getStatusColor(booking.status)}>
                      {booking.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                    <div>
                      <span className="font-medium">Customer:</span>
                      <div>{booking.customer}</div>
                      <div>{booking.email}</div>
                      <div>
                        <div className="text-xs text-muted-foreground">
                          Booked on {booking.bookingDate}
                        </div>
                      </div>
                    </div>
                    <div>
                      <span className="font-medium">Movie:</span>
                      <div>{booking.movie}</div>
                      <div>{booking.showtime}</div>
                    </div>
                    <div>
                      <span className="font-medium">Seats:</span>
                      <div>{booking.hall}</div>
                      <div>{booking.seats.join(", ")}</div>
                    </div>
                    <div>
                      <span className="font-medium">Payment:</span>
                      <div>${booking.amount}</div>
                      <div>{booking.paymentMethod}</div>
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  onClick={() => handleViewDetails(booking)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Booking Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Booking Details - {selectedBooking?.id}</DialogTitle>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Customer Information</h4>
                  <div className="space-y-1 text-sm">
                    <div>
                      <span className="font-medium">Name:</span>{" "}
                      {selectedBooking.customer}
                    </div>
                    <div>
                      <span className="font-medium">Email:</span>{" "}
                      {selectedBooking.email}
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Booking Status</h4>
                  <Badge className={getStatusColor(selectedBooking.status)}>
                    {selectedBooking.status}
                  </Badge>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Show Information</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Movie:</span>{" "}
                    {selectedBooking.movie}
                  </div>
                  <div>
                    <span className="font-medium">Showtime:</span>{" "}
                    {selectedBooking.showtime}
                  </div>
                  <div>
                    <span className="font-medium">Hall:</span>{" "}
                    {selectedBooking.hall}
                  </div>
                  <div>
                    <span className="font-medium">Seats:</span>{" "}
                    {selectedBooking.seats.join(", ")}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Payment Information</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Amount:</span> $
                    {selectedBooking.amount}
                  </div>
                  <div>
                    <span className="font-medium">Method:</span>{" "}
                    {selectedBooking.paymentMethod}
                  </div>
                  <div>
                    <span className="font-medium">Booking Date:</span>{" "}
                    {selectedBooking.bookingDate}
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" className="flex-1">
                  Send Confirmation Email
                </Button>
                <Button variant="outline" className="flex-1">
                  Refund Booking
                </Button>
                <Button variant="destructive" className="flex-1">
                  Cancel Booking
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
