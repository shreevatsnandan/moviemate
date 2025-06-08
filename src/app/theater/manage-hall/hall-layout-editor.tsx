"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export interface Seat {
  id: string;
  row: string;
  number: number;
  type: "standard" | "premium" | "vip";
  price: number;
  isBooked: boolean;
}

interface HallLayoutEditorProps {
  hall: any;
  onSave: (layout: Seat[][]) => void;
  onCancel: () => void;
}

export function HallLayoutEditor({
  hall,
  onSave,
  onCancel,
}: HallLayoutEditorProps) {
  const [layout, setLayout] = useState<Seat[][]>([]);
  const [selectedSeatType, setSelectedSeatType] = useState("standard");
  const [isSelectingMultiple, setIsSelectingMultiple] = useState(false);

  useEffect(() => {
    if (hall?.layout) {
      setLayout(hall.layout);
    }
  }, [hall]);

  const handleSeatClick = (rowIndex: number, seatIndex: number) => {
    const newLayout = [...layout];
    const seat = newLayout[rowIndex][seatIndex];

    // Update seat type and price based on selection
    const prices = { standard: 12, premium: 18, vip: 25 };
    seat.type = selectedSeatType as "standard" | "premium" | "vip";
    seat.price = prices[selectedSeatType as keyof typeof prices];

    setLayout(newLayout);
  };

  const handleRemoveSeat = (rowIndex: number, seatIndex: number) => {
    const newLayout = [...layout];
    newLayout[rowIndex].splice(seatIndex, 1);
    // Renumber seats in the row
    newLayout[rowIndex].forEach((seat, index) => {
      seat.number = index + 1;
      seat.id = `${seat.row}${index + 1}`;
    });
    setLayout(newLayout);
  };

  const handleAddSeat = (rowIndex: number) => {
    const newLayout = [...layout];
    const row = newLayout[rowIndex];
    const newSeatNumber = row.length + 1;
    const newSeat: Seat = {
      id: `${String.fromCharCode(65 + rowIndex)}${newSeatNumber}`,
      row: String.fromCharCode(65 + rowIndex),
      number: newSeatNumber,
      type: "standard",
      price: 12,
      isBooked: false,
    };
    row.push(newSeat);
    setLayout(newLayout);
  };

  const getSeatColor = (seatType: string) => {
    switch (seatType) {
      case "premium":
        return "bg-yellow-400 hover:bg-yellow-500";
      case "vip":
        return "bg-purple-500 hover:bg-purple-600";
      default:
        return "bg-gray-300 hover:bg-gray-400";
    }
  };

  const handleSave = () => {
    onSave(layout);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium">Seat Type:</span>
          <Select value={selectedSeatType} onValueChange={setSelectedSeatType}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="standard">Standard ($12)</SelectItem>
              <SelectItem value="premium">Premium ($18)</SelectItem>
              <SelectItem value="vip">VIP ($25)</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-muted-foreground">
            Click seats to change type
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={isSelectingMultiple ? "default" : "outline"}
            size="sm"
            onClick={() => setIsSelectingMultiple(!isSelectingMultiple)}
          >
            Multi-Select
          </Button>
        </div>
      </div>

      {/* Screen */}
      <div className="text-center">
        <div className="w-full h-3 bg-gradient-to-r from-transparent via-gray-400 to-transparent rounded-full mb-2"></div>
        <p className="text-sm text-muted-foreground font-medium">SCREEN</p>
      </div>

      {/* Seat Layout Editor */}
      <div className="space-y-3 max-h-96 overflow-y-auto p-4 border rounded-lg">
        {layout.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="flex items-center justify-center space-x-2"
          >
            <span className="w-8 text-center text-sm font-medium text-muted-foreground">
              {String.fromCharCode(65 + rowIndex)}
            </span>
            <div className="flex space-x-1">
              {row.map((seat, seatIndex) => (
                <div key={seat.id} className="relative group">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "w-8 h-8 p-0 rounded text-xs font-medium text-white",
                      getSeatColor(seat.type)
                    )}
                    onClick={() => handleSeatClick(rowIndex, seatIndex)}
                    onContextMenu={(e) => {
                      e.preventDefault();
                      handleRemoveSeat(rowIndex, seatIndex);
                    }}
                  >
                    {seat.number}
                  </Button>
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Right-click to remove
                  </div>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                className="w-8 h-8 p-0 text-xs"
                onClick={() => handleAddSeat(rowIndex)}
              >
                +
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex justify-center space-x-6 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-gray-300 rounded"></div>
          <span>Standard ($12)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-yellow-400 rounded"></div>
          <span>Premium ($18)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-purple-500 rounded"></div>
          <span>VIP ($25)</span>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-4 gap-4 text-center">
        <div>
          <div className="text-2xl font-bold">
            {layout.reduce((total, row) => total + row.length, 0)}
          </div>
          <div className="text-sm text-muted-foreground">Total Seats</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-gray-600">
            {layout.reduce(
              (total, row) =>
                total + row.filter((s) => s.type === "standard").length,
              0
            )}
          </div>
          <div className="text-sm text-muted-foreground">Standard</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-yellow-600">
            {layout.reduce(
              (total, row) =>
                total + row.filter((s) => s.type === "premium").length,
              0
            )}
          </div>
          <div className="text-sm text-muted-foreground">Premium</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-purple-600">
            {layout.reduce(
              (total, row) =>
                total + row.filter((s) => s.type === "vip").length,
              0
            )}
          </div>
          <div className="text-sm text-muted-foreground">VIP</div>
        </div>
      </div>

      <div className="flex space-x-4">
        <Button onClick={handleSave} className="flex-1">
          Save Layout
        </Button>
        <Button onClick={onCancel} variant="outline" className="flex-1">
          Cancel
        </Button>
      </div>
    </div>
  );
}
