"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Edit, Trash2, Building } from "lucide-react";
import { halls } from "@/app/theater/manage-hall/mock-data";
import { HallLayoutEditor } from "@/app/theater/manage-hall/hall-layout-editor";

export function CinemaHalls() {
  const [selectedHall, setSelectedHall] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLayoutEditorOpen, setIsLayoutEditorOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    rows: 10,
    seatsPerRow: 12,
    type: "standard",
  });

  const handleEdit = (hall: any) => {
    setSelectedHall(hall);
    setFormData({
      name: hall.name,
      rows: hall.rows,
      seatsPerRow: hall.seatsPerRow,
      type: hall.type,
    });
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    setSelectedHall(null);
    setFormData({
      name: "",
      rows: 10,
      seatsPerRow: 12,
      type: "standard",
    });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    console.log("Saving hall:", formData);
    setIsDialogOpen(false);
  };

  const handleDelete = (hallId: string) => {
    console.log("Deleting hall:", hallId);
  };

  const handleEditLayout = (hall: any) => {
    setSelectedHall(hall);
    setIsLayoutEditorOpen(true);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-end">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAdd}>
              <Plus className="h-4 w-4 mr-2" />
              Add Hall
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {selectedHall ? "Edit Hall" : "Add New Hall"}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="name">Hall Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="e.g., Hall A - Standard"
                />
              </div>

              <div>
                <Label htmlFor="type">Hall Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, type: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select hall type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                    <SelectItem value="imax">IMAX</SelectItem>
                    <SelectItem value="vip">VIP</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="rows">Number of Rows</Label>
                  <Input
                    id="rows"
                    type="number"
                    min="1"
                    max="20"
                    value={formData.rows}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        rows: Number.parseInt(e.target.value),
                      }))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="seatsPerRow">Seats per Row</Label>
                  <Input
                    id="seatsPerRow"
                    type="number"
                    min="1"
                    max="30"
                    value={formData.seatsPerRow}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        seatsPerRow: Number.parseInt(e.target.value),
                      }))
                    }
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  {selectedHall ? "Update" : "Add"} Hall
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {halls.map((hall) => (
          <Card key={hall.id}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Building className="h-5 w-5" />
                <span>{hall.name}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Type:</span>
                  <Badge variant="outline" className="ml-2">
                    {hall.type}
                  </Badge>
                </div>
                <div>
                  <span className="text-muted-foreground">Capacity:</span>
                  <span className="ml-2 font-medium">
                    {hall.rows * hall.seatsPerRow}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Rows:</span>
                  <span className="ml-2 font-medium">{hall.rows}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Seats/Row:</span>
                  <span className="ml-2 font-medium">{hall.seatsPerRow}</span>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(hall)}
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEditLayout(hall)}
                >
                  Layout
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(hall.id)}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isLayoutEditorOpen} onOpenChange={setIsLayoutEditorOpen}>
        <DialogContent className="w-full h-auto max-w-fit max-h-fit p-6">
          <DialogHeader>
            <DialogTitle>Edit Hall Layout - {selectedHall?.name}</DialogTitle>
          </DialogHeader>
          {selectedHall && (
            <HallLayoutEditor
              hall={selectedHall}
              onSave={(layout) => {
                console.log("Saving layout:", layout);
                setIsLayoutEditorOpen(false);
              }}
              onCancel={() => setIsLayoutEditorOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
